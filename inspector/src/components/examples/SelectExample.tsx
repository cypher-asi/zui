// Source: zui/src/components/atomic/Select/Select.tsx
import { Select } from '@machina/zui/components/atomic/Select/Select';
import styles from './Example.module.css';

export function selectExample() {
  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Default Select</h3>
        <Select>
          <option value="">Select an option...</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </Select>
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Small Select</h3>
        <Select size="sm">
          <option value="">Small select...</option>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
        </Select>
      </div>
    </div>
  );
}
