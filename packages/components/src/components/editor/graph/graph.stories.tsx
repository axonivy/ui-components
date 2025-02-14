import type { Meta, StoryObj } from '@storybook/react';
import { Graph, type CustomNodeData } from '@/components/editor/graph/graph';
import { dataClasses, dataClassRelations, type Field } from '@/components/editor/graph/data';
import { ReactFlowProvider } from '@xyflow/react';
import { useState } from 'react';
import { Flex } from '@/components/common/flex/flex';
import { Button } from '@/components/common/button/button';
import { IvyIcons } from '@axonivy/ui-icons';

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
        content: customNodeFieldContent(dataClass.fields)
      };
    });
    return (
      <ReactFlowProvider>
        <Graph
          graphNodes={transeFormedDataClasses}
          graphEdges={dataClassRelations}
          options={{
            filter: true
          }}
        />
      </ReactFlowProvider>
    );
  }
};

const customNodeFieldContent = (fields: Field[]) => {
  const [expanded, setExpanded] = useState(false);
  const fieldsToShow = expanded ? fields : fields.slice(0, 2);

  return (
    <>
      <ul style={{ padding: '0 10px', listStyle: 'none', margin: 0 }}>
        {fieldsToShow.map((field: { name: string; type: string }) => (
          <li key={field.name} style={{ display: 'flex', gap: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>{field.name}:</span> <i>{field.type}</i>
          </li>
        ))}
      </ul>
      {fields.length > 2 && (
        <Flex justifyContent='center'>
          <Button icon={IvyIcons.Chevron} rotate={expanded ? 270 : 90} size='small' onClick={() => setExpanded(!expanded)} />
        </Flex>
      )}
    </>
  );
};
