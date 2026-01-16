// Source: zui/src/components/atomic/Spinner/Spinner.tsx
import { Spinner } from '@machina/zui/components/atomic/Spinner/Spinner';
import styles from './Example.module.css';

export function spinnerExample() {
  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Spinner Sizes</h3>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Spinner size="sm" />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Small</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Spinner size="md" />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Medium</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <Spinner size="lg" />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Large</span>
          </div>
        </div>
      </div>
    </div>
  );
}
