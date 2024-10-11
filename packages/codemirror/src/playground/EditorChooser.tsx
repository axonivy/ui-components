import { BasicField, BasicSelect, Flex, Separator } from '@axonivy/ui-components';
import { useState } from 'react';
import { IvyScriptArea } from './IvyScriptArea';
import { IvyMacroArea } from './IvyMacroArea';

const editors = [
  // { value: 'IvyScriptEditor', label: 'IvyScript Editor' },
  { value: 'IvyScriptArea', label: 'IvyScript Area' },
  // { value: 'IvyScriptInput', label: 'IvyScript Input' },
  { value: 'IvyMacroArea', label: 'IvyMacro Area' }
  // { value: 'IvyMacroInput', label: 'IvyMacro Input' }
];

export const EditorChooser = () => {
  const [editor, setEditor] = useState<string>('IvyMacroArea');

  return (
    <Flex direction='column' gap={4}>
      <BasicField label='Editor'>
        <BasicSelect value={editor} onValueChange={setEditor} items={editors} />
      </BasicField>
      <Separator />
      {/* {editor === 'IvyScriptEditor' && <IvyScriptEditor />} */}
      {editor === 'IvyScriptArea' && <IvyScriptArea />}
      {/* {editor === 'IvyScriptInput' && <IvyScriptInput />} */}
      {editor === 'IvyMacroArea' && <IvyMacroArea />}
      {/* {editor === 'IvyMacroInput' && <IvyMacroInput />} */}
    </Flex>
  );
};
