import { ReactNode, ElementType } from 'react';
import styles from './Text.module.css';

export type TextVariant = 'primary' | 'secondary' | 'muted';
export type TextSize = '2xs' | 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type TextWeight = 'normal' | 'medium' | 'semibold';

export interface TextProps {
  /** Content to display */
  children: ReactNode;
  /** Visual variant */
  variant?: TextVariant;
  /** Text size */
  size?: TextSize;
  /** Font weight */
  weight?: TextWeight;
  /** Align text */
  align?: 'left' | 'center' | 'right';
  /** HTML element to render as */
  as?: ElementType;
  /** Additional CSS class */
  className?: string;
}

/**
 * Text - Typography component for body text
 * 
 * A flexible text component that provides consistent typography across the application.
 * Use this for paragraphs, labels, and other body text.
 */
export function Text({
  children,
  variant = 'primary',
  size = 'base',
  weight = 'normal',
  align = 'left',
  as: Component = 'p',
  className = '',
}: TextProps) {
  return (
    <Component
      className={`${styles.text} ${styles[variant]} ${styles[size]} ${styles[weight]} ${styles[align]} ${className}`}
    >
      {children}
    </Component>
  );
}
