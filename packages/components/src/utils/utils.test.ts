import { generateId, splitNewLine } from './utils';
import { test, expect } from 'vitest';

test('generateId', () => {
  expect(generateId()).toEqual('0');
  expect(generateId()).toEqual('1');
  expect(generateId()).toEqual('2');
});

test('splitNewLine', () => {
  expect(splitNewLine('')).toEqual(['']);
  expect(splitNewLine('abc')).toEqual(['abc']);
  expect(splitNewLine('abc\ndef')).toEqual(['abc', 'def']);
  expect(splitNewLine('abc\rdef')).toEqual(['abc', 'def']);
  expect(splitNewLine('abc\r\ndef')).toEqual(['abc', 'def']);
});
