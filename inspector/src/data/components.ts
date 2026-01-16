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
    id: 'badge',
    name: 'Badge',
    category: 'Atomic',
    description: 'Status indicator or label with variants for different states (success, error, warning, etc.).',
    path: '../../zui/src/components/atomic/Badge/Badge.tsx',
  },
  {
    id: 'button',
    name: 'Button',
    category: 'Atomic',
    description: 'Clickable button element with multiple variants for different use cases and visual styles.',
    path: '../../zui/src/components/atomic/Button/Button.tsx',
  },
  {
    id: 'code',
    name: 'Code',
    category: 'Atomic',
    description: 'Inline code snippets with monospace font styling for displaying code within text.',
    path: '../../zui/src/components/atomic/Code/Code.tsx',
  },
  {
    id: 'container',
    name: 'Container',
    category: 'Atomic',
    description: 'Responsive container component that constrains content width and centers it.',
    path: '../../zui/src/components/atomic/Container/Container.tsx',
  },
  {
    id: 'heading',
    name: 'Heading',
    category: 'Atomic',
    description: 'Semantic heading component with different levels (h1-h6) and styling options.',
    path: '../../zui/src/components/atomic/Heading/Heading.tsx',
  },
  {
    id: 'input',
    name: 'Input',
    category: 'Atomic',
    description: 'Text input field with size variants and optional monospace font for code or data entry.',
    path: '../../zui/src/components/atomic/Input/Input.tsx',
  },
  {
    id: 'nav-item',
    name: 'NavItem',
    category: 'Atomic',
    description: 'Navigation item with optional icon for building sidebar and app bar navigation lists.',
    path: '../../zui/src/components/atomic/NavItem/NavItem.tsx',
  },
  {
    id: 'nav-list',
    name: 'NavList',
    category: 'Atomic',
    description: 'Container component for organizing navigation items in a list.',
    path: '../../zui/src/components/atomic/NavList/NavList.tsx',
  },
  {
    id: 'radio-button',
    name: 'RadioButton',
    category: 'Atomic',
    description: 'Radio button component for selecting a single option from a group.',
    path: '../../zui/src/components/atomic/RadioButton/RadioButton.tsx',
  },
  {
    id: 'select',
    name: 'Select',
    category: 'Atomic',
    description: 'Dropdown selection input for choosing from a list of options.',
    path: '../../zui/src/components/atomic/Select/Select.tsx',
  },
  {
    id: 'spinner',
    name: 'Spinner',
    category: 'Atomic',
    description: 'Loading spinner indicator with multiple size variants.',
    path: '../../zui/src/components/atomic/Spinner/Spinner.tsx',
  },
  {
    id: 'text',
    name: 'Text',
    category: 'Atomic',
    description: 'Text component with various size, weight, and color options.',
    path: '../../zui/src/components/atomic/Text/Text.tsx',
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'Atomic',
    description: 'Multi-line text input field for longer text content with size variants.',
    path: '../../zui/src/components/atomic/Textarea/Textarea.tsx',
  },
  {
    id: 'toggle',
    name: 'Toggle',
    category: 'Atomic',
    description: 'Boolean switch/toggle control with success variant for enabled states.',
    path: '../../zui/src/components/atomic/Toggle/Toggle.tsx',
  },
  
  // Composite Components
  {
    id: 'card',
    name: 'Card',
    category: 'Composite',
    description: 'Content container with border and background for grouping related information.',
    path: '../../zui/src/components/composite/Card/Card.tsx',
  },
  {
    id: 'code-block',
    name: 'CodeBlock',
    category: 'Composite',
    description: 'Syntax-highlighted code block component for displaying multi-line code.',
    path: '../../zui/src/components/composite/CodeBlock/CodeBlock.tsx',
  },
  {
    id: 'collapsible-group',
    name: 'CollapsibleGroup',
    category: 'Composite',
    description: 'Expandable/collapsible section for hiding and showing content.',
    path: '../../zui/src/components/composite/CollapsibleGroup/CollapsibleGroup.tsx',
  },
  {
    id: 'confirm-modal',
    name: 'ConfirmModal',
    category: 'Composite',
    description: 'Confirmation dialog with customizable actions for destructive or important operations.',
    path: '../../zui/src/components/composite/ConfirmModal/ConfirmModal.tsx',
  },
  {
    id: 'drawer',
    name: 'Drawer',
    category: 'Composite',
    description: 'Resizable drawer panel that slides in from any side with minimize support.',
    path: '../../zui/src/components/composite/Drawer/Drawer.tsx',
  },
  {
    id: 'dropdown-menu',
    name: 'DropdownMenu',
    category: 'Composite',
    description: 'Dropdown menu with items for contextual actions and commands.',
    path: '../../zui/src/components/composite/DropdownMenu/DropdownMenu.tsx',
  },
  {
    id: 'item-card',
    name: 'ItemCard',
    category: 'Composite',
    description: 'Card for displaying list items with metadata, badges, and action buttons.',
    path: '../../zui/src/components/composite/ItemCard/ItemCard.tsx',
  },
  {
    id: 'modal',
    name: 'Modal',
    category: 'Composite',
    description: 'Dialog overlay for displaying content above the main page with backdrop and animations.',
    path: '../../zui/src/components/composite/Modal/Modal.tsx',
  },
  {
    id: 'page',
    name: 'Page',
    category: 'Composite',
    description: 'Full page layout structure with consistent spacing and styling.',
    path: '../../zui/src/components/composite/Page/Page.tsx',
  },
  {
    id: 'page-empty-state',
    name: 'PageEmptyState',
    category: 'Composite',
    description: 'Empty state message with icon, title, message, and call-to-action.',
    path: '../../zui/src/components/composite/PageEmptyState/PageEmptyState.tsx',
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
    id: 'page-loader',
    name: 'PageLoader',
    category: 'Composite',
    description: 'Full-page loading state with centered spinner.',
    path: '../../zui/src/components/composite/PageLoader/PageLoader.tsx',
  },
  {
    id: 'refresh-button',
    name: 'RefreshButton',
    category: 'Composite',
    description: 'Button with refresh icon and loading state for triggering data refreshes.',
    path: '../../zui/src/components/composite/RefreshButton/RefreshButton.tsx',
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    category: 'Composite',
    description: 'Navigation sidebar with sections and items.',
    path: '../../zui/src/components/composite/Sidebar/Sidebar.tsx',
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Composite',
    description: 'Tab navigation with smooth animations and optional icons for organizing content.',
    path: '../../zui/src/components/composite/Tabs/Tabs.tsx',
  },
  {
    id: 'toasts',
    name: 'Toasts',
    category: 'Composite',
    description: 'Toast notification system with success, error, and info variants.',
    path: '../../zui/src/components/composite/Toasts/Toasts.tsx',
  },
];

export const componentsByCategory = {
  Atomic: components.filter(c => c.category === 'Atomic'),
  Composite: components.filter(c => c.category === 'Composite'),
  Utilities: components.filter(c => c.category === 'Utilities'),
};
