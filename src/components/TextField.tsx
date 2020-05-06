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

  const values = watch({ nest: true });

  const isVisible = useMemo(() => {
    return shouldDisplay ? shouldDisplay(values) : true;
  }, [values, shouldDisplay]);

  return isVisible ? (
    <FormControl
      key={`${name}-control`}
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
        <InputGroup>
          {!!leftInputAddon && <InputLeftAddon {...leftInputAddon} />}
          <Input
            id={id}
            data-testid={id}
            key={id || `${name}-input`}
            type={htmlInputType || 'text'}
            name={name}
            aria-label={name}
            ref={register}
            placeholder={placeholder}
            {...fieldStyles.input}
          />
          {!!rightInputAddon && <InputRightAddon {...rightInputAddon} />}
        </InputGroup>
      ) : (
        <Input
          id={id}
          data-testid={id}
          key={id || `${name}-input`}
          type={htmlInputType || 'text'}
          name={name}
          aria-label={name}
          ref={register}
          placeholder={placeholder}
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
