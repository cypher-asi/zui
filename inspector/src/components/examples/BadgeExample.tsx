// Source: zui/src/components/atomic/Badge/Badge.tsx
import { Badge, Heading, Text } from '@machina/zui';
import styles from './Example.module.css';

export function badgeExample() {
  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Badge Variants</Heading>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="pending">Pending</Badge>
        </div>
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>In Context</Heading>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Text as="span">Status:</Text>
          <Badge variant="success">Active</Badge>
        </div>
      </div>
    </div>
  );
}
