import React from 'react';
import {
  FormControl,
  Flex,
  FormLabel,
  useDisclosure,
  IconButton,
  FormHelperText,
  FormErrorMessage,
  Stack,
  Box,
  Collapse
} from '@chakra-ui/core';

import { ObjectFieldProps, ObjectStyles, FormStyles } from '../types';
import { renderField } from '../utils';
import { useErrorMessage, useStyles } from '../hooks';
import { TextField } from '../TextField';
import { ArrayField } from '../ArrayField';

interface Props {
  name: string;
  field: ObjectFieldProps;
}

export const objectFieldStyles: FormStyles['objectField'] = {
  spacing: 4,
  label: {
    padding: 0
  },
  toolbar: {
    alignItems: 'center'
  },
  toggleCollapseButton: {
    size: 'xs',
    variantColor: 'purple',
    marginLeft: 'auto'
  },
  objectWrapper: {
    borderWidth: 1,
    borderColor: 'gray.200',
    padding: 2,
    borderRadius: 4,
    marginTop: 2
  }
};

export const ObjectField: React.FC<Props> = ({ name, field }) => {
  const { label, isCollapsable, isRequired, helperText, styles = {} } = field;

  const { isOpen, onToggle } = useDisclosure(true);

  const objectStyles = useStyles<ObjectStyles>('objectField', styles);

  const errorMessage = useErrorMessage(name, field.label);

  return (
    <FormControl isRequired={!!isRequired} isInvalid={!!errorMessage} {...objectStyles.control}>
      <Flex {...objectStyles.toolbar}>
        {!!label && (
          <FormLabel htmlFor={name} {...objectStyles.label}>
            {label}
          </FormLabel>
        )}
        {isCollapsable && (
          <IconButton
            icon={isOpen ? 'view-off' : 'view'}
            aria-label={isOpen ? 'Hide items' : 'Show items'}
            onClick={onToggle}
            {...objectStyles.toggleCollapseButton}
          />
        )}
      </Flex>
      <Collapse isOpen={isOpen}>
        <Stack spacing={objectStyles.spacing} {...objectStyles.objectWrapper}>
          {Object.entries(field.fields).map(([fieldName, objectField]) => (
            <Box key={`${name}-${fieldName}`}>
              {renderField([`${name}.${fieldName}`, objectField], components)}
            </Box>
          ))}
        </Stack>
      </Collapse>
      {!!helperText && <FormHelperText {...objectStyles.helperText}>{helperText}</FormHelperText>}
      {!!errorMessage && <FormErrorMessage {...objectStyles.errorMessage}>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

const components = {
  text: TextField,
  text_area: TextField,
  number: TextField,
  switch: TextField,
  input: TextField,
  object: ObjectField,
  array: ArrayField,
  conditional: TextField
};
