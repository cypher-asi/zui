import type { ReactNode, CSSProperties, ForwardedRef } from 'react';
import { forwardRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Panel.module.css';

type BorderType = 'none' | 'solid' | 'future';
type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | number;
type PanelVariant = 'solid' | 'transparent' | 'glass';

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Background variant (matches Menu component) */
  variant?: PanelVariant;
  /** Border style variant */
  border?: BorderType;
  /** Border radius - preset or custom number */
  borderRadius?: BorderRadius;
  /** Whether the panel is in a focused state */
  focused?: boolean;
  /** Whether the panel is open (affects hover style) */
  open?: boolean;
  /** Whether to show hover effects */
  hoverable?: boolean;
  /** Panel content */
  children?: ReactNode;
}

// Matches Menu component styles from zui
const variantStyles: Record<PanelVariant, CSSProperties> = {
  solid: {
    backgroundColor: 'var(--color-bg, #09090b)',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  glass: {
    backgroundColor: 'rgba(9, 9, 11, 0.15)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  },
};

const borderStyleMap: Record<Exclude<BorderType, 'future'>, CSSProperties> = {
  none: {},
  solid: {
    border: '1px solid var(--color-border, #17171a)',
  },
};

const radiusMap: Record<Exclude<BorderRadius, number>, string> = {
  none: '0',
  sm: 'var(--radius-sm, 4px)',
  md: 'var(--radius-md, 6px)',
  lg: 'var(--radius-lg, 8px)',
};

// Hover backgrounds matching Menu item states
const hoverBgClosed = 'rgba(255, 255, 255, 0.05)';  // Menu hover state
const hoverBgOpen = 'rgba(0, 0, 0, 0.7)';           // Menu selected state

export const Panel = forwardRef(function Panel(
  {
    variant = 'glass',
    border = 'future',
    borderRadius = 'none',
    focused = false,
    open = false,
    hoverable = false,
    className,
    style,
    children,
    ...props
  }: PanelProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [isHovered, setIsHovered] = useState(false);

  // Determine hover background based on open/closed state
  const getHoverBg = () => {
    if (!hoverable || !isHovered) return undefined;
    return open ? hoverBgOpen : hoverBgClosed;
  };

  const combinedStyle: CSSProperties = {
    position: 'relative',
    transition: 'background-color 75ms ease-out',
    ...variantStyles[variant],
    ...(border !== 'future' ? borderStyleMap[border] : {}),
    ...(focused ? { boxShadow: '0 0 0 1px var(--color-accent, #01f4cb)' } : {}),
    borderRadius: typeof borderRadius === 'number' ? borderRadius : radiusMap[borderRadius],
    ...(getHoverBg() ? { backgroundColor: getHoverBg() } : {}),
    ...(hoverable ? { cursor: 'pointer' } : {}),
    ...style,
  };

  // 'future' border uses global .border-future class from @cypher-asi/zui/styles/borders.css
  const classNames = clsx(
    styles.panel,
    border === 'future' && 'border-future',
    className
  );

  return (
    <div
      ref={ref}
      className={classNames}
      style={combinedStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
});
