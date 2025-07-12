import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as Algerian Dinar currency.
 * Uses a dot as decimal separator and a comma as thousands separator.
 * Adds the DZD symbol after the amount.
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }) + " دج"; // Arabic Dinar symbol
}

/**
 * Alternative currency format that uses Latin characters (DZD)
 * instead of the Arabic Dinar symbol
 */
export function formatCurrencyLatin(amount: number): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }) + " DZD";
}
