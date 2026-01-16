// Source: zui/src/components/composite/Card/Card.tsx
import { Card, Heading, Text, Badge } from '@cypher-asi/zui';
import styles from './Example.module.css';

export function cardExample() {
  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Basic Card</Heading>
        <Card>
          <Heading level={3} style={{ marginBottom: '0.5rem' }}>
            Card Title
          </Heading>
          <Text variant="secondary">
            This is a card component with some content inside.
          </Text>
        </Card>
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Card with Multiple Elements</Heading>
        <Card>
          <Heading level={3} style={{ marginBottom: '0.5rem' }}>
            Complex Card
          </Heading>
          <Text variant="secondary" style={{ marginBottom: '1rem' }}>
            Cards can contain any content you need.
          </Text>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Badge variant="default">Tag 1</Badge>
            <Badge variant="default">Tag 2</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}
