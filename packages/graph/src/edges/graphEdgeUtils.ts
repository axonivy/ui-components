import type { InternalNode } from '@xyflow/react';
import { Position } from '@xyflow/react';

type Params = [number, number, Position];
type IntersectionPoint = { x: number; y: number };
export type EdgeParams = {
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  sourcePos: Position;
  targetPos: Position;
};

const getParams = (nodeA: InternalNode, nodeB: InternalNode): Params => {
  const centerA = getNodeCenter(nodeA);
  const centerB = getNodeCenter(nodeB);
  const horizontalDiff = Math.abs(centerA.x - centerB.x);
  const verticalDiff = Math.abs(centerA.y - centerB.y);

  let position: Position;
  if (horizontalDiff > verticalDiff) {
    position = centerA.x > centerB.x ? Position.Left : Position.Right;
  } else {
    position = centerA.y > centerB.y ? Position.Top : Position.Bottom;
  }

  const [x, y] = getHandleCoordsByPosition(nodeA, position);
  return [x, y, position];
};

const getHandleCoordsByPosition = (node: InternalNode, handlePosition: Position): [number, number] => {
  const handle = node.internals.handleBounds?.source?.find(h => h.position === handlePosition);

  if (!handle) {
    return [0, 0];
  }

  let offsetX = handle.width / 2;
  let offsetY = handle.height / 2;

  switch (handlePosition) {
    case Position.Left:
      offsetX = 0;
      break;
    case Position.Right:
      offsetX = handle.width;
      break;
    case Position.Top:
      offsetY = 0;
      break;
    case Position.Bottom:
      offsetY = handle.height;
      break;
  }

  const x = node.internals.positionAbsolute.x + handle.x + offsetX;
  const y = node.internals.positionAbsolute.y + handle.y + offsetY;

  return [x, y];
};

const getNodeCenter = (node: InternalNode): { x: number; y: number } => {
  const x = node.internals?.positionAbsolute?.x ?? 0;
  const y = node.internals?.positionAbsolute?.y ?? 0;
  const width = node.measured?.width ?? 0;
  const height = node.measured?.height ?? 0;

  return {
    x: x + width / 2,
    y: y + height / 2
  };
};
export const getEdgeParams = (source: InternalNode, target: InternalNode): EdgeParams => {
  const [sx, sy, sourcePos] = getParams(source, target);
  const [tx, ty, targetPos] = getParams(target, source);

  return {
    sx,
    sy,
    tx,
    ty,
    sourcePos,
    targetPos
  };
};

const getNodeIntersection = (intersectionNode: InternalNode, targetNode: InternalNode): IntersectionPoint => {
  const { width: intersectionNodeWidth, height: intersectionNodeHeight } = intersectionNode.measured;
  const intersectionNodePosition = intersectionNode.internals.positionAbsolute;
  const targetPosition = targetNode.internals.positionAbsolute;
  if (!intersectionNodeWidth || !intersectionNodeHeight) return { x: 0, y: 0 };
  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + (targetNode.measured.width ? targetNode.measured.width / 2 : 0);
  const y1 = targetPosition.y + (targetNode.measured.height ? targetNode.measured.height / 2 : 0);

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
};

const getEdgePosition = (node: InternalNode, intersectionPoint: IntersectionPoint): Position => {
  const n = { ...node.internals.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + (n.measured.width ? n.measured.width - 1 : 0)) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + (n.measured.height ? n.measured.height - 1 : 0)) {
    return Position.Bottom;
  }

  return Position.Top;
};

export const getCircleEdgeParams = (source: InternalNode, target: InternalNode): EdgeParams => {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos
  };
};
