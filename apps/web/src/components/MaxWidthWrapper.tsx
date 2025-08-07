import type { FC, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: ReactNode;
}

const MaxWidthWrapper: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-screen-xl px-2.5 md:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
