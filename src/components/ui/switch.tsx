"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../utils";

const switchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-[2px]  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        accent:
          "border-4 border-accent data-[state=checked]:bg-accent data-[state=unchecked]:bg-white",
        default: "border-2 border-transparent",
        accentwhite: "h-5 w-10 data-[state=checked]:bg-accent",
      },
    },
  }
);

const thumbVariants = cva(
  "pointer-events-none block size-5 rounded-full ring-0  transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",

  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        accent:
          "pointer-events-none block size-3 rounded-full  border-4 border-accent bg-background data-[state=checked]:border-white",
        default: "bg-background shadow-lg",
        accentwhite: "size-4 bg-background shadow-lg",
      },
    },
  }
);

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> &
    VariantProps<typeof switchVariants>
>(({ className, variant, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ className, variant }))}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(thumbVariants({ className, variant }))}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
