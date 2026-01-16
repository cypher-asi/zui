// Source: zui/src/components/atomic/Button/Button.tsx
import { useState } from 'react';
import { Button, Heading } from '@machina/zui';
import styles from './Example.module.css';

export function buttonExample() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Primary Button</Heading>
        <Button variant="primary" onClick={() => alert('Primary clicked!')}>
          Primary Button
        </Button>
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Secondary Button</Heading>
        <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>
          Secondary Button
        </Button>
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Ghost Button</Heading>
        <Button variant="ghost" onClick={() => alert('Ghost clicked!')}>
          Ghost Button
        </Button>
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Danger Button</Heading>
        <Button variant="danger" onClick={() => alert('Danger clicked!')}>
          Delete
        </Button>
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Small Size</Heading>
        <Button size="sm">Small Button</Button>
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Disabled</Heading>
        <Button disabled>Disabled Button</Button>
      </div>

      <div className={styles.exampleItem}>
        <Heading level={3} className={styles.exampleTitle}>Stable Size (No Jerk)</Heading>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          Button maintains consistent size across text changes
        </p>
        <Button 
          size="sm"
          onClick={() => setIsLoading(!isLoading)}
          contentStates={['Save Changes', 'Saving...']}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
