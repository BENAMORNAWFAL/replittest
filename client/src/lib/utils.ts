import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import "tailwindcss";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
