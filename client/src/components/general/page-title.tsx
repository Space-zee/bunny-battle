import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

const PageTitle = ({ children, className }: PageTitleProps) => {
  return (
    <div
      className={cn(
        "w-full flex items-center text-center justify-center mt-[88px] gap-1 text-3xl font-bold text-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export { PageTitle };
