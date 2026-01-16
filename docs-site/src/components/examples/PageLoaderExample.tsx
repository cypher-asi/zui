import { PageLoader } from '@machina/zui';
import styles from './Example.module.css';

export function pageloaderExample() {
  return (
    <div className={styles.exampleItem}>
      <h3 className={styles.exampleTitle}>Page Loader</h3>
      <div style={{ 
        border: '1px solid var(--border)', 
        borderRadius: '8px',
        overflow: 'hidden',
        height: '300px',
        position: 'relative'
      }}>
        <PageLoader />
      </div>
    </div>
  );
}
