import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]): string => {
  return twMerge(clsx(classes));
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};
