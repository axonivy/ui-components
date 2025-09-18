import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

/**
 * Dialog, based on {@link https://www.radix-ui.com/docs/primitives/components/dialog | Radix UI Dialog}
 */
const Dialog = (props: React.ComponentProps<typeof DialogPrimitive.Root>) => <DialogPrimitive.Root {...props} />;
Dialog.displayName = DialogPrimitive.Root.displayName;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({ children, ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) => (
  <DialogPrimitive.Portal {...props}>
    <div className='fixed inset-0 z-50 flex items-center justify-center'>{children}</div>
  </DialogPrimitive.Portal>
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) => (
  <DialogPrimitive.Overlay
    className={cn(
      'ui-dialog-overlay fixed inset-0 bg-black/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in motion-safe:animate-in',
      className
    )}
    {...props}
  />
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = ({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        'ui-dialog-content fixed grid max-h-[80vh] w-full max-w-110 transform grid-rows-1 gap-5 overflow-hidden rounded-lg border-1 border-solid border-border-basic bg-background p-5 shadow-lg data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 motion-safe:animate-in',
        className
      )}
      {...props}
    >
      {children}
      <DialogClose asChild>
        <Button icon={IvyIcons.Close} size='small' className='absolute top-4 right-4' />
      </DialogClose>
    </DialogPrimitive.Content>
  </DialogPortal>
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.ComponentProps<typeof Flex>) => (
  <Flex direction='column' gap={2} className={cn('ui-dialog-header', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.ComponentProps<typeof Flex>) => (
  <Flex direction='row' justifyContent='flex-end' gap={2} className={cn('ui-dialog-footer', className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title className={cn('ui-dialog-title text-base leading-none font-semibold tracking-tight', className)} {...props} />
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = ({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description className={cn('ui-dialog-description text-xs text-n900', className)} {...props} />
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
