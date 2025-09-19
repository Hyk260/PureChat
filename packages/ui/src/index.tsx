import { createWebComponent } from '@/utils/createWebComponent';

import Markdown from './Markdown';

// createWebComponent({
//   tagName: 'pure-button',
//   reactComponent: Button,
//   props: ['text'],
// });

// createWebComponent({
//   tagName: 'markdown-component',
//   reactComponent: MarkdownComponent,
//   props: ['content'],
// });

// createWebComponent({
//   tagName: 'react-markdown',
//   reactComponent: ReactMarkdownWC,
//   props: ['markdown'],
// });

createWebComponent({
  tagName: 'pure-markdown',
  reactComponent: Markdown,
  props: ['children'],
});

