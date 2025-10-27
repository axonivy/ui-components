import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import * as All from '../index';

// Initialize all components to fix vitest race conditions
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
All;

afterEach(() => cleanup());

window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
