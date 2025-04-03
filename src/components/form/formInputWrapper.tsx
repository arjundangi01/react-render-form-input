import React from "react";
import {
  type UseFormReturn,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { RenderFormInput } from "./RenderFormInput";
import { FormInputFields } from "../../types";

interface IProps<TData extends FieldValues> {
  form: UseFormReturn<TData>;
  fieldConfig: FormInputFields<TData>;
}

export function FormInputWrapper<TData extends FieldValues>({
  form,
  fieldConfig,
}: IProps<TData>) {
  return (
    <FormField
      control={form.control}
      name={fieldConfig.name as Path<TData>}
      render={({ field }) => (
        <FormItem>
          {fieldConfig.label && (
            <FormLabel className="text-white">{fieldConfig?.label}</FormLabel>
          )}
          <FormControl>
            <RenderFormInput field={field} fieldConfig={fieldConfig} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
