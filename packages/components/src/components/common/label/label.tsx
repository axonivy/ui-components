import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

import { useField } from '@/components/common/field/field';
import { cn } from '@/utils/class-name';

const Label = ({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) => {
  const { labelProps } = useField();
  return <LabelPrimitive.Root className={cn(className, 'ui-label')} {...labelProps} {...props} />;
};
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
