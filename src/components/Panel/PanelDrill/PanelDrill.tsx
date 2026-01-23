import type { ReactNode, ForwardedRef } from 'react';
import { forwardRef, useMemo, useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Panel } from '../Panel';
import type { PanelProps } from '../Panel';
import { Breadcrumb } from '../../Breadcrumb';
import type { BreadcrumbItem } from '../../Breadcrumb';
import styles from './PanelDrill.module.css';

export interface PanelDrillItem {
  /** Unique identifier for the panel */
  id: string;
  /** Label shown in the breadcrumb */
  label: string;
  /** Content to render when this panel is active */
  content: ReactNode;
}

export interface PanelDrillProps extends Omit<PanelProps, 'children'> {
  /** Stack of panels - last item is the active/visible panel */
  stack: PanelDrillItem[];
  /** Callback when user navigates via breadcrumb */
  onNavigate?: (id: string, index: number) => void;
  /** Whether to show the breadcrumb navigation (default: true) */
  showBreadcrumb?: boolean;
  /** Custom separator for breadcrumb (default: "/") */
  breadcrumbSeparator?: ReactNode;
}

/**
 * PanelDrill - A panel with stack-based navigation and breadcrumb
 *
 * Provides drill-down navigation within a panel. Parent manages the stack
 * of panels, and this component renders the active (last) panel with a
 * breadcrumb for navigation back to previous levels.
 *
 * @example
 * ```tsx
 * const [stack, setStack] = useState<PanelDrillItem[]>([
 *   { id: 'root', label: 'Settings', content: <SettingsMain /> }
 * ]);
 *
 * const pushPanel = (item: PanelDrillItem) => {
 *   setStack(prev => [...prev, item]);
 * };
 *
 * const navigateBack = (id: string, index: number) => {
 *   setStack(prev => prev.slice(0, index + 1));
 * };
 *
 * <PanelDrill
 *   stack={stack}
 *   onNavigate={navigateBack}
 *   variant="glass"
 *   borderRadius="md"
 * />
 * ```
 */
export const PanelDrill = forwardRef(function PanelDrill(
  {
    stack,
    onNavigate,
    showBreadcrumb = true,
    breadcrumbSeparator,
    className,
    ...panelProps
  }: PanelDrillProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isAnimating, setIsAnimating] = useState(false);
  const prevStackLengthRef = useRef(stack.length);

  // Determine animation direction based on stack length changes
  useEffect(() => {
    if (stack.length > prevStackLengthRef.current) {
      setDirection('forward');
      setIsAnimating(true);
    } else if (stack.length < prevStackLengthRef.current) {
      setDirection('backward');
      setIsAnimating(true);
    }
    prevStackLengthRef.current = stack.length;

    // Reset animation state after animation completes
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 200); // Match CSS transition duration

    return () => clearTimeout(timer);
  }, [stack.length]);

  // Convert stack to breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = useMemo(
    () => stack.map(({ id, label }) => ({ id, label })),
    [stack]
  );

  // Get the active (last) panel in the stack
  const activePanel = stack[stack.length - 1];

  // Show breadcrumb only when there are multiple items in the stack
  const shouldShowBreadcrumb = showBreadcrumb && stack.length > 1;

  if (stack.length === 0) {
    return (
      <Panel ref={ref} className={clsx(styles.panelDrill, className)} {...panelProps}>
        <div className={styles.empty}>No content</div>
      </Panel>
    );
  }

  return (
    <Panel ref={ref} className={clsx(styles.panelDrill, className)} {...panelProps}>
      {shouldShowBreadcrumb && (
        <div className={styles.header}>
          <Breadcrumb
            items={breadcrumbItems}
            onNavigate={onNavigate}
            separator={breadcrumbSeparator}
            className={styles.breadcrumb}
          />
        </div>
      )}
      <div
        className={clsx(
          styles.content,
          isAnimating && direction === 'forward' && styles.slideInRight,
          isAnimating && direction === 'backward' && styles.slideInLeft
        )}
        key={activePanel.id}
      >
        {activePanel.content}
      </div>
    </Panel>
  );
});

PanelDrill.displayName = 'PanelDrill';
