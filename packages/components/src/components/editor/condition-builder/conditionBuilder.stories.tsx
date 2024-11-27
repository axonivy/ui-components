import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  generateConditionString,
  logicalOperatorOptions,
  typeOptions
} from '@/components/editor/condition-builder/condition-builder-utils';
import { ConditionBuilderProvider } from '@/components/editor/condition-builder/conditionBuilderContext';
import { ConditionBuilder } from '@/components/editor/condition-builder/conditionBuilder';
import { vars } from '@/styles/theme.css';

const meta: Meta<typeof ConditionBuilder> = {
  title: 'Editor/ConditionBuilder',
  component: ConditionBuilder
};

export default meta;

type Story = StoryObj<typeof ConditionBuilder>;

export const Default: Story = {
  render: () => {
    const [condition, setCondition] = useState<string>();
    return (
      <>
        <ConditionBuilderProvider
          generateConditionString={generateConditionString}
          logicalOperatorOptions={logicalOperatorOptions}
          typeOptions={typeOptions}
        >
          <ConditionBuilder onChange={setCondition} />
        </ConditionBuilderProvider>
        <pre style={{ border: vars.border.basic, maxHeight: '80px', padding: vars.padding.input, borderRadius: vars.border.r2 }}>
          {condition}
        </pre>
      </>
    );
  }
};
