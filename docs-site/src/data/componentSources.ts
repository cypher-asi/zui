// This file contains source code strings for each component
// In a production setup, you could use a Vite plugin to automatically import these

export const componentSources: Record<string, string> = {
  'button': `import React from 'react';
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
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLSpanElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', iconOnly = false, className, as = 'button', ...props },
    ref
  ) => {
    const classNames = clsx(
      styles.button,
      styles[variant],
      size === 'sm' && styles.sm,
      iconOnly && styles.iconOnly,
      className
    );

    if (as === 'span') {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={classNames}
          {...(props as React.HTMLAttributes<HTMLSpanElement>)}
        />
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classNames}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  }
);

Button.displayName = 'Button';`,

  'badge': `import React from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

export type BadgeVariant = 'running' | 'stopped' | 'error' | 'pending' | 'provisioning';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  pulse = false,
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={clsx(styles.badge, styles[variant], pulse && styles.pulse, className)}
      {...props}
    >
      {pulse && <span className={styles.dot} />}
      {children}
    </span>
  );
};`,
};

// Fallback for components without source code
export function getComponentSource(componentId: string): string {
  return componentSources[componentId] || `// Source code for ${componentId} component
// View the actual implementation in: zui/src/components/${componentId}

// This component is part of the ZUI library
// For full source code, please refer to the GitHub repository`;
}
