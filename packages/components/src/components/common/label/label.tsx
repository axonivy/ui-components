import * as LabelPrimitive from '@radix-ui/react-label';

import { useField } from '@/components/common/field/field';
import { cn } from '@/utils/class-name';
import type { ComponentProps } from 'react';

const Label = ({ className, ...props }: ComponentProps<typeof LabelPrimitive.Root>) => {
  const { labelProps } = useField();
  return <LabelPrimitive.Root className={cn(className, 'ui-label')} {...labelProps} {...props} />;
};
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
