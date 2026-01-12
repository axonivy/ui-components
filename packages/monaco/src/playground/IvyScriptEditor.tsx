import { BasicField } from '@axonivy/ui-components';
import { useState } from 'react';
import { CodeEditor } from '../components/CodeEditor';
import { MAXIMIZED_MONACO_OPTIONS } from '../monaco-editor-util';

export const IvyScriptEditor = ({ contextPath }: { contextPath: string }) => {
  const [value, setValue] = useState('');
  return (
    <BasicField label='IvyScriptEditor' message={{ variant: 'description', message: 'This editor has line numbers and folding enabled.' }}>
      <CodeEditor
        contextPath={contextPath}
        language='ivyScript'
        value={value}
        onChange={setValue}
        options={MAXIMIZED_MONACO_OPTIONS}
        height={200}
      />
    </BasicField>
  );
};
