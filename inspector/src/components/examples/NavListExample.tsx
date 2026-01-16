import { NavList, NavItem } from '@machina/zui';
import { useState } from 'react';
import styles from './Example.module.css';

export function navlistExample() {
  const [activeId, setActiveId] = useState('dashboard');

  return (
    <div className={styles.exampleGroup}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Basic Navigation List</h3>
        <div style={{ maxWidth: '300px', background: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <NavList>
            <NavItem 
              icon="home" 
              label="Dashboard" 
              active={activeId === 'dashboard'}
              onClick={() => setActiveId('dashboard')}
            />
            <NavItem 
              icon="users" 
              label="Users"
              active={activeId === 'users'}
              onClick={() => setActiveId('users')}
            />
            <NavItem 
              icon="settings" 
              label="Settings"
              active={activeId === 'settings'}
              onClick={() => setActiveId('settings')}
            />
            <NavItem 
              icon="file" 
              label="Documents"
              active={activeId === 'documents'}
              onClick={() => setActiveId('documents')}
            />
          </NavList>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>With Multiple Sections</h3>
        <div style={{ maxWidth: '300px', background: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <NavList>
            <NavItem 
              icon="activity" 
              label="Activity" 
              active={activeId === 'activity'}
              onClick={() => setActiveId('activity')}
            />
            <NavItem 
              icon="bell" 
              label="Notifications"
              active={activeId === 'notifications'}
              onClick={() => setActiveId('notifications')}
            />
            <NavItem 
              icon="mail" 
              label="Messages"
              active={activeId === 'messages'}
              onClick={() => setActiveId('messages')}
            />
          </NavList>
        </div>
      </div>
    </div>
  );
}
