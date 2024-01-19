import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: 'var(--background)',
  paddingInline: 'var(--size-3)',
  gap: 'var(--size-2)',
  borderBottom: 'var(--basic-border)',
  fontSize: '14px',
  fontWeight: 500,
  height: 48,
  flex: '0 0 48px'
});

export const headerLeft = style({
  minWidth: 0,
  flex: 1
});

export const headerTitle = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

export const headerIcon = style({
  fontSize: '1.3rem'
});

export const headerMessage = style({
  padding: 'var(--size-1) var(--size-4)',
  borderBottom: 'var(--basic-border)',
  maxHeight: 'calc(15px * 2 + var(--size-1) * 2)',
  overflow: 'auto'
});
