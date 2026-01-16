// This file contains source code strings for each component
// In a production setup, you could use a Vite plugin to automatically import these

export const componentSources: Record<string, string> = {
  'button': `import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md';

type ButtonAsButton = {
  as?: 'button';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsSpan = {
  as: 'span';
} & React.HTMLAttributes<HTMLSpanElement>;

export type ButtonProps = (ButtonAsButton | ButtonAsSpan) & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLSpanElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', iconOnly = false, className, as = 'button', ...props },
    ref
  ) => {
    const classNames = clsx(
      styles.button,
      styles[variant],
      size === 'sm' && styles.sm,
      iconOnly && styles.iconOnly,
      className
    );

    if (as === 'span') {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={classNames}
          {...(props as React.HTMLAttributes<HTMLSpanElement>)}
        />
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classNames}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  }
);

Button.displayName = 'Button';`,

  'input': `import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  mono?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', mono = false, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(styles.input, size === 'sm' && styles.sm, mono && styles.mono, className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';`,

  'textarea': `import React from 'react';
import clsx from 'clsx';
import styles from './Textarea.module.css';

export type TextareaSize = 'sm' | 'md';

export interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> {
  size?: TextareaSize;
  mono?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ size = 'md', mono = false, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          styles.textarea,
          size === 'sm' && styles.sm,
          mono && styles.mono,
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';`,

  'select': `import React from 'react';
import clsx from 'clsx';
import styles from './Select.module.css';

export type SelectSize = 'sm' | 'md';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: SelectSize;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ size = 'md', className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={clsx(styles.select, size === 'sm' && styles.sm, className)}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';`,

  'toggle': `import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Toggle.module.css';

export type ToggleSize = 'sm' | 'md';
export type ToggleVariant = 'default' | 'accent';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Size of the toggle */
  size?: ToggleSize;
  /** Color variant when checked */
  variant?: ToggleVariant;
  /** Optional label text */
  label?: string;
  /** Position of the label */
  labelPosition?: 'left' | 'right';
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  {
    size = 'sm',
    variant = 'default',
    label,
    labelPosition = 'right',
    className,
    disabled,
    ...props
  },
  ref
) {
  return (
    <label
      className={clsx(
        styles.toggle,
        styles[size],
        styles[variant],
        label && styles.withLabel,
        disabled && styles.disabled,
        className
      )}
    >
      <input ref={ref} type="checkbox" className={styles.input} disabled={disabled} {...props} />
      <span className={styles.slider} />
      {label && (
        <span className={clsx(styles.label, labelPosition === 'left' && styles.labelLeft)}>
          {label}
        </span>
      )}
    </label>
  );
});`,

  'card': `import React from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div className={clsx(styles.card, className)} {...props}>
      {children}
    </div>
  );
};`,

  'badge': `import React from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

export type BadgeVariant = 'running' | 'stopped' | 'error' | 'pending' | 'provisioning';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  pulse = false,
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={clsx(styles.badge, styles[variant], pulse && styles.pulse, className)}
      {...props}
    >
      {pulse && <span className={styles.dot} />}
      {children}
    </span>
  );
};`,

  'spinner': `import clsx from 'clsx';
import styles from './Spinner.module.css';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={clsx(
        styles.spinner,
        size === 'sm' && styles.spinnerSm,
        size === 'lg' && styles.spinnerLg,
        className
      )}
    />
  );
}`,

  'modal': `import React, { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  headerActions?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  initialFocusRef?: React.RefObject<HTMLElement>;
  size?: ModalSize;
  animateHeight?: boolean;
  fullHeight?: boolean;
  noPadding?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  headerActions,
  className,
  contentClassName,
  titleClassName,
  initialFocusRef,
  size = 'md',
  animateHeight = false,
  fullHeight = false,
  noPadding = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
    } else {
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, initialFocusRef]);

  useLayoutEffect(() => {
    if (!animateHeight || !contentRef.current || !isOpen) return;

    const updateHeight = () => {
      if (contentRef.current) {
        const height = contentRef.current.scrollHeight;
        setContentHeight(height);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(contentRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [animateHeight, isOpen, children]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <div
        ref={modalRef}
        className={clsx(styles.modal, styles[size], fullHeight && styles.fullHeight, className)}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <h2 className={clsx(styles.title, titleClassName)}>{title}</h2>
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          </div>
          <div className={styles.headerRight}>
            {headerActions && <div className={styles.headerActions}>{headerActions}</div>}
            <button onClick={onClose} className={styles.closeButton}>
              <X size={20} />
            </button>
          </div>
        </div>
        {animateHeight ? (
          <div className={styles.contentWrapper} style={{ height: contentHeight }}>
            <div
              ref={contentRef}
              className={clsx(styles.content, noPadding && styles.noPadding, contentClassName)}
            >
              {children}
            </div>
          </div>
        ) : (
          <div
            className={clsx(
              styles.content,
              noPadding && styles.noPadding,
              fullHeight && styles.contentFullHeight,
              contentClassName
            )}
          >
            {children}
          </div>
        )}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body
  );
};`,

  'confirm-modal': `import type { ReactNode } from 'react';
import { Modal } from '../Modal';
import { Button } from '../../atomic/Button';
import styles from './ConfirmModal.module.css';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  isLoading = false,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onConfirm}
            disabled={isLoading}
            className={danger ? styles.dangerButton : undefined}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className={styles.message}>{message}</div>
    </Modal>
  );
}`,

  'tabs': `import { useRef, useState, useEffect, useLayoutEffect, useCallback, type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Tabs.module.css';

export interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
  tabClassName?: string;
  size?: 'sm' | 'md';
}

export function Tabs({
  tabs,
  activeTab,
  onTabChange,
  className,
  tabClassName,
  size = 'sm',
}: TabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  const updateIndicator = useCallback(() => {
    const activeButton = tabRefs.current.get(activeTab);
    const container = containerRef.current;

    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });

      if (!isInitialized) {
        requestAnimationFrame(() => setIsInitialized(true));
      }
    }
  }, [activeTab, isInitialized]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateIndicator]);

  return (
    <div className={clsx(styles.tabs, className)}>
      <div ref={containerRef} className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) {
                tabRefs.current.set(tab.id, el);
              } else {
                tabRefs.current.delete(tab.id);
              }
            }}
            onClick={() => onTabChange(tab.id)}
            className={clsx(
              styles.tab,
              size === 'md' && styles.tabMd,
              activeTab === tab.id && styles.active,
              tabClassName
            )}
          >
            {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
        <div
          className={clsx(styles.indicator, isInitialized && styles.indicatorAnimated)}
          style={{
            transform: \`translateX(\${indicatorStyle.left}px)\`,
            width: indicatorStyle.width,
          }}
        />
      </div>
    </div>
  );
}`,

  'dropdown-menu': `import { type ReactNode, useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '../../atomic/Button';
import styles from './DropdownMenu.module.css';

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
}

export interface DropdownMenuProps {
  items: DropdownMenuItem[];
  trigger?: ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export function DropdownMenu({ items, trigger, align = 'right', className }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: DropdownMenuItem) => {
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
        <div className={clsx(styles.dropdown, align === 'left' && styles.dropdownLeft)}>
          {items.map((item, index) =>
            item.divider ? (
              <hr key={\`divider-\${index}\`} className={styles.divider} />
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
}`,

  'refresh-button': `import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '../../atomic/Button';
import styles from './RefreshButton.module.css';

export interface RefreshButtonProps {
  onRefresh: () => void;
  isRefreshing?: boolean;
  title?: string;
  iconSize?: number;
}

export function RefreshButton({
  onRefresh,
  isRefreshing = false,
  title = 'Refresh',
  iconSize = 14,
}: RefreshButtonProps) {
  const [isClicking, setIsClicking] = useState(false);

  const handleClick = () => {
    setIsClicking(true);
    onRefresh();
  };

  useEffect(() => {
    if (isClicking) {
      const timer = setTimeout(() => {
        setIsClicking(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isClicking]);

  const getIconClassName = () => {
    if (isRefreshing) return styles.spinning;
    if (isClicking) return styles.rotating;
    return '';
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      iconOnly
      onClick={handleClick}
      disabled={isRefreshing}
      title={title}
    >
      <RefreshCw size={iconSize} className={getIconClassName()} />
    </Button>
  );
}`,

  'page': `import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Page.module.css';

export interface PageProps {
  title: string;
  count?: number;
  actions?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  children: ReactNode;
  className?: string;
}

export function Page({
  title,
  count,
  actions,
  isLoading = false,
  loadingText = 'Loading...',
  children,
  className,
}: PageProps) {
  return (
    <div className={clsx(styles.page, className)}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>{title}</h1>
          {count !== undefined && <span className={styles.count}>{count}</span>}
        </div>
        {actions && <div className={styles.headerRight}>{actions}</div>}
      </header>

      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.loadingState}>
            <span className={styles.loadingText}>{loadingText}</span>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}`,

  'page-header': `import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './PageHeader.module.css';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: ReactNode;
  count?: number | string;
  actions?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  count,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header className={clsx(styles.pageHeader, className)} {...props}>
      <div className={styles.headerLeft}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>
        {count !== undefined && <span className={styles.count}>{count}</span>}
      </div>
      {actions && <div className={styles.headerRight}>{actions}</div>}
    </header>
  );
}`,

  'page-list': `import type { ReactNode } from 'react';
import styles from './PageList.module.css';

export interface PageListProps {
  children: ReactNode;
}

export function PageList({ children }: PageListProps) {
  return <div className={styles.list}>{children}</div>;
}`,

  'page-empty-state': `import type { ReactNode } from 'react';
import styles from './PageEmptyState.module.css';

export interface PageEmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageEmptyState({ icon, title, description, actions }: PageEmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyContent}>
        {icon && <div className={styles.emptyIcon}>{icon}</div>}
        <div className={styles.emptyText}>
          <p className={styles.emptyTitle}>{title}</p>
          {description && <p className={styles.emptyDesc}>{description}</p>}
        </div>
        {actions && <div className={styles.emptyActions}>{actions}</div>}
      </div>
    </div>
  );
}`,

  'page-loader': `import { Spinner } from '../../atomic/Spinner';
import styles from './PageLoader.module.css';

export interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message }: PageLoaderProps) {
  return (
    <div className={styles.pageLoader}>
      <Spinner size="lg" />
      {message && <span className={styles.message}>{message}</span>}
    </div>
  );
}`,

  'item-card': `import type { ReactNode, MouseEvent } from 'react';
import clsx from 'clsx';
import styles from './ItemCard.module.css';

export interface ItemCardProps {
  selected?: boolean;
  onClick?: () => void;
  iconBadge?: ReactNode;
  title: ReactNode;
  titleSans?: boolean;
  statusBadge?: ReactNode;
  meta?: ReactNode;
  secondary?: ReactNode;
  badges?: ReactNode;
  actions?: ReactNode;
  actionsAlwaysVisible?: boolean;
  className?: string;
  children?: ReactNode;
}

export function ItemCard({
  selected,
  onClick,
  iconBadge,
  title,
  titleSans,
  statusBadge,
  meta,
  secondary,
  badges,
  actions,
  actionsAlwaysVisible,
  className,
  children,
}: ItemCardProps) {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <div
      className={clsx(styles.card, selected && styles.cardSelected, className)}
      onClick={handleClick}
    >
      {iconBadge && (
        <div className={styles.iconBadge}>
          {typeof iconBadge === 'string' ? (
            <span className={styles.iconBadgeText}>{iconBadge}</span>
          ) : (
            <span className={styles.iconBadgeIcon}>{iconBadge}</span>
          )}
        </div>
      )}

      <div className={styles.info}>
        <div className={styles.titleRow}>
          <span className={clsx(styles.title, titleSans && styles.titleSans)}>{title}</span>
          {statusBadge}
        </div>
        {meta && <div className={styles.meta}>{meta}</div>}
      </div>

      {children}
      {badges && <div className={styles.badges}>{badges}</div>}
      {secondary && <div className={styles.secondary}>{secondary}</div>}

      {actions && (
        <div
          className={clsx(styles.actions, actionsAlwaysVisible && styles.actionsAlwaysVisible)}
          onClick={(e: MouseEvent) => e.stopPropagation()}
        >
          {actions}
        </div>
      )}
    </div>
  );
}`,

  'collapsible-group': `import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import styles from './CollapsibleGroup.module.css';

export interface CollapsibleGroupProps {
  label: string;
  count?: number;
  stats?: ReactNode;
  defaultCollapsed?: boolean;
  children: ReactNode;
  className?: string;
}

export function CollapsibleGroup({
  label,
  count,
  stats,
  defaultCollapsed = false,
  children,
  className,
}: CollapsibleGroupProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className={clsx(styles.group, className)}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {count !== undefined && <span className={styles.count}>{count}</span>}
        {stats && <div className={styles.stats}>{stats}</div>}
        <button
          className={clsx(styles.toggle, isCollapsed && styles.toggleCollapsed)}
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand' : 'Collapse'}
          type="button"
        >
          <ChevronDown size={16} />
        </button>
      </div>
      <div className={clsx(styles.content, isCollapsed && styles.contentCollapsed)}>
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  );
}`,

  'sidebar': `import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Sidebar.module.css';

export interface SidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  resizable?: boolean;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  storageKey?: string;
  resizePosition?: 'left' | 'right';
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

        {header && <div className={styles['header']}>{header}</div>}
        <div className={styles['content']}>{children}</div>
        {footer && <div className={styles['footer']}>{footer}</div>}
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';`,

  'toasts': `import { useEffect } from 'react';
import { X, Check, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';
import styles from './Toasts.module.css';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

export interface ToastsProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const iconMap = {
  success: Check,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export function Toasts({ toasts, onRemove }: ToastsProps) {
  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => onRemove(toast.id)} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const Icon = iconMap[toast.type];
  const duration = toast.duration ?? 4000;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
    return;
  }, [duration, onClose]);

  return (
    <div className={clsx(styles.toast, styles[toast.type])}>
      <Icon className={styles.icon} />
      <div className={styles.content}>
        <p className={styles.title}>{toast.title}</p>
        {toast.message && <p className={styles.message}>{toast.message}</p>}
      </div>
      <button onClick={onClose} className={styles.closeButton}>
        <X size={14} />
      </button>
    </div>
  );
}`,

  'drawer': `import { useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import styles from './Drawer.module.css';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  side: DrawerSide;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  minimizedSize?: number;
  storageKey?: string;
  initialMinimized?: boolean;
  className?: string;
  showMinimizedBar?: boolean;
  minimizedBarContent?: ReactNode;
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
  children,
  minSize = side === 'left' || side === 'right' ? 320 : 200,
  maxSize = side === 'left' || side === 'right' ? 600 : 800,
  defaultSize = side === 'left' || side === 'right' ? 384 : 300,
  minimizedSize = 40,
  storageKey,
  initialMinimized = false,
  className,
  showMinimizedBar = true,
  minimizedBarContent,
}: DrawerProps) {
  const [currentSize, setCurrentSize] = useState(0);
  const [isResizing, setIsResizing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(initialMinimized);
  const [hasContent, setHasContent] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  
  const isHorizontal = side === 'left' || side === 'right';
  
  const toggleMinimize = useCallback(() => {
    setIsMinimized((prev) => !prev);
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      setHasContent(true);
      const size = getSavedSize(storageKey, defaultSize);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCurrentSize(size);
        });
      });
    } else {
      setCurrentSize(0);
      const timer = setTimeout(() => {
        setHasContent(false);
        setIsMinimized(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, storageKey, defaultSize]);
  
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
  
  if (currentSize === 0 && !hasContent) {
    return null;
  }
  
  const displaySize = isMinimized ? minimizedSize : currentSize;
  
  // Simplified for brevity - full implementation includes minimize/expand logic
  
  const style: React.CSSProperties = isHorizontal
    ? { width: displaySize }
    : { height: displaySize };
  
  return (
    <div ref={drawerRef} className={clsx(styles.drawer, className)} style={style}>
      {children}
    </div>
  );
}`,
};

// Fallback for components without source code
export function getComponentSource(componentId: string): string {
  return componentSources[componentId] || `// Source code for ${componentId} component
// View the actual implementation in: zui/src/components/${componentId}

// This component is part of the ZUI library
// For full source code, please refer to the GitHub repository`;
}
