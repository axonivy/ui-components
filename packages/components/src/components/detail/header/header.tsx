import * as React from 'react';
import type { WithClassName } from '@/types/types';
import { header, headerIcon, headerLeft, headerMessage, headerTitle } from './header.css';
import { cn } from '@/utils/class-name';
import type { IvyIcons } from '@axonivy/ui-icons';
import { Flex, IvyIcon } from '@/components/common';

export type SidebarHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  icon: IvyIcons;
  title: string;
};

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps & WithClassName>(
  ({ icon, title, className, children, ...props }, ref) => {
    return (
      <>
        <div className={cn(header, className)} ref={ref} {...props}>
          <Flex className={headerLeft} gap={3} alignItems='center'>
            <IvyIcon icon={icon} className={headerIcon} />
            <div className={headerTitle}>{title}</div>
          </Flex>
        </div>
        {children && (
          <Flex className={cn(headerMessage, className)} direction='column' gap={1} ref={ref} {...props}>
            {children}
          </Flex>
        )}
      </>
    );
  }
);
SidebarHeader.displayName = 'SidebarHeader';

export { SidebarHeader };
