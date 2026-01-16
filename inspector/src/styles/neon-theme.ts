import { PrismTheme } from 'prism-react-renderer';

// Classy futuristic syntax highlighting theme
export const neonTheme: PrismTheme = {
  plain: {
    color: '#c7d5e0',
    backgroundColor: '#1a1f2e',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#6b7c93',
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#7dd3c0',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#89a4d6',
      },
    },
    {
      types: ['entity', 'url', 'symbol', 'number', 'boolean', 'constant', 'regex', 'inserted'],
      style: {
        color: '#f2b482',
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: '#bb9af7',
      },
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: {
        color: '#82aaff',
      },
    },
    {
      types: ['function-variable'],
      style: {
        color: '#82aaff',
      },
    },
    {
      types: ['variable'],
      style: {
        color: '#c8a1e0',
      },
    },
    {
      types: ['property'],
      style: {
        color: '#a8c5e6',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: '#f7ce76',
      },
    },
    {
      types: ['parameter'],
      style: {
        color: '#e8b882',
      },
    },
    {
      types: ['char'],
      style: {
        color: '#7dd3c0',
      },
    },
  ],
};
