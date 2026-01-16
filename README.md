# ZUI - Cypher AGI UI Component Library

A modern React component library with a focus on clean design and developer experience.

## Features

- 🎨 Modern, consistent design system
- ⚛️ Built with React and TypeScript
- 🎯 Tree-shakeable exports
- 📱 Responsive components
- 🎭 CSS Modules for styling
- 🔧 Easy to customize

## Installation

```bash
npm install @cypher-agi/zui
```

## Usage

```tsx
import { Button, Card } from '@cypher-agi/zui';
import '@cypher-agi/zui/styles';

function App() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```

## Development

This repository contains:
- `src/` - Component library source code
- `inspector/` - Component inspector/playground app
- `docs-site/` - Documentation site

### Running locally

```bash
# Install dependencies
npm install

# Run inspector (component playground)
npm run dev:inspector

# Run documentation site
npm run dev:docs

# Run tests
npm test
```

## License

MIT
