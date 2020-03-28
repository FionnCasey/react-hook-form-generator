import {
  InputAddonProps,
  InputProps,
  BoxProps,
  HeadingProps,
  IconButtonProps,
  ButtonGroupProps,
  FlexProps,
  ButtonProps,
} from "@chakra-ui/core";
import { FormLabelProps } from "@chakra-ui/core/dist/FormLabel";
import { FC } from "react";

export type FieldType = "input" | "object" | "array" | "conditional" | "custom";

export type InputType = "text" | "text_area" | "number" | "switch";

export type Schema = Record<string, Field>;

export type StyleTypes = FieldStyles | ArrayStyles;

export type ChakraStyle<T> = Omit<T, "children" | "onClick">;

export interface FieldProps {
  id?: string;
  name: string;
  field: any;
}

export interface Field {
  fieldType: FieldType;
  styles?: FieldStyles;
}

export interface CustomField extends Omit<Field, "styles"> {
  fieldType: "custom";
  component: FC<Record<string, any>>;
  props?: Record<string, any>;
}

export interface Input extends Field {
  fieldType: "input";
  inputType: InputType;
}

export interface ArrayFieldProps extends Field {
  fieldType: "array";
  label?: string;
  helperText?: string;
  isRequired?: boolean;
  isCollapsable?: boolean;
  listItemField: Field;
}

export interface TextFieldProps extends Input {
  inputType: "text" | "text_area";
  htmlInputType?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  isRequired?: boolean;
  leftInputAddon?: InputAddonProps;
  rightInputAddon?: InputAddonProps;
}

export interface FormStyles {
  form?: {
    title?: HeadingProps;
    container?: Omit<BoxProps, "as" | "onSubmit">;
    spacing?: number | string;
    buttonGroup?: ButtonGroupProps;
    resetButton?: ChakraStyle<ButtonProps>;
    submitButton?: ChakraStyle<ButtonProps>;
  };
  arrayField?: ChakraStyle<ArrayStyles>;
  textField?: ChakraStyle<FieldStyles>;
}

export interface FieldStyles {
  override?: boolean;
  label?: ChakraStyle<FormLabelProps>;
  input?: InputProps<HTMLInputElement>;
  control?: BoxProps;
  helperText?: BoxProps;
  errorMessage?: BoxProps;
}

interface Collapsable {
  toolbar?: FlexProps;
  toggleCollapseButton?: Partial<ChakraStyle<IconButtonProps>>;
}

export interface ArrayStyles extends Omit<FieldStyles, "input">, Collapsable {
  spacing?: number | string;
  buttonGroup?: ButtonGroupProps;
  addIcon?: Partial<ChakraStyle<IconButtonProps>>;
  deleteIcon?: Partial<ChakraStyle<IconButtonProps>>;
  clearIcon?: Partial<ChakraStyle<IconButtonProps>>;
  itemWrapper?: BoxProps;
  itemWrapperButtonBox?: BoxProps;
}
