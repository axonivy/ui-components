import { Button } from '@axonivy/ui-components';
import '@axonivy/ui-components/lib/components.css';
import { IvyIcons } from '@axonivy/ui-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { dataClasses, type DataClass, type Field } from './data';
import { Graph, type GraphEdgeActionPayload, type NodeData } from './graph';

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
          zoomOnInit: { level: 0.75 }
        }}
      />
    );
  }
};

const EditableGraph = () => {
  const [classes, setClasses] = useState<DataClass[]>(dataClasses);

  const onEdgeCreate = ({ sourceNodeId, targetNodeId }: GraphEdgeActionPayload) => {
    setClasses(prev =>
      prev.map(dc =>
        dc.id === sourceNodeId
          ? { ...dc, relations: [...(dc.relations ?? []), { id: targetNodeId }] }
          : dc
      )
    );
  };

  const onEdgeDelete = ({ sourceNodeId, targetNodeId }: GraphEdgeActionPayload) => {
    setClasses(prev =>
      prev.map(dc =>
        dc.id === sourceNodeId
          ? { ...dc, relations: (dc.relations ?? []).filter(r => r.id !== targetNodeId) }
          : dc
      )
    );
  };

  return (
    <Graph
      graphNodes={mapDataClassesToNodeData(classes)}
      options={{
        filter: { enabled: true },
        editable: { enabled: true, onEdgeCreate, onEdgeDelete },
        zoomOnInit: { level: 0.75 }
      }}
    />
  );
};

export const Editable: Story = {
  render: () => <EditableGraph />
};
const mapDataClassesToNodeData = (dataClasses: DataClass[]): NodeData[] => {
  return dataClasses.map(dataClass => ({
    id: dataClass.id,
    label: dataClass.name,
    info: dataClass.fqName.long,
    content: <CustomNodeFieldContent fields={dataClass.fields} />,
    target: dataClass.relations,
    options: {
      controls: <Button icon={IvyIcons.DataClass} onClick={() => alert('Open ' + dataClass.name)} />,
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
