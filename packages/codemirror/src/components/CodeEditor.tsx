import './CodeEditor.css';
import { useReadonly, useTheme } from '@axonivy/ui-components';
import ReactCodeMirror, { highlightWhitespace } from '@uiw/react-codemirror';
import { ivyDark, ivyLight } from './theme';
import { java } from '@codemirror/lang-java';
import { languageServerWithTransport } from '../utils/language-server';
import { WebSocketTransport } from '@open-rpc/client-js';
import { useMemo } from 'react';

export type CodeEditorProps = {
  contextPath: string;
  value: string;
  onChange: (value: string) => void;
  language: 'ivyScript' | 'ivyMacro' | (string & {});
  height?: number;
  // onMountFuncs?: Array<(editor: monaco.editor.IStandaloneCodeEditor) => void>;
  // options?: monaco.editor.IStandaloneEditorConstructionOptions;
};

const serverUri = 'ws://localhost:8081/ivy-script-lsp';

export const CodeEditor = ({ contextPath, language, value, onChange, height }: CodeEditorProps) => {
  const readonly = useReadonly();
  const { theme } = useTheme();

  const lsExtensions = useMemo(
    () =>
      languageServerWithTransport({
        documentUri: `file:///${language}/${contextPath}`,
        languageId: language,
        rootUri: 'file:///',
        workspaceFolders: null,
        autoClose: true,
        transport: new WebSocketTransport(serverUri)
      }),
    [contextPath, language]
  );

  return (
    <div className='code-editor'>
      <ReactCodeMirror
        value={value}
        onChange={onChange}
        height={`${height}px`}
        extensions={[...lsExtensions, java(), highlightWhitespace()]}
        readOnly={readonly}
        theme={theme === 'dark' ? ivyDark : ivyLight}
        className='code-input'
        placeholder='Press CTRL + SPACE for auto-completion'
        basicSetup={{ lineNumbers: false, foldGutter: false, highlightActiveLine: false }}
      />
    </div>
  );
};
