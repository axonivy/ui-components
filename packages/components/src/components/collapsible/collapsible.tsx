import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as React from 'react';
import { cn } from '../../utils/class-name';
import type { WithClassName } from '../../types/types.js';
import { Button } from '../button/button';
import { IvyIcons } from '@axonivy/ui-icons';
import './collapsible.css';

const Collapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> & WithClassName
>(({ className, ...props }, ref) => <CollapsiblePrimitive.Root ref={ref} className={cn('collapsible-root', className)} {...props} />);
Collapsible.displayName = 'CollapsibleRoot';

type CollapsibleTriggerProps = {
  state?: 'configured' | 'warning' | 'error';
  control?: { label: string; icon: IvyIcons; action: () => void };
};

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> & CollapsibleTriggerProps & WithClassName
>(({ state, control, className, children, ...props }, ref) => (
  <div className='collapsible-header'>
    <CollapsiblePrimitive.CollapsibleTrigger ref={ref} className={cn('collapsible-trigger', className)} asChild {...props}>
      <Button icon={IvyIcons.Toggle} size='small'>
        {children}
      </Button>
    </CollapsiblePrimitive.CollapsibleTrigger>
    {state && <div className='collapsible-state' data-state={state} />}
    {control && (
      <div className='collapsible-controls'>
        <Button icon={control.icon} size='icon' onClick={control.action} aria-label={control.label} />
      </div>
    )}
  </div>
));
Collapsible.displayName = 'CollapsibleTrigger';

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
