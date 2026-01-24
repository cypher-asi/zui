import { type ReactNode, useCallback } from 'react';
import clsx from 'clsx';
import type { MenuBackground, MenuRounded, MenuBorder } from '../Menu';
import styles from './MenuMega.module.css';

// ============================================================================
// Types
// ============================================================================

/** Individual mega menu item with icon, label, and description */
export interface MenuMegaItemProps {
  /** Unique identifier for the item */
  id: string;
  /** Icon displayed on the left */
  icon?: ReactNode;
  /** Item name/title */
  label: string;
  /** 1-2 line description below the label */
  description?: string;
  /** Whether item is disabled */
  disabled?: boolean;
}

/** A column of mega menu items */
export interface MenuMegaColumnProps {
  /** Optional column header */
  title?: string;
  /** Items in this column */
  items: MenuMegaItemProps[];
}

/** Main MenuMega component props */
export interface MenuMegaProps {
  /** Array of columns (1 = single column, 2+ = multi-column layout) */
  columns: MenuMegaColumnProps[];
  /** Currently selected item id (controlled) */
  value?: string;
  /** Selection callback (controlled) */
  onChange?: (id: string) => void;
  /**
   * Background style variant
   * @default 'solid'
   */
  background?: MenuBackground;
  /**
   * Corner radius
   * @default 'none'
   */
  rounded?: MenuRounded;
  /**
   * Border style
   * @default 'none'
   */
  border?: MenuBorder;
  /** Total panel width */
  width?: number | string;
  /** Additional CSS class */
  className?: string;
}

// ============================================================================
// MenuMegaItem - Internal component for rendering a single mega menu item
// ============================================================================

interface MenuMegaItemComponentProps {
  item: MenuMegaItemProps;
  isSelected: boolean;
  onSelect: ((id: string) => void) | undefined;
}

function MenuMegaItemComponent({
  item,
  isSelected,
  onSelect,
}: MenuMegaItemComponentProps): JSX.Element {
  const handleClick = useCallback(() => {
    if (!item.disabled && onSelect) {
      onSelect(item.id);
    }
  }, [item.disabled, item.id, onSelect]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !item.disabled && onSelect) {
        e.preventDefault();
        onSelect(item.id);
      }
    },
    [item.disabled, item.id, onSelect]
  );

  return (
    <button
      type="button"
      className={clsx(
        styles.item,
        isSelected && styles.selected,
        item.disabled && styles.disabled
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={item.disabled}
      role="menuitem"
      aria-selected={isSelected}
      aria-disabled={item.disabled}
      tabIndex={item.disabled ? -1 : 0}
    >
      {item.icon && <span className={styles.icon}>{item.icon}</span>}
      <span className={styles.content}>
        <span className={styles.label}>{item.label}</span>
        {item.description && (
          <span className={styles.description}>{item.description}</span>
        )}
      </span>
    </button>
  );
}

// ============================================================================
// MenuMegaColumn - Internal component for rendering a column of items
// ============================================================================

interface MenuMegaColumnComponentProps {
  column: MenuMegaColumnProps;
  value: string | undefined;
  onChange: ((id: string) => void) | undefined;
}

function MenuMegaColumnComponent({
  column,
  value,
  onChange,
}: MenuMegaColumnComponentProps): JSX.Element {
  return (
    <div className={styles.column} role="group" aria-label={column.title}>
      {column.title && <div className={styles.columnTitle}>{column.title}</div>}
      <div className={styles.columnItems}>
        {column.items.map((item) => (
          <MenuMegaItemComponent
            key={item.id}
            item={item}
            isSelected={value === item.id}
            onSelect={onChange}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// MenuMega - Main component
// ============================================================================

export function MenuMega({
  columns,
  value,
  onChange,
  background = 'solid',
  rounded = 'none',
  border = 'none',
  width,
  className,
}: MenuMegaProps): JSX.Element {
  // Build border class - 'future' uses global class, others use CSS module
  const borderClass =
    border === 'future'
      ? 'border-future'
      : border !== 'none'
        ? styles[`border${border.charAt(0).toUpperCase() + border.slice(1)}`]
        : undefined;

  return (
    <div
      className={clsx(
        styles.megaMenu,
        styles[background],
        styles[`rounded${rounded.charAt(0).toUpperCase() + rounded.slice(1)}`],
        borderClass,
        className
      )}
      style={{ width }}
      role="menu"
    >
      <div
        className={styles.columns}
        style={{
          gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        }}
      >
        {columns.map((column, index) => (
          <MenuMegaColumnComponent
            key={column.title || `column-${index}`}
            column={column}
            value={value}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

MenuMega.displayName = 'MenuMega';
