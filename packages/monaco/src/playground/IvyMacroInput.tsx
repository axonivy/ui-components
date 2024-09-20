import { BasicField } from '@axonivy/ui-components';
import { useState } from 'react';
import { SingleLineCodeEditor } from '../components/SingleLineCodeEditor';

export const IvyMacroInput = () => {
  const [value, setValue] = useState('');
  return (
    <BasicField
      label='IvyMacroInput'
      message={{ variant: 'description', message: 'This editor is single line for expressions. Currently it checks for a boolean type.' }}
    >
      <SingleLineCodeEditor
        contextPath='designer/workflow-demos/15254DCE818AD7A2-f0/task.name/'
        language='ivyMacro'
        value={value}
        onChange={setValue}
      />
    </BasicField>
  );
};
