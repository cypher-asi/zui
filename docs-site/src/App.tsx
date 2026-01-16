import { useState } from 'react';
import { Sidebar } from '@machina/zui';
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
            <h1 className={styles.title}>ZUI Inspector</h1>
            <p className={styles.subtitle}>Component Library</p>
          </div>
        }
      >
        <div className={styles.nav}>
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
        </div>
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
