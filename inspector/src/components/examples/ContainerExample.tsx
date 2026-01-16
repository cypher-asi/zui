import { Container } from '@machina/zui';
import styles from './Example.module.css';

export function containerExample() {
  const containerStyle = {
    background: 'var(--color-bg-secondary)',
    padding: '1.5rem',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
  };

  return (
    <div className={styles.exampleGroup}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Small Container</h3>
        <Container size="sm" style={containerStyle}>
          <p style={{ margin: 0 }}>Small container - great for focused content like forms or login pages.</p>
        </Container>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Medium Container (Default)</h3>
        <Container size="md" style={containerStyle}>
          <p style={{ margin: 0 }}>Medium container - the default size, works well for most content.</p>
        </Container>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Large Container</h3>
        <Container size="lg" style={containerStyle}>
          <p style={{ margin: 0 }}>Large container - ideal for content-heavy pages with wide layouts.</p>
        </Container>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Extra Large Container</h3>
        <Container size="xl" style={containerStyle}>
          <p style={{ margin: 0 }}>Extra large container - for dashboard-style layouts that need maximum width.</p>
        </Container>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Full Width Container</h3>
        <Container size="full" style={containerStyle}>
          <p style={{ margin: 0 }}>Full width container - takes up 100% of available space with padding.</p>
        </Container>
      </div>
    </div>
  );
}
