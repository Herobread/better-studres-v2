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

/**
 * Initiates a file download.
 * @param href - The URL of the file to download.
 * @param filename - The name to save the file as.
 */
export function downloadFile(href: string, filename: string): void {
    const link = document.createElement("a")
    link.href = href
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
