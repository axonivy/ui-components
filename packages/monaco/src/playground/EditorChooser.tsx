import { BasicField, BasicInput, BasicSelect, Flex, Separator } from '@axonivy/ui-components';
import { useState } from 'react';
import { IvyMacroArea } from './IvyMacroArea';
import { IvyMacroInput } from './IvyMacroInput';
import { IvyScriptArea } from './IvyScriptArea';
import { IvyScriptEditor } from './IvyScriptEditor';
import { IvyScriptInput } from './IvyScriptInput';

const editors = [
  { value: 'IvyScriptEditor', label: 'IvyScript Editor' },
  { value: 'IvyScriptArea', label: 'IvyScript Area' },
  { value: 'IvyScriptInput', label: 'IvyScript Input' },
  { value: 'IvyMacroArea', label: 'IvyMacro Area' },
  { value: 'IvyMacroInput', label: 'IvyMacro Input' }
];

export const EditorChooser = () => {
  const [editor, setEditor] = useState('IvyScriptEditor');
  // engine test context path: 'Developer-Test/workflow-demos/15254DC87A1B183B-f3/output.code/'
  const [contextPath, setContextPath] = useState('designer/workflow-demos/15254DC87A1B183B-f3/output.code/');

  return (
    <Flex direction='column' gap={4}>
      <BasicField label='Editor'>
        <BasicSelect value={editor} onValueChange={setEditor} items={editors} />
      </BasicField>
      <BasicField label='Context Path'>
        <BasicInput value={contextPath} onChange={event => setContextPath(event.target.value)} />
      </BasicField>
      <Separator />
      {editor === 'IvyScriptEditor' && <IvyScriptEditor contextPath={contextPath} />}
      {editor === 'IvyScriptArea' && <IvyScriptArea contextPath={contextPath} />}
      {editor === 'IvyScriptInput' && <IvyScriptInput contextPath={contextPath} />}
      {editor === 'IvyMacroArea' && <IvyMacroArea contextPath={contextPath} />}
      {editor === 'IvyMacroInput' && <IvyMacroInput contextPath={contextPath} />}
    </Flex>
  );
};
