import { useState } from 'react';
import { PageList, ItemCard } from '@machina/zui';
import styles from './Example.module.css';

export function pagelistExample() {
  const [searchQuery, setSearchQuery] = useState('');

  const items = [
    { id: '1', name: 'Item One', description: 'First item description' },
    { id: '2', name: 'Item Two', description: 'Second item description' },
    { id: '3', name: 'Item Three', description: 'Third item description' },
  ];

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.exampleItem}>
      <h3 className={styles.exampleTitle}>Page List with Search</h3>
      <div style={{ 
        border: '1px solid var(--border)', 
        borderRadius: '8px',
        overflow: 'hidden',
        maxHeight: '500px'
      }}>
        <PageList
          items={filteredItems}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search items..."
          emptyMessage="No items found"
          renderItem={(item) => (
            <ItemCard
              key={item.id}
              title={item.name}
              onClick={() => alert(`Clicked ${item.name}`)}
            >
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {item.description}
              </p>
            </ItemCard>
          )}
        />
      </div>
    </div>
  );
}
