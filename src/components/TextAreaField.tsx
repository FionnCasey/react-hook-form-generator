import React, { FC, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  FormHelperText,
} from '@chakra-ui/core';

import { FieldProps, FieldStyles, TextAreaFieldSchema } from '../types';
import { useErrorMessage } from '../hooks/useErrorMessage';
import { useStyles } from '../hooks/useStyles';

export const TextAreaField: FC<FieldProps<TextAreaFieldSchema>> = ({
  id,
  name,
  field,
}) => {
  const {
    label,
    placeholder,
    helperText,
    isRequired,
    shouldDisplay,
    styles = {},
  } = field;

  const fieldStyles = useStyles<FieldStyles>('textAreaField', styles);

  const { register, watch } = useFormContext();

  const errorMessage = useErrorMessage(name, label);

  const values = watch(name);

  const isVisible = useMemo(() => {
    return shouldDisplay ? shouldDisplay(values) : true;
  }, [values, shouldDisplay]);

  return isVisible ? (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!errorMessage}
      {...fieldStyles.control}
    >
      {!!label && (
        <FormLabel htmlFor={name} {...fieldStyles.label}>
          {label}
        </FormLabel>
      )}
      <Textarea
        data-testid={id}
        name={name}
        placeholder={placeholder}
        ref={register()}
        {...fieldStyles.input}
      />
      {!!helperText && (
        <FormHelperText {...fieldStyles.helperText}>
          {helperText}
        </FormHelperText>
      )}
      <FormErrorMessage {...fieldStyles.errorMessage}>
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  ) : null;
};
