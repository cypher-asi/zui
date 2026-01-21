import { useState, useEffect, useCallback, RefObject } from 'react';

export type ResizeSide = 'left' | 'right' | 'top' | 'bottom';

export interface UseResizeOptions {
  /** Which side the resize handle is on */
  side: ResizeSide;
  /** Minimum size in pixels */
  minSize: number;
  /** Maximum size in pixels */
  maxSize: number;
  /** Default size in pixels */
  defaultSize: number;
  /** LocalStorage key for persisting size (optional) */
  storageKey?: string;
  /** Reference to the resizable element */
  elementRef: RefObject<HTMLElement | null>;
  /** Additional offset to subtract from size calculation (e.g., toggle strip width) */
  offset?: number;
  /** Whether resize is enabled */
  enabled?: boolean;
  /** Callback when resize starts (e.g., to open a closed drawer) */
  onResizeStart?: () => void;
  /** Callback during resize (called on every mouse move) */
  onResize?: (size: number) => void;
  /** Callback when resize ends (size is persisted) */
  onResizeEnd?: (size: number) => void;
}

export interface UseResizeReturn {
  /** Current size in pixels */
  size: number;
  /** Whether currently resizing */
  isResizing: boolean;
  /** Mouse down handler for the resize handle */
  handleMouseDown: (e: React.MouseEvent) => void;
  /** Manually set the size */
  setSize: (size: number) => void;
}

/**
 * Get saved size from localStorage
 */
function getSavedSize(storageKey: string | undefined, defaultSize: number, minSize: number, maxSize: number): number {
  if (!storageKey) return defaultSize;
  
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const size = parseInt(saved, 10);
      if (!isNaN(size) && size >= minSize && size <= maxSize) {
        return size;
      }
    }
  } catch {
    // localStorage might not be available
  }
  return defaultSize;
}

/**
 * Save size to localStorage
 */
function saveSize(storageKey: string | undefined, size: number): void {
  if (!storageKey) return;
  
  try {
    localStorage.setItem(storageKey, String(size));
  } catch {
    // localStorage might not be available
  }
}

/**
 * Hook for handling resize interactions on panels, drawers, and sidebars.
 * 
 * Provides consistent resize behavior:
 * - Drag to resize from any edge
 * - Respects min/max constraints
 * - Persists size to localStorage
 * - Handles cursor styling during drag
 * - Calculates size relative to parent container (not window)
 * 
 * @example
 * ```tsx
 * const { size, isResizing, handleMouseDown } = useResize({
 *   side: 'left',
 *   minSize: 200,
 *   maxSize: 600,
 *   defaultSize: 300,
 *   storageKey: 'sidebar-width',
 *   elementRef: sidebarRef,
 * });
 * ```
 */
export function useResize({
  side,
  minSize,
  maxSize,
  defaultSize,
  storageKey,
  elementRef,
  offset = 0,
  enabled = true,
  onResizeStart,
  onResize,
  onResizeEnd,
}: UseResizeOptions): UseResizeReturn {
  const [size, setSize] = useState(() => 
    enabled ? getSavedSize(storageKey, defaultSize, minSize, maxSize) : defaultSize
  );
  const [isResizing, setIsResizing] = useState(false);
  
  const isHorizontal = side === 'left' || side === 'right';
  
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!enabled) return;
    e.preventDefault();
    
    // Call onResizeStart (e.g., to open a closed drawer)
    onResizeStart?.();
    
    setIsResizing(true);
  }, [enabled, onResizeStart]);
  
  useEffect(() => {
    if (!isResizing || !enabled) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;
      
      // Get the parent container bounds for relative positioning
      const parent = elementRef.current.parentElement;
      const parentRect = parent?.getBoundingClientRect();
      
      let newSize: number;
      
      if (side === 'right') {
        // Calculate from the right edge of the parent container
        const containerRight = parentRect ? parentRect.right : window.innerWidth;
        newSize = containerRight - e.clientX;
      } else if (side === 'left') {
        // Calculate from the left edge of the parent container
        const containerLeft = parentRect ? parentRect.left : 0;
        newSize = e.clientX - containerLeft;
      } else if (side === 'bottom') {
        // Calculate from the bottom edge of the parent container
        const containerBottom = parentRect ? parentRect.bottom : window.innerHeight;
        newSize = containerBottom - e.clientY;
      } else if (side === 'top') {
        // Calculate from the top edge of the parent container
        const containerTop = parentRect ? parentRect.top : 0;
        newSize = e.clientY - containerTop;
      } else {
        return;
      }
      
      // Subtract offset (e.g., toggle strip width)
      newSize = newSize - offset;
      
      const clampedSize = Math.max(minSize, Math.min(maxSize, newSize));
      setSize(clampedSize);
      onResize?.(clampedSize);
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      saveSize(storageKey, size);
      onResizeEnd?.(size);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Set cursor style during resize
    document.body.style.userSelect = 'none';
    document.body.style.cursor = isHorizontal ? 'ew-resize' : 'ns-resize';
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isResizing, enabled, size, side, minSize, maxSize, storageKey, elementRef, offset, isHorizontal, onResize, onResizeEnd]);
  
  return {
    size,
    isResizing,
    handleMouseDown,
    setSize,
  };
}
