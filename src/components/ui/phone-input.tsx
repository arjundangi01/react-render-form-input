import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

const phoneInputComponentVariants = cva("rounded-e-lg rounded-s-none", {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      default:
        "h-[30px] ml-2 rounded-md bg-transparent text-white text-xs border border-gray-500",
      disabled: "opacity-50 ",
    },
  },
});

const countrySelectContentVariants = cva("w-[80px] p-0", {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      default: "text-white",
      disabled: "opacity-50",
    },
  },
});

const countrySelectOptionVariants = cva("w-[80px] gap-2", {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      default: "bg-black",
      disabled: "opacity-50",
    },
  },
});

const buttonVariants = cva("", {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      default:
        "h-[30px] text-xs flex-row flex justify-center items-center border border-gray-500 rounded-md",
      disabled: "opacity-50",
    },
  },
});

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<
    React.ElementRef<typeof RPNInput.default>,
    PhoneInputProps & VariantProps<typeof phoneInputComponentVariants>
  >(({ className, onChange, variant, ...props }, ref) => {
    return (
      <RPNInput.default
        ref={ref}
        className={cn("flex", className)}
        flagComponent={FlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={InputComponent}
        smartCaret={false}
        withCountryCallingCode
        /**
         * Handles the onChange event.
         *
         * react-phone-number-input might trigger the onChange event as undefined
         * when a valid phone number is not entered. To prevent this,
         * the value is coerced to an empty string.
         *
         * @param {E164Number | undefined} value - The entered value
         */
        onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
        {...props}
      />
    );
  });
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> &
    VariantProps<typeof phoneInputComponentVariants>
>(({ className, variant, ...props }, ref) => (
  <Input
    className={cn(phoneInputComponentVariants({ variant }), className)}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
} & VariantProps<typeof countrySelectContentVariants>;

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
  variant,
}: CountrySelectProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className={cn(buttonVariants({ variant }))}
          disabled={disabled}
          size={"sm"}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronsUpDown
            className={cn(
              "-mr-2 size-4 opacity-50",
              disabled ? "hidden" : "opacity-100"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(countrySelectContentVariants({ variant }))}>
        <Command>
          <CommandList>
            <ScrollArea className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                    />
                  ) : null
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps
  extends RPNInput.FlagProps,
    VariantProps<typeof phoneInputComponentVariants> {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  variant,
}: CountrySelectOptionProps) => {
  return (
    <CommandItem
      className={countrySelectOptionVariants({ variant })}
      onSelect={() => onChange(country)}
    >
      <FlagComponent country={country} countryName={countryName} />
      {/* <span className="flex-1 text-sm text-white">{countryName}</span> */}
      {/* <span className="text-foreground/50 text-sm text-white">{`+${RPNInput.getCountryCallingCode(country)}`}</span> */}
      <CheckIcon
        className={`ml-auto size-4 text-white ${country === selectedCountry ? "opacity-100" : "opacity-0"}`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country }: RPNInput.FlagProps) => {
  return (
    <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm text-white [&_svg]:size-full">
      {country}
    </span>
  );
};

export { PhoneInput };
