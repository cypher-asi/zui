import { useState } from 'react';
import { RefreshButton } from '@machina/zui';
import styles from './Example.module.css';

export function refreshbuttonExample() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Refreshed!');
    }, 2000);
  };

  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Refresh Button</h3>
        <RefreshButton
          onClick={handleRefresh}
          isLoading={isLoading}
        />
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          {isLoading ? 'Refreshing...' : 'Click to refresh (simulates 2s delay)'}
        </p>
      </div>
    </div>
  );
}
