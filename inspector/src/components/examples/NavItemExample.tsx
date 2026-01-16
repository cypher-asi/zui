// Source: zui/src/components/atomic/NavItem/NavItem.tsx
import { useState } from 'react';
import { NavItem } from '@cypher-asi/zui';
import { Home, Settings, Users, FileText, Database } from 'lucide-react';
import styles from './Example.module.css';

export function navitemExample() {
  const [activeId, setActiveId] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={16} /> },
    { id: 'users', label: 'Users', icon: <Users size={16} /> },
    { id: 'database', label: 'Database', icon: <Database size={16} /> },
    { id: 'documents', label: 'Documents', icon: <FileText size={16} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
  ];

  return (
    <div className={styles.exampleItem}>
      <h3 className={styles.exampleTitle}>With Icons</h3>
      <div style={{ 
        border: '1px solid var(--border)', 
        borderRadius: '8px',
        padding: '0.5rem',
        background: 'var(--bg-primary)',
        width: '240px'
      }}>
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeId === item.id}
            onClick={() => setActiveId(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function navitemWithoutIconExample() {
  const [activeId, setActiveId] = useState('overview');

  const items = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'configuration', label: 'Configuration' },
    { id: 'logs', label: 'Logs' },
  ];

  return (
    <div className={styles.exampleItem}>
      <h3 className={styles.exampleTitle}>Without Icons</h3>
      <div style={{ 
        border: '1px solid var(--border)', 
        borderRadius: '8px',
        padding: '0.5rem',
        background: 'var(--bg-primary)',
        width: '240px'
      }}>
        {items.map((item) => (
          <NavItem
            key={item.id}
            label={item.label}
            active={activeId === item.id}
            onClick={() => setActiveId(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function navitemStatesExample() {
  return (
    <div className={styles.exampleItem}>
      <h3 className={styles.exampleTitle}>States</h3>
      <div style={{ 
        border: '1px solid var(--border)', 
        borderRadius: '8px',
        padding: '0.5rem',
        background: 'var(--bg-primary)',
        width: '240px'
      }}>
        <NavItem
          icon={<Home size={16} />}
          label="Default State"
          onClick={() => {}}
        />
        <NavItem
          icon={<Settings size={16} />}
          label="Active State"
          active
          onClick={() => {}}
        />
        <NavItem
          icon={<Users size={16} />}
          label="Hover Me"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
