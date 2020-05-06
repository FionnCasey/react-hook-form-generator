import {
  FormControlProps,
  InputProps,
  BoxProps,
  HeadingProps,
  ButtonGroupProps,
  ButtonProps,
  InputAddonProps,
  IconButtonProps,
  StackProps,
  FlexProps,
  PseudoBoxProps,
  SwitchProps,
} from '@chakra-ui/core';
import { FormLabelProps } from '@chakra-ui/core/dist/FormLabel';

export declare var __DEV__: boolean;

export type Field =
  | TextFieldSchema
  | NumberFieldSchema
  | ArrayFieldSchema
  | ObjectFieldSchema;

export interface FieldProps<T extends FieldSchema> {
  id?: string;
  name: string;
  field: T;
}

interface FieldSchema {
  type: 'text' | 'textArea' | 'number' | 'switch' | 'array' | 'object';
  styles?: FieldStyles;
  shouldDisplay?: (values?: any) => boolean;
}

export interface TextFieldSchema extends FieldSchema {
  type: 'text' | 'textArea';
  htmlInputType?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  isRequired?: boolean;
  leftInputAddon?: InputAddonProps;
  rightInputAddon?: InputAddonProps;
}

export interface NumberFieldSchema extends FieldSchema {
  type: 'number';
  label?: string;
  placeholder?: string;
  helperText?: string;
  isRequired?: boolean;
}

export interface ArrayFieldSchema extends FieldSchema {
  type: 'array';
  label?: string;
  helperText?: string;
  isRequired?: boolean;
  isCollapsable?: boolean;
  itemField: Field;
}

export interface ObjectFieldSchema extends FieldSchema {
  type: 'object';
  label?: string;
  helperText?: string;
  isRequired?: boolean;
  isCollapsable?: boolean;
  properties: Record<string, Field>;
}

export interface SwitchFieldSchema extends FieldSchema {
  type: 'switch';
  label?: string;
  helperText?: string;
  isRequired?: boolean;
}

export interface FormStyles {
  form?: {
    container?: BoxProps;
    title?: HeadingProps;
    fieldSpacing?: number;
    buttonGroup?: ButtonGroupProps;
    submitButton?: Omit<ButtonProps, 'children' | 'type'>;
    resetButton?: Omit<ButtonProps, 'children' | 'type'>;
  };
  textField?: FieldStyles;
  textAreaField?: FieldStyles;
  numberField?: FieldStyles;
  arrayField?: ArrayFieldStyles;
  objectField?: ObjectFieldStyles;
  switchField?: SwitchFieldStyles;
}

export interface FieldStyles {
  control?: FormControlProps;
  label?: Omit<FormLabelProps, 'children'>;
  input?: InputProps<HTMLInputElement>;
  helperText?: BoxProps;
  errorMessage?: BoxProps;
}

export interface ArrayFieldStyles
  extends Pick<
      FieldStyles,
      'control' | 'label' | 'helperText' | 'errorMessage'
    >,
    CollapsableStyles {
  arrayContainer?: StackProps;
  itemContainer?: BoxProps;
  buttonGroup?: ButtonGroupProps;
  addButton?: Partial<IconButtonProps>;
  deleteButton?: Partial<IconButtonProps>;
  clearButton?: Partial<IconButtonProps>;
  deleteItemContainer?: BoxProps;
  countText?: PseudoBoxProps;
}

export interface ObjectFieldStyles
  extends Pick<
      FieldStyles,
      'control' | 'label' | 'helperText' | 'errorMessage'
    >,
    CollapsableStyles {
  objectContainer?: StackProps;
  propertyContainer?: BoxProps;
}

export interface CollapsableStyles {
  toolbar?: FlexProps;
  collapseButton?: Partial<IconButtonProps>;
}

export interface SwitchFieldStyles
  extends Pick<
    FieldStyles,
    'control' | 'label' | 'helperText' | 'errorMessage'
  > {
  switch?: SwitchProps;
}
