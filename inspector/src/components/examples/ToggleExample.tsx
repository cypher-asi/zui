// Source: zui/src/components/atomic/Toggle/Toggle.tsx
import { useState } from 'react';
import { Toggle } from '@machina/zui/components/atomic/Toggle/Toggle';
import styles from './Example.module.css';

export function toggleExample() {
  const [enabled, setEnabled] = useState(false);
  const [successEnabled, setSuccessEnabled] = useState(true);

  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Default Toggle</h3>
        <div className={styles.toggleContainer}>
          <Toggle
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          <span>Toggle is {enabled ? 'ON' : 'OFF'}</span>
        </div>
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Success Variant</h3>
        <div className={styles.toggleContainer}>
          <Toggle
            variant="success"
            checked={successEnabled}
            onChange={(e) => setSuccessEnabled(e.target.checked)}
          />
          <span>Success variant</span>
        </div>
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Small Toggle</h3>
        <div className={styles.toggleContainer}>
          <Toggle size="sm" defaultChecked />
          <span>Small size</span>
        </div>
      </div>
    </div>
  );
}
