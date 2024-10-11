import { BasicField } from '@axonivy/ui-components';
import { useState } from 'react';
// import { MAXIMIZED_MONACO_OPTIONS } from '../monaco-editor-util';
import { CodeEditor } from '../components/CodeEditor';

export const IvyScriptEditor = () => {
  const [value, setValue] = useState('');
  return (
    <BasicField label='IvyScriptEditor' message={{ variant: 'description', message: 'This editor has line numbers and folding enabled.' }}>
      <CodeEditor
        contextPath='designer/workflow-demos/15254DCE818AD7A2-f0/task.code/'
        language='ivyScript'
        value={value}
        onChange={setValue}
        // options={MAXIMIZED_MONACO_OPTIONS}
        height={200}
      />
    </BasicField>
  );
};
