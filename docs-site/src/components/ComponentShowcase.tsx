import { ComponentInfo } from '../data/components';
import { CodeBlock } from './CodeBlock';
import * as Examples from './examples';
import styles from './ComponentShowcase.module.css';

interface ComponentShowcaseProps {
  component: ComponentInfo;
}

export function ComponentShowcase({ component }: ComponentShowcaseProps) {
  // Get the example component dynamically
  const ExampleComponent = (Examples as any)[`${component.id.replace(/-/g, '')}Example`];

  return (
    <div className={styles.showcase}>
      <header className={styles.header}>
        <h1 className={styles.title}>{component.name}</h1>
        <p className={styles.category}>{component.category}</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Description</h2>
        <p className={styles.description}>{component.description}</p>
      </section>

      {ExampleComponent && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Examples</h2>
          <div className={styles.exampleContainer}>
            <ExampleComponent />
          </div>
        </section>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Source Code</h2>
        <p className={styles.codeNote}>
          Below is a reference implementation. View the full source in the{' '}
          <code style={{ 
            background: 'var(--bg-tertiary)', 
            padding: '0.125rem 0.375rem',
            borderRadius: '3px',
            fontSize: '0.875em'
          }}>
            zui/src/components
          </code>{' '}
          directory.
        </p>
        <CodeBlock componentId={component.id} />
      </section>
    </div>
  );
}
