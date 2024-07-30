import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonsVariants = tv({
  base: "rounded-lg font-medium flex items-center gap-2 justify-center",

  variants: {
    variant: {
      primary: "bg-lime-300 px-5 text-lime-950 hover:bg-lime-400",
      secondary: "bg-zinc-800 px-5 text-zinc-200 hover:bg-zinc-700",
      terciery: "flex items-center gap-2 flex-1 text-left",
    },
    size: {
      default: " py-2",
      full: "h-9 w-full",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonsVariants> {
  children: ReactNode;
}

export function Button({ children, variant, size, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonsVariants({ variant, size })}>
      {children}
    </button>
  );
}
