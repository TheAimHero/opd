"use client";

import type { PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/sonner";

const ToastProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <Toaster richColors />
    </>
  );
};

export default ToastProvider;
