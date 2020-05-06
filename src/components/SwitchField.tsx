import React, { FC } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Switch,
} from '@chakra-ui/core';
import { useFormContext } from 'react-hook-form';

import { FieldProps, SwitchFieldStyles, SwitchFieldSchema } from '../types';
import { useErrorMessage } from '../hooks/useErrorMessage';
import { useStyles } from '../hooks/useStyles';

export const SwitchField: FC<FieldProps<SwitchFieldSchema>> = ({
  id,
  name,
  field,
}) => {
  const { label, helperText, isRequired, shouldDisplay, styles } = field;

  const fieldStyles = useStyles<SwitchFieldStyles>('switchField', styles);

  const errorMessage = useErrorMessage(name, label);

  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Switch name={name} data-testid={id} />
      {!!helperText && <FormHelperText>{FormHelperText}</FormHelperText>}
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
