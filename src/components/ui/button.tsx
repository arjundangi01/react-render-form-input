import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    defaultVariants: {
      size: "default",
      variant: "accent",
    },
    variants: {
      size: {
        default: "h-10 px-4 py-2",
        icon: "size-10",
        lg: "h-11 rounded-md px-8",

        sm: "h-9 rounded-md px-3",
      },
      variant: {
        accent:
          "border-2 border-accent bg-accent text-primary-foreground hover:bg-transparent hover:text-accent",
        default: "bg-primary text-primary-foreground hover:bg-sky-700",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        accentborder:
          "border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-white",
      },
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ className, size, variant }),
          isLoading && "cursor-not-allowed opacity-70" // Style for disabled state
        )}
        ref={ref}
        disabled={isLoading || props.disabled} // Disable when loading
        {...props}
      >
        {isLoading ? (
          // eslint-disable-next-line tailwindcss/no-custom-classname
          <span className="loading-spinner" aria-label="Loading">
            {" "}
            {/* Add a spinner */}
            <svg
              className="size-5 animate-spin text-white" // Adjust size and color
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </span>
        ) : (
          props.children // Button content
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
