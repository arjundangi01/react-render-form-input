"use client";
import React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import NumberInput from "./ui/NumberInput";

import { MultiSelect } from "./ui/MultiSelect";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

import { NumericFormatType } from "../types/index";
import { SearchableDropdown } from "./ui/searchable-dropdown";

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
  sectionField: FormInputFields<TData>;
}

export function RenderFormInput<TData extends FieldValues>({
  field,
  sectionField,
}: IProps<TData>) {
  function renderInput<TData extends FieldValues>({
    field,
    sectionField,
  }: IProps<TData>) {
    switch (sectionField.fieldVariant) {
      case "select":
        return (
          <Select
            onValueChange={(value) => {
              field.onChange(value);
            }}
            value={field.value}
            disabled={sectionField?.disabled}
          >
            <SelectTrigger className="h-8 rounded-xl bg-white text-sm font-normal text-foreground lg:h-[43px] lg:text-base">
              <SelectValue
                placeholder={
                  field?.value
                    ? sectionField?.options.find(
                        (option) => option.value === field.value
                      )?.name
                    : sectionField?.placeHolder
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sectionField?.options &&
                  sectionField?.options.map((option) => (
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
            disabled={sectionField?.disabled}
            placeholder={sectionField?.placeHolder}
            className="rounded-xl border-none bg-lightblue-foreground text-sm font-normal lg:text-base"
          />
        );
      case "multiSelect":
        //TODO : - Arjun The default value should be array of object with name and value
        return (
          <MultiSelect
            onValueChange={({ value }) => {
              field.onChange(value);
            }}
            value={Array.isArray(field.value) ? field.value : []}
            placeholder={sectionField?.placeHolder}
            options={sectionField?.options || []}
            variant="inverted"
            animation={2}
            maxCount={3}
            disabled={sectionField?.disabled}
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
            disabled={sectionField?.disabled}
          />
        );
      case "singleSearchableSelect":
        return (
          <SearchableDropdown
            options={sectionField.options}
            selectedValue={field.value}
            onChange={field.onChange}
          />
        );
      default:
        return (
          <Input
            maxLength={sectionField.inputMaxLength}
            type={sectionField.inputType || "text"}
            inputContainerClassName="bg-transparent"
            className="h-8 rounded-xl border-none bg-lightblue-foreground text-sm font-normal lg:h-[46px] lg:text-base"
            PrefixIcon={sectionField.prefixIcon}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            value={field.value}
            disabled={sectionField?.disabled}
            placeholder={sectionField?.placeHolder}
          />
        );
    }
  }
  return <> {renderInput<TData>({ field, sectionField })} </>;
}
