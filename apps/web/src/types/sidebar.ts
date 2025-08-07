import type { ReactNode } from "react";

export type SidebarItems = {
  title: string;
  url: string;
  icon?: ReactNode;
  items?: Omit<SidebarItems, "items">[];
};
