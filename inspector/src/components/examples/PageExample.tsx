// Source: zui/src/components/composite/Page/Page.tsx
import { Page } from '@cypher-asi/zui/components/composite/Page/Page';
import { Button } from '@cypher-asi/zui/components/atomic/Button/Button';
import { Plus } from 'lucide-react';
import styles from './Example.module.css';

export function pageExample() {
  return (
    <div className={styles.exampleItem}>
      <h3 className={styles.exampleTitle}>Page Layout</h3>
      <div style={{ 
        border: '1px solid var(--border)', 
        borderRadius: '8px', 
        overflow: 'hidden',
        maxHeight: '400px'
      }}>
        <Page
          title="Page Title"
          actions={
            <Button size="sm">
              <Plus size={16} />
              Add New
            </Button>
          }
        >
          <p style={{ color: 'var(--text-secondary)' }}>
            This is the page content area. It provides consistent layout and spacing.
          </p>
        </Page>
      </div>
    </div>
  );
}
