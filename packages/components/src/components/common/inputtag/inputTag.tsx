import { forwardRef, type ElementRef } from 'react';
import { useField } from '../field/field';
import { IvyIcon } from '../icon/icon';
import './inputTag.css';

import { type IvyIcons } from '@axonivy/ui-icons';

export type InputTagProps = {
  tags?: string[];
  lines?: string[][];
  tagOrText: (value: string) => TagTextProps | undefined;
};

export type TagTextProps = { icon: IvyIcons; text: string };

type TagProps = Pick<InputTagProps, 'tagOrText'> & {
  value: string;
};

const Tag = ({ value, tagOrText }: TagProps) => {
  const resolved = tagOrText(value);
  if (resolved) {
    return (
      <span className='input-tag'>
        <span className='input-tag-icon'>
          <IvyIcon icon={resolved.icon} />
        </span>
        {resolved.text}
      </span>
    );
  }
  return <span className='input-text'>{value}</span>;
};

export const InputTag = ({ tags, tagOrText, ...props }: InputTagProps) => {
  const { inputProps } = useField();
  if (!tags) return <></>;
  return (
    <output className='input-tag-output' {...inputProps} {...props}>
      {tags.map((tag, index) => (
        <Tag key={index} value={tag} tagOrText={tagOrText} />
      ))}
    </output>
  );
};

export const InputTagArea = forwardRef<ElementRef<'output'>, InputTagProps>(({ lines, tagOrText, ...props }, forwardRef) => {
  const { inputProps } = useField();
  if (!lines) return <></>;
  return (
    <output className='input-tag-output' {...inputProps} {...props} ref={forwardRef}>
      {lines.map((line, index) => (
        <div key={index} className='input-tag-line' role='row'>
          {line.map((tag, index) => (
            <Tag key={index} value={tag} tagOrText={tagOrText} />
          ))}
        </div>
      ))}
    </output>
  );
});
