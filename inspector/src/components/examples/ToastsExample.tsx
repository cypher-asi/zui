// Source: zui/src/components/composite/Toasts/Toasts.tsx
import { useState } from 'react';
import { Toasts } from '@machina/zui/components/composite/Toasts/Toasts';
import { Button } from '@machina/zui/components/atomic/Button/Button';
import styles from './Example.module.css';

export function toastsExample() {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className={styles.exampleItem}>
      <h3 className={styles.exampleTitle}>Toast Notifications</h3>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button
          size="sm"
          onClick={() => addToast('success', 'Operation completed successfully!')}
        >
          Success Toast
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => addToast('error', 'An error occurred!')}
        >
          Error Toast
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => addToast('info', 'Here is some information.')}
        >
          Info Toast
        </Button>
      </div>
      <Toasts toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
