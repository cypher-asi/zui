import { type ReactNode, useRef, useLayoutEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
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
  /** Nested submenu items (creates a flyout submenu) */
  children?: MenuItemProps[];
}

/** Separator to visually divide groups of menu items */
export interface MenuSeparator {
  type: 'separator';
}

/** Union type for all menu item types */
export type MenuItem = MenuItemProps | MenuSeparator;

/** Type guard to check if item is a separator */
function isSeparator(item: MenuItem): item is MenuSeparator {
  return 'type' in item && item.type === 'separator';
}

/** Helper to check if an item id is in the selected value(s) */
function isItemSelected(id: string, value: string | string[] | undefined): boolean {
  if (!value) return false;
  if (Array.isArray(value)) {
    return value.includes(id);
  }
  return value === id;
}

export interface MenuProps {
  /** Optional title displayed at the top of the menu */
  title?: string;
  /** Array of menu items (including separators) */
  items: MenuItem[];
  /** 
   * Currently selected item id(s). 
   * Pass a string for single selection, or an array for multiple selections (e.g., one per submenu).
   */
  value?: string | string[];
  /** Callback when selection changes (called with the id of the clicked item) */
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
  /**
   * Internal: depth level for nested submenus
   * @internal
   */
  _depth?: number;
}

// ============================================================================
// MenuItem - Internal component for rendering a single menu item with submenu
// ============================================================================

interface MenuItemComponentProps {
  item: MenuItemProps;
  isSelected: boolean;
  currentValue: string | string[] | undefined;
  onSelect: ((id: string) => void) | undefined;
  variant: MenuVariant;
  rounded: MenuRounded;
  border: MenuBorder;
  depth: number;
  isSubmenuOpen: boolean;
  onSubmenuOpen: (id: string | null) => void;
  closeTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
}

function MenuItemComponent({
  item,
  isSelected,
  currentValue,
  onSelect,
  variant,
  rounded,
  border,
  depth,
  isSubmenuOpen,
  onSubmenuOpen,
  closeTimeoutRef,
}: MenuItemComponentProps) {
  const [submenuPosition, setSubmenuPosition] = useState<'right' | 'left'>('right');
  const itemRef = useRef<HTMLDivElement>(null);

  const hasSubmenu = item.children && item.children.length > 0;

  // Calculate submenu position based on available space
  const updateSubmenuPosition = useCallback(() => {
    if (itemRef.current && hasSubmenu) {
      const rect = itemRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const submenuWidth = 200; // Estimated submenu width
      const padding = 8;

      // If not enough space on the right, position on the left
      if (rect.right + submenuWidth > viewportWidth - padding) {
        setSubmenuPosition('left');
      } else {
        setSubmenuPosition('right');
      }
    }
  }, [hasSubmenu]);

  const handleMouseEnter = useCallback(() => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    if (hasSubmenu && !item.disabled) {
      updateSubmenuPosition();
      onSubmenuOpen(item.id);
    } else {
      // Close any open submenu when hovering a non-submenu item
      onSubmenuOpen(null);
    }
  }, [hasSubmenu, item.disabled, item.id, updateSubmenuPosition, onSubmenuOpen, closeTimeoutRef]);

  const handleMouseLeave = useCallback(() => {
    if (hasSubmenu && isSubmenuOpen) {
      // Delay closing to allow moving to submenu
      closeTimeoutRef.current = setTimeout(() => {
        onSubmenuOpen(null);
      }, 150);
    }
  }, [hasSubmenu, isSubmenuOpen, onSubmenuOpen, closeTimeoutRef]);

  const handleClick = useCallback(() => {
    if (!item.disabled && !hasSubmenu && onSelect) {
      onSelect(item.id);
    }
  }, [item.disabled, item.id, hasSubmenu, onSelect]);

  return (
    <div
      ref={itemRef}
      className={styles.menuItemWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Item
        id={item.id}
        className={clsx(
          styles.menuItem,
          isSelected && styles.selected,
          item.disabled && styles.disabled,
          hasSubmenu && styles.hasSubmenu,
          isSubmenuOpen && styles.submenuOpen
        )}
        disabled={item.disabled}
        onClick={handleClick}
        role="menuitem"
        aria-haspopup={hasSubmenu ? 'menu' : undefined}
        aria-expanded={hasSubmenu ? isSubmenuOpen : undefined}
        aria-selected={isSelected}
      >
        {item.icon && <Item.Icon className={styles.icon}>{item.icon}</Item.Icon>}
        <Item.Label className={styles.label}>{item.label}</Item.Label>
        {hasSubmenu && (
          <Item.Action className={styles.submenuArrow}>
            <ChevronRight size={14} />
          </Item.Action>
        )}
      </Item>

      {/* Submenu */}
      {hasSubmenu && isSubmenuOpen && (
        <div
          className={clsx(
            styles.submenu,
            submenuPosition === 'left' && styles.submenuLeft
          )}
          onMouseEnter={() => {
            // Cancel close when entering submenu
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
              closeTimeoutRef.current = null;
            }
          }}
          onMouseLeave={handleMouseLeave}
        >
          <Menu
            items={item.children!}
            value={currentValue}
            onChange={onSelect}
            variant={variant}
            rounded={rounded}
            border={border}
            _depth={depth + 1}
            isOpen={isSubmenuOpen}
          />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Menu - Main component
// ============================================================================

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
  _depth = 0,
}: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  
  // Track which submenu is currently open (by item id)
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Support both old and new prop names (old names are deprecated)
  const currentValue = value ?? selectedId;
  const handleChange = onChange ?? onSelect;

  // Resolve border style: new `border` prop takes precedence over deprecated `bordered`
  const borderStyle = border ?? (bordered ? 'solid' : 'none');

  // Check if menu would go off-screen and adjust position (runs before paint)
  // Only apply to root menu, submenus handle their own positioning
  useLayoutEffect(() => {
    if (_depth === 0 && menuRef.current) {
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
  }, [isOpen, items, _depth]);

  // Cleanup timeout on unmount
  useLayoutEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

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
        transform: (_depth === 0 && (offsetX !== 0 || offsetY !== 0)) ? `translate(${offsetX}px, ${offsetY}px)` : undefined,
      }}
      role="menu"
    >
      {title && <div className={styles.title}>{title}</div>}
      {items.map((item, index) =>
        isSeparator(item) ? (
          <hr key={`separator-${index}`} className={styles.separator} />
        ) : (
          <MenuItemComponent
            key={item.id}
            item={item}
            isSelected={isItemSelected(item.id, currentValue)}
            currentValue={currentValue}
            onSelect={handleChange}
            variant={variant}
            rounded={rounded}
            border={borderStyle}
            depth={_depth}
            isSubmenuOpen={openSubmenuId === item.id}
            onSubmenuOpen={setOpenSubmenuId}
            closeTimeoutRef={closeTimeoutRef}
          />
        )
      )}
    </div>
  );
}

Menu.displayName = 'Menu';
