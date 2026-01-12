import { BasicField } from '@axonivy/ui-components';
import { useState } from 'react';
import { ResizableCodeEditor } from '../components/ResizableCodeEditor';

export const IvyMacroArea = ({ contextPath }: { contextPath: string }) => {
  const [value, setValue] = useState('');
  return (
    <BasicField label='IvyMacroArea' message={{ variant: 'description', message: 'This editor can be resized.' }}>
      <ResizableCodeEditor contextPath={contextPath} language='ivyMacro' value={value} onChange={setValue} />
    </BasicField>
  );
};
