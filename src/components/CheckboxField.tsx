import React, { FC, useMemo } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Checkbox,
  Stack,
} from '@chakra-ui/core';
import { useFormContext } from 'react-hook-form';

import { FieldProps, CheckboxFieldSchema, CheckboxFieldStyles } from '../types';
import { useErrorMessage } from '../hooks/useErrorMessage';
import { useStyles } from '../hooks/useStyles';

export const checkboxFieldStyles: CheckboxFieldStyles = {
  checkboxGroup: {
    isInline: true,
    spacing: 4
  }
};

export const CheckboxField: FC<FieldProps<CheckboxFieldSchema>> = ({
  id,
  name,
  field,
}) => {
  const { label, helperText, isRequired, shouldDisplay, styles = {} } = field;

  const { register, watch } = useFormContext();

  const values = watch({ nest: true });

  const fieldStyles = useStyles<CheckboxFieldStyles>('checkboxField', styles);

  const errorMessage = useErrorMessage(name, label);

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
      <Stack {...fieldStyles.checkboxGroup}>
        {field.checkboxes.map(checkbox => (
          <Checkbox
            key={checkbox.name}
            name={checkbox.name}
            ref={register}
            data-testid={`${id}-${checkbox.name}`}
          >
            {checkbox.label || checkbox.name}
          </Checkbox>
        ))}
      </Stack>
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
