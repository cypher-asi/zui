import { CollapsibleGroup, NavItem } from '@cypher-asi/zui';
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
    <CollapsibleGroup title={title} defaultOpen>
      {items.map((item) => (
        <NavItem
          key={item.id}
          label={item.name}
          active={activeId === item.id}
          onClick={() => onItemClick(item.id)}
        />
      ))}
    </CollapsibleGroup>
  );
}
