import { PageHeader, Button } from '@machina/zui';
import { Plus } from 'lucide-react';
import styles from './Example.module.css';

export function pageheaderExample() {
  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Simple Header</h3>
        <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
          <PageHeader title="Simple Page" />
        </div>
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Header with Actions</h3>
        <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
          <PageHeader
            title="Page with Actions"
            actions={
              <Button size="sm">
                <Plus size={16} />
                Add New
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
