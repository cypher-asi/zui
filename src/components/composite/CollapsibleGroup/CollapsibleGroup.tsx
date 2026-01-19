import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import styles from './CollapsibleGroup.module.css';

export interface CollapsibleGroupProps {
  /** The group label/title */
  label?: string;
  /** Alternative prop name for label (for compatibility) */
  title?: string;
  /** Count to display next to the label */
  count?: number;
  /** Optional stats to display (aligned to the right) */
  stats?: ReactNode;
  /** Whether the group starts collapsed (defaults to false when not specified) */
  defaultCollapsed?: boolean;
  /** Alternative prop name for defaultCollapsed (for compatibility) */
  defaultOpen?: boolean;
  /** The content to render inside the group */
  children: ReactNode;
  /** Optional className for the container */
  className?: string;
}

export function CollapsibleGroup({
  label,
  title,
  count,
  stats,
  defaultCollapsed = false,
  defaultOpen = false,
  children,
  className,
}: CollapsibleGroupProps) {
  // Support both label/title and defaultCollapsed/defaultOpen for compatibility
  const displayLabel = title || label || '';
  const startCollapsed = defaultOpen ? false : defaultCollapsed;
  const [isCollapsed, setIsCollapsed] = useState(startCollapsed);

  const handleToggle = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={clsx(styles.group, className)}>
      <button
        className={styles.header}
        onClick={handleToggle}
        title={isCollapsed ? 'Expand' : 'Collapse'}
        type="button"
      >
        <span className={styles.labelContainer}>
          <span className={styles.label}>{displayLabel}</span>
          {count !== undefined && <span className={styles.count}>{count}</span>}
        </span>
        {stats && <div className={styles.stats}>{stats}</div>}
        <span className={clsx(styles.toggle, isCollapsed && styles.toggleCollapsed)}>
          <ChevronDown size={16} />
        </span>
      </button>
      <div className={clsx(styles.content, isCollapsed && styles.contentCollapsed)}>
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  );
}
