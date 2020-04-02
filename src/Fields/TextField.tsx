import React from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  FormErrorMessage
} from '@chakra-ui/core';
import { useFormContext } from 'react-hook-form';

import { TextFieldProps, FieldStyles } from '../types';
import { useStyles, useErrorMessage } from '../hooks';

interface Props {
  id?: string;
  name: string;
  field: TextFieldProps;
}

export const textFieldStyles: FieldStyles = {};

export const TextField: React.FC<Props> = ({ id, name, field }) => {
  const { label, placeholder, htmlInputType, helperText, isRequired, leftInputAddon, rightInputAddon, styles = {} } = field;

  const fieldStyles = useStyles<FieldStyles>('textField', styles);

  const { register } = useFormContext();

  const errorMessage = useErrorMessage(name, field.label);

  return (
    <FormControl key={name} isRequired={isRequired} isInvalid={!!errorMessage} {...fieldStyles.control}>
      {!!label && (
        <FormLabel htmlFor={name} {...fieldStyles.errorMessage}>
          {label}
        </FormLabel>
      )}
      {!!leftInputAddon || rightInputAddon ? (
        <InputGroup>
          {!!leftInputAddon && <InputLeftAddon {...leftInputAddon} />}
          <Input id={id} key={id || `${name}-input`} name={name} ref={register} placeholder={placeholder} {...fieldStyles.input} />
          {!!rightInputAddon && <InputRightAddon {...rightInputAddon} />}
        </InputGroup>
      ) : (
        <Input
          key={id || `${name}-textfield`}
          type={htmlInputType || 'text'}
          name={name}
          ref={register}
          placeholder={placeholder}
          {...fieldStyles.input}
        />
      )}
      {!!helperText && <FormHelperText {...fieldStyles.helperText}>{helperText}</FormHelperText>}
      <FormErrorMessage {...fieldStyles.errorMessage}>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
