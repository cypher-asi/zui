import { CollapsibleGroup, NavItem } from '@machina/zui';
import { ComponentInfo } from '../data/components';

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
