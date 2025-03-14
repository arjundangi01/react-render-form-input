import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, XCircle, ChevronDown } from "lucide-react";
import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "./";
import { Button } from "./button";
import { cn } from "../../utils";
import { Badge } from "./badge";

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
// eslint-disable-next-line tailwindcss/no-custom-classname
const multiSelectVariants = cva("", {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      default:
        "border-accent bg-accent text-xs font-normal text-white hover:bg-transparent hover:text-accent",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      inverted: "inverted",
      secondary:
        "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
      accent:
        "border border-accent/20 bg-accent/20 text-accent hover:bg-transparent",
    },
  },
});

type OptionType = {
  /** The text to display for the option. */
  name: string;
  /** The unique value associated with the option. */
  value: string;
};
/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends Pick<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "onClick" | "disabled" | "type" | "aria-label" | "className"
    >,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: OptionType[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: ({
    option,
    value,
  }: {
    option: OptionType[];
    value: string[];
  }) => void;

  /** The default selected values when the component mounts. */
  value: OptionType[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * IsLoading is for to showing loading state in the dropdown
   * This is Optional
   * By default it is false
   */

  isLoadingOptions?: boolean;
  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
  /**
   * Input Tag Placeholder
   */
  searchPlaceholder?: string;
  /**
   * Callback function triggered when the Input value changes.
   * Optional , defaults to () => {}
   */

  handleChange?: (value: string) => void;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      variant,
      value = [],
      placeholder = "Select options",
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      isLoadingOptions = false,
      handleChange,
      searchPlaceholder = "Search...",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const [searchValue, setSearchValue] = React.useState("");
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating] = React.useState(false);

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...value];
        newSelectedValues.pop();

        onValueChange({
          option: newSelectedValues,
          value: newSelectedValues.map((o) => o.value),
        });
      }
    };

    const toggleOption = (option: OptionType | undefined) => {
      if (!option) return;
      const newSelectedValues = value.find(
        (selectedOption) => selectedOption.value === option.value
      )
        ? value.filter((v) => v.value !== option.value)
        : [...value, option];

      onValueChange({
        option: newSelectedValues,
        value: newSelectedValues.map((o) => o.value),
      });
    };

    const handleClear = () => {
      onValueChange({ option: [], value: [] });
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = value.slice(0, maxCount);

      onValueChange({
        option: newSelectedValues,
        value: newSelectedValues.map((o) => o.value),
      });
    };

    const toggleAll = () => {
      if (value.length === options.length) {
        handleClear();
      } else {
        onValueChange({ option: options, value: options.map((o) => o.value) });
      }
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              "flex w-full p-1 whitespace-break-spaces rounded-md border-border min-h-10 h-auto items-center justify-between bg-accent/10 font-medium text-sm text-foreground mt-2 hover:text-foreground",
              className
            )}
          >
            {value.length > 0 ? (
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  {value.slice(0, maxCount).map((option) => {
                    const currentOption = value.find(
                      (o) => o.value === option.value
                    );

                    return (
                      <Badge
                        key={option.value}
                        className={cn(
                          "px-1",
                          isAnimating ? "animate-bounce" : "",
                          multiSelectVariants({ variant })
                        )}
                        style={{ animationDuration: `${animation}s` }}
                      >
                        {currentOption?.name}
                        <XCircle
                          className="ml-1 size-3 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(currentOption);
                          }}
                        />
                      </Badge>
                    );
                  })}
                  {value.length > maxCount && (
                    <Badge
                      className={cn(
                        "px-1",
                        isAnimating ? "animate-bounce" : "",
                        multiSelectVariants({ variant })
                      )}
                      style={{ animationDuration: `${animation}s` }}
                    >
                      {`+ ${value.length - maxCount} more`}
                      <XCircle
                        className="ml-1 size-3 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full items-center justify-between ">
                <span className="mx-3 text-sm font-medium capitalize">
                  {placeholder}
                </span>
                <ChevronDown className="mx-2 h-4 cursor-pointer  text-muted-foreground" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0"
          align="center"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            {/* When the Options are dynamic based on Search Value then we need to use Normal Input else we can use CommandInput for static options */}

            {handleChange ? (
              <Input
                placeholder={searchPlaceholder}
                onKeyDown={handleInputKeyDown}
                onChange={(e) => {
                  handleChange(e.target.value);
                  setSearchValue(e.target.value);
                }}
                value={searchValue}
              />
            ) : (
              <CommandInput
                placeholder={searchPlaceholder}
                onKeyDown={handleInputKeyDown}
              />
            )}

            <CommandList className="max-w-[280px]">
              {isLoadingOptions ? (
                <div className="p-4 text-center text-muted-foreground">
                  Loading...
                </div>
              ) : (
                <>
                  <CommandEmpty>No results found.</CommandEmpty>

                  <CommandGroup>
                    <div className="flex items-center justify-between">
                      <CommandItem
                        onSelect={handleClear}
                        className="flex-1 cursor-pointer justify-center font-semibold text-red-500"
                      >
                        Clear All
                      </CommandItem>
                      <Separator
                        orientation="vertical"
                        className="flex h-full min-h-6"
                      />
                      <CommandItem
                        onSelect={() => setIsPopoverOpen(false)}
                        className="max-w-full flex-1 cursor-pointer justify-center font-semibold text-accent"
                      >
                        Close
                      </CommandItem>
                    </div>
                  </CommandGroup>
                  <CommandGroup>
                    {handleChange && options.length === 0 && (
                      <p className="flex items-center justify-center gap-2 py-2 text-sm text-muted-foreground">
                        No results found
                      </p>
                    )}
                    {options.length > 0 && (
                      <CommandItem
                        key="all"
                        onSelect={toggleAll}
                        className="cursor-pointer"
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-accent",
                            value.length === options.length
                              ? "bg-accent text-white"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon className="size-4" />
                        </div>
                        <span>(Select All)</span>
                      </CommandItem>
                    )}
                    {options.map((option) => {
                      const isSelected = value.find(
                        (o) => o.value === option.value
                      );
                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={() => toggleOption(option)}
                          className="cursor-pointer"
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-accent",
                              isSelected
                                ? "bg-accent text-white"
                                : "opacity-50 [&_svg]:invisible"
                            )}
                          >
                            <CheckIcon className="size-4" />
                          </div>

                          <span>{option.name}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
        {/* {animation > 0 && selectedValues.length > 0 && (
          <WandSparkles
            className={cn(
              "cursor-pointer my-2 text-foreground bg-background w-3 h-3",
              isAnimating ? "" : "text-muted-foreground"
            )}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )} */}
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
