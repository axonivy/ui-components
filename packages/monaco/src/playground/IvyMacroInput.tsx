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
        contextPath='Developer-Test/workflow-demos/15254DC87A1B183B-f3/output.code/'
        language='ivyMacro'
        value={value}
        onChange={setValue}
      />
    </BasicField>
  );
};
