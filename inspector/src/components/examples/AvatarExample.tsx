import { Avatar } from '@cypher-asi/zui';
import styles from './Example.module.css';

export function avatarExample() {
  return (
    <div className={styles.exampleGroup}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>With Images</h3>
        <div className={styles.row}>
          <Avatar name="John Doe" src="https://i.pravatar.cc/150?img=1" size="xs" />
          <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=2" size="sm" />
          <Avatar name="Bob Johnson" src="https://i.pravatar.cc/150?img=3" size="md" />
          <Avatar name="Alice Williams" src="https://i.pravatar.cc/150?img=4" size="lg" />
          <Avatar name="Charlie Brown" src="https://i.pravatar.cc/150?img=5" size="xl" />
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>With Initials (No Image)</h3>
        <div className={styles.row}>
          <Avatar name="John Doe" size="xs" />
          <Avatar name="Jane Smith" size="sm" />
          <Avatar name="Bob Johnson" size="md" />
          <Avatar name="Alice Williams" size="lg" />
          <Avatar name="Charlie Brown" size="xl" />
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Square Variant (Organizations/Teams)</h3>
        <div className={styles.row}>
          <Avatar name="Acme Corp" square size="xs" />
          <Avatar name="Tech Inc" square size="sm" />
          <Avatar name="Design Co" square size="md" />
          <Avatar name="Build LLC" square size="lg" />
          <Avatar name="Cloud Systems" square size="xl" />
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Square with Images</h3>
        <div className={styles.row}>
          <Avatar name="Acme Corp" src="https://i.pravatar.cc/150?img=6" square size="sm" />
          <Avatar name="Tech Inc" src="https://i.pravatar.cc/150?img=7" square size="md" />
          <Avatar name="Design Co" src="https://i.pravatar.cc/150?img=8" square size="lg" />
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Single Name</h3>
        <div className={styles.row}>
          <Avatar name="John" size="md" />
          <Avatar name="Jane" size="md" />
          <Avatar name="Bob" size="md" />
        </div>
      </div>
    </div>
  );
}
