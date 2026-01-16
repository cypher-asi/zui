// Source: zui/src/components/atomic/Toggle/Toggle.tsx
import { useState } from 'react';
import { Toggle, Heading, Text } from '@cypher-asi/zui';
import styles from './Example.module.css';

export function toggleExample() {
  const [enabled, setEnabled] = useState(false);
  const [successEnabled, setSuccessEnabled] = useState(true);

  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Default Toggle</Heading>
        <div className={styles.toggleContainer}>
          <Toggle
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          <Text variant="secondary" as="span">Toggle is {enabled ? 'ON' : 'OFF'}</Text>
        </div>
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Success Variant</Heading>
        <div className={styles.toggleContainer}>
          <Toggle
            variant="success"
            checked={successEnabled}
            onChange={(e) => setSuccessEnabled(e.target.checked)}
          />
          <Text variant="secondary" as="span">Success variant</Text>
        </div>
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Small Toggle</Heading>
        <div className={styles.toggleContainer}>
          <Toggle size="sm" defaultChecked />
          <Text variant="secondary" as="span">Small size</Text>
        </div>
      </div>
    </div>
  );
}
