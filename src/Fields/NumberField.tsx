import React from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage
} from '@chakra-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

import { NumberFieldProps, FieldStyles } from '../types';
import { useStyles, useErrorMessage } from '../hooks';

interface Props {
  id?: string;
  name: string;
  field: NumberFieldProps;
}

export const numberFieldStyles: FieldStyles = {};

export const NumberField: React.FC<Props> = ({ id, name, field }) => {
  const { label, placeholder, helperText, isRequired, styles = {} } = field;

  const fieldStyles = useStyles<FieldStyles>('numberField', styles);

  const { control } = useFormContext();

  const errorMessage = useErrorMessage(name, field.label);

  return (
    <FormControl key={name} isRequired={isRequired} isInvalid={!!errorMessage} {...fieldStyles.control}>
      {!!label && (
        <FormLabel htmlFor={name} {...fieldStyles.errorMessage}>
          {label}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={control}
        as={
          <NumberInput>
            <NumberInputField id={id} data-testid={id} placeholder={placeholder} {...fieldStyles.input} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        }
      />
      {!!helperText && <FormHelperText {...fieldStyles.helperText}>{helperText}</FormHelperText>}
      <FormErrorMessage {...fieldStyles.errorMessage}>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
