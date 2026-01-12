import { BasicField } from '@axonivy/ui-components';
import { useState } from 'react';
import { ResizableCodeEditor } from '../components/ResizableCodeEditor';

export const IvyScriptArea = ({ contextPath }: { contextPath: string }) => {
  const [value, setValue] = useState('');
  return (
    <BasicField label='IvyScriptArea' message={{ variant: 'description', message: 'This editor can be resized.' }}>
      <ResizableCodeEditor contextPath={contextPath} language='ivyScript' value={value} onChange={setValue} />
    </BasicField>
  );
};
