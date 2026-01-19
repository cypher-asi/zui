// Source: zui/src/components/composite/Sidebar/Sidebar.tsx
import { useState } from 'react';
import { Sidebar, NavList, NavItem, Toggle, Button } from '@cypher-asi/zui';
import { Home, Settings, Users, FileText, Database } from 'lucide-react';
import styles from './Example.module.css';

export function sidebarExample() {
  const [activeItem, setActiveItem] = useState('home');
  const [isResizable, setIsResizable] = useState(true);

  return (
    <div className={styles.exampleItem}>
      <h3 className={styles.exampleTitle}>Sidebar - Resizable Navigation</h3>
      
      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'var(--color-bg-secondary)', borderRadius: '8px' }}>
        <Toggle
          checked={isResizable}
          onChange={(e) => setIsResizable(e.target.checked)}
          label="Enable Resizable"
        />
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
          {isResizable 
            ? 'Hover over the right edge of the sidebar and drag to resize. Width is persisted to localStorage.'
            : 'Sidebar has a fixed width when resizable is disabled.'}
        </p>
      </div>

      <div style={{ 
        border: '1px solid var(--color-border)', 
        borderRadius: '8px',
        overflow: 'hidden',
        height: '500px',
        display: 'flex'
      }}>
        <Sidebar
          resizable={isResizable}
          minWidth={180}
          maxWidth={450}
          defaultWidth={240}
          storageKey="zui-inspector-sidebar-width"
          resizePosition="right"
          onWidthChange={(width) => console.log('Sidebar width changed to:', width)}
          header={
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
              <strong style={{ color: 'var(--color-text)' }}>App Navigation</strong>
            </div>
          }
          footer={
            <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)' }}>
              <Button variant="ghost" size="small" style={{ width: '100%' }}>
                <Settings size={16} style={{ marginRight: '0.5rem' }} />
                Settings
              </Button>
            </div>
          }
        >
          <div style={{ padding: '0.5rem' }}>
            <div style={{ 
              padding: '0.5rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Main
            </div>
            <NavList>
              <NavItem
                icon={<Home size={16} />}
                label="Home"
                active={activeItem === 'home'}
                onClick={() => setActiveItem('home')}
              />
              <NavItem
                icon={<Users size={16} />}
                label="Users"
                active={activeItem === 'users'}
                onClick={() => setActiveItem('users')}
              />
              <NavItem
                icon={<FileText size={16} />}
                label="Documents"
                active={activeItem === 'documents'}
                onClick={() => setActiveItem('documents')}
              />
            </NavList>

            <div style={{ 
              padding: '0.5rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginTop: '1rem'
            }}>
              Data
            </div>
            <NavList>
              <NavItem
                icon={<Database size={16} />}
                label="Database"
                active={activeItem === 'database'}
                onClick={() => setActiveItem('database')}
              />
            </NavList>
          </div>
        </Sidebar>

        <div style={{ 
          flex: 1, 
          padding: '2rem', 
          background: 'var(--color-bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <p style={{ color: 'var(--color-text)', fontSize: '1.25rem' }}>
            Content for: <strong>{activeItem}</strong>
          </p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', textAlign: 'center', maxWidth: '400px' }}>
            The sidebar supports header, content, and footer sections. 
            When resizable is enabled, you can drag the edge to adjust the width.
            The width persists across page reloads using localStorage.
          </p>
        </div>
      </div>
    </div>
  );
}
