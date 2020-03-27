import React from 'react';

import { Field, Input, CustomField, FieldProps } from './types';

type ComponentKeys = 'input' | 'object' | 'array' | 'conditional' | 'text' | 'text_area' | 'number' | 'switch';

export const renderField = (
  [name, field]: [string, Field],
  components: Record<ComponentKeys, React.FC<FieldProps>>,
  id?: string,
  key?: string
) => {
  let Component: React.FC<FieldProps> = null;

  if (field.fieldType === 'custom') {
    const customField = field as CustomField;
    return <customField.component id={id} key={key || id || name} name={name} {...customField.props} />;
  }

  switch (field.fieldType) {
    case 'input':
      Component = components[(field as Input).inputType];
      break;

    case 'array':
      Component = components.array;
      break;

    default:
      throw new Error(`Invalid field type: ${field.fieldType}`);
  }

  return <Component id={id} key={key || id || name} name={name} field={field} />;
};
