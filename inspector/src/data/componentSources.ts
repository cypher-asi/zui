// Programmatically load all component source files using Vite's import.meta.glob
// This automatically reads the actual source files instead of manual copy-paste

// Import all component TypeScript files as raw text (excluding test files)
const componentFiles = import.meta.glob<string>(
  '../../../src/components/**/[A-Z]*.tsx',
  { 
    query: '?raw', 
    eager: true, 
    import: 'default'
  }
);

// Create a mapping from component ID to source code
export const componentSources: Record<string, string> = {};

// Process the imported files
Object.entries(componentFiles).forEach(([path, content]) => {
  // Skip test files and index files
  if (path.includes('.test.') || path.endsWith('index.tsx')) {
    return;
  }

  // Extract component name from path
  // Example: ../../../src/components/atomic/Button/Button.tsx -> button
  // Example: ../../../src/components/composite/CodeBlock/CodeBlock.tsx -> code-block
  const match = path.match(/\/([^/]+)\/\1\.tsx$/);
  if (match) {
    const componentName = match[1];
    // Convert from PascalCase to kebab-case
    const componentId = componentName
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
    componentSources[componentId] = content;
  }
});

// Log loaded components in development
if (import.meta.env.DEV) {
  console.log('[ComponentSources] Loaded components:', Object.keys(componentSources).sort());
}

/**
 * Get the source code for a component by its ID
 * @param componentId - The kebab-case component ID (e.g., 'button', 'code-block')
 * @returns The source code as a string, or a placeholder if not found
 */
export function getComponentSource(componentId: string): string {
  return componentSources[componentId] || `// Source code not available for component: ${componentId}`;
}
