import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md';

type ButtonAsButton = {
  as?: 'button';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsSpan = {
  as: 'span';
} & React.HTMLAttributes<HTMLSpanElement>;

export type ButtonProps = (ButtonAsButton | ButtonAsSpan) & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
  /**
   * All possible content states the button might display.
   * When provided, the button will size itself to fit the largest state,
   * preventing layout shifts when content changes.
   */
  contentStates?: React.ReactNode[];
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLSpanElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', iconOnly = false, className, as = 'button', contentStates, children, ...props },
    ref
  ) => {
    const classNames = clsx(
      styles.button,
      styles[variant],
      size === 'sm' && styles.sm,
      iconOnly && styles.iconOnly,
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
              {state}
            </span>
          ))}
        </span>
        {/* Actual visible content */}
        <span className={styles.visibleContent}>
          {children}
        </span>
      </>
    ) : (
      children
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
