import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/utils";

const buttonVariants = cva("inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/85 hover:-translate-y-0.5",
      outline: "border border-border bg-transparent text-foreground hover:border-primary hover:text-primary hover:-translate-y-0.5",
      ghost: "text-foreground hover:text-primary",
      icon: "border border-border bg-card text-foreground hover:border-primary hover:text-primary",
    },
    size: {
      default: "h-11 px-6 text-sm",
      small: "h-9 px-4 text-xs",
      large: "h-13 px-7 text-sm",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: { variant: "primary", size: "default" },
});

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean };
export function Button({ asChild = false, className, variant, size, ...props }: Props) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
