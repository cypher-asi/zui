import { useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import styles from './Drawer.module.css';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  /** Which side of the screen the drawer appears from */
  side: DrawerSide;
  
  /** Whether the drawer is open */
  isOpen: boolean;
  
  /** Callback when the drawer should close */
  onClose: () => void;
  
  /** Callback when the drawer should open (required if showToggle is true) */
  onOpen?: () => void;
  
  /** The content to render inside the drawer */
  children: ReactNode;
  
  /** Optional title displayed in a header bar */
  title?: string;
  
  /** Minimum size (width for left/right, height for top/bottom) in pixels */
  minSize?: number;
  
  /** Maximum size (width for left/right, height for top/bottom) in pixels */
  maxSize?: number;
  
  /** Default size (width for left/right, height for top/bottom) in pixels */
  defaultSize?: number;
  
  /** Size when minimized in pixels */
  minimizedSize?: number;
  
  /** LocalStorage key for persisting size (optional) */
  storageKey?: string;
  
  /** Whether to start minimized */
  initialMinimized?: boolean;
  
  /** Optional className for additional styling */
  className?: string;
  
  /** Whether to show the minimized bar (only applies to left/right drawers) */
  showMinimizedBar?: boolean;
  
  /** Custom content for minimized bar (overrides default buttons) */
  minimizedBarContent?: ReactNode;
  
  /** Whether to show the always-visible toggle button */
  showToggle?: boolean;
  
  /** Whether to use transparent background */
  transparent?: boolean;
  
  /** Whether to hide the border */
  noBorder?: boolean;
}

function getSavedSize(storageKey: string | undefined, defaultSize: number): number {
  if (!storageKey) return defaultSize;
  
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const size = parseInt(saved, 10);
      if (!isNaN(size) && size > 0) {
        return size;
      }
    }
  } catch {
    // localStorage might not be available
  }
  return defaultSize;
}

function saveSize(storageKey: string | undefined, size: number): void {
  if (!storageKey) return;
  
  try {
    localStorage.setItem(storageKey, String(size));
  } catch {
    // localStorage might not be available
  }
}

