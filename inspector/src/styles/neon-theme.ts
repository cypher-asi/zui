import { PrismTheme } from 'prism-react-renderer';

// Classy futuristic syntax highlighting theme
export const neonTheme: PrismTheme = {
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
      types: ['namespace'],
      style: {
        opacity: 0.7,
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
      types: ['entity', 'url', 'symbol', 'number', 'boolean', 'constant', 'regex', 'inserted'],
      style: {
        color: '#ffb86c',
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: '#cb01f4',
      },
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: {
        color: '#01a4f4',
      },
    },
    {
      types: ['function-variable'],
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
    {
      types: ['parameter'],
      style: {
        color: '#f8c892',
      },
    },
    {
      types: ['char'],
      style: {
        color: '#01f4cb',
      },
    },
  ],
};
