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
        "w-full flex items-center text-center justify-center mt-8 gap-1 text-[32px] font-bold text-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export { PageTitle };
