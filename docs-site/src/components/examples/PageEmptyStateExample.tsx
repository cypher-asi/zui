import { PageEmptyState, Button } from '@machina/zui';
import { Plus } from 'lucide-react';
import styles from './Example.module.css';

export function pageemptystateExample() {
  return (
    <div className={styles.exampleItem}>
      <h3 className={styles.exampleTitle}>Empty State</h3>
      <div style={{ 
        border: '1px solid var(--border)', 
        borderRadius: '8px',
        overflow: 'hidden',
        minHeight: '300px'
      }}>
        <PageEmptyState
          icon={<Plus size={48} />}
          title="No items yet"
          message="Get started by creating your first item"
          action={
            <Button onClick={() => alert('Create clicked!')}>
              <Plus size={16} />
              Create Item
            </Button>
          }
        />
      </div>
    </div>
  );
}
