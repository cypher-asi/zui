import { CollapsibleGroup } from '@machina/zui';
import styles from './Example.module.css';

export function collapsiblegroupExample() {
  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Collapsible Sections</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <CollapsibleGroup title="Basic Information" defaultOpen={true}>
            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>
              This section contains basic information and is open by default.
            </p>
          </CollapsibleGroup>

          <CollapsibleGroup title="Advanced Options">
            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>
              This section contains advanced options and is closed by default.
            </p>
          </CollapsibleGroup>
        </div>
      </div>
    </div>
  );
}
