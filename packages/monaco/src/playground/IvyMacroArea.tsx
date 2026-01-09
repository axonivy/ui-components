import { BasicField } from '@axonivy/ui-components';
import { useState } from 'react';
import { ResizableCodeEditor } from '../components/ResizableCodeEditor';

export const IvyMacroArea = () => {
  const [value, setValue] = useState('');
  return (
    <BasicField label='IvyMacroArea' message={{ variant: 'description', message: 'This editor can be resized.' }}>
      <ResizableCodeEditor
        contextPath='Developer-Test/workflow-demos/15254DC87A1B183B-f3/output.code/'
        language='ivyMacro'
        value={value}
        onChange={setValue}
      />
    </BasicField>
  );
};
