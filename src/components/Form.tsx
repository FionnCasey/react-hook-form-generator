import React, { FC, BaseSyntheticEvent, useMemo } from 'react';
import { Box, Heading, Stack, ButtonGroup, Button } from '@chakra-ui/core';
import { useForm, FormContext, UseFormOptions } from 'react-hook-form';
import merge from 'lodash.merge';

import { FormStyles, Field } from '../types';
import { StyleCtx } from '../hooks/useStyles';
import { TextField } from './TextField';
import { NumberField } from './NumberField';
import { ArrayField, arrayFieldStyles } from './ArrayField';
import { ObjectField, objectFieldStyles } from './ObjectField';

export interface FormProps {
  title?: string;
  schema: Record<string, Field>;
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
    fieldSpacing: 4,
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
};

const renderField = ([name, field]: [string, Field]) => {
  let Component: any = null;

  switch (field.type) {
    case 'text':
      Component = TextField;
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
