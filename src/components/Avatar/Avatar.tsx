import { type HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The name to generate initials from (if no src is provided)
   */
  name: string;
  /**
   * The image URL
   */
  src?: string;
  /**
   * Alt text for the image
   */
  alt?: string;
  /**
   * Size variant
   * @default 'md'
   */
  size?: AvatarSize;
  /**
   * Whether to use a square shape instead of circle
   * @default false
   */
  square?: boolean;
}

/**
 * Generate initials from a name
 * Takes first letter of first two words, uppercase
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({
  name,
  src,
  alt,
  size = 'md',
  square = false,
  className,
  ...props
}: AvatarProps) {
  const initials = getInitials(name);

  return (
    <div
      className={clsx(styles.avatar, styles[size], square && styles.square, className)}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt || name} className={styles.image} />
      ) : (
        <span className={styles.initials}>{initials}</span>
      )}
    </div>
  );
}
