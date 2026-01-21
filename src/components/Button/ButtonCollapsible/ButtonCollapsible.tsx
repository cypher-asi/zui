import clsx from 'clsx';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ButtonCollapsible.module.css';

export type ButtonCollapsibleDirection = 'down' | 'up' | 'left' | 'right';

export interface ButtonCollapsibleProps {
  isCollapsed?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  iconClassName?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
  title?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  direction?: ButtonCollapsibleDirection;
}

const chevronIcons = {
  down: ChevronDown,
  up: ChevronUp,
  left: ChevronLeft,
  right: ChevronRight,
};

export function ButtonCollapsible({
  isCollapsed = false,
  onClick,
  className,
  iconClassName,
  size = 'md',
  disabled = false,
  title,
  ariaLabel,
  type = 'button',
  direction = 'down',
}: ButtonCollapsibleProps) {
  const ChevronIcon = chevronIcons[direction];

  return (
    <button
      type={type}
      className={clsx(styles.button, styles[size], isCollapsed && styles.collapsed, className)}
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
      disabled={disabled}
    >
      <ChevronIcon size={16} className={clsx(styles.icon, iconClassName)} />
    </button>
  );
}
