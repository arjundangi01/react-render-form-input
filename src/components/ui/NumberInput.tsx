import React from "react";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

import { cn } from "../../utils/index";

type NumberInputProps = Omit<CurrencyInputProps, "value"> & {
  value: number | null;
  onChange: (value: number) => void;
  PrefixIcon?: React.ReactNode;
  prefixIconClassName?: string;
  inputContainerClassName?: string;
};

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      placeholder,
      value,
      onChange,
      PrefixIcon,
      inputContainerClassName,
      prefixIconClassName,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <div
          className={cn(
            "flex items-center  rounded-lg",
            inputContainerClassName
          )}
        >
          {PrefixIcon && (
            <div className={cn("p-0", prefixIconClassName)}>{PrefixIcon}</div>
          )}
          <CurrencyInput
            placeholder={placeholder || "Enter a number"}
            value={value ?? ""}
            decimalsLimit={2}
            onValueChange={(val) => {
              onChange(parseFloat(val || "0"));
            }}
            className={cn(
              `mt-0 p-2 bg-transparent border border-gray-300 rounded-md  flex h-10  w-full  border-input 
          px-1 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
          disabled:cursor-not-allowed disabled:opacity-50 `,
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </>
    );
  }
);
NumberInput.displayName = "NumberInput";

export default NumberInput;
