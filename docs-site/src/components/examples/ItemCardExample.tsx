import { ItemCard, ItemCardMeta, Button, Badge } from '@machina/zui';
import { MoreVertical } from 'lucide-react';
import styles from './Example.module.css';

export function itemcardExample() {
  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Basic Item Card</h3>
        <ItemCard
          title="Example Item"
          onClick={() => alert('Card clicked!')}
        >
          <ItemCardMeta label="Status">
            <Badge variant="success">Active</Badge>
          </ItemCardMeta>
          <ItemCardMeta label="Created">2024-01-15</ItemCardMeta>
        </ItemCard>
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Card with Actions</h3>
        <ItemCard
          title="Item with Menu"
          onClick={() => alert('Card clicked!')}
          actions={
            <Button variant="ghost" iconOnly size="sm">
              <MoreVertical size={16} />
            </Button>
          }
        >
          <ItemCardMeta label="Type">
            <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
              service
            </span>
          </ItemCardMeta>
          <ItemCardMeta label="Region">us-east-1</ItemCardMeta>
        </ItemCard>
      </div>
    </div>
  );
}
