import { type ReactNode, useRef, useLayoutEffect, useState } from 'react';
import clsx from 'clsx';
import { Item } from '../../Item';
import styles from './Menu.module.css';

export type MenuVariant = 'solid' | 'transparent' | 'glass';
export type MenuRounded = 'none' | 'sm' | 'md' | 'lg';
export type MenuBorder = 'none' | 'solid' | 'future';

export interface MenuItemProps {
  /** Unique identifier for the item */
  id: string;
  /** The text label to display */
  label: string;
  /** Optional icon to display on the left */
  icon?: ReactNode;
  /** Whether this item is disabled */
  disabled?: boolean;
}

export interface MenuProps {
  /** Optional title displayed at the top of the menu */
  title?: string;
  /** Array of menu items */
  items: MenuItemProps[];
  /** Currently selected item id */
  value?: string;
  /** Callback when selection changes */
  onChange?: (id: string) => void;
  /**
   * @deprecated Use `value` instead
   */
  selectedId?: string;
  /**
   * @deprecated Use `onChange` instead
   */
  onSelect?: (id: string) => void;
  /**
   * Background variant
   * @default 'solid'
   */
  variant?: MenuVariant;
  /**
   * Corner radius
   * @default 'none'
   */
  rounded?: MenuRounded;
  /**
   * Whether to show border
   * @default true
   * @deprecated Use `border` prop instead
   */
  bordered?: boolean;
  /**
   * Border style variant
   * @default 'none'
   */
  border?: MenuBorder;
  /** Additional CSS class name */
  className?: string;
  /** Menu width */
  width?: number | string;
  /**
   * Whether the menu is currently visible/open.
   * Used for off-screen detection when menu appears.
   */
  isOpen?: boolean;
}

export function Menu({
  title,
  items,
  value,
  onChange,
  selectedId,
  onSelect,
  variant = 'solid',
  rounded = 'none',
  bordered = true,
  border,
  className,
  width,
  isOpen,
}: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  // Support both old and new prop names (old names are deprecated)
  const currentValue = value ?? selectedId;
  const handleChange = onChange ?? onSelect;

  // Resolve border style: new `border` prop takes precedence over deprecated `bordered`
  const borderStyle = border ?? (bordered ? 'solid' : 'none');

  // Check if menu would go off-screen and adjust position (runs before paint)
  useLayoutEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const padding = 8; // Small padding from viewport edge
      
      // If menu bottom edge is below viewport, shift it up
      if (rect.bottom > viewportHeight - padding) {
        const overflow = rect.bottom - viewportHeight + padding;
        setOffsetY(-overflow);
      } else {
        setOffsetY(0);
      }

      // If menu right edge is beyond viewport, shift it left
      if (rect.right > viewportWidth - padding) {
        const overflow = rect.right - viewportWidth + padding;
        setOffsetX(-overflow);
      } else {
        setOffsetX(0);
      }
    }
  }, [isOpen, items]);
  
  const handleItemClick = (item: MenuItemProps) => {
    if (!item.disabled && handleChange) {
      handleChange(item.id);
    }
  };

  // Build border class - 'future' uses global class, others use CSS module
  const borderClass =
    borderStyle === 'future'
      ? 'border-future'
      : borderStyle !== 'none'
        ? styles[`border${borderStyle.charAt(0).toUpperCase() + borderStyle.slice(1)}`]
        : undefined;

  return (
    <div
      ref={menuRef}
      className={clsx(
        styles.menu,
        styles[variant],
        styles[`rounded${rounded.charAt(0).toUpperCase() + rounded.slice(1)}`],
        borderClass,
        className
      )}
      style={{ 
        width,
        transform: (offsetX !== 0 || offsetY !== 0) ? `translate(${offsetX}px, ${offsetY}px)` : undefined,
      }}
      role="menu"
    >
      {title && <div className={styles.title}>{title}</div>}
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          className={clsx(
            styles.menuItem,
            currentValue === item.id && styles.selected,
            item.disabled && styles.disabled
          )}
          selected={currentValue === item.id}
          disabled={item.disabled}
          onClick={() => handleItemClick(item)}
          role="menuitem"
        >
          {item.icon && <Item.Icon className={styles.icon}>{item.icon}</Item.Icon>}
          <Item.Label className={styles.label}>{item.label}</Item.Label>
        </Item>
      ))}
    </div>
  );
}

Menu.displayName = 'Menu';
