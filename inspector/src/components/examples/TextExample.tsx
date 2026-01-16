import { Text } from '@cypher-asi/zui';
import styles from './Example.module.css';

export function textExample() {
  return (
    <div className={styles.exampleGroup}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Text Sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Text size="xs">Extra small text - perfect for captions and metadata</Text>
          <Text size="sm">Small text - good for secondary information</Text>
          <Text size="md">Medium text - the default size for body content</Text>
          <Text size="lg">Large text - for emphasis or introductory content</Text>
          <Text size="xl">Extra large text - for important messages or headers</Text>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Font Weights</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Text weight="light">Light weight text</Text>
          <Text weight="normal">Normal weight text</Text>
          <Text weight="medium">Medium weight text</Text>
          <Text weight="semibold">Semibold weight text</Text>
          <Text weight="bold">Bold weight text</Text>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Text Variants</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Text>Default text</Text>
          <Text variant="secondary">Secondary text</Text>
          <Text variant="muted">Muted text</Text>
        </div>
      </div>
    </div>
  );
}
