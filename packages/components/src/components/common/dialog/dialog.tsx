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
      <DialogPrimitive.Close asChild>
        <Button icon={IvyIcons.Close} className={contentClose} />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.ComponentProps<typeof Flex>) => (
  <Flex direction='column' gap={2} className={cn(header, className, 'ui-dialog-header')} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.ComponentProps<typeof Flex>) => (
  <Flex direction='row-reverse' gap={2} className={cn(footer, className, 'ui-dialog-footer')} {...props} />
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

type BasicDialoContentProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  title: string;
  description: React.ReactNode;
  buttonClose: string;
  buttonCustom?: React.ReactNode;
};

const BasicDialogContent = ({ title, description, buttonClose = 'Cancel', buttonCustom, children }: BasicDialoContentProps) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
    <Flex direction='column' gap={2}>
      {children}
    </Flex>
    <DialogFooter>
      <DialogClose asChild>{buttonCustom}</DialogClose>
      <DialogClose asChild>
        <Button variant='outline' size='large' aria-label={buttonClose}>
          {buttonClose}
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
);
BasicDialogContent.displayName = 'BasicDialogContent';

type BasicDialogProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  dialogTrigger?: React.ReactNode;
};

const BasicDialog = ({ dialogTrigger, children, ...props }: BasicDialogProps & BasicDialoContentProps) => (
  <Dialog {...props}>
    {dialogTrigger}
    <BasicDialogContent {...props}>{children}</BasicDialogContent>
  </Dialog>
);
BasicDialog.displayName = 'BasicDialog';

export {
  BasicDialog,
  BasicDialogContent,
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
