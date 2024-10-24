import { forwardRef, useMemo, type ElementRef, type ReactNode } from 'react';
import { useField } from '../field/field';
import { IvyIcon } from '../icon/icon';
import { inputBadge, inputBadgeIcon, inputBadgeLine, inputBadgeOutput, inputBadgeText } from './inputBadge.css';

import type { IvyIcons } from '@axonivy/ui-icons';
import { Flex } from '../flex/flex';
import { splitNewLine } from '@/utils/string';

export type InputBadgeProps = {
  value: string;
  badgeProps: Array<BadgeProps>;
};

type BadgeProps = { regex: RegExp; icon: IvyIcons; badgeTextGen: (text: string) => string };

const Badge = ({ icon, text }: { icon: IvyIcons; text: string }) => (
  <Flex gap={1} alignItems='center' className={inputBadge}>
    <IvyIcon className={inputBadgeIcon} icon={icon} />
    {text}
  </Flex>
);

export const InputBadge = forwardRef<ElementRef<'output'>, InputBadgeProps>(({ value, badgeProps, ...props }, forwardRef) => {
  const { inputProps } = useField();
  const items = useMemo(() => findBadges(value, badgeProps), [value, badgeProps]);
  return (
    <output className={inputBadgeOutput} {...inputProps} {...props} ref={forwardRef}>
      {items}
    </output>
  );
});

export const InputBadgeArea = forwardRef<ElementRef<'output'>, InputBadgeProps>(({ value, badgeProps, ...props }, forwardRef) => {
  const { inputProps } = useField();
  const lines = useMemo(() => splitNewLine(value).map(e => findBadges(e, badgeProps)), [value, badgeProps]);
  return (
    <output className={inputBadgeOutput} {...inputProps} {...props} ref={forwardRef}>
      {lines.map((line, index) => (
        <Flex key={index} className={inputBadgeLine} role='row'>
          {line}
        </Flex>
      ))}
    </output>
  );
});

const findBadges = (value: string, badgeProps: Array<BadgeProps>): Array<ReactNode> => {
  const separated = value.split(new RegExp('(' + badgeProps.map(p => p.regex.source).join('|') + ')'));
  return separated.map((text, index) => {
    if (!text) return;
    let node: ReactNode = (
      <span key={index} className={inputBadgeText}>
        {text}
      </span>
    );
    badgeProps.forEach(prop => {
      if (text.match(new RegExp(prop.regex))) {
        node = <Badge key={index} text={prop.badgeTextGen(text)} icon={prop.icon} />;
      }
    });
    return node;
  });
};
