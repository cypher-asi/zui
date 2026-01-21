import type { CSSProperties } from 'react';
import { useState } from 'react';
import { Heading, Panel, Text } from '@cypher-asi/zui';
import styles from './Example.module.css';

export function panelExample() {
  const [focused, setFocused] = useState(false);

  const demoContentStyle: CSSProperties = {
    padding: '1.5rem',
    minHeight: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div className={styles.exampleGroup}>
      <div className={styles.section}>
        <Heading level={3} className={styles.sectionTitle}>Default: Glass + Future Border</Heading>
        <Text variant="secondary" size="sm" className={styles.exampleDescription}>
          Matches the Menu component's glass variant with future border style
        </Text>
        <div style={{ 
          position: 'relative', 
          padding: '2rem',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          borderRadius: '12px',
        }}>
          <Panel>
            <div style={demoContentStyle}>
              <Text>Glass background with future border corners</Text>
            </div>
          </Panel>
        </div>
      </div>

      <div className={styles.section}>
        <Heading level={3} className={styles.sectionTitle}>Background Variants</Heading>
        <Text variant="secondary" size="sm" className={styles.exampleDescription}>
          Same variants as Menu: solid, transparent, and glass
        </Text>
        <div style={{ 
          position: 'relative', 
          padding: '2rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
        }}>
          <div className={styles.exampleGrid}>
            <div className={styles.exampleItem}>
              <span className={styles.variantLabel}>variant="solid"</span>
              <Panel variant="solid" border="solid">
                <div style={demoContentStyle}>
                  <Text>Solid background</Text>
                </div>
              </Panel>
            </div>

            <div className={styles.exampleItem}>
              <span className={styles.variantLabel}>variant="glass"</span>
              <Panel variant="glass" border="solid">
                <div style={demoContentStyle}>
                  <Text>Glass background</Text>
                </div>
              </Panel>
            </div>

            <div className={styles.exampleItem}>
              <span className={styles.variantLabel}>variant="transparent"</span>
              <Panel variant="transparent" border="solid">
                <div style={demoContentStyle}>
                  <Text>Transparent background</Text>
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <Heading level={3} className={styles.sectionTitle}>Border Types</Heading>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleItem}>
            <Text variant="secondary" size="sm">border="none"</Text>
            <Panel variant="solid" border="none">
              <div style={demoContentStyle}>
                <Text>No border</Text>
              </div>
            </Panel>
          </div>

          <div className={styles.exampleItem}>
            <Text variant="secondary" size="sm">border="solid"</Text>
            <Panel variant="solid" border="solid">
              <div style={demoContentStyle}>
                <Text>Solid border</Text>
              </div>
            </Panel>
          </div>

          <div className={styles.exampleItem}>
            <Text variant="secondary" size="sm">border="future"</Text>
            <Panel variant="solid" border="future">
              <div style={demoContentStyle}>
                <Text>Future border with corner accents</Text>
              </div>
            </Panel>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <Heading level={3} className={styles.sectionTitle}>Hover States (Open / Closed)</Heading>
        <Text variant="secondary" size="sm" className={styles.exampleDescription}>
          Hover over panels to see different hover backgrounds. Click to toggle open/closed state.
          Matches Menu component hover behavior.
        </Text>
        <div className={styles.exampleGrid}>
          <div className={styles.exampleItem}>
            <Text variant="secondary" size="sm">Closed state hover</Text>
            <Panel
              hoverable
              open={false}
            >
              <div style={demoContentStyle}>
                <Text>Closed - hover: rgba(255, 255, 255, 0.05)</Text>
              </div>
            </Panel>
          </div>

          <div className={styles.exampleItem}>
            <Text variant="secondary" size="sm">Open state hover</Text>
            <Panel
              hoverable
              open={true}
            >
              <div style={demoContentStyle}>
                <Text>Open - hover: rgba(0, 0, 0, 0.7)</Text>
              </div>
            </Panel>
          </div>

          <div className={styles.exampleItem}>
            <Text variant="secondary" size="sm">Interactive toggle (click)</Text>
            <Panel
              hoverable
              open={focused}
              onPointerDown={() => setFocused(!focused)}
            >
              <div style={demoContentStyle}>
                <Text>{focused ? 'Open (click to close)' : 'Closed (click to open)'}</Text>
              </div>
            </Panel>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <Heading level={3} className={styles.sectionTitle}>Focused State</Heading>
        <Text variant="secondary" size="sm" className={styles.exampleDescription}>
          Focus ring uses accent color glow
        </Text>
        <div style={{ maxWidth: '400px' }}>
          <Panel focused={true}>
            <div style={demoContentStyle}>
              <Text>Focused panel with accent glow</Text>
            </div>
          </Panel>
        </div>
      </div>

      <div className={styles.section}>
        <Heading level={3} className={styles.sectionTitle}>Window-like Usage</Heading>
        <Panel style={{ maxWidth: '500px' }}>
          <div style={{ 
            padding: '0.5rem 1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <Text size="sm" weight="medium">Window Title</Text>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#fbbf24' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#34d399' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f87171' }} />
            </div>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <Text variant="secondary">
              Panels serve as the base for windows, dialogs, dropdowns, and menus. 
              The glass + future border combination provides a cohesive look.
            </Text>
          </div>
        </Panel>
      </div>
    </div>
  );
}
