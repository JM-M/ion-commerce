import { Text, Node } from 'slate';
import escapeHtml from 'escape-html';
import styles from '../slate.module.css';

export const serializeToHTML: Function = (node: any, index = 0) => {
  if (!node) return '';
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if ((node as any).bold) {
      string = `<strong>${string}</strong>`;
    }
    return string;
  }

  let children;
  if (Array.isArray(node))
    children = node.map((n, i) => serializeToHTML(n, i)).join('');
  if (node?.children)
    children = node.children
      .map((n: any, i: number) => serializeToHTML(n, i))
      .join('');

  const { type, style } = node;

  switch (type) {
    case 'block-quote':
      return `<blockquote class=${styles.Blockquote} style=${style}>
          ${children}
        </blockquote>`;
    case 'bulleted-list':
      return `<ul class=${styles.BulletedList} style=${style}>
          ${children}
        </ul>`;
    case 'heading-one':
      return `<h1 class=${styles.HeadingOne} style=${style}>
          ${children}
        </h1>`;
    case 'heading-two':
      return `<h2 class=${styles.HeadingTwo} style=${style}>
          ${children}
        </h2>`;
    case 'list-item':
      return `<li class=${styles.ListItem} style=${style}>
          ${children}
        </li>`;
    case 'numbered-list':
      return `<ol class=${styles.NumberedList} style=${style}>
          ${children}
        </ol>`;
    case 'image':
      return `<img src=${node.url} class='w-full h-auto' />`;
    case 'link':
      return `<a
          target='_blank'
          href=${
            node?.url?.startsWith('http') ? node.url : `https://${node.url}`
          }
          rel='noopener noreferrer'
          class=${styles.Link}
        >
          ${children}
        </a>`;
    default:
      return `<p class=${styles.Paragraph} style=${style}>
          ${children}
        </p>`;
  }
};

export const serializeToText = (value: any[], joinValue = '\n') => {
  if (!value) return '';
  return value.map((n: Node) => Node.string(n)).join(joinValue);
};
