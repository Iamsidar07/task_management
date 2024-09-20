import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
type AnyFunction = (...args: unknown[]) => unknown;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const debounce = (fn: AnyFunction, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
