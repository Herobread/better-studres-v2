import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class names using clsx and tailwind-merge.
 * @param {...ClassValue[]} inputs - The class names to merge.
 * @returns {string} The merged class names.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}
