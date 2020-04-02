import React, { useMemo } from 'react';
import { Heading, Box, Stack, ButtonGroup, Button } from '@chakra-ui/core';
import { useForm, FormContext, UseFormOptions } from 'react-hook-form';
import merge from 'lodash.merge';
import get from 'lodash.get';

import { Schema, FormStyles } from './types';
import { StylesCtx } from './hooks';
import { renderField } from './utils';
import { textFieldStyles, numberFieldStyles, arrayFieldStyles, objectFieldStyles, switchFieldStyles } from './Fields';

type ButtonSpec = 'submit' | 'reset';

interface FormProps {
  title?: string;
  schema: Schema;
  handleSubmit: (values: any, e?: React.BaseSyntheticEvent<object, any, any>) => void;
  styles?: FormStyles;
  mergeStyles?: boolean
  submitText?: string;
  buttons?: ButtonSpec[];
  useFormOptions?: UseFormOptions;
}

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
      variantColor: 'purple'
    },
    resetButton: {
      size: 'sm'
    }
  },
  arrayField: arrayFieldStyles,
  objectField: objectFieldStyles,
  textField: textFieldStyles,
  numberField: numberFieldStyles,
  switchField: switchFieldStyles
};

export const Form: React.FC<FormProps> = ({
  title,
  schema,
  handleSubmit,
  submitText,
  useFormOptions,
  styles = defaultStyles,
  mergeStyles = true,
  buttons = ['reset', 'submit']
}) => {
  const methods = useForm(useFormOptions);

  const styleCtxValue = useMemo(() => {
    return mergeStyles ? merge(defaultStyles, styles) as FormStyles : styles;
  }, [styles]);

  const formStyles = useMemo(() => {
    return get(styleCtxValue, 'form', {}) as Record<string, any>;
  }, [styleCtxValue]);

  return (
    <StylesCtx.Provider value={styleCtxValue}>
      <FormContext {...methods}>
        <Box as="form" onSubmit={methods.handleSubmit(handleSubmit)} {...formStyles.container}>
          {!!title && <Heading {...formStyles.title}>{title}</Heading>}
          <Stack spacing={formStyles.spacing}>
            {Object.entries(schema).map(entry => (
              <Box key={entry[0]}>{renderField(entry)}</Box>
            ))}
          </Stack>
          <ButtonGroup {...formStyles.buttonGroup}>
            {buttons.map((button, i) => {
              return button === 'reset' ? (
                <Button key={i} type="reset" {...formStyles.resetButton}>
                  Reset
                </Button>
              ) : button === 'submit' ? (
                <Button key={i} type="submit" {...formStyles.submitButton}>
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
