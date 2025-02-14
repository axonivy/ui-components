import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const customNode = style({
  padding: '10px',
  textAlign: 'left',
  borderRadius: '5px',
  background: 'white',
  display: 'inline-block'
});

export const selectedNode = style({
  border: `2px solid ${vars.color.p500}`
});

export const originalNode = style({
  border: `2px solid ${vars.color.success}`
});

export const normalNode = style({
  border: `1px solid ${vars.color.body}`
});

export const customNodeHeader = style({
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '5px'
});

export const customNodeFields = style({
  padding: '0 10px',
  listStyleType: 'none',
  margin: 0
});

export const customNodeField = style({
  display: 'flex',
  gap: '5px'
});

export const customNodeFieldName = style({
  fontWeight: 'bold'
});
