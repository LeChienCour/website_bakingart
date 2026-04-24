"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type AnimateVariant = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-up";

interface AnimateInProps {
  children: React.ReactNode;
  variant?: AnimateVariant;
  delay?: number;
  className?: string;
}

const variantClasses: Record<AnimateVariant, { hidden: string; visible: string }> = {
  "fade-up":    { hidden: "opacity-0 translate-y-8",  visible: "opacity-100 translate-y-0" },
  "fade-in":    { hidden: "opacity-0",                visible: "opacity-100" },
  "fade-left":  { hidden: "opacity-0 translate-x-8",  visible: "opacity-100 translate-x-0" },
  "fade-right": { hidden: "opacity-0 -translate-x-8", visible: "opacity-100 translate-x-0" },
  "scale-up":   { hidden: "opacity-0 scale-95",       visible: "opacity-100 scale-100" },
};

export function AnimateIn({
  children,
  variant = "fade-up",
  delay = 0,
  className,
}: AnimateInProps) {
  const { ref, inView } = useInView();
  const { hidden, visible } = variantClasses[variant];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        inView ? visible : hidden,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
