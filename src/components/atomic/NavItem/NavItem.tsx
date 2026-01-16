import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './NavItem.module.css';

export interface NavItemProps {
  /** Optional icon to display on the left */
  icon?: ReactNode;
  /** The text label to display */
  label: string;
  /** Whether this item is currently active/selected */
  active?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class name */
  className?: string;
  /** Custom aria-label for accessibility */
  ariaLabel?: string;
}

/**
 * NavItem - An atomic navigation item component
 * 
 * A flexible navigation item that can optionally include an icon.
 * Used for building navigation lists in sidebars and app bars.
 * Updated with thinner styling and subtle hover effects.
 * 
 * @example
 * ```tsx
 * <NavItem 
 *   icon={<Server size={16} />} 
 *   label="Machines" 
 *   active={true}
 *   onClick={() => navigate('/machines')}
 * />
 * ```
 */
export function NavItem({
  icon,
  label,
  active = false,
  onClick,
  className,
  ariaLabel,
}: NavItemProps) {
  return (
    <button
      type="button"
      className={clsx(
        styles['navItem'],
        active && styles['active'],
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel || label}
      aria-current={active ? 'page' : undefined}
    >
      {icon && <span className={styles['icon']}>{icon}</span>}
      <span className={styles['label']}>{label}</span>
    </button>
  );
}
