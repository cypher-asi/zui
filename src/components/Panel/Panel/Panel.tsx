import type { ReactNode, CSSProperties, ForwardedRef } from 'react';
import { forwardRef, useState, useContext } from 'react';
import clsx from 'clsx';
import styles from './Panel.module.css';
import { ThemeContext } from '../../Theme/ThemeContext';

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

// Dark mode styles
const darkVariantStyles: Record<PanelVariant, CSSProperties> = {
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

// Light mode styles - brighter backgrounds for visibility
const lightVariantStyles: Record<PanelVariant, CSSProperties> = {
  solid: {
    backgroundColor: 'var(--color-bg, #ffffff)',
  },
  transparent: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
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

// Hover backgrounds - theme-aware
const darkHoverBgClosed = 'rgba(255, 255, 255, 0.05)';
const darkHoverBgOpen = 'rgba(0, 0, 0, 0.7)';
const lightHoverBgClosed = 'rgba(0, 0, 0, 0.05)';
const lightHoverBgOpen = 'rgba(255, 255, 255, 0.9)';

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
  
  // Get theme from context (defaults to dark if no provider)
  const themeContext = useContext(ThemeContext);
  const resolvedTheme = themeContext?.resolvedTheme ?? 'dark';
  const isLightMode = resolvedTheme === 'light';
  
  // Select appropriate styles based on theme
  const variantStyles = isLightMode ? lightVariantStyles : darkVariantStyles;

  // Determine hover background based on open/closed state and theme
  const getHoverBg = () => {
    if (!hoverable || !isHovered) return undefined;
    if (isLightMode) {
      return open ? lightHoverBgOpen : lightHoverBgClosed;
    }
    return open ? darkHoverBgOpen : darkHoverBgClosed;
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
  const classNames = clsx(styles.panel, border === 'future' && 'border-future', className);

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

Panel.displayName = 'Panel';
