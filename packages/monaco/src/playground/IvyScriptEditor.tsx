import { BasicField } from '@axonivy/ui-components';
import { useState } from 'react';
import { MAXIMIZED_MONACO_OPTIONS } from '../monaco-editor-util';
import { CodeEditor } from '../components/CodeEditor';

export const IvyScriptEditor = () => {
  const [value, setValue] = useState('');
  return (
    <BasicField label='IvyScriptEditor' message={{ variant: 'description', message: 'This editor has line numbers and folding enabled.' }}>
      <CodeEditor
        contextPath='Developer-Test/workflow-demos/15254DC87A1B183B-f3/output.code/'
        language='ivyScript'
        value={value}
        onChange={setValue}
        options={MAXIMIZED_MONACO_OPTIONS}
        height={200}
      />
    </BasicField>
  );
};
