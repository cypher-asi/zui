import { useCallback, useState, KeyboardEvent, useRef } from 'react';
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import clsx from 'clsx';
import { Item } from '../Item';
import { Search } from '../Search';
import { ExplorerProvider, useExplorerContext } from './ExplorerContext';
import type { ExplorerProps, ExplorerNode, DropPosition } from './types';
import styles from './Explorer.module.css';

// Indentation constants
const BASE_INDENT = 12;
const INDENT_STEP = 20;

/**
 * Internal props for ExplorerItem
 */
interface ExplorerItemProps {
  node: ExplorerNode;
  level: number;
  path: string[];
}

/**
 * ExplorerItem - Renders a single tree item using the unified Item component
 */
function ExplorerItem({ node, level, path }: ExplorerItemProps) {
  const {
    expandedIds,
    selectedIds,
    lastSelectedId,
    toggleExpanded,
    selectNode,
    toggleSelection,
    selectRange,
    enableMultiSelect,
    enableDragDrop,
    expandOnSelect,
    searchQuery,
    matchingIds,
    focusedId,
  } = useExplorerContext();

  const isMatch = matchingIds.has(node.id);
  const isFocused = focusedId === node.id;

  const [dropPosition, setDropPosition] = useState<DropPosition | null>(null);
  const itemRef = useRef<HTMLButtonElement>(null);

  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedIds.has(node.id);
  const hasChildren = node.children && node.children.length > 0;
  const isDisabled = node.disabled || false;

  // Drag and drop setup
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    isDragging,
  } = useDraggable({
    id: node.id,
    disabled: !enableDragDrop || isDisabled,
    data: { node, path },
  });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: node.id,
    disabled: !enableDragDrop || isDisabled,
    data: { node, path },
  });

  // Combine refs
  const setRefs = useCallback(
    (element: HTMLButtonElement | null) => {
      setDraggableRef(element);
      setDroppableRef(element);
      (itemRef as React.MutableRefObject<HTMLButtonElement | null>).current = element;
    },
    [setDraggableRef, setDroppableRef]
  );

  // Handle click for selection
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (isDisabled) return;
      e.stopPropagation();

      const hasModifier = e.ctrlKey || e.metaKey || e.shiftKey;

      if (enableMultiSelect) {
        if (e.ctrlKey || e.metaKey) {
          toggleSelection(node.id);
        } else if (e.shiftKey && lastSelectedId) {
          selectRange(lastSelectedId, node.id);
        } else {
          selectNode(node.id);
        }
      } else {
        selectNode(node.id);
      }

      if (expandOnSelect && hasChildren && !hasModifier) {
        toggleExpanded(node.id);
      }
    },
    [isDisabled, enableMultiSelect, lastSelectedId, node.id, selectNode, toggleSelection, selectRange, expandOnSelect, hasChildren, toggleExpanded]
  );

  // Handle chevron click
  const handleChevronClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (hasChildren && !isDisabled) {
        toggleExpanded(node.id);
      }
    },
    [hasChildren, isDisabled, node.id, toggleExpanded]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isDisabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          selectNode(node.id);
          if (expandOnSelect && hasChildren) {
            toggleExpanded(node.id);
          }
          break;
        case 'ArrowRight':
          if (hasChildren && !isExpanded) {
            e.preventDefault();
            toggleExpanded(node.id);
          }
          break;
        case 'ArrowLeft':
          if (hasChildren && isExpanded) {
            e.preventDefault();
            toggleExpanded(node.id);
          }
          break;
      }
    },
    [isDisabled, hasChildren, isExpanded, node.id, selectNode, toggleExpanded, expandOnSelect]
  );

  // Calculate drop position
  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      if (!enableDragDrop || isDisabled) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const height = rect.height;

      if (hasChildren) {
        if (y < height * 0.25) setDropPosition('before');
        else if (y > height * 0.75) setDropPosition('after');
        else setDropPosition('inside');
      } else {
        setDropPosition(y < height * 0.5 ? 'before' : 'after');
      }
    },
    [enableDragDrop, isDisabled, hasChildren]
  );

  const handleDragLeave = useCallback(() => setDropPosition(null), []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDropPosition(null);
  }, []);

  const indent = BASE_INDENT + level * INDENT_STEP;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { role: _role, ...restAttributes } = attributes;

  // Merge click handler with dnd-kit listeners
  const mergedOnClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      handleClick(e);
      if (listeners?.onClick) {
        (listeners.onClick as (e: React.MouseEvent) => void)(e);
      }
    },
    [handleClick, listeners]
  );

  // Highlight matching text in label
  const renderLabel = () => {
    if (!searchQuery.trim() || !isMatch) {
      return node.label;
    }

    const lowerLabel = node.label.toLowerCase();
    const lowerQuery = searchQuery.toLowerCase();
    const index = lowerLabel.indexOf(lowerQuery);

    if (index === -1) return node.label;

    const before = node.label.slice(0, index);
    const match = node.label.slice(index, index + searchQuery.length);
    const after = node.label.slice(index + searchQuery.length);

    return (
      <>
        {before}
        <mark className={styles.highlight}>{match}</mark>
        {after}
      </>
    );
  };

  return (
    <div className={styles.item}>
      <Item
        ref={setRefs}
        id={node.id}
        className={clsx(
          styles.itemContent,
          isSelected && styles.itemSelected,
          isDisabled && styles.itemDisabled,
          isDragging && styles.itemDragging,
          isOver && styles.itemDragOver,
          isMatch && styles.itemMatch,
          isFocused && styles.itemFocused
        )}
        indent={indent}
        selected={isSelected}
        disabled={isDisabled}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        level={level}
        hasChildren={hasChildren}
        expanded={isExpanded}
        role="treeitem"
        {...restAttributes}
        {...listeners}
        onClick={mergedOnClick}
      >
        {hasChildren ? (
          <Item.Chevron
            className={styles.chevronButton}
            size="sm"
            expanded={isExpanded}
            onToggle={handleChevronClick}
          />
        ) : (
          <Item.Spacer className={styles.leafSpacer} />
        )}

        {node.icon && <Item.Icon className={styles.icon}>{node.icon}</Item.Icon>}
        <Item.Label className={styles.label}>{renderLabel()}</Item.Label>

        {isOver && dropPosition === 'before' && <div className={styles.dropIndicatorBefore} />}
        {isOver && dropPosition === 'after' && <div className={styles.dropIndicatorAfter} />}
        {isOver && dropPosition === 'inside' && <div className={styles.dropIndicatorInside} />}
      </Item>

      {hasChildren && (
        <div className={clsx(styles.children, !isExpanded && styles.childrenCollapsed)}>
          <div className={styles.childrenInner}>
            {node.children!.map((child) => (
              <ExplorerItem key={child.id} node={child} level={level + 1} path={[...path, child.id]} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Internal component that renders the explorer items
 */
function ExplorerContent() {
  const { flatNodes, selectedIds, onDrop, searchQuery, filteredData } = useExplorerContext();
  const [activeNode, setActiveNode] = useState<ExplorerNode | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const node = flatNodes.find((n) => n.id === event.active.id)?.node;
    if (node) setActiveNode(node);
  }, [flatNodes]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveNode(null);

      if (!over || active.id === over.id) return;

      const draggedNode = flatNodes.find((n) => n.id === active.id);
      const targetNode = flatNodes.find((n) => n.id === over.id);

      if (!draggedNode || !targetNode) return;
      if (targetNode.path.includes(active.id as string)) return;

      const position: DropPosition = targetNode.hasChildren ? 'inside' : 'after';
      onDrop?.(active.id as string, over.id as string, position);
    },
    [flatNodes, onDrop]
  );

  // Use filtered data when searching, otherwise use all data
  const displayData = searchQuery.trim() ? filteredData : flatNodes.filter((n) => n.level === 0).map((n) => n.node);

  if (displayData.length === 0) {
    return <div className={styles.empty}>{searchQuery.trim() ? 'No matches found' : 'No items to display'}</div>;
  }

  const selectedCount = selectedIds.size;
  const isDraggingMultiple = activeNode && selectedIds.has(activeNode.id) && selectedCount > 1;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div role="tree">
        {displayData.map((node) => (
          <ExplorerItem key={node.id} node={node} level={0} path={[node.id]} />
        ))}
      </div>

      <DragOverlay>
        {activeNode ? (
          <div className={styles.dragOverlay}>
            {activeNode.icon && <div className={styles.dragOverlayIcon}>{activeNode.icon}</div>}
            <div className={styles.dragOverlayLabel}>{activeNode.label}</div>
            {isDraggingMultiple && <div className={styles.dragOverlayCount}>{selectedCount}</div>}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

/**
 * Inner component that renders search with keyboard navigation
 */
function ExplorerSearch({
  searchQuery,
  searchPlaceholder,
  onSearchChange,
  onSearchClear,
}: {
  searchQuery: string;
  searchPlaceholder?: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClear: () => void;
}) {
  const { moveFocus, selectFocused, focusedId } = useExplorerContext();

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          moveFocus('down');
          break;
        case 'ArrowUp':
          e.preventDefault();
          moveFocus('up');
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedId) {
            selectFocused();
            onSearchClear();
          }
          break;
      }
    },
    [moveFocus, selectFocused, focusedId, onSearchClear]
  );

  return (
    <div className={styles.searchContainer}>
      <Search
        size="sm"
        placeholder={searchPlaceholder}
        value={searchQuery}
        onChange={onSearchChange}
        onKeyDown={handleSearchKeyDown}
        showClear
        onClear={onSearchClear}
      />
    </div>
  );
}

/**
 * Explorer - A tree component for displaying hierarchical data
 */
export function Explorer({
  data,
  onSelect,
  onExpand,
  onDrop,
  defaultExpandedIds,
  defaultSelectedIds,
  className,
  enableDragDrop = true,
  enableMultiSelect = true,
  expandOnSelect = false,
  searchable = false,
  searchPlaceholder,
  onSearch,
}: ExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      onSearch?.(query);
    },
    [onSearch]
  );

  const handleSearchClear = useCallback(() => {
    setSearchQuery('');
    onSearch?.('');
  }, [onSearch]);

  return (
    <div className={clsx(styles.explorer, className)}>
      <ExplorerProvider
        data={data}
        defaultExpandedIds={defaultExpandedIds}
        defaultSelectedIds={defaultSelectedIds}
        enableMultiSelect={enableMultiSelect}
        enableDragDrop={enableDragDrop}
        expandOnSelect={expandOnSelect}
        searchQuery={searchQuery}
        onSelect={onSelect}
        onExpand={onExpand}
        onDrop={onDrop}
      >
        {searchable && (
          <ExplorerSearch
            searchQuery={searchQuery}
            searchPlaceholder={searchPlaceholder}
            onSearchChange={handleSearchChange}
            onSearchClear={handleSearchClear}
          />
        )}
        <ExplorerContent />
      </ExplorerProvider>
    </div>
  );
}
