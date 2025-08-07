import type { ReactNode } from "react";

interface Props {
  condition: boolean;
  children: ReactNode;
}

const Conditional = ({ condition, children }: Props) => {
  if (condition) return children;
  return <></>;
};

export default Conditional;
