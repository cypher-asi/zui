# RadioButton Component

A clean, accessible radio button component with support for labels, sizes, and color variants.

## Features

- ✅ Two sizes: `sm`, `md` (default)
- ✅ Two variants: `default`, `accent`
- ✅ Optional labels with left/right positioning
- ✅ Fully accessible with keyboard navigation
- ✅ Disabled state support
- ✅ Works in radio groups
- ✅ Forwards refs to input element
- ✅ Extends all native HTML radio input attributes

## Basic Usage

```tsx
import { RadioButton } from 'zui';

function Example() {
  const [selected, setSelected] = useState('option1');

  return (
    <div>
      <RadioButton
        name="options"
        value="option1"
        checked={selected === 'option1'}
        onChange={(e) => setSelected(e.target.value)}
        label="Option 1"
      />
      <RadioButton
        name="options"
        value="option2"
        checked={selected === 'option2'}
        onChange={(e) => setSelected(e.target.value)}
        label="Option 2"
      />
      <RadioButton
        name="options"
        value="option3"
        checked={selected === 'option3'}
        onChange={(e) => setSelected(e.target.value)}
        label="Option 3"
      />
    </div>
  );
}
```

## Sizes

```tsx
// Small
<RadioButton size="sm" label="Small option" />

// Medium (default)
<RadioButton size="md" label="Medium option" />
<RadioButton label="Default is medium" />
```

## Variants

```tsx
// Default variant (monochrome)
<RadioButton variant="default" label="Default" />

// Accent variant (brand color)
<RadioButton variant="accent" label="Accent" />
```

## Label Position

```tsx
// Label on right (default)
<RadioButton label="Label on right" />

// Label on left
<RadioButton label="Label on left" labelPosition="left" />
```

## Without Label

```tsx
<RadioButton name="group" value="1" aria-label="Option 1" />
```

## Disabled State

```tsx
<RadioButton label="Disabled option" disabled />
<RadioButton label="Disabled checked" checked disabled />
```

## With Ref

```tsx
function Example() {
  const radioRef = useRef<HTMLInputElement>(null);

  const focusRadio = () => {
    radioRef.current?.focus();
  };

  return (
    <RadioButton ref={radioRef} label="Focusable radio" />
  );
}
```

## Props

### RadioButtonProps

Extends `Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md'` | `'md'` | Size of the radio button |
| `variant` | `'default' \| 'accent'` | `'default'` | Color variant when checked |
| `label` | `string` | - | Optional label text |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Position of the label |
| `className` | `string` | - | Additional CSS class |
| `disabled` | `boolean` | `false` | Disabled state |
| `name` | `string` | - | Radio group name |
| `value` | `string` | - | Radio button value |
| `checked` | `boolean` | - | Controlled checked state |
| `onChange` | `(e: ChangeEvent) => void` | - | Change handler |

Plus all other standard HTML input attributes.

## Accessibility

- Uses native `<input type="radio">` for full keyboard support
- Supports focus-visible outline
- Label is clickable and associated with input
- Works with screen readers
- Supports `aria-*` attributes
- Disabled state prevents interaction

## Radio Groups

Radio buttons with the same `name` prop form a group where only one can be selected:

```tsx
function RadioGroup() {
  const [value, setValue] = useState('option1');

  return (
    <div role="radiogroup" aria-label="Options">
      <RadioButton
        name="myGroup"
        value="option1"
        checked={value === 'option1'}
        onChange={(e) => setValue(e.target.value)}
        label="Option 1"
      />
      <RadioButton
        name="myGroup"
        value="option2"
        checked={value === 'option2'}
        onChange={(e) => setValue(e.target.value)}
        label="Option 2"
      />
      <RadioButton
        name="myGroup"
        value="option3"
        checked={value === 'option3'}
        onChange={(e) => setValue(e.target.value)}
        label="Option 3"
      />
    </div>
  );
}
```

## Design Tokens Used

- `--color-surface` - Background
- `--color-border` - Border
- `--color-text-primary` - Checked indicator (default)
- `--color-text-secondary` - Label text
- `--color-text-muted` - Hover border
- `--color-accent` - Accent variant
- `--space-2` - Label gap
- `--text-xs` - Small label size
- `--text-sm` - Medium label size
- `--transition-fast` - Animation speed
- `--radius-*` - Border radius (circle)

## Styling

The component uses CSS modules. You can override styles by passing a `className`:

```tsx
<RadioButton className="my-custom-class" label="Custom styled" />
```

Or target the component in your CSS:

```css
.myForm :global(.radioButton) {
  /* Custom styles */
}
```
