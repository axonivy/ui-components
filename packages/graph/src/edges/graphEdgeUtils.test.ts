import type { InternalNode } from '@xyflow/react';
import { Position } from '@xyflow/react';
import { describe, expect } from 'vitest';
import { getCircleEdgeParams, getEdgeParams } from './graphEdgeUtils';

const createNode = (x: number, y: number, width = 100, height = 100) =>
  ({
    measured: { width, height },
    internals: {
      positionAbsolute: { x, y },
      handleBounds: {
        source: [
          { position: Position.Top, x: 0, y: 0, width: 10, height: 10 },
          { position: Position.Bottom, x: 0, y: height - 10, width: 10, height: 10 },
          { position: Position.Left, x: 0, y: 0, width: 10, height: 10 },
          { position: Position.Right, x: width - 10, y: 0, width: 10, height: 10 }
        ]
      }
    }
  }) as InternalNode;

describe('getEdgeParams', () => {
  test('returns correct edge params when source is left of target', () => {
    const source = createNode(0, 0);
    const target = createNode(200, 0);

    const result = getEdgeParams(source, target);

    expect(result.sx).toBeGreaterThan(0);
    expect(result.sy).toBeGreaterThan(0);
    expect(result.tx).toBeGreaterThan(0);
    expect(result.ty).toBeGreaterThan(0);
    expect([Position.Right, Position.Left]).toContain(result.sourcePos);
    expect([Position.Right, Position.Left]).toContain(result.targetPos);
  });

  test('returns correct edge params when source is above target', () => {
    const source = createNode(0, 0);
    const target = createNode(0, 200);

    const result = getEdgeParams(source, target);

    expect(result.sx).toBeGreaterThan(0);
    expect(result.sy).toBeGreaterThan(0);
    expect(result.tx).toBeGreaterThan(0);
    expect(result.ty).toBeGreaterThan(0);
    expect([Position.Top, Position.Bottom]).toContain(result.sourcePos);
    expect([Position.Top, Position.Bottom]).toContain(result.targetPos);
  });
});

describe('getCircleEdgeParams', () => {
  test('returns correct intersection and edge positions', () => {
    const source = createNode(0, 0);
    const target = createNode(200, 0);

    const result = getCircleEdgeParams(source, target);

    expect(result.sx).toBeTypeOf('number');
    expect(result.sy).toBeTypeOf('number');
    expect(result.tx).toBeTypeOf('number');
    expect(result.ty).toBeTypeOf('number');
    expect(Object.values(Position)).toContain(result.sourcePos);
    expect(Object.values(Position)).toContain(result.targetPos);
  });

  test('handles zero size nodes gracefully', () => {
    const source = createNode(0, 0, 0, 0);
    const target = createNode(200, 0, 0, 0);

    const result = getCircleEdgeParams(source, target);

    expect(result.sx).toBe(0);
    expect(result.sy).toBe(0);
    expect(result.tx).toBe(0);
    expect(result.ty).toBe(0);
  });
});
