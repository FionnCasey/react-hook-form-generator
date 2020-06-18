import React, { FC, BaseSyntheticEvent, useMemo } from 'react';
import { Box, Heading, Stack, ButtonGroup, Button } from '@chakra-ui/core';
import { useForm, FormContext, UseFormOptions } from 'react-hook-form';
import merge from 'lodash.merge';

import { FormStyles, Field, Schema } from '../types';
import { StyleCtx } from '../hooks/useStyles';
import { TextField } from './TextField';
import { TextAreaField } from './TextAreaField';
import { NumberField } from './NumberField';
import {
  ArrayField,
  arrayFieldStyles,
  ObjectField,
  objectFieldStyles
} from './Containers';
import { SwitchField } from './SwitchField';
import { CheckboxField, checkboxFieldStyles } from './CheckboxField';
import { SelectField } from './SelectField';

export interface FormProps {
  title?: string;
  schema: Schema;
  handleSubmit: (values: any, e?: BaseSyntheticEvent) => void;
  styles?: FormStyles;
  overwriteDefaultStyles?: boolean;
  formOptions?: UseFormOptions;
}

const defaultStyles: FormStyles = {
  form: {
    container: {
      padding: 4,
    },
    title: {
      size: 'lg',
      marginBottom: 4,
    },
    fieldSpacing: 6,
    buttonGroup: {
      marginTop: 4,
    },
    submitButton: {
      size: 'sm',
    },
    resetButton: {
      size: 'sm',
    },
  },
  arrayField: arrayFieldStyles,
  objectField: objectFieldStyles,
  checkboxField: checkboxFieldStyles,
};

const renderField = ([name, field]: [string, Field]) => {
  let Component: any = null;

  switch (field.type) {
    case 'text':
      Component = TextField;
      break;

    case 'textArea':
      Component = TextAreaField;
      break;

    case 'number':
      Component = NumberField;
      break;

    case 'array':
      Component = ArrayField;
      break;

    case 'object':
      Component = ObjectField;
      break;

    case 'switch':
      Component = SwitchField;
      break;

    case 'checkbox':
      Component = CheckboxField;
      break;

    case 'select':
      Component = SelectField;
      break;

    case 'custom':
      Component = field.component;
      return (
        <Box key={`${name}-container`}>
          <Component name={name} field={field} {...field.props} />
        </Box>
      );

    default:
      break;
  }

  return (
    <Box key={`${name}-container`}>
      <Component name={name} field={field} />
    </Box>
  );
};

export const Form: FC<FormProps> = ({
  title,
  schema,
  handleSubmit,
  formOptions,
  overwriteDefaultStyles,
  styles = {},
}) => {
  const form = useForm(formOptions);

  const baseStyles = useMemo(() => {
    return overwriteDefaultStyles ? styles : merge(defaultStyles, styles);
  }, [styles, overwriteDefaultStyles]);

  return (
    <StyleCtx.Provider value={baseStyles}>
      <FormContext {...form}>
        <Box
          as="form"
          onSubmit={form.handleSubmit(handleSubmit)}
          {...baseStyles.form?.container}
        >
          {!!title && <Heading {...baseStyles.form?.title}>{title}</Heading>}
          <Stack spacing={baseStyles.form?.fieldSpacing}>
            {Object.entries(schema).map(renderField)}
          </Stack>
          <ButtonGroup {...baseStyles.form?.buttonGroup}>
            <Button type="reset" {...baseStyles.form?.resetButton}>
              Reset
            </Button>
            <Button type="submit" {...baseStyles.form?.submitButton}>
              Submit
            </Button>
          </ButtonGroup>
        </Box>
      </FormContext>
    </StyleCtx.Provider>
  );
};
