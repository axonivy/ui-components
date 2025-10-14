import { splitNewLine } from '@/utils/string';
import { useMemo, useState, type ChangeEvent, type CSSProperties, type TextareaHTMLAttributes } from 'react';

type TextAreaValueProps = Pick<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>;

export type AutoResizeProps = TextAreaValueProps & {
  /** Auto resize the textarea to fit the content */
  autoResize?: boolean;
  /** Max rows of the textarea */
  maxRows?: number;
};

type AutoResizeReturn = TextAreaValueProps & {
  style: CSSProperties;
};

export const useAutoResize = ({ autoResize, value, onChange, maxRows }: AutoResizeProps): AutoResizeReturn => {
  const [currentValue, setCurrentValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  if (prevValue !== value) {
    setCurrentValue(value);
    setPrevValue(value);
  }
  const updateValue = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const update = event.target.value;
    setCurrentValue(update);
    if (onChange) {
      onChange(event);
    }
  };
  const height = useMemo(() => {
    if (autoResize) {
      let rows = splitNewLine(`${currentValue}`).length;
      if (maxRows && rows > maxRows) {
        rows = maxRows;
      }
      return `${rows * 14}px`;
    }
    return undefined;
  }, [autoResize, maxRows, currentValue]);
  return { value: currentValue, onChange: updateValue, style: { height } };
};
