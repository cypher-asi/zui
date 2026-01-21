import { type ReactNode, useState, useRef, useEffect, useLayoutEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '../../Button';
import styles from './MenuDropdown.module.css';

export interface MenuDropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

export interface MenuDropdownProps {
  items: MenuDropdownItem[];
  trigger?: ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export function MenuDropdown({ items, trigger, align = 'right', className }: MenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if dropdown would go off-screen and adjust position (runs before paint)
  useLayoutEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const padding = 8; // Small padding from viewport edge
      
      // If dropdown bottom edge is below viewport, shift it up
      if (rect.bottom > viewportHeight - padding) {
        const overflow = rect.bottom - viewportHeight + padding;
        setOffsetY(-overflow);
      } else {
        setOffsetY(0);
      }

      // If dropdown right edge is beyond viewport, shift it left
      if (rect.right > viewportWidth - padding) {
        const overflow = rect.right - viewportWidth + padding;
        setOffsetX(-overflow);
      } else {
        setOffsetX(0);
      }
    } else {
      setOffsetY(0);
      setOffsetX(0);
    }
  }, [isOpen]);

  const handleItemClick = (item: MenuDropdownItem) => {
    if (!item.disabled) {
      item.onClick();
      setIsOpen(false);
    }
  };

  return (
    <div className={clsx(styles.container, className)} ref={menuRef}>
      {trigger ? (
        <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className={isOpen ? styles.triggerActive : ''}
        >
          <MoreVertical size={16} />
        </Button>
      )}

      {isOpen && (
        <div
          ref={dropdownRef}
          className={clsx(
            styles.dropdown,
            align === 'left' && styles.dropdownLeft
          )}
          style={(offsetX !== 0 || offsetY !== 0) ? { transform: `translate(${offsetX}px, ${offsetY}px)` } : undefined}
        >
          {items.map((item, index) =>
            item.divider ? (
              <hr key={`divider-${index}`} className={styles.divider} />
            ) : (
              <button
                key={item.id}
                className={clsx(styles.item, item.danger && styles.itemDanger)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(item);
                }}
                disabled={item.disabled}
              >
                {item.icon}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
