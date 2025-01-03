import { BasicField } from '@axonivy/ui-components';
import { useState } from 'react';
import { ResizableCodeEditor } from '../components/ResizableCodeEditor';

export const IvyMacroArea = () => {
  const [value, setValue] = useState('');
  return (
    <BasicField label='IvyMacroArea' message={{ variant: 'description', message: 'This editor can be resized.' }}>
      <ResizableCodeEditor
        contextPath='designer/workflow-demos/15254DCE818AD7A2-f0/task.description/'
        language='ivyMacro'
        value={value}
        onChange={setValue}
      />
    </BasicField>
  );
};
