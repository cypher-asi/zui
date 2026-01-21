import { createContext, useContext, useState, useCallback, useMemo, ReactNode, useEffect, useRef } from 'react';
import type { ExplorerContextValue, ExplorerNode, FlatNode, DropPosition } from './types';

const ExplorerContext = createContext<ExplorerContextValue | null>(null);

export function useExplorerContext() {
  const context = useContext(ExplorerContext);
  if (!context) {
    throw new Error('useExplorerContext must be used within ExplorerProvider');
  }
  return context;
}

interface ExplorerProviderProps {
  children: ReactNode;
  data: ExplorerNode[];
  defaultExpandedIds?: string[];
  defaultSelectedIds?: string[];
  enableMultiSelect?: boolean;
  enableDragDrop?: boolean;
  expandOnSelect?: boolean;
  searchQuery?: string;
  onSelect?: (selectedIds: string[]) => void;
  onExpand?: (nodeId: string, expanded: boolean) => void;
  onDrop?: (draggedId: string, targetId: string, position: DropPosition) => void;
}

/**
 * Flatten the tree structure for easier traversal and range selection
 */
function flattenTree(nodes: ExplorerNode[], level = 0, path: string[] = [], parentId: string | null = null): FlatNode[] {
  const result: FlatNode[] = [];
  
  for (const node of nodes) {
    const currentPath = [...path, node.id];
    result.push({
      id: node.id,
      node,
      level,
      path: currentPath,
      parentId,
      hasChildren: !!(node.children && node.children.length > 0),
    });
    
    if (node.children) {
      result.push(...flattenTree(node.children, level + 1, currentPath, node.id));
    }
  }
  
  return result;
}

/**
 * Find all node IDs that match the search query (case-insensitive)
 */
function findMatchingIds(nodes: ExplorerNode[], query: string): Set<string> {
  const matches = new Set<string>();
  const lowerQuery = query.toLowerCase();

  function traverse(node: ExplorerNode) {
    if (node.label.toLowerCase().includes(lowerQuery)) {
      matches.add(node.id);
    }
    node.children?.forEach(traverse);
  }

  nodes.forEach(traverse);
  return matches;
}

/**
 * Find all ancestor IDs for the given node IDs
 */
function findAncestorIds(flatNodes: FlatNode[], nodeIds: Set<string>): Set<string> {
  const ancestors = new Set<string>();

  for (const flatNode of flatNodes) {
    if (nodeIds.has(flatNode.id)) {
      // Add all ancestors from the path (excluding the node itself)
      for (let i = 0; i < flatNode.path.length - 1; i++) {
        ancestors.add(flatNode.path[i]);
      }
    }
  }

  return ancestors;
}

/**
 * Filter tree to only include matching nodes and their ancestors
 */
function filterTree(nodes: ExplorerNode[], matchingIds: Set<string>, ancestorIds: Set<string>): ExplorerNode[] {
  const result: ExplorerNode[] = [];

  for (const node of nodes) {
    const isMatch = matchingIds.has(node.id);
    const isAncestor = ancestorIds.has(node.id);

    if (isMatch || isAncestor) {
      const filteredNode: ExplorerNode = { ...node };
      if (node.children) {
        filteredNode.children = filterTree(node.children, matchingIds, ancestorIds);
      }
      result.push(filteredNode);
    }
  }

  return result;
}

