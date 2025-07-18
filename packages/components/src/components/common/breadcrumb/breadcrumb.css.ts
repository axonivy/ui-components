import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const breadcrumbList = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: vars.size.s2,
  color: vars.color.n800,
  overflowWrap: 'break-word',
  listStyle: 'none',
  cursor: 'default',
  margin: 0,
  padding: 0
});

export const breadcrumbItem = style({
  display: 'inline-flex',
  gap: vars.size.s1,
  alignItems: 'center'
});

export const breadcrumbLink = style({
  transition: 'color 0.15s ease-in-out',
  color: 'inherit',
  textDecoration: 'inherit',
  ':hover': {
    color: vars.color.body
  }
});

export const breadcrumbPage = style({
  color: vars.color.body
});

export const breadcrumbSeparator = style({
  display: 'inline-flex',
  alignItems: 'center'
});

export const breadcrumbEllipsis = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    cursor: 'pointer',
    color: vars.color.body
  }
});
