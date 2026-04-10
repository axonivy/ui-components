import { setProjectAnnotations } from '@storybook/react-vite';
import { beforeAll } from 'vitest';
import * as previewAnnotations from './preview';
// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const annotations = setProjectAnnotations([previewAnnotations]);

beforeAll(annotations.beforeAll);
