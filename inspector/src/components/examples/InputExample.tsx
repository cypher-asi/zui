// Source: zui/src/components/atomic/Input/Input.tsx
import { useState } from 'react';
import { Input } from '@machina/zui/components/atomic/Input/Input';
import styles from './Example.module.css';

export function inputExample() {
  const [value, setValue] = useState('');

  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Default Input</h3>
        <Input
          placeholder="Enter text..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Small Input</h3>
        <Input
          size="sm"
          placeholder="Small input..."
        />
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Monospace Input</h3>
        <Input
          mono
          placeholder="api-key-12345..."
        />
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Disabled Input</h3>
        <Input
          disabled
          placeholder="Disabled..."
        />
      </div>
    </div>
  );
}
