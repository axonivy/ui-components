import { IvyIcons } from '@axonivy/ui-icons';
import { BasicSelect } from '@/components/common/select/select';
import { Flex } from '@/components/common/flex/flex';
import { Button } from '@/components/common/button/button';
import { useEffect, useState } from 'react';
import type { Browser } from '@/components/editor/browser/browser';
import {
  ConditionBuilderProvider,
  useConditionBuilderContext,
  type ConditionBuilderProviderProps
} from '@/components/editor/condition-builder/conditionBuilderContext';
import { ConditionGroup } from './conditionGroup';

interface ConditionBuilderProps {
  onChange: (value: string) => void;
}

type ConditionBuilderHookProps = Omit<ConditionBuilderProviderProps, 'children'>;

const conditionModes = [
  { label: 'Basic Condition', value: 'basic-condition' },
  { label: 'Nested Condition', value: 'nested-condition' },
  { label: 'Always True', value: 'always-true' },
  { label: 'Always False', value: 'always-false' }
];
export type ConditionMode = (typeof conditionModes)[number]['value'];

export const useConditionBuilder = (props: ConditionBuilderHookProps): Browser => {
  const [value, setValue] = useState<string>();

  return {
    name: 'Condition',
    browser: (
      <ConditionBuilderProvider {...props}>
        <ConditionBuilder onChange={setValue} />
      </ConditionBuilderProvider>
    ),
    applyModifier: () => {
      return { value: value || '' };
    },
    infoProvider: () => <p>{value}</p>,
    icon: IvyIcons.Process
  };
};

const ConditionBuilder = ({ onChange }: ConditionBuilderProps) => {
  const { addConditionGroup, generateConditionString, conditionGroups, conditionMode, setConditionMode } = useConditionBuilderContext();

  useEffect(() => {
    onChange(generateConditionString());
  }, [generateConditionString, onChange]);

  return (
    <Flex direction='column' gap={2}>
      <BasicSelect items={conditionModes} value={conditionMode} onValueChange={val => setConditionMode(val as ConditionMode)} />
      {conditionMode !== 'always-true' &&
        conditionMode !== 'always-false' &&
        conditionGroups
          .filter((group, groupIndex) => !(conditionMode === 'basic-condition' && groupIndex > 0))
          .map((group, groupIndex) => (
            <ConditionGroup key={groupIndex} group={group} groupIndex={groupIndex} groupCount={conditionGroups.length} />
          ))}
      {conditionMode === 'nested-condition' && (
        <Button onClick={addConditionGroup} icon={IvyIcons.Plus} aria-label='Add Condition Group' variant='outline'>
          Add Condition Group
        </Button>
      )}
      {conditionMode === 'basic-condition' && conditionGroups.length === 0 && (
        <Button onClick={addConditionGroup} icon={IvyIcons.Plus} aria-label='Add Condition' variant='outline'>
          Add Condition
        </Button>
      )}
    </Flex>
  );
};
ConditionBuilder.displayName = 'ConditionBuilder';

export { ConditionBuilder };
