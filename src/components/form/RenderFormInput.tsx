"use client";
import { FieldValues } from "react-hook-form";
import Select from "react-select";

import NumberInput from "../ui/NumberInput";

import { Input } from "../ui/input";

import { Textarea } from "../ui/textarea";

import { SearchableDropdown } from "../ui/searchable-dropdown";
import { IOptions, IProps } from "../../types";

export function RenderFormInput<TData extends FieldValues>({
  field,
  fieldConfig,
}: IProps<TData>) {
  function renderInput<TData extends FieldValues>({
    field,
    fieldConfig,
  }: IProps<TData>) {
    switch (fieldConfig.fieldVariant) {
      case "select":
        return (
          <Select<IOptions>
            placeholder={fieldConfig.placeHolder}
            value={field.value}
            options={fieldConfig.options}
            onChange={(value) => {
              field.onChange(value);
            }}
          />
        );

      case "textArea":
        return (
          <Textarea
            {...field}
            disabled={fieldConfig?.disabled}
            placeholder={fieldConfig?.placeHolder}
            className="rounded-xl border-none bg-lightblue-foreground text-sm font-normal lg:text-base"
          />
        );
      case "multiSelect":
        return (
          <Select<IOptions, true>
            placeholder="Select a value"
            isMulti={true}
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
            }}
            options={fieldConfig.options}
          />
        );
      case "currencyInput":
        return (
          <NumberInput
            inputContainerClassName="h-8 rounded-xl pl-3 border-none bg-lightblue-foreground lg:h-[46px]"
            PrefixIcon={<p className="text-sm lg:text-base">$</p>}
            {...field}
            placeholder="Enter your net worth"
            className="border-none pl-0 text-sm font-normal lg:text-base"
            disabled={fieldConfig?.disabled}
          />
        );
      case "singleSearchableSelect":
        return (
          <SearchableDropdown
            options={fieldConfig.options}
            selectedValue={field.value}
            onChange={field.onChange}
          />
        );
      default:
        return (
          <Input
            maxLength={fieldConfig.inputMaxLength}
            type={fieldConfig.inputType || "text"}
            inputContainerClassName="bg-transparent"
            className="h-8 rounded-xl border-none bg-lightblue-foreground text-sm font-normal lg:h-[46px] lg:text-base"
            PrefixIcon={fieldConfig.prefixIcon}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            value={field.value}
            disabled={fieldConfig?.disabled}
            placeholder={fieldConfig?.placeHolder}
          />
        );
    }
  }
  return <> {renderInput<TData>({ field, fieldConfig })} </>;
}
