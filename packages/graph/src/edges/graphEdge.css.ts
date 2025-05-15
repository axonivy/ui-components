import { vars } from '@axonivy/ui-components';
import { style } from '@vanilla-extract/css';

export const customEdge = style({
  position: 'absolute',
  background: vars.color.background,
  padding: '2px 5px',
  borderRadius: '4px',
  fontSize: '12px',
  whiteSpace: 'nowrap'
});
