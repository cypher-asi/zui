import { Highlight } from 'prism-react-renderer';
import { getComponentSource } from '../data/componentSources';
import { neonTheme } from '../styles/neon-theme';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  componentId: string;
}

export function CodeBlock({ componentId }: CodeBlockProps) {
  const code = getComponentSource(componentId);

  return (
    <div className={styles.codeBlock}>
      <Highlight
        theme={neonTheme}
        code={code}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className={styles.lineNumber}>{i + 1}</span>
                <span className={styles.lineContent}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
