import { BasicField, BasicSelect, Flex, Separator } from '@axonivy/ui-components';
import { useState } from 'react';
import { IvyScriptEditor } from './IvyScriptEditor';
import { IvyScriptArea } from './IvyScriptArea';
import { IvyScriptInput } from './IvyScriptInput';
import { IvyMacroArea } from './IvyMacroArea';
import { IvyMacroInput } from './IvyMacroInput';

const editors = [
  { value: 'IvyScriptEditor', label: 'IvyScript Editor' },
  { value: 'IvyScriptArea', label: 'IvyScript Area' },
  { value: 'IvyScriptInput', label: 'IvyScript Input' },
  { value: 'IvyMacroArea', label: 'IvyMacro Area' },
  { value: 'IvyMacroInput', label: 'IvyMacro Input' }
];

export const EditorChooser = () => {
  const [editor, setEditor] = useState<string>('IvyScriptEditor');

  return (
    <Flex direction='column' gap={4}>
      <BasicField label='Editor'>
        <BasicSelect value={editor} onValueChange={setEditor} items={editors} />
      </BasicField>
      <Separator />
      {editor === 'IvyScriptEditor' && <IvyScriptEditor />}
      {editor === 'IvyScriptArea' && <IvyScriptArea />}
      {editor === 'IvyScriptInput' && <IvyScriptInput />}
      {editor === 'IvyMacroArea' && <IvyMacroArea />}
      {editor === 'IvyMacroInput' && <IvyMacroInput />}
    </Flex>
  );
};
