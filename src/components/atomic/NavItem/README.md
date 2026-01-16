# NavItem

An atomic navigation item component with optional icon support.

## Features

- **Flexible Icon Support**: Optionally include an icon on the left side
- **Active State**: Visual indication when item is selected
- **Accessible**: Proper ARIA attributes and keyboard support
- **Hover Effects**: Smooth transitions for better UX
- **Theme Integration**: Uses CSS variables for consistent styling

## Usage

```tsx
import { NavItem } from '@cypher-asi/zui';
import { Server } from 'lucide-react';

// With icon
<NavItem 
  icon={<Server size={16} />} 
  label="Machines" 
  active={true}
  onClick={() => navigate('/machines')}
/>

// Without icon
<NavItem 
  label="Settings"
  onClick={() => navigate('/settings')}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | The text label to display (required) |
| `icon` | `ReactNode` | - | Optional icon to display on the left |
| `active` | `boolean` | `false` | Whether this item is currently active/selected |
| `onClick` | `() => void` | - | Click handler |
| `className` | `string` | - | Additional CSS class name |
| `ariaLabel` | `string` | - | Custom aria-label for accessibility |

## Styling

The component uses CSS variables for theming:

- `--space-2`, `--space-3`: Spacing
- `--radius-md`: Border radius
- `--text-primary`, `--text-secondary`: Text colors
- `--bg-secondary`, `--bg-elevated`: Background colors
- `--primary`: Accent color
- `--transition-fast`: Animation speed

## Accessibility

- Uses semantic `button` element
- Provides proper `aria-label` and `aria-current` attributes
- Keyboard navigable with visible focus indicators
- Screen reader friendly
