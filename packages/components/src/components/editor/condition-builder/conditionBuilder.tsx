import { BasicInput } from '@/components/common/input/input';
import { isNotUndefined } from '@/utils/guards';
import { type ReactNode, useMemo, useState } from 'react';
import {
  ConditionContext,
  type ConditionData,
  type ConditionGroupData,
  type ConditionMode,
  type LogicOperator,
  type LogicOperators,
  type Operators
} from './conditionContext';
import { ConditionEditor } from './conditionEditor';

export interface ConditionBuilderProps {
  onChange: (value: string) => void;
  operators: Operators;
  logicOperators: LogicOperators;
  generateConditionString: (conditionMode: ConditionMode, conditionGroups: Array<ConditionGroupData>) => string;
  argumentInput?: (value: string, onChange: (change: string) => void) => ReactNode;
  children?: ReactNode;
}

const ConditionBuilder = ({
  onChange,
  operators,
  logicOperators,
  generateConditionString,
  argumentInput,
  children
}: ConditionBuilderProps) => {
  const [conditionMode, setConditionMode] = useState<ConditionMode>('basic-condition');
  const [conditionGroups, setConditionGroups] = useState<Array<ConditionGroupData>>([
    { conditions: [{ argument1: '', operator: 'equal to', argument2: '', logicalOperator: 'and' }], logicalOperator: 'and' }
  ]);

  const updateConditionMode = (mode: ConditionMode) => {
    setConditionMode(mode);
    onChange(generateConditionString(mode, conditionGroups));
  };

  const updateConditionGroups = (updater: (old: Array<ConditionGroupData>) => Array<ConditionGroupData>) => {
    setConditionGroups(old => {
      const groups = updater(old);
      onChange(generateConditionString(conditionMode, groups));
      return groups;
    });
  };

  const addConditionGroup = () => {
    updateConditionGroups(old => {
      const groups = structuredClone(old);
      groups.push({
        conditions: [{ argument1: '', operator: 'equal to', argument2: '', logicalOperator: 'and' }],
        logicalOperator: 'and'
      });
      return groups;
    });
  };

  const updateLogicalOperator = (groupIndex: number, newValue: LogicOperator) => {
    updateConditionGroups(old => {
      const groups = structuredClone(old);
      const group = groups.at(groupIndex);
      if (isNotUndefined(group)) {
        group.logicalOperator = newValue;
      }
      return groups;
    });
  };

  const addCondition = (groupIndex: number) => {
    updateConditionGroups(old => {
      const groups = structuredClone(old);
      const group = groups.at(groupIndex);
      if (isNotUndefined(group)) {
        group.conditions.push({ argument1: '', operator: 'equal to', argument2: '', logicalOperator: 'and' });
      }
      return groups;
    });
  };

  const removeConditionGroup = (groupIndex: number) => {
    updateConditionGroups(old => {
      const groups = structuredClone(old);
      groups.splice(groupIndex, 1);
      return groups;
    });
  };

  const updateCondition = <TKey extends keyof ConditionData>(
    groupIndex: number,
    conditionIndex: number,
    key: TKey,
    newValue: ConditionData[TKey]
  ) => {
    updateConditionGroups(old => {
      const groups = structuredClone(old);
      const condition = groups.at(groupIndex)?.conditions.at(conditionIndex);
      if (isNotUndefined(condition)) {
        groups.at(groupIndex)?.conditions.splice(conditionIndex, 1, { ...condition, [key]: newValue });
      }
      return groups;
    });
  };

  const removeCondition = (groupIndex: number, conditionIndex: number) => {
    updateConditionGroups(old => {
      const groups = structuredClone(old);
      const group = groups.at(groupIndex);
      if (isNotUndefined(group)) {
        group.conditions.splice(conditionIndex, 1);
      }
      return groups;
    });
  };

  const defaultInput = (value: string, onChange: (change: string) => void) => (
    <BasicInput value={value} onChange={e => onChange(e.target.value)} />
  );

  const typeOptions = useMemo(() => Object.entries(operators).map(([label]) => ({ label, value: label })), [operators]);
  const logicalOperatorOptions = useMemo(
    () => Object.entries(logicOperators).map(([label]) => ({ label, value: label })),
    [logicOperators]
  );

  return (
    <ConditionContext.Provider
      value={{
        conditionMode,
        setConditionMode: updateConditionMode,
        conditionGroups,
        addConditionGroup,
        removeConditionGroup,
        addCondition,
        updateCondition,
        removeCondition,
        typeOptions,
        logicalOperatorOptions,
        updateLogicalOperator,
        argumentInput: argumentInput ? argumentInput : defaultInput
      }}
    >
      <ConditionEditor />
      {children}
    </ConditionContext.Provider>
  );
};
ConditionBuilder.displayName = 'ConditionBuilder';

export { ConditionBuilder };
