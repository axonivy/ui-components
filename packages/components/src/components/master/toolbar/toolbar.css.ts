import { vars } from '@/styles/theme.css';
import { createContainer, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

const container = createContainer();

export const toolbar = style({
  position: 'relative',
  inset: 0,
  width: '100%',
  height: 48,
  flex: '0 0 48px',
  background: vars.color.background,
  boxShadow: vars.shadow.editor,
  zIndex: 10,
  containerName: container,
  containerType: 'inline-size',
  userSelect: 'none'
});

export const toolbarHeader = style({
  marginInline: vars.size.s3,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%'
});

export const toolbarTitle = style({
  fontWeight: 600,
  fontSize: '14px'
});

const createQuery = (width?: number) => ({
  '@container': {
    [`${container} (width < ${width}px)`]: {
      display: 'none'
    }
  }
});

export const toolbarContainer = recipe({
  variants: {
    width: {
      450: createQuery(450),
      650: createQuery(650)
    }
  }
});

export type ToolbarContainerVariants = RecipeVariants<typeof toolbarContainer>;
