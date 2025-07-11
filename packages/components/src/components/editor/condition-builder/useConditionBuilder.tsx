import type { Browser } from '@/components/editor/browser/browser';
import { IvyIcons } from '@axonivy/ui-icons';
import { useState } from 'react';
import { ConditionBuilder, type ConditionBuilderProps } from './conditionBuilder';

export const useConditionBuilder = (props: Omit<ConditionBuilderProps, 'onChange'>): Browser => {
  const [value, setValue] = useState<string>('');

  return {
    name: 'Condition',
    browser: <ConditionBuilder onChange={setValue} {...props} />,
    applyModifier: () => ({ value }),
    infoProvider: () => <p>{value}</p>,
    icon: IvyIcons.Process
  };
};
