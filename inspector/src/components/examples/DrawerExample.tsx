import { useState } from 'react';
import { Drawer } from '@cypher-asi/zui';
import styles from './Example.module.css';

export function drawerExample() {
  const [leftToggleOpen, setLeftToggleOpen] = useState(false);
  const [rightToggleOpen, setRightToggleOpen] = useState(false);
  const [topToggleOpen, setTopToggleOpen] = useState(false);
  const [bottomToggleOpen, setBottomToggleOpen] = useState(false);

  return (
    <>
      <div className={styles.exampleGrid}>
        <div className={styles.exampleItem}>
          <h3 className={styles.exampleTitle}>Features</h3>
          <ul style={{ 
            color: 'var(--color-text-secondary)', 
            fontSize: '0.875rem',
            paddingLeft: '1.25rem',
            margin: 0,
          }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Resizable:</strong> Drag the resize handle to adjust size
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Minimizable:</strong> Click chevron in resize handle (left/right only)
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Toggle Mode:</strong> Use showToggle for always-visible open/close chevron
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Persistent:</strong> Size is saved to localStorage
            </li>
            <li>
              <strong>Animated:</strong> Smooth open/close transitions
            </li>
          </ul>
        </div>
      </div>

      {/* Toggle Mode Demo */}
      <div style={{ marginTop: '2rem' }}>
        <h3 className={styles.exampleTitle}>Toggle Mode (showToggle)</h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', fontSize: '0.875rem' }}>
          With <code style={{ background: 'var(--color-bg-tertiary)', padding: '2px 6px', borderRadius: '4px' }}>showToggle=true</code>, 
          the drawer shows an always-visible chevron button at a consistent position. The chevron stays in the same location whether open or closed.
        </p>
      </div>
      
      {/* Left and Right Toggle Drawers */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div style={{
          position: 'relative',
          flex: 1,
          height: '250px',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--color-bg-secondary)',
          overflow: 'hidden',
          display: 'flex',
        }}>
          <Drawer
            side="left"
            isOpen={leftToggleOpen}
            onClose={() => setLeftToggleOpen(false)}
            onOpen={() => setLeftToggleOpen(true)}
            title="Explorer"
            defaultSize={200}
            minSize={150}
            maxSize={300}
            storageKey="inspector-drawer-toggle-left"
            showToggle={true}
          >
            <div style={{ padding: '1rem' }}>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
                Title on left, chevron on right.
              </p>
            </div>
          </Drawer>
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '1rem',
          }}>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0, textAlign: 'center' }}>
              Left drawer toggle
            </p>
          </div>
        </div>
        
        <div style={{
          position: 'relative',
          flex: 1,
          height: '250px',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--color-bg-secondary)',
          overflow: 'hidden',
          display: 'flex',
        }}>
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '1rem',
          }}>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0, textAlign: 'center' }}>
              Right drawer toggle
            </p>
          </div>
          <Drawer
            side="right"
            isOpen={rightToggleOpen}
            onClose={() => setRightToggleOpen(false)}
            onOpen={() => setRightToggleOpen(true)}
            title="Properties"
            defaultSize={200}
            minSize={150}
            maxSize={300}
            storageKey="inspector-drawer-toggle-right"
            showToggle={true}
          >
            <div style={{ padding: '1rem' }}>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
                Title on left, chevron on right.
              </p>
            </div>
          </Drawer>
        </div>
      </div>

      {/* Top and Bottom Toggle Drawers */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div style={{
          position: 'relative',
          flex: 1,
          height: '250px',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--color-bg-secondary)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Drawer
            side="top"
            isOpen={topToggleOpen}
            onClose={() => setTopToggleOpen(false)}
            onOpen={() => setTopToggleOpen(true)}
            title="Search"
            defaultSize={100}
            minSize={80}
            maxSize={180}
            storageKey="inspector-drawer-toggle-top"
            showToggle={true}
          >
            <div style={{ padding: '1rem' }}>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
                Top drawer with toggle.
              </p>
            </div>
          </Drawer>
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '1rem',
          }}>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0, textAlign: 'center' }}>
              Top drawer toggle
            </p>
          </div>
        </div>
        
        <div style={{
          position: 'relative',
          flex: 1,
          height: '250px',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--color-bg-secondary)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '1rem',
          }}>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0, textAlign: 'center' }}>
              Bottom drawer toggle
            </p>
          </div>
          <Drawer
            side="bottom"
            isOpen={bottomToggleOpen}
            onClose={() => setBottomToggleOpen(false)}
            onOpen={() => setBottomToggleOpen(true)}
            title="Terminal"
            defaultSize={100}
            minSize={80}
            maxSize={180}
            storageKey="inspector-drawer-toggle-bottom"
            showToggle={true}
          >
            <div style={{ padding: '1rem' }}>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
                Bottom drawer with toggle.
              </p>
            </div>
          </Drawer>
        </div>
      </div>

    </>
  );
}
