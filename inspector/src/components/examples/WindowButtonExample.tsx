// Source: zui/src/components/atomic/WindowButton/WindowButton.tsx
import { WindowButton, Heading } from '@cypher-asi/zui';
import styles from './Example.module.css';

export function windowbuttonExample() {
  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Minimize</Heading>
        <WindowButton action="minimize" onClick={() => alert('Minimize clicked!')} />
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Maximize</Heading>
        <WindowButton action="maximize" onClick={() => alert('Maximize clicked!')} />
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Close</Heading>
        <WindowButton action="close" onClick={() => alert('Close clicked!')} />
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Extra Small (16px)</Heading>
        <div style={{ display: 'flex', gap: '4px' }}>
          <WindowButton action="minimize" size="xs" />
          <WindowButton action="maximize" size="xs" />
          <WindowButton action="close" size="xs" />
        </div>
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Small (22px)</Heading>
        <div style={{ display: 'flex', gap: '4px' }}>
          <WindowButton action="minimize" size="sm" />
          <WindowButton action="maximize" size="sm" />
          <WindowButton action="close" size="sm" />
        </div>
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Compact Title Bar</Heading>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2px 8px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          minWidth: '280px',
          height: '20px'
        }}>
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Window Title
          </span>
          <div style={{ display: 'flex', gap: '2px' }}>
            <WindowButton action="minimize" size="xs" />
            <WindowButton action="maximize" size="xs" />
            <WindowButton action="close" size="xs" />
          </div>
        </div>
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Standard Title Bar</Heading>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          minWidth: '280px'
        }}>
          <span style={{ color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)' }}>
            Window Title
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <WindowButton action="minimize" />
            <WindowButton action="maximize" />
            <WindowButton action="close" />
          </div>
        </div>
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Disabled</Heading>
        <div style={{ display: 'flex', gap: '4px' }}>
          <WindowButton action="minimize" disabled />
          <WindowButton action="maximize" disabled />
          <WindowButton action="close" disabled />
        </div>
      </div>
    </div>
  );
}
