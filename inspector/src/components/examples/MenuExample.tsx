import { useState } from 'react';
import { Menu, Heading } from '@cypher-asi/zui';
import { Home, Settings, User, LogOut, FileText, Folder } from 'lucide-react';
import styles from './Example.module.css';

const menuItems = [
  { id: 'home', label: 'Home', icon: <Home size={14} /> },
  { id: 'files', label: 'Files', icon: <Folder size={14} /> },
  { id: 'documents', label: 'Documents', icon: <FileText size={14} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={14} /> },
  { id: 'profile', label: 'Profile', icon: <User size={14} /> },
  { id: 'logout', label: 'Log Out', icon: <LogOut size={14} />, disabled: false },
];

export function menuExample() {
  const [selected1, setSelected1] = useState('home');
  const [selected2, setSelected2] = useState('files');
  const [selected3, setSelected3] = useState('settings');
  const [selected4, setSelected4] = useState('documents');

  return (
    <div className={styles.exampleGrid}>
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
