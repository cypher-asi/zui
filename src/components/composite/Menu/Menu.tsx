import React from 'react';
import clsx from 'clsx';
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
  icon?: React.ReactNode;
  /** Whether this item is disabled */
  disabled?: boolean;
}

export interface MenuProps {
  /** Optional title displayed at the top of the menu */
  title?: string;
  /** Array of menu items */
  items: MenuItemProps[];
  /** Currently selected item id */
  selectedId?: string;
  /** Callback when an item is selected */
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
}

export function Menu({
  title,
  items,
  selectedId,
  onSelect,
  variant = 'solid',
  rounded = 'none',
  bordered = true,
  border,
  className,
  width,
}: MenuProps) {
  // Resolve border style: new `border` prop takes precedence over deprecated `bordered`
  const borderStyle = border ?? (bordered ? 'solid' : 'none');
  const handleItemClick = (item: MenuItemProps) => {
    if (!item.disabled && onSelect) {
      onSelect(item.id);
    }
  };

  // Build border class - 'future' uses global class, others use CSS module
  const borderClass = borderStyle === 'future' 
    ? 'border-future' 
    : borderStyle !== 'none' 
      ? styles[`border${borderStyle.charAt(0).toUpperCase() + borderStyle.slice(1)}`]
      : undefined;

  return (
    <div
      className={clsx(
        styles.menu,
        styles[variant],
        styles[`rounded${rounded.charAt(0).toUpperCase() + rounded.slice(1)}`],
        borderClass,
        className
      )}
      style={{ width }}
      role="menu"
    >
      {title && (
        <div className={styles.title}>{title}</div>
      )}
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="menuitem"
          className={clsx(
            styles.menuItem,
            selectedId === item.id && styles.selected,
            item.disabled && styles.disabled
          )}
          onClick={() => handleItemClick(item)}
          disabled={item.disabled}
          aria-disabled={item.disabled}
        >
          {item.icon && <span className={styles.icon}>{item.icon}</span>}
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

Menu.displayName = 'Menu';
