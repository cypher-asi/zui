// Source: zui/src/components/composite/RefreshButton/RefreshButton.tsx
import { useState } from 'react';
import { RefreshButton } from '@machina/zui/components/composite/RefreshButton/RefreshButton';
import styles from './Example.module.css';

export function refreshbuttonExample() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshTime(new Date());
    }, 2000);
  };

  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Basic Refresh Button</h3>
        <RefreshButton
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          {isRefreshing ? 'Refreshing...' : lastRefreshTime ? `Last refreshed: ${lastRefreshTime.toLocaleTimeString()}` : 'Click to refresh'}
        </p>
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Quick Refresh (No Loading State)</h3>
        <RefreshButton
          onRefresh={() => setLastRefreshTime(new Date())}
          isRefreshing={false}
        />
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Click to see the rotation animation on each click
        </p>
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>With Custom Title</h3>
        <RefreshButton
          onRefresh={() => alert('Custom refresh action!')}
          title="Refresh Data"
        />
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Hover to see custom title
        </p>
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Larger Icon</h3>
        <RefreshButton
          onRefresh={() => setLastRefreshTime(new Date())}
          iconSize={20}
        />
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          20px icon size
        </p>
      </div>
    </div>
  );
}
