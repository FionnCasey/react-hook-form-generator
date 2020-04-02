import React from 'react';
import { FormControl, FormLabel, FormHelperText, FormErrorMessage, Switch } from '@chakra-ui/core';
import { useFormContext } from 'react-hook-form';

import { SwitchFieldProps, SwitchStyles } from '../types';
import { useStyles, useErrorMessage } from '..';

interface Props {
  id?: string
  name: string
  field: SwitchFieldProps
}

export const switchFieldStyles: SwitchStyles = {};

export const SwitchField: React.FC<Props> = ({ name, field }) => {
  const { label, helperText, isRequired, styles = {} } = field;

  const fieldStyles = useStyles<SwitchStyles>('switchField', styles);

  const { register } = useFormContext();

  const errorMessage = useErrorMessage(name, field.label);
  
  return (
    <FormControl isRequired={isRequired} isInvalid={!!errorMessage}>
      {!!label && <FormLabel {...styles.label}>{label}</FormLabel>}
      <Switch {...fieldStyles.switch} name={name} ref={register} />
      {!!helperText && <FormHelperText {...fieldStyles.helperText}>{helperText}</FormHelperText>}
      <FormErrorMessage {...styles.errorMessage}>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};