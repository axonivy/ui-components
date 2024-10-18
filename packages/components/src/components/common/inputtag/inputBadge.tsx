import { forwardRef, type ElementRef } from 'react';
import { useField } from '../field/field';
import { IvyIcon } from '../icon/icon';
import { inputBadge, inputBadgeIcon, inputBadgeLine, inputBadgeOutput } from './inputBadge.css';

import type { IvyIcons } from '@axonivy/ui-icons';

export type InputBadgeProps = {
  value: string;
  badgeRegex: BadgeRegex[];
};

type BadgeRegex = { delimiter: { start: string; end: string }; icon: IvyIcons; badgeTextGen: (text: string) => string };

export type BadgeTextProps = { icon: IvyIcons | undefined; text: string };

const Badge = ({ badge }: { badge: BadgeTextProps }) => {
  if (badge.icon) {
    return (
      <span className={inputBadge}>
        <span className={inputBadgeIcon}>
          <IvyIcon icon={badge.icon} />
        </span>
        {badge.text}
      </span>
    );
  }
  return <span>{badge.text}</span>;
};

export const InputBadge = ({ value, badgeRegex, ...props }: InputBadgeProps) => {
  const { inputProps } = useField();
  const badges = findBadges(value, badgeRegex);
  return (
    <output className={inputBadgeOutput} {...inputProps} {...props}>
      {badges.map((badge, index) => (
        <Badge key={index} badge={badge} />
      ))}
    </output>
  );
};

export const InputBadgeArea = forwardRef<ElementRef<'output'>, InputBadgeProps>(({ value, badgeRegex, ...props }, forwardRef) => {
  const { inputProps } = useField();
  const lines = value.split(/\r\n|\r|\n/).map(e => findBadges(e, badgeRegex));
  return (
    <output className={inputBadgeOutput} {...inputProps} {...props} ref={forwardRef}>
      {lines.map((line, index) => (
        <div key={index} className={inputBadgeLine} role='row'>
          {line.map((badge, index) => (
            <Badge key={index} badge={badge} />
          ))}
        </div>
      ))}
    </output>
  );
});

const findBadges = (value: string, badgeRegex: BadgeRegex[]): BadgeTextProps[] => {
  const regexStrings: string[] = [];
  badgeRegex.forEach(reg => {
    regexStrings.push('(?:' + reg.delimiter.start + '.*?' + reg.delimiter.end + ')');
  });
  const separated = value.split(new RegExp('(' + regexStrings.join('|') + ')'));
  let badgeTextProps: BadgeTextProps[] = [];
  badgeTextProps = separated.map(e => {
    let prop: BadgeTextProps = { icon: undefined, text: e };
    badgeRegex.forEach(reg => {
      if (e && e.startsWith(reg.delimiter.start) && e.endsWith(reg.delimiter.end)) {
        prop = {
          icon: reg.icon,
          text: reg.badgeTextGen(e.replace(reg.delimiter.start, '').replace(reg.delimiter.end, ''))
        };
      }
    });
    return prop;
  });
  return badgeTextProps;
};
