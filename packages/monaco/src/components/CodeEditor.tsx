import './CodeEditor.css';
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { Suspense, lazy, useState } from 'react';
import { useReadonly } from '@axonivy/ui-components';
import { MonacoEditorUtil, MONACO_OPTIONS } from '../monaco-editor-util';

const Editor = lazy(async () => {
  const editor = await import('@monaco-editor/react');
  await MonacoEditorUtil.getInstance();
  return editor;
});

export type CodeEditorProps = {
  contextPath: string;
  value: string;
  onChange: (value: string) => void;
  language: 'ivyScript' | 'ivyMacro' | (string & {});
  height?: number;
  onMountFuncs?: Array<(editor: monaco.editor.IStandaloneCodeEditor) => void>;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
};

export const CodeEditor = ({ contextPath, value, onChange, language, onMountFuncs, options, ...props }: CodeEditorProps) => {
  const readonly = useReadonly();
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    onMountFuncs?.forEach(func => func(editor));
    setShowPlaceholder(editor.getValue() === '');
  };

  const monacoOptions = options ?? MONACO_OPTIONS;
  monacoOptions.readOnly = readonly;

  return (
    <div className='code-editor'>
      <Suspense fallback={<div className='code-input'>Loading Editor...</div>}>
        <Editor
          className='code-input'
          defaultValue={value}
          value={value}
          defaultLanguage={language}
          defaultPath={`${language}/${contextPath}`}
          options={monacoOptions}
          theme={MonacoEditorUtil.DEFAULT_THEME_NAME}
          onChange={code => {
            setShowPlaceholder(!code);
            onChange(code ?? '');
          }}
          onMount={handleEditorDidMount}
          {...props}
        />
      </Suspense>

      {showPlaceholder && (
        <div className='monaco-placeholder' data-with-line-numbers={monacoOptions.lineNumbers === 'on'}>
          Press CTRL + SPACE for auto-completion
        </div>
      )}
    </div>
  );
};
