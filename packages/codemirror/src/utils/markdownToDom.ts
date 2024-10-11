import { toDom } from 'hast-util-to-dom';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toHast } from 'mdast-util-to-hast';
import type { MarkedString, MarkupContent } from 'vscode-languageserver-protocol';

export function fromMarkupContent<Parent extends ParentNode>(
  contents: MarkedString | MarkedString[] | MarkupContent,
  parent: Parent
): Parent {
  if (Array.isArray(contents)) {
    for (const content of contents) {
      fromMarkupContent(content, parent);
    }
  } else if (typeof contents === 'string') {
    processMarkdown(parent, contents);
  } else if ('kind' in contents) {
    if (contents.kind === 'markdown') {
      processMarkdown(parent, contents.value);
    } else {
      const paragraph = document.createElement('p');
      paragraph.append(contents.value);
      parent.append(paragraph);
    }
  } else {
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.classList.add(`language-${contents.language}`);
    code.append(contents.value);
    pre.append(code);
    parent.append(pre);
  }

  return parent;
}

function processMarkdown(parent: ParentNode, markdown: string): undefined {
  if (!markdown) {
    return;
  }
  const nodes = markdownToDom(markdown);
  if (!nodes) {
    return;
  }
  parent.append(nodes);
}

function markdownToDom(markdown: string) {
  const mdast = fromMarkdown(markdown);
  const hast = toHast(mdast);
  return toDom(hast, { fragment: true });
}
