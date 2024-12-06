import { forwardRef, useMemo, type ElementRef, type ReactNode } from 'react';
import { useField } from '../field/field';
import { IvyIcon } from '../icon/icon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip/tooltip';
import { inputBadge, inputBadgeIcon, inputBadgeLine, inputBadgeOutput, inputBadgeText } from './inputBadge.css';
import type { IvyIcons } from '@axonivy/ui-icons';
import { Flex } from '../flex/flex';
import { splitNewLine } from '@/utils/string';
import { cn } from '@/utils/class-name';

export type InputBadgeProps = React.HTMLAttributes<HTMLOutputElement> & {
  value: string;
  badgeProps: Array<BadgeProps>;
};

type BadgeProps = {
  regex: RegExp;
  icon: IvyIcons;
  badgeTextGen: (text: string) => string;
  tooltip?: (value: string) => ReactNode;
};

const Badge = ({
  icon,
  text,
  originalText,
  tooltipGen
}: {
  icon: IvyIcons;
  text: string;
  originalText: string;
  tooltipGen?: (text: string) => ReactNode;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Flex gap={1} alignItems='center' className={inputBadge}>
            <IvyIcon className={inputBadgeIcon} icon={icon} />
            {text}
          </Flex>
        </TooltipTrigger>
        {tooltipGen && (
          <TooltipContent collisionPadding={10} sideOffset={10}>
            {tooltipGen(originalText)}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export const InputBadge = forwardRef<ElementRef<'output'>, InputBadgeProps>(({ value, badgeProps, className, ...props }, forwardRef) => {
  const { inputProps } = useField();
  const items = useMemo(() => findBadges(value, badgeProps), [value, badgeProps]);
  return (
    <output className={cn(inputBadgeOutput, className)} {...inputProps} {...props} ref={forwardRef}>
      {items}
    </output>
  );
});

export const InputBadgeArea = forwardRef<ElementRef<'output'>, InputBadgeProps>(
  ({ value, badgeProps, className, ...props }, forwardRef) => {
    const { inputProps } = useField();
    const lines = useMemo(() => splitNewLine(value).map(e => findBadges(e, badgeProps)), [value, badgeProps]);
    return (
      <output className={cn(inputBadgeOutput, className)} {...inputProps} {...props} ref={forwardRef}>
        {lines.map((line, index) => (
          <Flex key={index} className={inputBadgeLine} role='row'>
            {line}
          </Flex>
        ))}
      </output>
    );
  }
);

const findBadges = (value: string, badgeProps: Array<BadgeProps>): Array<ReactNode> => {
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
