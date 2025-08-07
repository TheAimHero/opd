'use client';

import { type PropsWithChildren, useState } from 'react';

import { SidebarProvider as _SidebarProvider } from '@/components/ui/sidebar';

const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  return (
    <_SidebarProvider onOpenChange={setOpen} open={open}>
      {children}
    </_SidebarProvider>
  );
};

export default SidebarProvider;
