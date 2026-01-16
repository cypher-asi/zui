import { Badge } from '@machina/zui';
import styles from './Example.module.css';

export function badgeExample() {
  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Badge Variants</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="pending">Pending</Badge>
        </div>
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>In Context</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: 'var(--text-primary)' }}>Status:</span>
          <Badge variant="success">Active</Badge>
        </div>
      </div>
    </div>
  );
}
