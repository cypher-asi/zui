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
    id: 'button',
    name: 'Button',
    category: 'Atomic',
    description: 'Clickable button element with multiple variants for different use cases and visual styles.',
    path: '../src/components/Button/Button.tsx',
  },
  {
    id: 'input',
    name: 'Input',
    category: 'Atomic',
    description: 'Text input field with size variants and optional monospace font for code or data entry.',
    path: '../src/components/Input/Input.tsx',
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'Atomic',
    description: 'Multi-line text input field for longer text content with size variants.',
    path: '../src/components/Textarea/Textarea.tsx',
  },
  {
    id: 'select',
    name: 'Select',
    category: 'Atomic',
    description: 'Dropdown selection input for choosing from a list of options.',
    path: '../src/components/Select/Select.tsx',
  },
  {
    id: 'toggle',
    name: 'Toggle',
    category: 'Atomic',
    description: 'Boolean switch/toggle control with success variant for enabled states.',
    path: '../src/components/Toggle/Toggle.tsx',
  },
  {
    id: 'card',
    name: 'Card',
    category: 'Atomic',
    description: 'Content container with border and background for grouping related information.',
    path: '../src/components/Card/Card.tsx',
  },
  {
    id: 'badge',
    name: 'Badge',
    category: 'Atomic',
    description: 'Status indicator or label with variants for different states (success, error, warning, etc.).',
    path: '../src/components/Badge/Badge.tsx',
  },
  {
    id: 'modal',
    name: 'Modal',
    category: 'Atomic',
    description: 'Dialog overlay for displaying content above the main page with backdrop and animations.',
    path: '../src/components/Modal/Modal.tsx',
  },
  {
    id: 'confirm-modal',
    name: 'ConfirmModal',
    category: 'Atomic',
    description: 'Confirmation dialog with customizable actions for destructive or important operations.',
    path: '../src/components/ConfirmModal/ConfirmModal.tsx',
  },
  {
    id: 'spinner',
    name: 'Spinner',
    category: 'Atomic',
    description: 'Loading spinner indicator with multiple size variants.',
    path: '../src/components/Spinner/Spinner.tsx',
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Atomic',
    description: 'Tab navigation with smooth animations and optional icons for organizing content.',
    path: '../src/components/Tabs/Tabs.tsx',
  },
  {
    id: 'dropdown-menu',
    name: 'DropdownMenu',
    category: 'Atomic',
    description: 'Dropdown menu with items for contextual actions and commands.',
    path: '../src/components/DropdownMenu/DropdownMenu.tsx',
  },
  {
    id: 'refresh-button',
    name: 'RefreshButton',
    category: 'Atomic',
    description: 'Button with refresh icon and loading state for triggering data refreshes.',
    path: '../src/components/RefreshButton/RefreshButton.tsx',
  },
  
  // Composite Components
  {
    id: 'page',
    name: 'Page',
    category: 'Composite',
    description: 'Full page layout structure with consistent spacing and styling.',
    path: '../src/components/Page/Page.tsx',
  },
  {
    id: 'page-header',
    name: 'PageHeader',
    category: 'Composite',
    description: 'Page header with title, breadcrumbs, tabs, and action buttons.',
    path: '../src/components/PageHeader/PageHeader.tsx',
  },
  {
    id: 'page-list',
    name: 'PageList',
    category: 'Composite',
    description: 'Data list with search filtering and empty state handling.',
    path: '../src/components/PageList/PageList.tsx',
  },
  {
    id: 'page-empty-state',
    name: 'PageEmptyState',
    category: 'Composite',
    description: 'Empty state message with icon, title, message, and call-to-action.',
    path: '../src/components/PageEmptyState/PageEmptyState.tsx',
  },
  {
    id: 'page-loader',
    name: 'PageLoader',
    category: 'Composite',
    description: 'Full-page loading state with centered spinner.',
    path: '../src/components/PageLoader/PageLoader.tsx',
  },
  {
    id: 'item-card',
    name: 'ItemCard',
    category: 'Composite',
    description: 'Card for displaying list items with metadata, badges, and action buttons.',
    path: '../src/components/ItemCard/ItemCard.tsx',
  },
  {
    id: 'collapsible-group',
    name: 'CollapsibleGroup',
    category: 'Composite',
    description: 'Expandable/collapsible section for hiding and showing content.',
    path: '../src/components/CollapsibleGroup/CollapsibleGroup.tsx',
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    category: 'Composite',
    description: 'Navigation sidebar with sections and items.',
    path: '../src/components/Sidebar/Sidebar.tsx',
  },
  {
    id: 'toasts',
    name: 'Toasts',
    category: 'Composite',
    description: 'Toast notification system with success, error, and info variants.',
    path: '../src/components/Toasts/Toasts.tsx',
  },
];

export const componentsByCategory = {
  Atomic: components.filter(c => c.category === 'Atomic'),
  Composite: components.filter(c => c.category === 'Composite'),
  Utilities: components.filter(c => c.category === 'Utilities'),
};
