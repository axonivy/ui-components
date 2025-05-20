import type { Meta, StoryObj } from '@storybook/react';
import { Graph, type NodeData } from './graph';
import { IvyIcons } from '@axonivy/ui-icons';
import { dataClasses, type DataClass, type Field } from './data';
import '@axonivy/ui-components/lib/components.css';
import { Button } from '@axonivy/ui-components';

const meta: Meta<typeof Graph> = {
  title: 'View/Graph',
  component: Graph
};

export default meta;

type Story = StoryObj<typeof Graph>;

export const Default: Story = {
  render: () => {
    const transformedDataClasses: NodeData[] = mapDataClassesToNodeData(dataClasses);
    return (
      <Graph
        graphNodes={transformedDataClasses}
        options={{
          filter: { enabled: true },
          circleFloatingEdges: true,
          zoomOnInit: { level: 0.75 }
        }}
      />
    );
  }
};
const mapDataClassesToNodeData = (dataClasses: DataClass[]): NodeData[] => {
  return dataClasses.map(dataClass => ({
    id: dataClass.id,
    label: dataClass.name,
    info: dataClass.fqName.long,
    content: <CustomNodeFieldContent fields={dataClass.fields} />,
    target: dataClass.relations,
    options: {
      controls: <Button icon={IvyIcons.DataClass} onClick={() => console.log('Open ' + dataClass.name)} />,
      expandContent: true
    }
  }));
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
