import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './NavList.module.css';

export interface NavListProps {
  /** Navigation items to render */
  children: ReactNode;
  /** Additional CSS class name */
  className?: string;
}

/**
 * NavList - A container component for navigation items
 * 
 * Provides consistent padding, spacing, and layout for navigation sections.
 * Used with NavItem components to build navigation menus.
 * 
 * @example
 * `	sx
 * <NavList>
 *   <NavItem icon={<Home />} label="Home" active />
 *   <NavItem icon={<Settings />} label="Settings" />
 * </NavList>
 * `
 */
export function NavList({ children, className }: NavListProps) {
  return (
    <nav className={clsx(styles['navList'], className)}>
      {children}
    </nav>
  );
}
