import React from 'react';

import { Field, Input, CustomFieldProps, FieldProps } from './types';
import { TextField, ArrayField, ObjectField, NumberField, SwitchField } from './Fields';

type ComponentKeys = 'object' | 'array' | 'conditional' | 'text' | 'text_area' | 'number' | 'switch';

const components: Record<ComponentKeys, React.FC<FieldProps>> = {
  object: ObjectField,
  array: ArrayField,
  conditional: TextField,
  text: TextField,
  text_area: TextField,
  number: NumberField,
  switch: SwitchField
};

export const renderField = ([name, field]: [string, Field], id?: string, key?: string) => {
  let Component: React.FC<FieldProps> | null = null;

  if (field.fieldType === 'custom') {
    const customField = field as CustomFieldProps;
    return <customField.component id={id} key={key || id || name} name={name} {...customField.props} />;
  }

  switch (field.fieldType) {
    case 'input':
      Component = components[(field as Input).inputType];
      break;

    case 'array':
      Component = components.array;
      break;

    case 'object':
      Component = components.object;
      break;

    default:
      throw new Error(`Invalid field type: ${field.fieldType}`);
  }

  return <Component id={id} key={key || id || name} name={name} field={field} />;
};
