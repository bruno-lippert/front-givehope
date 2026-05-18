import type { ReactNode } from "react";

type SubmitButtonProps = {
  children: ReactNode;
};

export function SubmitButton({ children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="mt-4 flex min-h-14 w-full min-w-0 items-center justify-center rounded-md bg-primary px-5 py-4 text-base font-extrabold text-white shadow-xl shadow-primary/25 transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-lg"
    >
      {children}
    </button>
  );
}
