# ZUI Inspector

Interactive component inspector and showcase for the ZUI (Zenith UI) component library.

## Features

- 📚 Complete component library documentation
- 🎨 Live interactive examples for each component
- 💻 Source code display with syntax highlighting
- 🎯 Organized by component categories (Atomic & Composite)
- 🔍 Easy navigation with sidebar
- 🌙 Dark theme UI

## Getting Started

### Installation

```bash
cd zui/inspector
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:3002`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Structure

```
inspector/
├── src/
│   ├── components/         # Showcase components
│   │   ├── examples/       # Live examples for each component
│   │   ├── CodeBlock.tsx   # Syntax-highlighted code display
│   │   ├── ComponentShowcase.tsx  # Main showcase container
│   │   └── NavSection.tsx  # Sidebar navigation sections
│   ├── data/
│   │   ├── components.ts   # Component metadata
│   │   └── componentSources.ts  # Source code strings
│   ├── styles/
│   │   └── index.css       # Global styles
│   ├── App.tsx             # Main application
│   └── main.tsx            # Entry point
├── index.html
├── package.json
└── vite.config.ts
```

## Adding New Components

1. Add component metadata to `src/data/components.ts`
2. Create an example component in `src/components/examples/`
3. Export the example from `src/components/examples/index.ts`
4. (Optional) Add source code to `src/data/componentSources.ts`

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **ZUI** - Component library being documented
- **prism-react-renderer** - Syntax highlighting
- **lucide-react** - Icons

## License

Part of the Machina project.
