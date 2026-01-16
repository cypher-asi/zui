import { ComponentInfo } from '../data/components';
import styles from './NavSection.module.css';

interface NavSectionProps {
  title: string;
  items: ComponentInfo[];
  activeId: string;
  onItemClick: (id: string) => void;
}

export function NavSection({ title, items, activeId, onItemClick }: NavSectionProps) {
  return (
    <div className={styles.section}>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <button
              className={`${styles.item} ${activeId === item.id ? styles.active : ''}`}
              onClick={() => onItemClick(item.id)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
