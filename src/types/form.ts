import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { NumericFormatType } from "./numericFormateType";

export interface IOptions {
  value: string;
  label: string;
}

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
  options: IOptions[];
}
export interface IMultiSelectFieldVariant {
  fieldVariant: "multiSelect";
  inputMaxLength?: number;
  options: IOptions[];
}
export interface ITextAreaFieldVariant {
  fieldVariant: "textArea";
  inputType?: "text";
}

export interface ISingleSearchableSelectFieldVariant {
  fieldVariant: "singleSearchableSelect";
  options: IOptions[];
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

export interface IProps<TData extends FieldValues> {
  field: ControllerRenderProps<TData, Path<TData>>;
  fieldConfig: FormInputFields<TData>;
}

export interface SearchableDropdownProps {
  options: IOptions[];
  selectedValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: (value: string) => void;
}
