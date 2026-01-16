export interface ComponentInfo {
  id: string;
  name: string;
  category: 'Atomic' | 'Composite' | 'Utilities';
  description: string;
  path: string;
}

export const components: ComponentInfo[] = [
  // Atomic Components
  {
    id: 'avatar',
    name: 'Avatar',
    category: 'Atomic',
    description: 'Display user or organization images with automatic fallback to initials.',
    path: '../../zui/src/components/atomic/Avatar/Avatar.tsx',
  },
  {
    id: 'button',
    name: 'Button',
    category: 'Atomic',
    description: 'Clickable button element with multiple variants for different use cases and visual styles.',
    path: '../../zui/src/components/atomic/Button/Button.tsx',
  },
  {
    id: 'input',
    name: 'Input',
    category: 'Atomic',
    description: 'Text input field with size variants and optional monospace font for code or data entry.',
    path: '../../zui/src/components/atomic/Input/Input.tsx',
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'Atomic',
    description: 'Multi-line text input field for longer text content with size variants.',
    path: '../../zui/src/components/atomic/Textarea/Textarea.tsx',
  },
  {
    id: 'select',
    name: 'Select',
    category: 'Atomic',
    description: 'Dropdown selection input for choosing from a list of options.',
    path: '../../zui/src/components/atomic/Select/Select.tsx',
  },
  {
    id: 'toggle',
    name: 'Toggle',
    category: 'Atomic',
    description: 'Boolean switch/toggle control with success variant for enabled states.',
    path: '../../zui/src/components/atomic/Toggle/Toggle.tsx',
  },
  {
    id: 'card',
    name: 'Card',
    category: 'Atomic',
    description: 'Content container with border and background for grouping related information.',
    path: '../../zui/src/components/composite/Card/Card.tsx',
  },
  {
    id: 'badge',
    name: 'Badge',
    category: 'Atomic',
    description: 'Status indicator or label with variants for different states (success, error, warning, etc.).',
    path: '../../zui/src/components/atomic/Badge/Badge.tsx',
  },
  {
    id: 'modal',
    name: 'Modal',
    category: 'Atomic',
    description: 'Dialog overlay for displaying content above the main page with backdrop and animations.',
    path: '../../zui/src/components/composite/Modal/Modal.tsx',
  },
  {
    id: 'confirm-modal',
    name: 'ConfirmModal',
    category: 'Atomic',
    description: 'Confirmation dialog with customizable actions for destructive or important operations.',
    path: '../../zui/src/components/composite/ConfirmModal/ConfirmModal.tsx',
  },
  {
    id: 'spinner',
    name: 'Spinner',
    category: 'Atomic',
    description: 'Loading spinner indicator with multiple size variants.',
    path: '../../zui/src/components/atomic/Spinner/Spinner.tsx',
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Atomic',
    description: 'Tab navigation with smooth animations and optional icons for organizing content.',
    path: '../../zui/src/components/composite/Tabs/Tabs.tsx',
  },
  {
    id: 'dropdown-menu',
    name: 'DropdownMenu',
    category: 'Atomic',
    description: 'Dropdown menu with items for contextual actions and commands.',
    path: '../../zui/src/components/composite/DropdownMenu/DropdownMenu.tsx',
  },
  {
    id: 'refresh-button',
    name: 'RefreshButton',
    category: 'Atomic',
    description: 'Button with refresh icon and loading state for triggering data refreshes.',
    path: '../../zui/src/components/composite/RefreshButton/RefreshButton.tsx',
  },
  
  // Composite Components
  {
    id: 'page',
    name: 'Page',
    category: 'Composite',
    description: 'Full page layout structure with consistent spacing and styling.',
    path: '../../zui/src/components/composite/Page/Page.tsx',
  },
  {
    id: 'page-header',
    name: 'PageHeader',
    category: 'Composite',
    description: 'Page header with title, breadcrumbs, tabs, and action buttons.',
    path: '../../zui/src/components/composite/PageHeader/PageHeader.tsx',
  },
  {
    id: 'page-list',
    name: 'PageList',
    category: 'Composite',
    description: 'Data list with search filtering and empty state handling.',
    path: '../../zui/src/components/composite/PageList/PageList.tsx',
  },
  {
    id: 'page-empty-state',
    name: 'PageEmptyState',
    category: 'Composite',
    description: 'Empty state message with icon, title, message, and call-to-action.',
    path: '../../zui/src/components/composite/PageEmptyState/PageEmptyState.tsx',
  },
  {
    id: 'page-loader',
    name: 'PageLoader',
    category: 'Composite',
    description: 'Full-page loading state with centered spinner.',
    path: '../../zui/src/components/composite/PageLoader/PageLoader.tsx',
  },
  {
    id: 'item-card',
    name: 'ItemCard',
    category: 'Composite',
    description: 'Card for displaying list items with metadata, badges, and action buttons.',
    path: '../../zui/src/components/composite/ItemCard/ItemCard.tsx',
  },
  {
    id: 'collapsible-group',
    name: 'CollapsibleGroup',
    category: 'Composite',
    description: 'Expandable/collapsible section for hiding and showing content.',
    path: '../../zui/src/components/composite/CollapsibleGroup/CollapsibleGroup.tsx',
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    category: 'Composite',
    description: 'Navigation sidebar with sections and items.',
    path: '../../zui/src/components/composite/Sidebar/Sidebar.tsx',
  },
  {
    id: 'toasts',
    name: 'Toasts',
    category: 'Composite',
    description: 'Toast notification system with success, error, and info variants.',
    path: '../../zui/src/components/composite/Toasts/Toasts.tsx',
  },
  {
    id: 'drawer',
    name: 'Drawer',
    category: 'Composite',
    description: 'Resizable drawer panel that slides in from any side with minimize support.',
    path: '../../zui/src/components/composite/Drawer/Drawer.tsx',
  },
];

export const componentsByCategory = {
  Atomic: components.filter(c => c.category === 'Atomic'),
  Composite: components.filter(c => c.category === 'Composite'),
  Utilities: components.filter(c => c.category === 'Utilities'),
};
