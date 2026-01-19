import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'filled' | 'glass' | 'transparent';
export type ButtonSize = 'sm' | 'md';
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type ButtonTextCase = 'none' | 'capitalize' | 'uppercase';

type ButtonAsButton = {
  as?: 'button';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsSpan = {
  as: 'span';
} & React.HTMLAttributes<HTMLSpanElement>;

export type ButtonProps = (ButtonAsButton | ButtonAsSpan) & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Corner radius of the button.
   * @default 'md'
   */
  rounded?: ButtonRounded;
  /**
   * Text case transformation.
   * @default 'none'
   */
  textCase?: ButtonTextCase;
  iconOnly?: boolean;
  /**
   * Icon to display before the button text.
   * Typically a lucide-react icon component.
   */
  icon?: React.ReactNode;
  /**
   * Whether the button is in a selected/active state.
   * Useful for toggle buttons, tabs, or menu triggers.
   */
  selected?: boolean;
  /**
   * All possible content states the button might display.
   * When provided, the button will size itself to fit the largest state,
   * preventing layout shifts when content changes.
   */
  contentStates?: React.ReactNode[];
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLSpanElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', rounded = 'md', textCase = 'none', iconOnly = false, icon, selected = false, className, as = 'button', contentStates, children, ...props },
    ref
  ) => {
    const classNames = clsx(
      styles.button,
      styles[variant],
      size === 'sm' && styles.sm,
      rounded !== 'md' && styles[`rounded${rounded.charAt(0).toUpperCase() + rounded.slice(1)}`],
      textCase !== 'none' && styles[textCase],
      iconOnly && styles.iconOnly,
      selected && styles.selected,
      contentStates && styles.stableSize,
      className
    );

    // Render content with measurement states if provided
    const content = contentStates ? (
      <>
        {/* Invisible measurement elements for all possible states */}
        <span className={styles.measurementContainer}>
          {contentStates.map((state, index) => (
            <span key={index} className={styles.measurementItem} aria-hidden="true">
              {icon}
              {state}
            </span>
          ))}
        </span>
        {/* Actual visible content */}
        <span className={styles.visibleContent}>
          {icon}
          {children}
        </span>
      </>
    ) : (
      <>
        {icon}
        {children}
      </>
    );

    if (as === 'span') {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={classNames}
          {...(props as React.HTMLAttributes<HTMLSpanElement>)}
        >
          {content}
        </span>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classNames}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
