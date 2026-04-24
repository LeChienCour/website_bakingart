import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide transition-colors",
  {
    variants: {
      variant: {
        new:       "bg-rosa/20 text-gris-text border border-rosa/40",
        popular:   "bg-turquesa/20 text-gris-text border border-turquesa/40",
        agotado:   "bg-gris-light text-gris-secondary border border-gris-light",
        temporada: "bg-amber-100 text-amber-800 border border-amber-200",
      },
    },
    defaultVariants: {
      variant: "new",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
