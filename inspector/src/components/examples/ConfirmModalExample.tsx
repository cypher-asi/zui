// Source: zui/src/components/composite/ConfirmModal/ConfirmModal.tsx
import { useState } from 'react';
import { ConfirmModal } from '@machina/zui/components/composite/ConfirmModal/ConfirmModal';
import { Button } from '@machina/zui/components/atomic/Button/Button';
import styles from './Example.module.css';

export function confirmmodalExample() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSaveOpen, setIsSaveOpen] = useState(false);

  const handleDelete = () => {
    alert('Item deleted!');
    setIsDeleteOpen(false);
  };

  const handleSave = () => {
    alert('Changes saved!');
    setIsSaveOpen(false);
  };

  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Confirm Actions</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button variant="danger" size="sm" onClick={() => setIsDeleteOpen(true)}>
            Delete Item
          </Button>
          <Button size="sm" onClick={() => setIsSaveOpen(true)}>
            Save Changes
          </Button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        confirmVariant="danger"
      />

      <ConfirmModal
        isOpen={isSaveOpen}
        onClose={() => setIsSaveOpen(false)}
        onConfirm={handleSave}
        title="Save Changes"
        message="Do you want to save your changes?"
        confirmText="Save"
      />
    </div>
  );
}
