import { createContext, useContext, useState, type ReactNode } from 'react';
import { Input } from '@/components/common/input/input';
import type { ConditionMode } from '@/components/editor/condition-builder/conditionBuilder';

export interface ConditionData {
  argument1: string;
  operator: Operator;
  argument2: string;
  logicalOperator: LogicOperator;
}

export interface ConditionGroupData {
  conditions: Array<ConditionData>;
  logicalOperator: LogicOperator;
}

export type Operators = {
  'equal to': string;
  'not equal to': string;
  'is true': string;
  'is false': string;
  'is empty': string;
  'is not empty': string;
  'less than': string;
  'greater than': string;
  'less or equal to': string;
  'greater or equal to': string;
};

export type Operator = keyof Operators;

export type LogicOperators = {
  and: string;
  or: string;
};

export type LogicOperator = keyof LogicOperators;

export interface ConditionBuilderProviderProps {
  typeOptions: Operators;
  logicalOperatorOptions: LogicOperators;
  generateConditionString: (conditionMode: ConditionMode, conditionGroups: Array<ConditionGroupData>) => string;
  children: ReactNode;
  argumentInput?: (value: string, onChange: (change: string) => void) => ReactNode;
}

interface ConditionContextType {
  conditionMode: ConditionMode;
  setConditionMode: (value: ConditionMode) => void;
  conditionGroups: Array<ConditionGroupData>;
  addConditionGroup: () => void;
  updateLogicalOperator: (index: number, newValue: LogicOperator) => void;
  addCondition: (groupIndex: number) => void;
  removeConditionGroup: (groupIndex: number) => void;
  updateCondition: <TKey extends keyof ConditionData>(
    groupIndex: number,
    conditionIndex: number,
    key: TKey,
    newValue: ConditionData[TKey]
  ) => void;
  removeCondition: (groupIndex: number, conditionIndex: number) => void;
  generateConditionString: () => string;
  typeOptions: Array<{ value: string; label: string }>;
  logicalOperatorOptions: Array<{ value: string; label: string }>;
  argumentInput: (value: string, onChange: (change: string) => void) => ReactNode;
}

const ConditionBuilderContext = createContext<ConditionContextType | undefined>(undefined);

const ConditionBuilderProvider = ({
  children,
  typeOptions,
  logicalOperatorOptions,
  generateConditionString,
  argumentInput
}: ConditionBuilderProviderProps) => {
  const [conditionMode, setConditionMode] = useState<ConditionMode>('basic-condition');
  const [conditionGroups, setConditionGroups] = useState<Array<ConditionGroupData>>([
    { conditions: [{ argument1: '', operator: 'equal to', argument2: '', logicalOperator: 'and' }], logicalOperator: 'and' }
  ]);

  const addConditionGroup = () => {
    setConditionGroups([
      ...conditionGroups,
      { conditions: [{ argument1: '', operator: 'equal to', argument2: '', logicalOperator: 'and' }], logicalOperator: 'and' }
    ]);
  };

  const updateLogicalOperator = (index: number, newValue: LogicOperator) => {
    setConditionGroups(old => {
      const newGroups = [...old];
      newGroups[index].logicalOperator = newValue;
      return newGroups;
    });
  };

  const addCondition = (groupIndex: number) => {
    setConditionGroups(old => {
      const newGroups = [...old];
      newGroups[groupIndex].conditions.push({ argument1: '', operator: 'equal to', argument2: '', logicalOperator: 'and' });
      return newGroups;
    });
  };

  const removeConditionGroup = (groupIndex: number) => {
    setConditionGroups(old => {
      const newGroups = [...old];
      newGroups.splice(groupIndex, 1);
      return newGroups;
    });
  };

  const updateCondition = <TKey extends keyof ConditionData>(
    groupIndex: number,
    conditionIndex: number,
    key: TKey,
    newValue: ConditionData[TKey]
  ) => {
    setConditionGroups(old => {
      const newGroups = [...old];
      newGroups[groupIndex].conditions[conditionIndex] = {
        ...newGroups[groupIndex].conditions[conditionIndex],
        [key]: newValue
      };
      return newGroups;
    });
  };

  const removeCondition = (groupIndex: number, conditionIndex: number) => {
    setConditionGroups(old => {
      const newGroups = [...old];
      newGroups[groupIndex].conditions.splice(conditionIndex, 1);
      return newGroups;
    });
  };

  const defaultInput = (value: string, onChange: (change: string) => void) => {
    return <Input value={value} onChange={e => onChange(e.target.value)} style={{ flex: 1 }} />;
  };
  return (
    <ConditionBuilderContext.Provider
      value={{
        conditionMode,
        setConditionMode,
        conditionGroups,
        addConditionGroup,
        updateLogicalOperator,
        addCondition,
        removeConditionGroup,
        updateCondition,
        removeCondition,
        generateConditionString: () => generateConditionString(conditionMode, conditionGroups),
        typeOptions: Object.entries(typeOptions).map(([label]) => ({ label, value: label })),
        logicalOperatorOptions: Object.entries(logicalOperatorOptions).map(([label]) => ({ label, value: label })),
        argumentInput: argumentInput ? argumentInput : defaultInput
      }}
    >
      {children}
    </ConditionBuilderContext.Provider>
  );
};
ConditionBuilderProvider.displayName = 'ConditionBuilderProvider';

export const useConditionBuilderContext = () => {
  const context = useContext(ConditionBuilderContext);
  if (!context) {
    throw new Error('useConditionContext must be used within a ConditionProvider');
  }
  return context;
};

export { ConditionBuilderProvider };
