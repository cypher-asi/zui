import { useState } from 'react';
import { Drawer, Button } from '@machina/zui';
import styles from './Example.module.css';

export function drawerExample() {
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);


  const closeDrawer = () => setActiveDrawer(null);

  return (
    <>
      <div className={styles.exampleGrid}>
        <div className={styles.exampleItem}>
          <h3 className={styles.exampleTitle}>Interactive Demo</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            Click a button to open a drawer from that side. Try resizing and minimizing!
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button 
              size="sm" 
              variant={activeDrawer === 'left' ? 'primary' : 'secondary'}
              onClick={() => setActiveDrawer(activeDrawer === 'left' ? null : 'left')}
              contentStates={['Left Drawer', 'Close Drawer']}
            >
              {activeDrawer === 'left' ? 'Close' : 'Left'} Drawer
            </Button>
            <Button 
              size="sm" 
              variant={activeDrawer === 'right' ? 'primary' : 'secondary'}
              onClick={() => setActiveDrawer(activeDrawer === 'right' ? null : 'right')}
              contentStates={['Right Drawer', 'Close Drawer']}
            >
              {activeDrawer === 'right' ? 'Close' : 'Right'} Drawer
            </Button>
            <Button 
              size="sm" 
              variant={activeDrawer === 'top' ? 'primary' : 'secondary'}
              onClick={() => setActiveDrawer(activeDrawer === 'top' ? null : 'top')}
              contentStates={['Top Drawer', 'Close Drawer']}
            >
              {activeDrawer === 'top' ? 'Close' : 'Top'} Drawer
            </Button>
            <Button 
              size="sm" 
              variant={activeDrawer === 'bottom' ? 'primary' : 'secondary'}
              onClick={() => setActiveDrawer(activeDrawer === 'bottom' ? null : 'bottom')}
              contentStates={['Bottom Drawer', 'Close Drawer']}
            >
              {activeDrawer === 'bottom' ? 'Close' : 'Bottom'} Drawer
            </Button>
          </div>
        </div>

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
              <strong>Persistent:</strong> Size is saved to localStorage
            </li>
            <li>
              <strong>Animated:</strong> Smooth open/close transitions
            </li>
          </ul>
        </div>
      </div>

      {/* Demo Container */}
      <div style={{
        position: 'relative',
        marginTop: '2rem',
        height: '500px',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--color-bg-secondary)',
        overflow: 'hidden',
        display: 'flex',
      }}>
        {/* Left Drawer */}
        <Drawer
          side="left"
          isOpen={activeDrawer === 'left'}
          onClose={closeDrawer}
          defaultSize={320}
          minSize={240}
          maxSize={480}
          storageKey="inspector-drawer-left"
        >
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>
              Left Drawer
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Slides in from the left. Common use cases:
            </p>
            <ul style={{ 
              color: 'var(--color-text-secondary)', 
              fontSize: '0.875rem',
              paddingLeft: '1.25rem',
              margin: '0 0 1rem 0',
            }}>
              <li>Navigation menus</li>
              <li>File explorers</li>
              <li>Filters and options</li>
            </ul>
            <Button size="sm" onClick={closeDrawer}>
              Close Drawer
            </Button>
          </div>
        </Drawer>

        {/* Top Drawer */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Drawer
            side="top"
            isOpen={activeDrawer === 'top'}
            onClose={closeDrawer}
            defaultSize={200}
            minSize={150}
            maxSize={350}
            storageKey="inspector-drawer-top"
          >
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>
                Top Drawer
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Slides down from the top. Good for notifications, search bars, or command palettes.
              </p>
              <Button size="sm" onClick={closeDrawer}>
                Close Drawer
              </Button>
            </div>
          </Drawer>

          {/* Center Content */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
          }}>
            <div>
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 1rem',
                borderRadius: '50%',
                backgroundColor: 'var(--color-bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
              }}>
                📦
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>
                {activeDrawer ? (
                  <>
                    {activeDrawer.charAt(0).toUpperCase() + activeDrawer.slice(1)} Drawer Active
                  </>
                ) : (
                  'Main Content Area'
                )}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
                {activeDrawer 
                  ? 'Try resizing the drawer or clicking the minimize button!' 
                  : 'Select a drawer from the buttons above to see it in action'}
              </p>
            </div>
          </div>

          {/* Bottom Drawer */}
          <Drawer
            side="bottom"
            isOpen={activeDrawer === 'bottom'}
            onClose={closeDrawer}
            defaultSize={200}
            minSize={150}
            maxSize={350}
            storageKey="inspector-drawer-bottom"
          >
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>
                Bottom Drawer
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Slides up from the bottom. Perfect for terminals, logs, or contextual information.
              </p>
              <Button size="sm" onClick={closeDrawer}>
                Close Drawer
              </Button>
            </div>
          </Drawer>
        </div>

        {/* Right Drawer */}
        <Drawer
          side="right"
          isOpen={activeDrawer === 'right'}
          onClose={closeDrawer}
          defaultSize={320}
          minSize={240}
          maxSize={480}
          storageKey="inspector-drawer-right"
        >
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>
              Right Drawer
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
              Slides in from the right. Common use cases:
            </p>
            <ul style={{ 
              color: 'var(--color-text-secondary)', 
              fontSize: '0.875rem',
              paddingLeft: '1.25rem',
              margin: '0 0 1rem 0',
            }}>
              <li>Details panels</li>
              <li>Property inspectors</li>
              <li>Chat or help sidebars</li>
            </ul>
            <Button size="sm" onClick={closeDrawer}>
              Close Drawer
            </Button>
          </div>
        </Drawer>
      </div>
    </>
  );
}
