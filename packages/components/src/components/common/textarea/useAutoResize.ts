import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { splitNewLine } from '@/utils/utils';

type TextAreaValueProps = Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>;

export type AutoResizeProps = TextAreaValueProps & {
  autoResize?: boolean;
  maxRows?: number;
};

type AutoResizeReturn = TextAreaValueProps & {
  style: CSSProperties;
};

export const useAutoResize = ({ autoResize, value, onChange, maxRows }: AutoResizeProps): AutoResizeReturn => {
  const [currentValue, setCurrentValue] = useState(value);
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);
  const updateValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
