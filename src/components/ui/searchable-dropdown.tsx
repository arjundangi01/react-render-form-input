"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "../../utils";
import { Input } from "./input";
import { SearchableDropdownProps } from "../../types";

// Extract constants
const FILTER_SCORES = {
  EXACT_MATCH: 1,
  STARTS_WITH: 0.8,
  CONTAINS: 0.6,
  NO_MATCH: 0,
} as const;

export function SearchableDropdown({
  options,
  selectedValue,
  onChange,
  placeholder = "Select an option...",
  onSearch,
}: SearchableDropdownProps) {
  const [open, setOpen] = React.useState(false);

  // Memoize the selected option to prevent unnecessary lookups
  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  );

  // Memoize the filter function to prevent recreating on every render
  const filterFunction = React.useCallback(
    (value: string, search: string) => {
      if (onSearch) return FILTER_SCORES.EXACT_MATCH;

      const option = options.find((opt) => opt.value === value);
      if (!option) return FILTER_SCORES.NO_MATCH;

      const searchLower = search.toLowerCase();
      const nameLower = option.label.toLowerCase();

      if (nameLower === searchLower) return FILTER_SCORES.EXACT_MATCH;
      if (nameLower.startsWith(searchLower)) return FILTER_SCORES.STARTS_WITH;
      if (nameLower.includes(searchLower)) return FILTER_SCORES.CONTAINS;
      return FILTER_SCORES.NO_MATCH;
    },
    [onSearch, options]
  );

  // Memoize the handler to prevent recreating on every render
  const handleSelect = React.useCallback(
    (currentValue: string) => {
      onChange(currentValue === selectedValue ? "" : currentValue);
      setOpen(false);
    },
    [onChange, selectedValue]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="SelectSearch"
          aria-expanded={open}
          className="mt-2 w-full justify-between bg-accent/10 text-sm"
        >
          {selectedOption?.label ?? placeholder}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0"
        onWheel={(e) => e.stopPropagation()}
      >
        <Command filter={filterFunction}>
          {!onSearch ? (
            <CommandInput placeholder={placeholder} />
          ) : (
            <Input
              className="flex h-11 w-full rounded-md border-none bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground focus:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={placeholder}
              onChange={(e) => onSearch(e.target.value)}
            />
          )}
          <CommandList className="h-max min-w-[300px]">
            <CommandEmpty>No option found.</CommandEmpty>
            {options.length > 0 && (
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    className="flex w-full  cursor-pointer items-center justify-between rounded-md p-2 hover:bg-accent hover:text-white"
                    value={option.value}
                    onSelect={handleSelect}
                  >
                    <span className="text-sm  font-normal">{option.label}</span>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
