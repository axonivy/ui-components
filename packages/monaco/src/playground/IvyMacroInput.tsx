import { BasicField } from '@axonivy/ui-components';
import { useState } from 'react';
import { SingleLineCodeEditor } from '../components/SingleLineCodeEditor';

export const IvyMacroInput = ({ contextPath }: { contextPath: string }) => {
  const [value, setValue] = useState('');
  return (
    <BasicField
      label='IvyMacroInput'
      message={{ variant: 'description', message: 'This editor is single line for expressions. Currently it checks for a boolean type.' }}
    >
      <SingleLineCodeEditor contextPath={contextPath} language='ivyMacro' value={value} onChange={setValue} />
    </BasicField>
  );
};
