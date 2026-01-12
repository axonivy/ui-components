import { BasicField } from '@axonivy/ui-components';
import { useState } from 'react';
import { SingleLineCodeEditor } from '../components/SingleLineCodeEditor';

export const IvyScriptInput = ({ contextPath }: { contextPath: string }) => {
  const [value, setValue] = useState('');
  return (
    <BasicField
      label='IvyScriptInput'
      message={{ variant: 'description', message: 'This editor is single line for expressions. Currently it checks for a boolean type.' }}
    >
      <SingleLineCodeEditor contextPath={`${contextPath}Boolean`} language='ivyScript' value={value} onChange={setValue} />
    </BasicField>
  );
};
