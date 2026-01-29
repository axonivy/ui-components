import { Button } from '@/components/common/button/button';
import { Input } from '@/components/common/input/input';
import { Textarea } from '@/components/common/textarea/textarea';
import { cn } from '@/utils/class-name';
import {
  inputGroup,
  inputGroupAddon,
  inputGroupButton,
  inputGroupInput,
  inputGroupText,
  inputGroupTextarea,
  type InputGroupAddonVariants,
  type InputGroupButtonVariants
} from './input-group.css';

function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='input-group' role='group' className={cn(inputGroup, className, 'ui-input-group')} {...props} />;
}

function InputGroupAddon({ className, align = 'inline-start', ...props }: React.ComponentProps<'div'> & InputGroupAddonVariants) {
  return (
    <div
      role='group'
      data-slot='input-group-addon'
      data-align={align}
      className={cn(inputGroupAddon({ align }), className)}
      onClick={e => {
        if ((e.target as HTMLElement).closest('button')) {
          return;
        }
        e.currentTarget.parentElement?.querySelector('input')?.focus();
      }}
      {...props}
    />
  );
}

function InputGroupButton({
  className,
  type = 'button',
  size = 'xs',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size' | 'type'> &
  InputGroupButtonVariants & {
    type?: 'button' | 'submit' | 'reset';
  }) {
  return <Button type={type} data-size={size} className={cn(inputGroupButton({ size }), className)} {...props} />;
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return <span className={cn(inputGroupText, className)} {...props} />;
}

function InputGroupInput({ className, ...props }: React.ComponentProps<'input'>) {
  return <Input data-slot='input-group-control' className={cn(inputGroupInput, className)} {...props} />;
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return <Textarea data-slot='input-group-control' className={cn(inputGroupTextarea, className)} {...props} />;
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText, InputGroupTextarea };
