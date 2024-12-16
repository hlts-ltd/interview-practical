import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div className={cn("w-full max-w-6xl mx-auto px-4 2xl:px-0", className)}>
      {children}
    </div>
  );
};

export default Container;
