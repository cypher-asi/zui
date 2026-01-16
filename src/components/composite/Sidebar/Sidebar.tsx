import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Sidebar.module.css';

export interface SidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Content to display in the main body of the sidebar */
  children?: ReactNode;
  
  /** Content to display at the top of the sidebar (fixed) */
  header?: ReactNode;
  
  /** Content to display at the bottom of the sidebar (fixed) */
  footer?: ReactNode;
  
  /** 
   * Enable resizing functionality 
   * @default false
   */
  resizable?: boolean;
  
  /** 
   * Minimum width when resizable (in pixels)
   * @default 200
   */
  minWidth?: number;
  
  /** 
   * Maximum width when resizable (in pixels)
   * @default 400
   */
  maxWidth?: number;
  
  /** 
   * Default/initial width (in pixels)
   * @default 240
   */
  defaultWidth?: number;
  
  /** 
   * LocalStorage key for persisting width
   * Only used when resizable is true
   * @default 'sidebar-width'
   */
  storageKey?: string;
  
  /** 
   * Position of the resize handle
   * @default 'right'
   */
  resizePosition?: 'left' | 'right';
  
  /** 
   * Callback when width changes (useful for parent components)
   */
  onWidthChange?: (width: number) => void;
}

function getSavedWidth(storageKey: string, defaultWidth: number, minWidth: number, maxWidth: number): number {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const width = parseInt(saved, 10);
      if (width >= minWidth && width <= maxWidth) {
        return width;
      }
    }
  } catch {
    // localStorage might not be available
  }
  return defaultWidth;
}

function saveWidth(storageKey: string, width: number): void {
  try {
    localStorage.setItem(storageKey, String(width));
  } catch {
    // localStorage might not be available
  }
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      children,
      header,
      footer,
      resizable = false,
      minWidth = 200,
      maxWidth = 400,
      defaultWidth = 240,
      storageKey = 'sidebar-width',
      resizePosition = 'right',
      onWidthChange,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [width, setWidth] = useState(() =>
      resizable ? getSavedWidth(storageKey, defaultWidth, minWidth, maxWidth) : defaultWidth
    );
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => sidebarRef.current as HTMLElement);

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        if (!resizable) return;
        e.preventDefault();
        setIsResizing(true);
      },
      [resizable]
    );

    useEffect(() => {
      if (!isResizing || !resizable) return;

      const handleMouseMove = (e: MouseEvent) => {
        if (!sidebarRef.current) return;

        const sidebarRect = sidebarRef.current.getBoundingClientRect();
        let newWidth: number;

        if (resizePosition === 'right') {
          newWidth = e.clientX - sidebarRect.left;
        } else {
          newWidth = sidebarRect.right - e.clientX;
        }

        const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
        setWidth(clampedWidth);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        saveWidth(storageKey, width);
        onWidthChange?.(width);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'ew-resize';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      };
    }, [isResizing, resizable, width, minWidth, maxWidth, storageKey, resizePosition, onWidthChange]);

    const sidebarStyle: React.CSSProperties = {
      ...style,
      ...(resizable ? { width } : { width: defaultWidth }),
    };

    return (
      <aside
        ref={sidebarRef}
        className={clsx(
          styles['sidebar'],
          resizable && styles['resizable'],
          isResizing && styles['resizing'],
          className
        )}
        style={sidebarStyle}
        {...props}
      >
        {/* Resize Handle */}
        {resizable && (
          <div
            className={clsx(
              styles['resizeHandle'],
              resizePosition === 'left' ? styles['resizeHandleLeft'] : styles['resizeHandleRight']
            )}
            onMouseDown={handleMouseDown}
          >
            <div className={styles['resizeHandleLine']} />
          </div>
        )}

        {/* Header Section */}
        {header && <div className={styles['header']}>{header}</div>}

        {/* Main Content */}
        <div className={styles['content']}>{children}</div>

        {/* Footer Section */}
        {footer && <div className={styles['footer']}>{footer}</div>}
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';
