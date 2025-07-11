import { useTheme } from '@/context/useTheme';
import { IvyIcons } from '@axonivy/ui-icons';
import { Toaster as Sonner, toast } from 'sonner';
import { IvyIcon } from '../icon/icon';
import { Spinner } from '../spinner/spinner';
import { closeBtn, description, error, success, toaster, warning } from './toaster.css';

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * Toaster, based on {@link https://sonner.emilkowal.ski/ | Sonner}
 */
const Toaster = (props: ToasterProps) => {
  const { theme = 'system' } = useTheme();
  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='ui-toaster'
      toastOptions={{
        classNames: {
          toast: toaster,
          description: description,
          error: error,
          success: success,
          warning: warning,
          closeButton: closeBtn
        }
      }}
      icons={{
        success: <IvyIcon icon={IvyIcons.Check} />,
        info: <IvyIcon icon={IvyIcons.InfoCircle} />,
        warning: <IvyIcon icon={IvyIcons.Caution} />,
        error: <IvyIcon icon={IvyIcons.ErrorXMark} />,
        loading: <Spinner size='small' />
      }}
      {...props}
    />
  );
};
Toaster.displayName = 'Toaster';

export { toast, Toaster };
