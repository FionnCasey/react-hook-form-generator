import React from 'react';
import { Heading, Box, Stack, ButtonGroup, Button } from '@chakra-ui/core';
import { useForm, FormContext, UseFormOptions } from 'react-hook-form';

import { Schema, FormStyles } from '../types';
import { StylesCtx } from '../hooks';
import { renderField } from '../utils';
import { TextField, textFieldStyles } from '../TextField';
import { ArrayField, arrayFieldStyles } from '../ArrayField';

interface FormProps {
  title?: string;
  schema: Schema;
  handleSubmit: (values: any, e?: React.BaseSyntheticEvent<object, any, any>) => void;
  styles?: FormStyles;
  submitText?: string;
  buttons?: Array<'submit' | 'reset' | React.FC>;
  useFormOptions?: UseFormOptions;
}

const components = {
  text: TextField,
  text_area: TextField,
  number: TextField,
  switch: TextField,
  input: TextField,
  object: TextField,
  array: ArrayField,
  conditional: TextField
};

export const defaultStyles: FormStyles = {
  form: {
    title: {
      as: 'h2',
      size: 'lg',
      marginBottom: 4
    },
    container: {
      padding: 4
    },
    spacing: 4,
    buttonGroup: {
      marginTop: 4
    },
    submitButton: {
      size: 'sm',
      variantColor: 'teal'
    },
    resetButton: {
      size: 'sm'
    }
  },
  arrayField: arrayFieldStyles,
  textField: textFieldStyles
};

export const Form: React.FC<FormProps> = ({
  title,
  schema,
  handleSubmit,
  submitText,
  useFormOptions,
  styles = defaultStyles,
  buttons = ['reset', 'submit']
}) => {
  const methods = useForm(useFormOptions);

  return (
    <StylesCtx.Provider value={styles}>
      <FormContext {...methods}>
        <Box as="form" onSubmit={methods.handleSubmit(handleSubmit)} {...styles.form.container}>
          {!!title && <Heading {...styles.form.title}>{title}</Heading>}
          <Stack spacing={styles.form.spacing}>
            {Object.entries(schema).map(entry => (
              <Box key={entry[0]}>{renderField(entry, components)}</Box>
            ))}
          </Stack>
          <ButtonGroup {...styles.form.buttonGroup}>
            {buttons.map((button, i) => {
              return button === 'reset' ? (
                <Button key={i} type="reset" {...styles.form.resetButton}>
                  Reset
                </Button>
              ) : button === 'submit' ? (
                <Button key={i} type="submit" {...styles.form.submitButton}>
                  {submitText || 'Submit'}
                </Button>
              ) : null;
            })}
          </ButtonGroup>
        </Box>
      </FormContext>
    </StylesCtx.Provider>
  );
};
