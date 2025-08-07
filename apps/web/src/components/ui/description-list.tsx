import type React from 'react';

import { cn } from '@/lib/utils';

function DescriptionList({ className, ...props }: React.ComponentProps<'dl'>) {
  return (
    <dl
      className={cn('grid gap-6', className)}
      data-slot="description-list"
      {...props}
    />
  );
}

function DescriptionTerm({ className, ...props }: React.ComponentProps<'dt'>) {
  return (
    <dt
      className={cn(
        'font-medium text-sm leading-none tracking-tight',
        className
      )}
      data-slot="description-term"
      {...props}
    />
  );
}

function DescriptionDetail({
  className,
  ...props
}: React.ComponentProps<'dd'>) {
  return (
    <dd
      className={cn('text-muted-foreground text-sm', className)}
      data-slot="description-detail"
      {...props}
    />
  );
}

function DescriptionGroup({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('grid gap-1.5', className)}
      data-slot="description-group"
      {...props}
    />
  );
}

export {
  DescriptionList,
  DescriptionTerm,
  DescriptionDetail,
  DescriptionGroup,
};
