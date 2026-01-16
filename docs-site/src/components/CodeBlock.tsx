import { Highlight, themes } from 'prism-react-renderer';
import { getComponentSource } from '../data/componentSources';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  componentId: string;
}

// Customize theme with app background and vibrant colors
const customTheme = {
  ...themes.nightOwl,
  plain: {
    ...themes.nightOwl.plain,
    color: '#e6e8eb',
    backgroundColor: '#09090b',
  },
  styles: [
    ...themes.nightOwl.styles,
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#01f4cb',
      },
    },
    {
      types: ['keyword', 'atrule', 'attr-name', 'selector'],
      style: {
        color: '#cb01f4',
      },
    },
    {
      types: ['function', 'tag'],
      style: {
        color: '#01a4f4',
      },
    },
    {
      types: ['number', 'boolean', 'constant'],
      style: {
        color: '#ffb86c',
      },
    },
  ],
};

export function CodeBlock({ componentId }: CodeBlockProps) {
  const code = getComponentSource(componentId);

  return (
    <div className={styles.codeBlock}>
      <Highlight
        theme={customTheme}
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
