// Source: zui/src/components/composite/Sidebar/Sidebar.tsx
import { useState } from 'react';
import { Sidebar, SidebarSection } from '@machina/zui/components/composite/Sidebar/Sidebar';
import { Home, Settings, Users } from 'lucide-react';
import styles from './Example.module.css';

export function sidebarExample() {
  const [activeItem, setActiveItem] = useState('home');

  const sections: SidebarSection[] = [
    {
      title: 'Main',
      items: [
        { id: 'home', label: 'Home', icon: <Home size={16} /> },
        { id: 'users', label: 'Users', icon: <Users size={16} /> },
      ],
    },
    {
      title: 'Settings',
      items: [
        { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
      ],
    },
  ];

  return (
    <div className={styles.exampleItem}>
      <h3 className={styles.exampleTitle}>Sidebar Navigation</h3>
      <div style={{ 
        border: '1px solid var(--border)', 
        borderRadius: '8px',
        overflow: 'hidden',
        height: '400px',
        display: 'flex'
      }}>
        <Sidebar
          sections={sections}
          activeItemId={activeItem}
          onItemClick={setActiveItem}
          header={
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>App Name</strong>
            </div>
          }
        />
        <div style={{ 
          flex: 1, 
          padding: '2rem', 
          background: 'var(--bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <p style={{ color: 'var(--text-primary)' }}>
            Content for: <strong>{activeItem}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
