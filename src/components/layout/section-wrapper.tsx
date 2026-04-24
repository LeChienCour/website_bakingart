import * as React from "react";
import { cn } from "@/lib/utils";

type Background = "crema" | "white" | "rosa-light";

const backgroundClasses: Record<Background, string> = {
  "crema":      "bg-crema",
  "white":      "bg-white",
  "rosa-light": "bg-rosa/10",
};

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  background?: Background;
  innerClassName?: string;
}

export function SectionWrapper({
  as: Tag = "section",
  background = "crema",
  className,
  innerClassName,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <Tag
      className={cn(backgroundClasses[background], "py-16 md:py-24", className)}
      {...props}
    >
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
