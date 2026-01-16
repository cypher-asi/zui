import { ReactNode } from 'react';
import styles from './Heading.module.css';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingVariant = 'primary' | 'secondary';

export interface HeadingProps {
  /** Content to display */
  children: ReactNode;
  /** Heading level (h1-h6) */
  level?: HeadingLevel;
  /** Visual variant */
  variant?: HeadingVariant;
  /** Additional CSS class */
  className?: string;
}

/**
 * Heading - Typography component for headings
 * 
 * Provides consistent heading styles across the application.
 * Use appropriate heading levels for semantic HTML structure.
 */
export function Heading({
  children,
  level = 2,
  variant = 'primary',
  className = '',
}: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag className={`${styles.heading} ${styles[`level${level}`]} ${styles[variant]} ${className}`}>
      {children}
    </Tag>
  );
}
