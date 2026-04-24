import * as React from "react";
import { cn } from "@/lib/utils";

type HeadingSize = "display" | "h1" | "h2" | "h3";
type HeadingTag  = "h1" | "h2" | "h3" | "h4";

const sizeClasses: Record<HeadingSize, string> = {
  display: "text-display font-bold leading-tight",
  h1:      "text-h1 font-bold leading-tight",
  h2:      "text-h2 font-semibold leading-snug",
  h3:      "text-xl font-semibold leading-snug",
};

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?:     HeadingTag;
  size?:   HeadingSize;
  accent?: boolean;
}

export function Heading({
  as: Tag = "h2",
  size = "h2",
  accent = false,
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-heading text-gris-text",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {accent ? (
        <span className="text-rosa">{children}</span>
      ) : (
        children
      )}
    </Tag>
  );
}
