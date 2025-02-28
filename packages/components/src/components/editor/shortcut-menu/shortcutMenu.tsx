import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { Separator } from '@/components/common/separator/separator';
import * as styles from './shortcutMenu.css';
import clsx from 'clsx';
import { PopoverClose } from '@radix-ui/react-popover';
import { IvyIcons } from '@axonivy/ui-icons';

export type Shortcut = {
  shortcut: string;
  description: string;
  action?: () => void;
};

export interface ShortcutMenuProps {
  shortcuts: Array<Shortcut>;
  editor: string;
  withCloseButton?: boolean;
}

const ShortcutMenu = ({ shortcuts, editor, withCloseButton }: ShortcutMenuProps) => (
  <>
    <Flex direction='row' justifyContent='space-between' alignItems='center' gap={4}>
      <div className={styles.title}>Keyboard Shortcuts for {editor}</div>{' '}
      {withCloseButton && (
        <PopoverClose asChild>
          <Button size='small' icon={IvyIcons.Close} />
        </PopoverClose>
      )}
    </Flex>
    <Separator style={{ marginBlock: 'var(--size-2)' }} />
    <Flex direction='column' gap={2}>
      {shortcuts.map(({ shortcut, description, action }) => (
        <Flex key={shortcut} direction='row' justifyContent='space-between' alignItems='center' gap={4}>
          <div className={styles.shortcutDescription}>{description}</div>
          <Button variant='outline' onClick={action} className={clsx(styles.shortcutButton, !action && styles.noHover)}>
            {shortcut}
          </Button>
        </Flex>
      ))}
    </Flex>
  </>
);

ShortcutMenu.displayName = 'ShortcutMenu';

export { ShortcutMenu };
