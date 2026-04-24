import * as React from "react";
import { cn } from "@/lib/utils";

type TextVariant = "body" | "small" | "caption";
type TextTag     = "p" | "span" | "div" | "li";

const variantClasses: Record<TextVariant, string> = {
  body:    "text-body leading-relaxed",
  small:   "text-small leading-normal",
  caption: "text-xs leading-normal",
};

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?:      TextTag;
  variant?: TextVariant;
  muted?:   boolean;
}

export function Text({
  as: Tag = "p",
  variant = "body",
  muted = false,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(
        "font-body",
        variantClasses[variant],
        muted ? "text-gris-secondary" : "text-gris-text",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
