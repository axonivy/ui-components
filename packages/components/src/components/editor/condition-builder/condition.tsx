import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { BasicSelect } from '@/components/common/select/select';
import { conditionBorder, conditionValue, logicalOperatorField, operatorField } from './conditionBuilder.css';
import { useConditionContext, type Operator, type LogicOperator, type ConditionData } from './conditionContext';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import { Label } from '@radix-ui/react-label';

export interface ConditionProps {
  condition: ConditionData;
  conditionIndex: number;
  groupIndex: number;
  conditionsCount: number;
}

const Condition = ({ condition, conditionIndex, groupIndex, conditionsCount }: ConditionProps) => {
  const { updateCondition, removeCondition, typeOptions, logicalOperatorOptions, argumentInput } = useConditionContext();
  return (
    <Flex direction='column' className={cn(conditionBorder, 'ui-condition-builder-condition')}>
      <Flex direction='row' justifyContent='space-between'>
        <Label>{`Condition ${conditionIndex + 1}`}</Label>
        <Button onClick={() => removeCondition(groupIndex, conditionIndex)} icon={IvyIcons.Trash} aria-label='Remove Condition' />
      </Flex>
      <Flex alignItems='center' gap={2} direction='row'>
        <div className={conditionValue}>
          {argumentInput(condition.argument1, val => updateCondition(groupIndex, conditionIndex, 'argument1', val))}
        </div>
        <BasicSelect
          className={operatorField}
          items={typeOptions}
          value={condition.operator}
          onValueChange={val => updateCondition(groupIndex, conditionIndex, 'operator', val as Operator)}
        />
        {condition.operator !== 'is true' &&
          condition.operator !== 'is false' &&
          condition.operator !== 'is empty' &&
          condition.operator !== 'is not empty' && (
            <div className={conditionValue}>
              {argumentInput(condition.argument2, val => updateCondition(groupIndex, conditionIndex, 'argument2', val))}
            </div>
          )}
        {conditionIndex < conditionsCount - 1 && (
          <BasicSelect
            className={logicalOperatorField}
            items={logicalOperatorOptions}
            value={condition.logicalOperator}
            onValueChange={val => updateCondition(groupIndex, conditionIndex, 'logicalOperator', val as LogicOperator)}
          />
        )}
      </Flex>
    </Flex>
  );
};
Condition.displayName = 'Condition';

export { Condition };
