import React, { FC, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/core';

import { FieldProps, FieldStyles, TextFieldSchema } from '../types';
import { useErrorMessage } from '../hooks/useErrorMessage';
import { useStyles } from '../hooks/useStyles';

export const TextField: FC<FieldProps<TextFieldSchema>> = ({
  id,
  name,
  field,
  value,
}) => {
  const {
    label,
    placeholder,
    htmlInputType,
    helperText,
    isRequired,
    leftInputAddon,
    rightInputAddon,
    shouldDisplay,
    styles = {},
  } = field;

  const fieldStyles = useStyles<FieldStyles>('textField', styles);

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
      {!!leftInputAddon || rightInputAddon ? (
        <InputGroup {...fieldStyles.inputGroup}>
          {!!leftInputAddon && <InputLeftAddon {...leftInputAddon} />}
          <Input
            data-testid={id}
            type={htmlInputType || 'text'}
            name={name}
            aria-label={name}
            ref={register()}
            placeholder={placeholder}
            defaultValue={value || ''}
            {...fieldStyles.input}
          />
          {!!rightInputAddon && <InputRightAddon {...rightInputAddon} />}
        </InputGroup>
      ) : (
        <Input
          data-testid={id}
          type={htmlInputType || 'text'}
          name={name}
          aria-label={name}
          ref={register()}
          placeholder={placeholder}
          defaultValue={value || ''}
          {...fieldStyles.input}
        />
      )}
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