export function Drawer({
  side,
  isOpen,
  onClose,
  onOpen,
  children,
  title,
  minSize = side === 'left' || side === 'right' ? 320 : 200,
  maxSize = side === 'left' || side === 'right' ? 600 : 800,
  defaultSize = side === 'left' || side === 'right' ? 384 : 300,
  minimizedSize = 40,
  storageKey,
  initialMinimized = false,
  className,
  showMinimizedBar = true,
  minimizedBarContent,
  showToggle = false,
  transparent = false,
  noBorder = false,
}: DrawerProps) {
  const [currentSize, setCurrentSize] = useState(0); // Always start at 0 for animation
  const [isResizing, setIsResizing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(initialMinimized);
  const [hasContent, setHasContent] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  
  const isHorizontal = side === 'left' || side === 'right';
  
  const toggleMinimize = useCallback(() => {
    setIsMinimized((prev) => !prev);
  }, []);
  
  // Handle open/close transitions
  useEffect(() => {
    if (isOpen) {
      // Opening - set content flag, then animate size open after two frames
      // to ensure the browser has painted the size:0 state first
      setHasContent(true);
      const size = getSavedSize(storageKey, defaultSize);
      // Double rAF ensures the DOM paints with size 0 before we animate to target size
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCurrentSize(size);
        });
      });
    } else {
      // Closing - animate size to 0, then clear content
      setCurrentSize(0);
      const timer = setTimeout(() => {
        setHasContent(false);
        setIsMinimized(false); // Reset minimized state when closing
      }, 200); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, storageKey, defaultSize]);
  
  // Resize handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);
  
  useEffect(() => {
    if (!isResizing) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!drawerRef.current) return;
      
      let newSize: number;
      
      if (side === 'right') {
        const containerRight = window.innerWidth;
        newSize = containerRight - e.clientX;
      } else if (side === 'left') {
        newSize = e.clientX;
      } else if (side === 'bottom') {
        const containerBottom = window.innerHeight;
        newSize = containerBottom - e.clientY;
      } else if (side === 'top') {
        newSize = e.clientY;
      } else {
        return;
      }
      
      const clampedSize = Math.max(minSize, Math.min(maxSize, newSize));
      setCurrentSize(clampedSize);
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      saveSize(storageKey, currentSize);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    document.body.style.userSelect = 'none';
    document.body.style.cursor = isHorizontal ? 'ew-resize' : 'ns-resize';
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isResizing, currentSize, side, minSize, maxSize, storageKey, isHorizontal]);
  
  // Get the base toggle chevron icon based on side (always points toward open direction)
  const getToggleIcon = () => {
    switch (side) {
      case 'left': return ChevronRight;
      case 'right': return ChevronLeft;
      case 'top': return ChevronDown;
      case 'bottom': return ChevronUp;
    }
  };
  
  const ToggleIcon = getToggleIcon();
  
  const handleToggle = () => {
    if (isOpen) {
      onClose();
    } else if (onOpen) {
      onOpen();
    }
  };
  
  // Calculate display size - use minimized size when minimized
  const displaySize = isMinimized ? minimizedSize : currentSize;
  
  // Get appropriate minimize/expand icon based on side
  const getMinimizeIcon = () => {
    if (isMinimized) {
      return side === 'left' ? ChevronRight : side === 'right' ? ChevronLeft : side === 'top' ? ChevronDown : ChevronUp;
    } else {
      return side === 'left' ? ChevronLeft : side === 'right' ? ChevronRight : side === 'top' ? ChevronUp : ChevronDown;
    }
  };
  
  const MinimizeIcon = getMinimizeIcon();
  
  // Get resize handle position and cursor
  const getResizeHandleProps = () => {
    switch (side) {
      case 'left':
        return { position: 'right', cursor: 'ew-resize', horizontal: false };
      case 'right':
        return { position: 'left', cursor: 'ew-resize', horizontal: false };
      case 'top':
        return { position: 'bottom', cursor: 'ns-resize', horizontal: true };
      case 'bottom':
        return { position: 'top', cursor: 'ns-resize', horizontal: true };
    }
  };
  
  const resizeHandleProps = getResizeHandleProps();
  
  const drawerClassName = clsx(
    styles.drawer,
    styles[`drawer${side.charAt(0).toUpperCase() + side.slice(1)}`],
    isResizing && styles.drawerResizing,
    isMinimized && styles.drawerMinimized,
    transparent && styles.drawerTransparent,
    noBorder && styles.drawerNoBorder,
    className
  );
  
  const drawerStyle: React.CSSProperties = isHorizontal
    ? { width: displaySize }
    : { height: displaySize };
  
  // For left/right drawers with showToggle - single panel that expands/collapses
  if (showToggle && isHorizontal && onOpen) {
    const toggleWidth = 32;
    // Panel width: when closed just the toggle strip, when open toggle + content
    const panelWidth = toggleWidth + displaySize;
    
    const panelClass = clsx(
      styles.togglePanel,
      styles[`togglePanel${side.charAt(0).toUpperCase() + side.slice(1)}`],
      transparent && styles.togglePanelTransparent,
      noBorder && styles.togglePanelNoBorder,
      isResizing && styles.togglePanelResizing
    );
    
    return (
      <div 
        ref={drawerRef}
        className={panelClass} 
        style={{ width: panelWidth }}
      >
        {/* Resize handle */}
        {displaySize > 0 && (
          <div
            className={clsx(
              styles.resizeHandle,
              side === 'left' ? styles.resizeHandleRight : styles.resizeHandleLeft
            )}
            onMouseDown={handleMouseDown}
          >
            <div className={clsx(styles.resizeHandleLine, styles.resizeHandleLineVertical)} />
          </div>
        )}
        
        {/* Header - full width, contains chevron and optional title */}
        <div className={clsx(
          styles.panelHeader,
          side === 'right' && styles.panelHeaderRight,
          noBorder && styles.panelHeaderNoBorder
        )}>
          <button
            className={styles.panelToggle}
            onClick={handleToggle}
            title={isOpen ? 'Close' : 'Open'}
            type="button"
          >
            <ToggleIcon 
              size={16} 
              className={clsx(styles.toggleIcon, isOpen && styles.toggleIconRotated)} 
            />
          </button>
          {title && displaySize > 0 && (
            <span className={clsx(
              styles.panelTitle,
              displaySize === 0 && styles.panelTitleHidden
            )}>{title}</span>
          )}
        </div>
        
        {/* Content area - full width below header */}
        <div 
          className={clsx(
            styles.panelContent,
            displaySize === 0 && styles.panelContentHidden
          )}
        >
          {children}
        </div>
      </div>
    );
  }
  
  // For top/bottom drawers or non-toggle mode, use the original toggle container
  if (currentSize === 0 && !hasContent) {
    if (showToggle && onOpen) {
      return (
        <div className={clsx(
          styles.toggleContainer,
          styles[`toggleContainer${side.charAt(0).toUpperCase() + side.slice(1)}`],
          transparent && styles.toggleContainerTransparent,
          noBorder && styles.toggleContainerNoBorder
        )}>
          <button
            className={styles.toggle}
            onClick={handleToggle}
            title="Open"
            type="button"
          >
            <ToggleIcon 
              size={16} 
              className={clsx(styles.toggleIcon, isOpen && styles.toggleIconRotated)} 
            />
          </button>
        </div>
      );
    }
    return null;
  }
  
  return (
    <div ref={drawerRef} className={drawerClassName} style={drawerStyle}>
      {/* Minimized bar (only for horizontal drawers) */}
      {isMinimized && isHorizontal && showMinimizedBar ? (
        <div className={styles.minimizedBar}>
          {minimizedBarContent || (
            <>
              <button className={styles.minimizedButton} onClick={toggleMinimize} title="Expand">
                <MinimizeIcon size={16} />
              </button>
              <button className={styles.minimizedButton} onClick={onClose} title="Close">
                <X size={16} />
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Resize handle */}
          {currentSize > 0 && (
            <div
              className={clsx(
                styles.resizeHandle,
                styles[`resizeHandle${resizeHandleProps.position.charAt(0).toUpperCase() + resizeHandleProps.position.slice(1)}`]
              )}
              onMouseDown={handleMouseDown}
            >
              <div
                className={clsx(
                  styles.resizeHandleLine,
                  resizeHandleProps.horizontal ? styles.resizeHandleLineHorizontal : styles.resizeHandleLineVertical
                )}
              />
              {/* Minimize button (only for horizontal drawers with minimizedBar enabled, when showToggle is false) */}
              {!showToggle && isHorizontal && showMinimizedBar && (
                <button
                  className={styles.minimizeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMinimize();
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  title="Minimize"
                  type="button"
                >
                  <MinimizeIcon size={14} />
                </button>
              )}
            </div>
          )}
          
          {/* Content */}
          <div
            className={clsx(styles.drawerInner, currentSize === 0 && styles.drawerInnerHidden)}
            style={isHorizontal ? { width: currentSize } : { height: currentSize }}
          >
            {/* Header with title and toggle */}
            {(title || showToggle) && currentSize > 0 && (
              <div className={styles.drawerHeader}>
                {title && <span className={styles.drawerTitle}>{title}</span>}
                {showToggle && (
                  <button
                    className={styles.headerToggle}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle();
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    title={isOpen ? 'Close' : 'Open'}
                    type="button"
                  >
                    <ToggleIcon 
                      size={16} 
                      className={clsx(styles.toggleIcon, isOpen && styles.toggleIconRotated)} 
                    />
                  </button>
                )}
              </div>
            )}
            {children}
          </div>
        </>
      )}
    </div>
  );
}
