"use client";
import React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import NumberInput from "../ui/NumberInput";

import { MultiSelect } from "../ui/MultiSelect";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

import { NumericFormatType } from "../../types/index";
import { SearchableDropdown } from "../ui/searchable-dropdown";

export interface BaseField {
  label: string;
  prefixIcon?: React.ReactNode;
  className?: string;
  placeHolder?: string;
  numericFormat?: NumericFormatType;
  disabled?: boolean;
}
export interface IInputFieldVariant {
  fieldVariant: "input";
  inputType?: "number" | "text" | "email" | "password" | "tel" | "url";
  inputMaxLength?: number;
  label: string;
  value?: string;
}

export interface ICurrencyInputFieldVariant {
  fieldVariant: "currencyInput";
  label: string;
  value?: string;
}
export interface ISelectFieldVariant {
  fieldVariant: "select";
  inputMaxLength?: number;
  options: Array<{ value: string; name: string }>;
}
export interface IMultiSelectFieldVariant {
  fieldVariant: "multiSelect";
  inputMaxLength?: number;
  options: Array<{ value: string; name: string }>;
}
export interface ITextAreaFieldVariant {
  fieldVariant: "textArea";
  inputType?: "text";
}

export interface ISingleSearchableSelectFieldVariant {
  fieldVariant: "singleSearchableSelect";
  options: Array<{ value: string; name: string }>;
}

export type FormInputFields<TData> = (
  | IInputFieldVariant
  | ISelectFieldVariant
  | ITextAreaFieldVariant
  | IMultiSelectFieldVariant
  | ICurrencyInputFieldVariant
  | ISingleSearchableSelectFieldVariant
) &
  BaseField & {
    name: keyof TData;
  };

interface IProps<TData extends FieldValues> {
  field: ControllerRenderProps<TData, Path<TData>>;
  fieldConfig: FormInputFields<TData>;
}

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
          <Select
            onValueChange={(value) => {
              field.onChange(value);
            }}
            value={field.value}
            disabled={fieldConfig?.disabled}
          >
            <SelectTrigger className="h-8 rounded-xl bg-white text-sm font-normal text-foreground lg:h-[43px] lg:text-base">
              <SelectValue
                placeholder={
                  field?.value
                    ? fieldConfig?.options.find(
                        (option) => option.value === field.value
                      )?.name
                    : fieldConfig?.placeHolder
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {fieldConfig?.options &&
                  fieldConfig?.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
          <MultiSelect
            onValueChange={(value) => {
              field.onChange(value);
            }}
            value={Array.isArray(field.value) ? field.value : []}
            placeholder={fieldConfig?.placeHolder}
            options={fieldConfig?.options || []}
            variant="inverted"
            animation={2}
            maxCount={3}
            disabled={fieldConfig?.disabled}
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
