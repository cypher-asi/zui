import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './RadioButton.module.css';

export type RadioButtonSize = 'sm' | 'md';
export type RadioButtonVariant = 'default' | 'accent';

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the radio button */
  size?: RadioButtonSize;
  /** Color variant when checked */
  variant?: RadioButtonVariant;
  /** Optional label text */
  label?: string;
  /** Position of the label */
  labelPosition?: 'left' | 'right';
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
  {
    size = 'md',
    variant = 'default',
    label,
    labelPosition = 'right',
    className,
    disabled,
    ...props
  },
  ref
) {
  return (
    <label
      className={clsx(
        styles.radioButton,
        styles[size],
        styles[variant],
        label && styles.withLabel,
        disabled && styles.disabled,
        className
      )}
    >
      <input
        ref={ref}
        type="radio"
        className={styles.input}
        disabled={disabled}
        {...props}
      />
      <span className={styles.circle} />
      {label && (
        <span className={clsx(styles.label, labelPosition === 'left' && styles.labelLeft)}>
          {label}
        </span>
      )}
    </label>
  );
});
