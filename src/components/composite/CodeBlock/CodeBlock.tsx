import { ReactNode } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import styles from './CodeBlock.module.css';

export type CodeBlockLanguage = 'tsx' | 'typescript' | 'javascript' | 'json' | 'bash' | 'css' | 'html' | 'python' | 'text';

export interface CodeBlockProps {
  /** Code content to display */
  children?: string | ReactNode;
  /** Code content as prop (alternative to children) */
  code?: string;
  /** Programming language for syntax highlighting */
  language?: CodeBlockLanguage;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Show language label in top right */
  showLanguageLabel?: boolean;
  /** Additional CSS class */
  className?: string;
}

// Custom theme with neon colors matching app design
const customTheme = {
  ...themes.nightOwl,
  plain: {
    color: '#e6e8eb',
    backgroundColor: '#09090b',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#7a8ba3',
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#01f4cb',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#9db4e6',
      },
    },
    {
      types: ['number', 'boolean', 'constant'],
      style: {
        color: '#ffb86c',
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
      types: ['variable'],
      style: {
        color: '#d8b1f0',
      },
    },
    {
      types: ['property'],
      style: {
        color: '#b8d5f6',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: '#ffd866',
      },
    },
  ],
};

/**
 * CodeBlock - Multi-line code display component with syntax highlighting
 * 
 * Displays code in a formatted block with syntax highlighting and optional line numbers.
 * For inline code, use the Code component instead.
 */
export function CodeBlock({
  children,
  code: codeProp,
  language = 'text',
  showLineNumbers = false,
  showLanguageLabel = true,
  className = '',
}: CodeBlockProps) {
  const content = codeProp || children;
  const code = typeof content === 'string' ? content : String(content || '');

  return (
    <div className={`${styles.codeBlock} ${className}`} data-language={language}>
      {showLanguageLabel && (
        <div className={styles.header}>
          <span className={styles.languageLabel}>{language}</span>
        </div>
      )}
      <Highlight
        theme={customTheme}
        code={code}
        language={language === 'text' ? 'jsx' : language as any}
      >
        {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${styles.pre} ${highlightClassName}`} style={style}>
            <code className={styles.code}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className={styles.line}>
                  {showLineNumbers && (
                    <span className={styles.lineNumber}>{i + 1}</span>
                  )}
                  <span className={styles.lineContent}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
