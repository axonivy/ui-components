import { useTheme } from '@/context';
import { Toaster as Sonner } from 'sonner';
import { description } from './toaster.css';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();
  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='ui-toaster'
      toastOptions={{
        classNames: {
          description: description
        }
      }}
      {...props}
    />
  );
};

export { Toaster };
