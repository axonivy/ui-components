import { Button } from '@/components';
import type { IvyIcons } from '@axonivy/ui-icons';
import { Dialog, DialogTrigger, DialogPortal, DialogContent, DialogClose } from '@radix-ui/react-dialog';
import { type ReactNode } from 'react';
import './propertyDialog.css';

export type PropertyDialogProps = {
  location: HTMLElement;
  icon: IvyIcons;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: ReactNode;
};

export const PropertyDialog = ({ location, icon, open, onOpenChange, content }: PropertyDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button icon={icon} aria-label='Browser' />
      </DialogTrigger>
      <DialogPortal container={location}>
        <DialogContent className={`browser-dialog ${!open ? 'browser-content-exit' : ''}`}>
          <div className='browserContent'>{content}</div>
          <div className='browser-footer'>
            <DialogClose asChild>
              <Button aria-label='Cancel'>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className='insert' aria-label='Apply' onClick={() => console.log('TODO: Implement')}>
                Apply
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
