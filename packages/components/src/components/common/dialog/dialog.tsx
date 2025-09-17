import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { content, contentClose, description, footer, header, overlay, title } from './dialog.css';

/**
 * Dialog, based on {@link https://www.radix-ui.com/docs/primitives/components/dialog | Radix UI Dialog}
 */
const Dialog = (props: React.ComponentProps<typeof DialogPrimitive.Root>) => <DialogPrimitive.Root {...props} />;
Dialog.displayName = DialogPrimitive.Root.displayName;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) => (
  <DialogPrimitive.Overlay className={cn(overlay, className, 'ui-dialog-overlay')} {...props} />
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = ({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content className={cn(content, className, 'ui-dialog-content')} {...props}>
      {children}
      <DialogClose asChild>
        <Button icon={IvyIcons.Close} className={contentClose} />
      </DialogClose>
    </DialogPrimitive.Content>
  </DialogPortal>
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.ComponentProps<typeof Flex>) => (
  <Flex direction='column' gap={2} className={cn(header, className, 'ui-dialog-header')} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.ComponentProps<typeof Flex>) => (
  <Flex direction='row' justifyContent='flex-end' gap={2} className={cn(footer, className, 'ui-dialog-footer')} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title className={cn(title, className, 'ui-dialog-title')} {...props} />
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description className={cn(description, className, 'ui-dialog-description')} {...props} />
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

type BasicDialogHeaderProps = {
  title: string;
  description: React.ReactNode;
};

const BasicDialogHeader = ({ title, description }: BasicDialogHeaderProps) => (
  <DialogHeader>
    <DialogTitle>{title}</DialogTitle>
    <DialogDescription>{description}</DialogDescription>
  </DialogHeader>
);
BasicDialogHeader.displayName = 'BasicDialogHeader';

type BasicDialogFooterProps = {
  cancel: React.ReactNode;
  submit: React.ReactNode;
};

const BasicDialogFooter = ({ cancel, submit }: BasicDialogFooterProps) => (
  <DialogFooter>
    <DialogClose asChild>{cancel}</DialogClose>
    <DialogClose asChild>{submit}</DialogClose>
  </DialogFooter>
);
BasicDialogFooter.displayName = 'BasicDialogFooter';

type BasicDialoContentProps = BasicDialogHeaderProps & BasicDialogFooterProps & React.ComponentProps<typeof Flex>;

const BasicDialogContent = ({ title, description, cancel, submit, className, ...props }: BasicDialoContentProps) => (
  <Flex direction='column' gap={4} className='overflow-hidden'>
    <BasicDialogHeader title={title} description={description} />
    <Flex direction='column' gap={2} className={cn('overflow-auto', className)} {...props} />
    <BasicDialogFooter submit={submit} cancel={cancel} />
  </Flex>
);
BasicDialogContent.displayName = 'BasicDialogContent';

export {
  BasicDialogContent,
  BasicDialogFooter,
  BasicDialogHeader,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
};
