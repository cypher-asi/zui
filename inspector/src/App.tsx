import { useState, useEffect } from 'react';
import { Explorer, Sidebar, Topbar, ThemePanel } from '@cypher-asi/zui';
import type { ExplorerNode } from '@cypher-asi/zui';
import { components } from './data/componentRegistry';
import type { ComponentInfo } from './data/componentRegistry';
import { ComponentShowcase } from './components/ComponentShowcase';
import { GroupShowcase } from './components/GroupShowcase';
import type { GroupInfo } from './components/GroupShowcase';
import styles from './App.module.css';

// Import validation module - runs automatically in development
import './data/validateRegistry';

const STORAGE_KEY = 'zui-inspector-selected-item';

const buildExplorerTree = (items: ComponentInfo[]) => {
  const nodes: ExplorerNode[] = [];
  const groups = new Map<string, ExplorerNode>();
  const groupComponents = new Map<string, ComponentInfo[]>();

  // Count components per folder to determine which need grouping
  const folderCounts = new Map<string, number>();
  items.forEach((component) => {
    folderCounts.set(component.folder, (folderCounts.get(component.folder) ?? 0) + 1);
  });

  items.forEach((component) => {
    const leafNode: ExplorerNode = {
      id: component.id,
      label: component.name,
      metadata: { componentId: component.id },
    };

    // Only group if there are multiple components in the same folder
    const folderCount = folderCounts.get(component.folder) ?? 1;
    if (folderCount === 1) {
      nodes.push(leafNode);
      return;
    }

    const groupId = `group:${component.folder.toLowerCase()}`;
    const groupNode = groups.get(groupId);

    // Track components per group
    const existingComponents = groupComponents.get(groupId) ?? [];
    groupComponents.set(groupId, [...existingComponents, component]);

    if (groupNode) {
      groupNode.children = [...(groupNode.children ?? []), leafNode];
    } else {
      const newGroup: ExplorerNode = {
        id: groupId,
        label: component.folder,
        children: [leafNode],
      };
      groups.set(groupId, newGroup);
      nodes.push(newGroup);
    }
  });

  // Sort children within groups alphabetically
  nodes.forEach((node) => {
    if (node.children) {
      node.children.sort((a, b) => a.label.localeCompare(b.label));
    }
  });

  // Sort components within each group
  groupComponents.forEach((comps, groupId) => {
    groupComponents.set(groupId, comps.sort((a, b) => a.name.localeCompare(b.name)));
  });

  // Build group info map
  const groupInfoMap = new Map<string, GroupInfo>();
  groups.forEach((node, groupId) => {
    groupInfoMap.set(groupId, {
      id: groupId,
      name: node.label,
      components: groupComponents.get(groupId) ?? [],
    });
  });

  return {
    data: nodes.sort((a, b) => a.label.localeCompare(b.label)),
    groupIds: Array.from(groups.keys()),
    groupInfoMap,
  };
};

const explorerTree = buildExplorerTree(components);
const componentIds = new Set(components.map((component) => component.id));
const groupIds = new Set(explorerTree.groupIds);
const validIds = new Set([...componentIds, ...groupIds]);

const getInitialSelectedId = (): string => {
  const stored = localStorage.getItem(STORAGE_KEY);
  // Validate stored ID exists in component or group list
  if (stored && validIds.has(stored)) {
    return stored;
  }
  return 'button';
};

function App() {
  const [selectedId, setSelectedId] = useState<string>(getInitialSelectedId);

  // Persist selected item to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedId);
  }, [selectedId]);

  const isGroupSelected = selectedId.startsWith('group:');
  const selectedComponent = !isGroupSelected ? components.find(c => c.id === selectedId) : null;
  const selectedGroup = isGroupSelected ? explorerTree.groupInfoMap.get(selectedId) : null;

  const handleExplorerSelect = (selectedIds: string[]) => {
    // Find first valid selection (either component or group)
    const nextSelected = selectedIds.find((id) => validIds.has(id));
    if (nextSelected) {
      setSelectedId(nextSelected);
    }
  };

  const handleComponentSelect = (componentId: string) => {
    setSelectedId(componentId);
  };

  return (
    <div className={styles.app}>
      <Topbar title={<>ZUI <span className={styles.inspectorTitle}>Inspector</span></>} actions={<ThemePanel />} />
      <div className={styles.body}>
        <Sidebar
          resizable
          minWidth={200}
          maxWidth={400}
          defaultWidth={260}
          storageKey="zui-inspector-main-sidebar-width"
        >
          <div className={styles.sidebarContent}>
            <Explorer
              data={explorerTree.data}
              defaultExpandedIds={explorerTree.groupIds}
              defaultSelectedIds={[selectedId]}
              enableDragDrop={false}
              enableMultiSelect={false}
              expandOnSelect
              onSelect={handleExplorerSelect}
              className={styles.explorer}
              searchable
            />
          </div>
        </Sidebar>
        <main className={styles.main}>
          {selectedComponent && (
            <ComponentShowcase component={selectedComponent} />
          )}
          {selectedGroup && (
            <GroupShowcase group={selectedGroup} onComponentSelect={handleComponentSelect} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
