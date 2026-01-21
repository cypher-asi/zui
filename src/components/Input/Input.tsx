import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  mono?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', mono = false, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(styles.input, size === 'sm' && styles.sm, mono && styles.mono, className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
