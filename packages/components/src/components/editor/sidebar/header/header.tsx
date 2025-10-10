import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { cn } from '@/utils/class-name';
import type { IvyIcons } from '@axonivy/ui-icons';
import type { ComponentProps } from 'react';
import { header, headerIcon, headerLeft, headerMessage, headerTitle } from './header.css';

export type SidebarHeaderProps = ComponentProps<typeof Flex> & {
  icon?: IvyIcons;
  title: string;
};

const SidebarHeader = ({ icon, title, className, children, ...props }: SidebarHeaderProps) => (
  <Flex gap={2} alignItems='center' justifyContent='space-between' className={cn(header, className)} {...props}>
    <Flex className={headerLeft} gap={3} alignItems='center'>
      {icon && <IvyIcon icon={icon} className={headerIcon} />}
      <div className={headerTitle}>{title}</div>
    </Flex>
    {children}
  </Flex>
);
SidebarHeader.displayName = 'SidebarHeader';

const SidebarMessages = ({ className, ...props }: ComponentProps<typeof Flex>) => (
  <Flex className={cn(headerMessage, className)} direction='column' gap={1} {...props} />
);
SidebarMessages.displayName = 'SidebarMessages';

export { SidebarHeader, SidebarMessages };
