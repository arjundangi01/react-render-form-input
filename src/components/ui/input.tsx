import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../utils";

const inputVariants = cva(
  "flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        accent: "bg-accent/10 placeholder:text-xs placeholder:font-light",
        default: "border border-input ring-offset-background ",
      },
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  PrefixIcon?: React.ReactNode;
  prefixIconClassName?: string;
  inputContainerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputContainerClassName,
      prefixIconClassName,
      type,
      variant,
      PrefixIcon,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn("flex items-center rounded-lg", inputContainerClassName)}
      >
        {PrefixIcon && (
          <div className={cn("pl-3", prefixIconClassName)}>{PrefixIcon}</div>
        )}
        <input
          type={type}
          className={cn(inputVariants({ className, variant }))}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
