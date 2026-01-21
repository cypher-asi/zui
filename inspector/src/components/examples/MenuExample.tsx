import { useState } from 'react';
import { Menu, Heading } from '@cypher-asi/zui';
import type { MenuItem } from '@cypher-asi/zui';
import { Home, Settings, User, LogOut, FileText, Folder, Grid, List, ArrowUpDown, RefreshCw, Plus, Undo, Eye, Monitor, Palette } from 'lucide-react';
import styles from './Example.module.css';

const menuItems = [
  { id: 'home', label: 'Home', icon: <Home size={14} /> },
  { id: 'files', label: 'Files', icon: <Folder size={14} /> },
  { id: 'documents', label: 'Documents', icon: <FileText size={14} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={14} /> },
  { id: 'profile', label: 'Profile', icon: <User size={14} /> },
  { id: 'logout', label: 'Log Out', icon: <LogOut size={14} />, disabled: false },
];

// Windows-style context menu with separators and submenus
const contextMenuItems: MenuItem[] = [
  { 
    id: 'view', 
    label: 'View', 
    icon: <Eye size={14} />,
    children: [
      { id: 'view-large', label: 'Large icons', icon: <Grid size={14} /> },
      { id: 'view-medium', label: 'Medium icons', icon: <Grid size={14} /> },
      { id: 'view-small', label: 'Small icons', icon: <Grid size={14} /> },
      { id: 'view-list', label: 'List', icon: <List size={14} /> },
    ]
  },
  { 
    id: 'sort', 
    label: 'Sort by', 
    icon: <ArrowUpDown size={14} />,
    children: [
      { id: 'sort-name', label: 'Name' },
      { id: 'sort-date', label: 'Date modified' },
      { id: 'sort-type', label: 'Type' },
      { id: 'sort-size', label: 'Size' },
    ]
  },
  { id: 'refresh', label: 'Refresh', icon: <RefreshCw size={14} /> },
  { type: 'separator' },
  { id: 'undo', label: 'Undo Rename', icon: <Undo size={14} />, disabled: true },
  { 
    id: 'new', 
    label: 'New', 
    icon: <Plus size={14} />,
    children: [
      { id: 'new-folder', label: 'Folder', icon: <Folder size={14} /> },
      { id: 'new-file', label: 'Text Document', icon: <FileText size={14} /> },
    ]
  },
  { type: 'separator' },
  { id: 'display', label: 'Display settings', icon: <Monitor size={14} /> },
  { id: 'personalize', label: 'Personalize', icon: <Palette size={14} /> },
];

export function menuExample() {
  const [selected1, setSelected1] = useState('home');
  const [selected2, setSelected2] = useState('files');
  const [selected3, setSelected3] = useState('settings');
  const [selected4, setSelected4] = useState('documents');
  const [contextSelected, setContextSelected] = useState('');

  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>With Separators & Submenus</Heading>
        <Menu
          items={contextMenuItems}
          value={contextSelected}
          onChange={setContextSelected}
          variant="solid"
          border="solid"
          rounded="md"
          width={220}
        />
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Solid (Default)</Heading>
        <Menu
          items={menuItems}
          selectedId={selected1}
          onSelect={setSelected1}
          variant="solid"
          bordered
          width={200}
        />
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Glass</Heading>
        <Menu
          items={menuItems}
          selectedId={selected2}
          onSelect={setSelected2}
          variant="glass"
          bordered
          width={200}
        />
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Transparent</Heading>
        <Menu
          items={menuItems}
          selectedId={selected3}
          onSelect={setSelected3}
          variant="transparent"
          bordered
          width={200}
        />
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>No Border</Heading>
        <Menu
          items={menuItems}
          selectedId={selected1}
          onSelect={setSelected1}
          variant="solid"
          bordered={false}
          width={200}
        />
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Rounded Corners</Heading>
        <Menu
          items={menuItems}
          selectedId={selected2}
          onSelect={setSelected2}
          variant="solid"
          rounded="md"
          bordered
          width={200}
        />
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Glass Rounded</Heading>
        <Menu
          items={menuItems}
          selectedId={selected3}
          onSelect={setSelected3}
          variant="glass"
          rounded="lg"
          bordered
          width={200}
        />
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>With Title</Heading>
        <Menu
          title="Navigation"
          items={menuItems}
          selectedId={selected1}
          onSelect={setSelected1}
          variant="solid"
          bordered
          width={200}
        />
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Future Border</Heading>
        <Menu
          items={menuItems}
          selectedId={selected4}
          onSelect={setSelected4}
          variant="solid"
          border="future"
          width={200}
        />
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Future Glass</Heading>
        <Menu
          title="System"
          items={menuItems}
          selectedId={selected4}
          onSelect={setSelected4}
          variant="glass"
          border="future"
          width={200}
        />
      </div>
    </div>
  );
}
