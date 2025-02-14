import type { Meta, StoryObj } from '@storybook/react';
import { Graph, type GraphNodeData } from '@/components/editor/graph/graph';
import { dataClasses, dataClassRelations, type Field } from '@/components/editor/graph/data';
import { ReactFlowProvider } from '@xyflow/react';
import { useState } from 'react';
import { Flex } from '@/components/common/flex/flex';
import { Button } from '@/components/common/button/button';
import { IvyIcons } from '@axonivy/ui-icons';
import { BasicSelect } from '@/components/common/select/select';

const meta: Meta<typeof Graph> = {
  title: 'Editor/Graph',
  component: Graph
};

export default meta;

type Story = StoryObj<typeof Graph>;

export const Default: Story = {
  render: () => {
    const [selectedDataClass, setSelectedDataClass] = useState<string>('all');

    const transeFormedDataClasses: GraphNodeData[] = dataClasses.map(dataClass => {
      return {
        id: dataClass.id,
        label: dataClass.name,
        highlightNode: dataClass.id === selectedDataClass,
        content: customNodeFieldContent(dataClass.fields) // Passing fields to content
      };
    });
    return (
      <ReactFlowProvider>
        <Graph
          graphNodes={transeFormedDataClasses}
          graphEdges={dataClassRelations}
          options={{
            topLeftCustomControl: (
              <BasicSelect
                value={selectedDataClass}
                onValueChange={setSelectedDataClass}
                items={[
                  { value: 'all', label: 'Show all Data Classes' },
                  ...dataClasses.map(dataClass => ({
                    value: dataClass.id,
                    label: dataClass.name
                  }))
                ]}
              />
            ),
            filter: {
              filterNode: selectedDataClass,
              setFilterNode: setSelectedDataClass,
              filterOnSelect: true
            }
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
