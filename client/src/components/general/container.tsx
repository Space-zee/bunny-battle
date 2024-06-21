import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return <div className={cn("w-full h-full px-4", className)}>{children}</div>;
};

export { Container };
