import * as React from 'react';
import { useField } from '../field/field';
import { IvyIcon } from '../icon/icon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip/tooltip';
import { inputBadge, inputBadgeIcon, inputBadgeLine, badgeOutput, inputBadgeText } from './inputBadge.css';
import type { IvyIcons } from '@axonivy/ui-icons';
import { Flex } from '../flex/flex';
import { splitNewLine } from '@/utils/string';
import { cn } from '@/utils/class-name';

export type InputBadgeProps = React.ComponentProps<'output'> & {
  value: string;
  badgeProps: Array<BadgeType>;
};

export type BadgeType = {
  regex: RegExp;
  icon: IvyIcons;
  badgeTextGen: (text: string) => string;
  tooltip?: (value: string) => React.ReactNode;
};

type BadgeProps = {
  icon: IvyIcons;
  text: string;
  originalText: string;
  tooltipGen?: (text: string) => React.ReactNode;
};

const Badge = ({ icon, text, originalText, tooltipGen }: BadgeProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Flex gap={1} alignItems='center' className={cn(inputBadge, 'ui-input-badge-item')}>
          <IvyIcon className={inputBadgeIcon} icon={icon} />
          {text}
        </Flex>
      </TooltipTrigger>
      <TooltipContent collisionPadding={10} sideOffset={10}>
        <BadgeTooltip originalText={originalText} tooltipGen={tooltipGen} />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const BadgeTooltip = ({ originalText, tooltipGen }: Pick<BadgeProps, 'originalText' | 'tooltipGen'>) =>
  tooltipGen ? tooltipGen(originalText) : originalText;

export const InputBadge = ({ value, badgeProps, className, ...props }: InputBadgeProps) => {
  const { inputProps } = useField();
  const items = React.useMemo(() => findBadges(value, badgeProps), [value, badgeProps]);
  return (
    <output className={cn(badgeOutput, className, 'ui-input-badge')} {...inputProps} {...props}>
      <Flex className={inputBadgeLine} role='row'>
        {items}
      </Flex>
    </output>
  );
};

export const InputBadgeArea = ({ value, badgeProps, className, ...props }: InputBadgeProps) => {
  const { inputProps } = useField();
  const lines = React.useMemo(() => splitNewLine(value).map(e => findBadges(e, badgeProps)), [value, badgeProps]);
  return (
    <output className={cn(badgeOutput, className, 'ui-input-badge-area')} {...inputProps} {...props}>
      {lines.map((line, index) => (
        <Flex key={index} className={inputBadgeLine} role='row'>
          {line}
        </Flex>
      ))}
    </output>
  );
};

const findBadges = (value: string, badgeProps: Array<BadgeType>): Array<React.ReactNode> => {
  const separated = value.split(new RegExp(`(${badgeProps.map(p => p.regex.source).join('|')})`));
  return separated.map((text, index) => {
    if (!text) return;
    for (const prop of badgeProps) {
      if (text.match(new RegExp(prop.regex))) {
        return <Badge key={index} text={prop.badgeTextGen(text)} icon={prop.icon} originalText={text} tooltipGen={prop.tooltip} />;
      }
    }
    return (
      <span key={index} className={inputBadgeText}>
        {text}
      </span>
    );
  });
};
