import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface PageTitleProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const PageTitle = ({ children, className, onClick }: PageTitleProps) => {
  return (
    <div
      className={cn(
        "w-full flex items-center text-center justify-center mt-8 gap-1 text-[32px] font-bold text-white",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export { PageTitle };
