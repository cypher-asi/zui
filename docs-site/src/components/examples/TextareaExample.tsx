import { Textarea } from '@machina/zui';
import styles from './Example.module.css';

export function textareaExample() {
  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Default Textarea</h3>
        <Textarea
          placeholder="Enter description..."
          rows={4}
        />
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Small Textarea</h3>
        <Textarea
          size="sm"
          placeholder="Small textarea..."
          rows={3}
        />
      </div>
    </div>
  );
}
