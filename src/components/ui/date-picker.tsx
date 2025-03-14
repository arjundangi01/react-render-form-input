import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";

import { Button } from "./button";
import { Calendar } from "./calendar";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type DateType = "MMM dd, yyyy";

interface DatePickerProps {
  value: Date | undefined;
  onValueChange: (value: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  dateFormat?: DateType;
}

const DatePicker = ({
  value,
  onValueChange,
  placeholder,
  disabled,
  dateFormat = "MMM dd, yyyy",
}: DatePickerProps) => {
  const [openCalender, setOpenCalender] = useState(false);
  return (
    <Popover onOpenChange={setOpenCalender} open={openCalender}>
      <PopoverTrigger
        disabled={disabled}
        asChild
        className="w-full flex-1 rounded-md bg-accent/10 text-sm font-medium text-foreground"
      >
        <Button
          variant={"outline"}
          className="flex w-full items-center justify-start gap-2 hover:bg-transparent hover:text-foreground"
        >
          <CalendarIcon className="size-5 text-accent" />
          {value ? (
            format(value, dateFormat)
          ) : (
            <span>{placeholder || "Pick a date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ? value : undefined}
          onSelect={onValueChange}
          initialFocus
          classNames={{
            day_today: "bg-accent/60 text-white",
            day_selected: "bg-accent/60 text-white",
            cell: "rounded-md p-0 [&:has([aria-selected])]:bg-accent/80",
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
