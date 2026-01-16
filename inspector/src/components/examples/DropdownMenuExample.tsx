// Source: zui/src/components/composite/DropdownMenu/DropdownMenu.tsx
import { DropdownMenu } from '@machina/zui/components/composite/DropdownMenu/DropdownMenu';
import { Button } from '@machina/zui/components/atomic/Button/Button';
import { MoreVertical, Edit, Trash2, Copy } from 'lucide-react';
import styles from './Example.module.css';

export function dropdownmenuExample() {
  const items = [
    { 
      label: 'Edit', 
      onClick: () => alert('Edit clicked!'),
    },
    { 
      label: 'Duplicate', 
      onClick: () => alert('Duplicate clicked!'),
    },
    { 
      label: 'Delete', 
      onClick: () => alert('Delete clicked!'),
      variant: 'danger' as const,
    },
  ];

  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Dropdown Menu</h3>
        <DropdownMenu
          trigger={
            <Button variant="secondary" iconOnly>
              <MoreVertical size={16} />
            </Button>
          }
          items={items}
        />
      </div>
    </div>
  );
}
