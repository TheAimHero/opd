"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

interface Props {
  className?: string;
}

const AuthButton = ({ className }: Props) => {
  const { data } = authClient.useSession();
  return (
    <Link
      className={cn(buttonVariants({ size: "sm" }), "w-[100px]", className)}
      href={data ? "/dashboard" : "/login"}
    >
      {data?.user ? "Dashboard" : "Login"}
    </Link>
  );
};

export default AuthButton;
