import { createContainer, style } from '@vanilla-extract/css';

const container = createContainer();

export const toolbar = style({
  position: 'relative',
  inset: 0,
  width: '100%',
  height: 48,
  flex: '0 0 48px',
  background: 'var(--background)',
  boxShadow: 'var(--editor-shadow)',
  zIndex: 10,
  containerName: container,
  containerType: 'inline-size',
  userSelect: 'none'
});

export const toolbarHeader = style({
  marginInline: 'var(--size-3)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%'
});

export const toolbarTitle = style({
  fontWeight: 600,
  fontSize: '14px'
});

export const toolbarContainer = style({
  '@container': {
    [`${container} (max-width: var(--toolbar-container-max-width))`]: {
      display: 'none'
    }
  }
});
