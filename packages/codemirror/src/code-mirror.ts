import { EditorView } from '@codemirror/view';
import { languageServer } from 'codemirror-languageserver';

const serverUri = 'ws://localhost:8081/ivy-script-lsp';
const filename = 'designer/workflow-demos/15254DCE818AD7A2-f0/task.code/';

export const ls = languageServer({
  // WebSocket server uri and other client options.
  serverUri,
  rootUri: 'file:///',
  workspaceFolders: null,

  // Alternatively, to share the same client across multiple instances of this plugin.
  // client: new LanguageServerClient({
  //   serverUri,
  //   rootUri: 'file:///'
  // }),

  documentUri: `file:///ivyScript/${filename}`,
  languageId: 'ivyScript' // As defined at https://microsoft.github.io/language-server-protocol/specification#textDocumentItem.
});

export const view = new EditorView({
  doc: '',
  parent: document.getElementById('root')!,
  extensions: [
    // json(),
    // textDocument('file:///example.txt'),
    // autocompletion({
    //   override: [createCompletionSource(completionOptions)]
    // }),
    // hoverTooltip(createHoverTooltipSource(hoverTooltipOptions)),
    // linter(createLintSource(lintOptions))
    ls
  ]
});
