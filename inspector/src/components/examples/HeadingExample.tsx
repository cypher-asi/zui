import { Heading } from '@machina/zui';
import styles from './Example.module.css';

export function headingExample() {
  return (
    <div className={styles.exampleGroup}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Heading Levels</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Heading level={1}>Heading Level 1</Heading>
          <Heading level={2}>Heading Level 2</Heading>
          <Heading level={3}>Heading Level 3</Heading>
          <Heading level={4}>Heading Level 4</Heading>
          <Heading level={5}>Heading Level 5</Heading>
          <Heading level={6}>Heading Level 6</Heading>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Usage Examples</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <Heading level={1}>Page Title</Heading>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
              Main page heading - use sparingly, typically once per page
            </p>
          </div>
          <div>
            <Heading level={2}>Section Heading</Heading>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
              For major sections within a page
            </p>
          </div>
          <div>
            <Heading level={3}>Subsection Heading</Heading>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
              For subsections and content groups
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
