import { vars } from '@axonivy/ui-components';
import { createGlobalTheme, createGlobalThemeContract } from '@vanilla-extract/css';

const reactFlow = createGlobalThemeContract({
  edge: {
    stroke: 'xy-edge-stroke'
  },
  attribute: {
    background: 'xy-attribution-background-color'
  },
  minimap: {
    background: 'xy-minimap-background-color',
    maskBackgroundColor: 'xy-minimap-mask-background-color',
    nodeBackgroundColor: 'xy-minimap-node-background-color'
  },
  background: {
    color: 'xy-background-color'
  },
  node: {
    color: 'xy-node-color',
    border: 'xy-node-border',
    background: 'xy-node-background'
  },
  controls: {
    background: 'xy-controls-button-background-color',
    backgroundHover: 'xy-controls-button-background-color-hover',
    color: 'xy-controls-button-color',
    colorHover: 'xy-controls-button-color-hover',
    borderColor: 'xy-controls-button-border-color'
  }
});

createGlobalTheme('.dark .react-flow', reactFlow, {
  edge: {
    stroke: vars.color.n700
  },
  attribute: {
    background: 'transparent'
  },
  minimap: {
    background: vars.color.n50,
    maskBackgroundColor: 'rgb(60, 60, 60, 0.6)',
    nodeBackgroundColor: vars.color.n200
  },
  background: {
    color: vars.color.background
  },
  node: {
    color: vars.color.body,
    border: vars.border.basic,
    background: vars.color.background
  },
  controls: {
    background: vars.color.n25,
    backgroundHover: vars.color.n100,
    color: vars.color.body,
    colorHover: vars.color.body,
    borderColor: vars.color.n200
  }
});
