import { Button } from '@/components/common/button/button';
import { BasicField } from '@/components/common/field/field';
import { Flex } from '@/components/common/flex/flex';
import { BasicSelect } from '@/components/common/select/select';
import { conditionBorder, logicalOperatorField, operatorField } from '@/components/editor/condition-builder/conditionBuilder.css';
import {
  useConditionBuilderContext,
  type Operator,
  type LogicOperator,
  type ConditionData
} from '@/components/editor/condition-builder/conditionBuilderContext';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import { Label } from '@radix-ui/react-label';

export interface ConditionProps {
  condition: ConditionData;
  conditionIndex: number;
  groupIndex: number;
  conditionsCount: number;
}

export const Condition = ({ condition, conditionIndex, groupIndex, conditionsCount }: ConditionProps) => {
  const { updateCondition, removeCondition, typeOptions, logicalOperatorOptions, argumentInput } = useConditionBuilderContext();
  return (
    <Flex direction='column' className={cn(conditionBorder, 'ui-condition-builder-condition')}>
      <Flex direction='row' justifyContent='space-between'>
        <Label>{`Condition ${conditionIndex + 1}`}</Label>
        <Button onClick={() => removeCondition(groupIndex, conditionIndex)} icon={IvyIcons.Trash} aria-label='Remove Condition' />
      </Flex>
      <Flex alignItems='center' gap={2} direction='row'>
        {argumentInput(condition.argument1, val => updateCondition(groupIndex, conditionIndex, 'argument1', val))}
        <BasicField className={operatorField}>
          <BasicSelect
            items={typeOptions}
            value={condition.operator}
            onValueChange={val => updateCondition(groupIndex, conditionIndex, 'operator', val as Operator)}
          />
        </BasicField>
        {condition.operator !== 'is true' &&
          condition.operator !== 'is false' &&
          condition.operator !== 'is empty' &&
          condition.operator !== 'is not empty' &&
          argumentInput(condition.argument2, val => updateCondition(groupIndex, conditionIndex, 'argument2', val))}
        {conditionIndex < conditionsCount - 1 && (
          <BasicField className={logicalOperatorField}>
            <BasicSelect
              items={logicalOperatorOptions}
              value={condition.logicalOperator}
              onValueChange={val => updateCondition(groupIndex, conditionIndex, 'logicalOperator', val as LogicOperator)}
            />
          </BasicField>
        )}
      </Flex>
    </Flex>
  );
};
