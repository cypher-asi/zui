import { Card } from '@machina/zui';
import styles from './Example.module.css';

export function cardExample() {
  return (
    <div className={styles.exampleGrid}>
      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Basic Card</h3>
        <Card>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Card Title
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            This is a card component with some content inside.
          </p>
        </Card>
      </div>

      <div className={styles.exampleItem}>
        <h3 className={styles.exampleTitle}>Card with Multiple Elements</h3>
        <Card>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Complex Card
          </h3>
          <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            Cards can contain any content you need.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ 
              padding: '0.25rem 0.5rem', 
              background: 'var(--bg-secondary)', 
              borderRadius: '4px',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)'
            }}>
              Tag 1
            </span>
            <span style={{ 
              padding: '0.25rem 0.5rem', 
              background: 'var(--bg-secondary)', 
              borderRadius: '4px',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)'
            }}>
              Tag 2
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
