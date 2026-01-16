import { useState } from 'react';
import { Sidebar, NavList, Heading, Text } from '@machina/zui';
import { components, componentsByCategory } from './data/components';
import { ComponentShowcase } from './components/ComponentShowcase';
import { NavSection } from './components/NavSection';
import styles from './App.module.css';

function App() {
  const [selectedComponentId, setSelectedComponentId] = useState<string>('button');

  const selectedComponent = components.find(c => c.id === selectedComponentId);

  return (
    <div className={styles.app}>
      <Sidebar
        defaultWidth={260}
        header={
          <div className={styles.sidebarHeader}>
            <Heading level={3} className={styles.title}>ZUI Inspector</Heading>
            <Text variant="secondary" size="sm" className={styles.subtitle}>Component Library</Text>
          </div>
        }
      >
        <NavList>
          <NavSection
            title="Atomic Components"
            items={componentsByCategory.Atomic}
            activeId={selectedComponentId}
            onItemClick={setSelectedComponentId}
          />
          <NavSection
            title="Composite Components"
            items={componentsByCategory.Composite}
            activeId={selectedComponentId}
            onItemClick={setSelectedComponentId}
          />
        </NavList>
      </Sidebar>
      <main className={styles.main}>
        {selectedComponent && (
          <ComponentShowcase component={selectedComponent} />
        )}
      </main>
    </div>
  );
}

export default App;
