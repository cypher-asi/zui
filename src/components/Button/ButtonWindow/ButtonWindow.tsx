import { forwardRef, type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Minus, Square, X } from 'lucide-react';
import styles from './ButtonWindow.module.css';

export type ButtonWindowAction = 'minimize' | 'maximize' | 'close';
export type ButtonWindowRounded = 'none' | 'sm' | 'md';

export interface ButtonWindowProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  action: ButtonWindowAction;
  /**
   * Size of the button
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md';
  /**
   * Border radius of the button
   * @default 'sm'
   */
  rounded?: ButtonWindowRounded;
}

const iconMap = {
  minimize: Minus,
  maximize: Square,
  close: X,
} as const;

// Base icon sizes per button size
const baseSizes = {
  xs: 10,
  sm: 12,
  md: 14,
} as const;

// Per-icon size adjustments (X appears smaller visually, so increase it)
const iconSizeAdjustments: Record<ButtonWindowAction, number> = {
  minimize: 0,
  maximize: 0,
  close: 2,
};

export const ButtonWindow = forwardRef<HTMLButtonElement, ButtonWindowProps>(
  ({ action, size = 'md', rounded = 'sm', className, ...props }, ref) => {
    const Icon = iconMap[action];
    const iconSize = baseSizes[size] + iconSizeAdjustments[action];

    return (
      <button
        ref={ref}
        className={clsx(
          styles.buttonWindow,
          styles[action],
          size !== 'md' && styles[size],
          rounded !== 'sm' && styles[`rounded${rounded.charAt(0).toUpperCase() + rounded.slice(1)}`],
          className
        )}
        aria-label={action}
        {...props}
      >
        <Icon size={iconSize} strokeWidth={2} />
      </button>
    );
  }
);

ButtonWindow.displayName = 'ButtonWindow';
