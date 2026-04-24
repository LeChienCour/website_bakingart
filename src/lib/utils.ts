import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names, resolving conflicts correctly.
 * Uses clsx for conditional class logic and tailwind-merge to deduplicate
 * conflicting Tailwind utilities (e.g., p-2 + p-4 → p-4).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
