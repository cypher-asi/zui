import { ReactNode } from 'react';
import styles from './Code.module.css';

export type CodeVariant = 'default' | 'accent';

export interface CodeProps {
  /** Content to display */
  children: ReactNode;
  /** Visual variant */
  variant?: CodeVariant;
  /** Additional CSS class */
  className?: string;
}

/**
 * Code - Inline code component
 * 
 * Use for displaying inline code snippets, file paths, or technical terms.
 * For multi-line code blocks, use the CodeBlock component instead.
 */
export function Code({ children, variant = 'default', className = '' }: CodeProps) {
  return <code className={`${styles.code} ${styles[variant]} ${className}`}>{children}</code>;
}
