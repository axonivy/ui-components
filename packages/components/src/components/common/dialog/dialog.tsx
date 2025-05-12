import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { IvyIcons } from '@axonivy/ui-icons';
import { overlay, content, header, title, description, contentClose, footer } from './dialog.css';
import { cn } from '@/utils/class-name';
import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';

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

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
};
