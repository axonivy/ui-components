import type { Meta, StoryObj } from '@storybook/react';
import { Graph, type CustomNodeData } from '@/components/editor/graph/graph';
import { Button } from '@/components/common/button/button';
import { IvyIcons } from '@axonivy/ui-icons';
import { dataClasses, type Field } from '@/components/editor/graph/data/data';

const meta: Meta<typeof Graph> = {
  title: 'Editor/Graph',
  component: Graph
};

export default meta;

type Story = StoryObj<typeof Graph>;

export const Default: Story = {
  render: () => {
    const transeFormedDataClasses: CustomNodeData[] = dataClasses.map(dataClass => {
      return {
        id: dataClass.id,
        label: dataClass.name,
        info: dataClass.fqName.long,
        content: <CustomNodeFieldContent fields={dataClass.fields} />,
        target: dataClass.relations,
        options: {
          controls: <Button icon={IvyIcons.DataClass} onClick={() => console.log('Open ' + dataClass.name)} />,
          expandContent: true
        }
      };
    });
    return (
      <Graph
        graphNodes={transeFormedDataClasses}
        options={{
          filter: true,
          circleFloatingEdges: true
        }}
      />
    );
  }
};

const CustomNodeFieldContent = ({ fields }: { fields: Field[] }) => {
  return (
    <ul style={{ padding: '0 10px', listStyle: 'none', margin: 0, overflow: 'auto' }}>
      {fields.map((field: { name: string; type: string }) => (
        <li key={field.name} style={{ display: 'flex', gap: '5px' }}>
          <div>{field.name}:</div>
          <div style={{ color: 'var(--N700) ' }}>{field.type}</div>
        </li>
      ))}
    </ul>
  );
};
