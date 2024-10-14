import type { createCompletionSource, createHoverTooltipSource, createLintSource } from 'codemirror-languageservice';
import { toDom } from 'hast-util-to-dom';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toHast } from 'mdast-util-to-hast';
import { CompletionItemKind, DiagnosticSeverity, DiagnosticTag, InsertTextFormat } from 'vscode-languageserver-types';

function markdownToDom(markdown: string) {
  const mdast = fromMarkdown(markdown);
  const hast = toHast(mdast);
  return toDom(hast, { fragment: true });
}

export const completionOptions: createCompletionSource.Options = {
  section: 'Word completion',
  markdownToDom,
  *doComplete(document, position, context) {
    const text = document.getText();
    const start = document.positionAt(document.offsetAt(position) - 1);

    if (!context.triggerCharacter) {
      return;
    }

    for (const match of text.matchAll(/\b\S+\b/g)) {
      const [word] = match;

      if (!word.startsWith(context.triggerCharacter)) {
        continue;
      }

      yield {
        label: word,
        kind: CompletionItemKind.Text,
        insertTextFormat: InsertTextFormat.Snippet,
        detail: 'text',
        documentation: `Insert the text _“${word}”_ here`,
        textEdit: {
          newText: word,
          range: {
            start,
            end: position
          }
        }
      };
    }
  }
};

export const hoverTooltipOptions: createHoverTooltipSource.Options = {
  markdownToDom,
  doHover(document, position) {
    const text = document.getText();
    const offset = document.offsetAt(position);

    for (const match of text.matchAll(/\b\S+\b/g)) {
      const [word] = match;
      const start = match.index;
      const end = start + word.length;

      if (offset >= start && offset <= end) {
        return {
          contents: `You are hovering the word _“${word}”_`,
          range: {
            start: document.positionAt(start),
            end: document.positionAt(end)
          }
        };
      }
    }
  }
};

export const lintOptions: createLintSource.Options = {
  *doDiagnostics(document) {
    const text = document.getText();

    for (const match of text.matchAll(/deprecated|hint|info|warning|error|unnecessary/gi)) {
      const [word] = match;
      const start = match.index;
      const end = start + word.length;
      const tags: DiagnosticTag[] = [];
      const lower = word.toLowerCase();

      if (lower === 'deprecated') {
        tags.push(DiagnosticTag.Deprecated);
      } else if (lower === 'unnecessary') {
        tags.push(DiagnosticTag.Unnecessary);
      }

      yield {
        message: `Invalid word “${word}”`,
        severity:
          lower === 'error'
            ? DiagnosticSeverity.Error
            : lower === 'warning'
            ? DiagnosticSeverity.Warning
            : lower === 'info'
            ? DiagnosticSeverity.Information
            : DiagnosticSeverity.Hint,
        source: 'regexp',
        code: lower,
        codeDescription: {
          href: 'https://example.com'
        },
        tags,
        range: {
          start: document.positionAt(start),
          end: document.positionAt(end)
        }
      };
    }
  }
};
