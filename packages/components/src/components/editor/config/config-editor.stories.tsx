import { PanelMessage } from '@/components/common/panelMessage/panelMessage';
import { ConfigEditor } from '@/components/editor/config/config-editor';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ConfigEditor> = {
  title: 'Editor/ConfigEditor',
  component: ConfigEditor
};

export default meta;

export const Default = () => (
  <ConfigEditor
    masterTitle={'Master Title'}
    masterContent={<PanelMessage message='Master Content' />}
    detailTitle={'Detail Title'}
    detailContent={<PanelMessage message='Detail Content' />}
  ></ConfigEditor>
);
