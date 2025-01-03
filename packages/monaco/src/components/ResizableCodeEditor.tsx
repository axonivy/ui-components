import './ResizableCodeEditor.css';
import { useState } from 'react';
import type { CodeEditorProps } from './CodeEditor';
import { CodeEditor } from './CodeEditor';
import { useMove } from '@react-aria/interactions';

export type ResizableCodeEditorProps = Omit<CodeEditorProps, 'height'> & {
  initHeight?: number;
};

export const ResizableCodeEditor = ({ initHeight, ...props }: ResizableCodeEditorProps) => {
  const [height, setHeight] = useState(initHeight ?? 90);
  const [resizeActive, setResizeActive] = useState(false);
  const { moveProps } = useMove({
    onMoveStart() {
      setResizeActive(true);
    },
    onMove(e) {
      setHeight(y => y + e.deltaY);
    },
    onMoveEnd() {
      setResizeActive(false);
    }
  });
  return (
    <div className='resizable-code-editor'>
      <CodeEditor {...props} height={height} />
      <hr className='resize-line' data-resize-active={resizeActive} {...moveProps} style={{ top: height }} />
    </div>
  );
};