export function ExplorerProvider({
  children,
  data,
  defaultExpandedIds = [],
  defaultSelectedIds = [],
  enableMultiSelect = true,
  enableDragDrop = true,
  expandOnSelect = false,
  searchQuery = '',
  onSelect,
  onExpand,
  onDrop,
}: ExplorerProviderProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(defaultExpandedIds));
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(defaultSelectedIds));
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);
  const [preSearchExpandedIds, setPreSearchExpandedIds] = useState<Set<string> | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  // Store callbacks in refs to avoid dependency issues
  const onSelectRef = useRef(onSelect);
  const onExpandRef = useRef(onExpand);
  const onDropRef = useRef(onDrop);

  // Update refs when callbacks change
  useEffect(() => {
    onSelectRef.current = onSelect;
    onExpandRef.current = onExpand;
    onDropRef.current = onDrop;
  });

  // Flatten tree for easier operations
  const flatNodes = useMemo(() => flattenTree(data), [data]);

  // Find matching node IDs based on search query
  const matchingIds = useMemo(() => {
    if (!searchQuery.trim()) return new Set<string>();
    return findMatchingIds(data, searchQuery.trim());
  }, [data, searchQuery]);

  // Find ancestor IDs for matching nodes
  const ancestorIds = useMemo(() => {
    if (!searchQuery.trim()) return new Set<string>();
    return findAncestorIds(flatNodes, matchingIds);
  }, [flatNodes, matchingIds, searchQuery]);

  // Filter tree data when searching
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    return filterTree(data, matchingIds, ancestorIds);
  }, [data, searchQuery, matchingIds, ancestorIds]);

  // Get flat list of visible matching nodes (for keyboard navigation)
  const visibleMatchingNodes = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return flatNodes.filter((n) => matchingIds.has(n.id));
  }, [flatNodes, matchingIds, searchQuery]);

  // Auto-expand parents of matching nodes during search
  useEffect(() => {
    if (searchQuery.trim()) {
      // Save current expanded state before search (only once)
      if (preSearchExpandedIds === null) {
        setPreSearchExpandedIds(new Set(expandedIds));
      }
      // Expand all ancestors of matching nodes
      setExpandedIds((prev) => new Set([...prev, ...ancestorIds]));
      // Reset focus when search changes
      if (visibleMatchingNodes.length > 0) {
        setFocusedId(visibleMatchingNodes[0].id);
      } else {
        setFocusedId(null);
      }
    } else if (preSearchExpandedIds !== null) {
      // Restore previous expanded state when search is cleared
      setExpandedIds(preSearchExpandedIds);
      setPreSearchExpandedIds(null);
      setFocusedId(null);
    }
  }, [searchQuery, ancestorIds]);

  // Move focus up or down through matching nodes
  const moveFocus = useCallback(
    (direction: 'up' | 'down') => {
      if (visibleMatchingNodes.length === 0) return;

      const currentIndex = focusedId ? visibleMatchingNodes.findIndex((n) => n.id === focusedId) : -1;
      let nextIndex: number;

      if (direction === 'down') {
        nextIndex = currentIndex < visibleMatchingNodes.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : visibleMatchingNodes.length - 1;
      }

      setFocusedId(visibleMatchingNodes[nextIndex].id);
    },
    [focusedId, visibleMatchingNodes]
  );

  // Select the currently focused item
  const selectFocused = useCallback(() => {
    if (focusedId) {
      setSelectedIds(new Set([focusedId]));
      setLastSelectedId(focusedId);
      onSelectRef.current?.([focusedId]);
    }
  }, [focusedId]);
  
  // Notify parent component when selection changes
  useEffect(() => {
    if (onSelectRef.current) {
      onSelectRef.current(Array.from(selectedIds));
    }
  }, [selectedIds]);
  
  const toggleExpanded = useCallback((nodeId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
        onExpandRef.current?.(nodeId, false);
      } else {
        next.add(nodeId);
        onExpandRef.current?.(nodeId, true);
      }
      return next;
    });
  }, []);
  
  const setExpanded = useCallback((nodeId: string, expanded: boolean) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (expanded) {
        next.add(nodeId);
      } else {
        next.delete(nodeId);
      }
      return next;
    });
    onExpandRef.current?.(nodeId, expanded);
  }, []);
  
  const selectNode = useCallback((nodeId: string) => {
    setSelectedIds(new Set([nodeId]));
    setLastSelectedId(nodeId);
  }, []);
  
  const toggleSelection = useCallback((nodeId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
    setLastSelectedId(nodeId);
  }, []);
  
  const selectRange = useCallback((fromId: string, toId: string) => {
    // Find indices in flat array
    const fromIndex = flatNodes.findIndex((n) => n.id === fromId);
    const toIndex = flatNodes.findIndex((n) => n.id === toId);
    
    if (fromIndex === -1 || toIndex === -1) return;
    
    const start = Math.min(fromIndex, toIndex);
    const end = Math.max(fromIndex, toIndex);
    
    const rangeIds = flatNodes.slice(start, end + 1).map((n) => n.id);
    setSelectedIds(new Set(rangeIds));
    setLastSelectedId(toId);
  }, [flatNodes]);
  
  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
    setLastSelectedId(null);
  }, []);
  
  const value: ExplorerContextValue = useMemo(
    () => ({
      expandedIds,
      selectedIds,
      lastSelectedId,
      toggleExpanded,
      setExpanded,
      selectNode,
      toggleSelection,
      selectRange,
      clearSelection,
      enableMultiSelect,
      enableDragDrop,
      expandOnSelect,
      searchQuery,
      matchingIds,
      filteredData,
      focusedId,
      moveFocus,
      selectFocused,
      setFocusedId,
      onSelect: onSelectRef.current,
      onExpand: onExpandRef.current,
      onDrop: onDropRef.current,
      flatNodes,
    }),
    [
      expandedIds,
      selectedIds,
      lastSelectedId,
      toggleExpanded,
      setExpanded,
      selectNode,
      toggleSelection,
      selectRange,
      clearSelection,
      enableMultiSelect,
      enableDragDrop,
      expandOnSelect,
      searchQuery,
      matchingIds,
      filteredData,
      focusedId,
      moveFocus,
      selectFocused,
      flatNodes,
    ]
  );
  
  return <ExplorerContext.Provider value={value}>{children}</ExplorerContext.Provider>;
}
