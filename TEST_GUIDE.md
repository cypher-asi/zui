# ZUI Testing Guide

This guide explains how to run and write tests for the ZUI component library.

## Running Tests

Tests for ZUI components are run from the inspector package:

```bash
# Run all tests in watch mode
cd zui/inspector
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

Tests are located alongside their components in the `zui/src` directory:

```
zui/src/components/atomic/Avatar/
  ├── Avatar.tsx           # Component implementation
  ├── Avatar.test.tsx      # Component tests
  ├── Avatar.module.css    # Component styles
  ├── index.ts            # Exports
  └── README.md           # Documentation
```

## Writing Tests

### Basic Component Test

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders with initials when no src is provided', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders image when src is provided', () => {
    render(<Avatar name="John Doe" src="/test.jpg" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/test.jpg');
  });
});
```

### Testing User Interactions

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByText('Click me'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Component Variants

```typescript
describe('Avatar sizes', () => {
  it('applies size classes correctly', () => {
    const { container, rerender } = render(<Avatar name="Test" size="sm" />);
    expect(container.firstChild).toHaveClass('sm');
    
    rerender(<Avatar name="Test" size="lg" />);
    expect(container.firstChild).toHaveClass('lg');
  });
});
```

## Test Coverage

We aim for:
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

## Best Practices

1. **Test user behavior, not implementation**
   - Test what the user sees and does
   - Avoid testing internal state or methods

2. **Use semantic queries**
   - Prefer `getByRole`, `getByLabelText`, `getByText`
   - Avoid `getByTestId` unless necessary

3. **Write descriptive test names**
   - Use "it should..." or "when... it..."
   - Make the test name explain the expected behavior

4. **Keep tests simple and focused**
   - One assertion per test when possible
   - Test one thing at a time

5. **Use snapshot tests sparingly**
   - Only for complex, stable UI structures
   - Review snapshots carefully in code review

## Common Testing Patterns

### Testing Conditional Rendering

```typescript
it('shows loading state when loading', () => {
  render(<Component isLoading={true} />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

it('shows content when not loading', () => {
  render(<Component isLoading={false} data="test" />);
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  expect(screen.getByText('test')).toBeInTheDocument();
});
```

### Testing Props

```typescript
it('applies custom className', () => {
  const { container } = render(<Avatar name="Test" className="custom" />);
  expect(container.firstChild).toHaveClass('custom');
});

it('uses custom alt text when provided', () => {
  render(<Avatar name="Test" src="/img.jpg" alt="Custom alt" />);
  expect(screen.getByAltText('Custom alt')).toBeInTheDocument();
});
```

### Testing Edge Cases

```typescript
it('handles empty name gracefully', () => {
  render(<Avatar name="" />);
  expect(screen.getByText('')).toBeInTheDocument();
});

it('handles very long names', () => {
  const longName = 'A'.repeat(100);
  render(<Avatar name={longName} />);
  // Should only show first 2 initials
  expect(screen.getByText('AA')).toBeInTheDocument();
});
```

## Debugging Tests

### View test output
```bash
npm run test:ui
```

### Debug in browser
```typescript
import { screen, debug } from '@testing-library/react';

it('debug example', () => {
  render(<Component />);
  screen.debug(); // Prints DOM tree
});
```

### Verbose test output
```bash
npm test -- --reporter=verbose
```

## Continuous Integration

Tests run automatically in CI/CD pipelines. All tests must pass before merging PRs.

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
