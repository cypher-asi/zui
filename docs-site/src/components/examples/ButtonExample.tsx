import { Button } from '@machina/zui';
import styles from './Example.module.css';

export function buttonExample() {
  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Primary Button</h3>
        <Button variant="primary" onClick={() => alert('Primary clicked!')}>
          Primary Button
        </Button>
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Secondary Button</h3>
        <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>
          Secondary Button
        </Button>
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Ghost Button</h3>
        <Button variant="ghost" onClick={() => alert('Ghost clicked!')}>
          Ghost Button
        </Button>
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Danger Button</h3>
        <Button variant="danger" onClick={() => alert('Danger clicked!')}>
          Delete
        </Button>
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Small Size</h3>
        <Button size="sm">Small Button</Button>
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Disabled</h3>
        <Button disabled>Disabled Button</Button>
      </div>
    </div>
  );
}
