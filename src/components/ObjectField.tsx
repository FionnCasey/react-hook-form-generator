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
  Collapse,
} from '@chakra-ui/core';

import {
  FieldProps,
  ObjectFieldSchema,
  ObjectFieldStyles,
  Field,
} from '../types';
import { useErrorMessage } from '../hooks/useErrorMessage';
import { useStyles } from '../hooks/useStyles';
import { TextField } from './TextField';
import { NumberField } from './NumberField';
import { ArrayField } from './ArrayField';

const renderField = ([name, field]: [string, Field]) => {
  let Component: any = null;

  switch (field.type) {
    case 'text':
      Component = TextField;
      break;

    case 'number':
      Component = NumberField;
      break;

    case 'array':
      Component = ArrayField;
      break;

    default:
      break;
  }

  return (
    <Box key={`${name}-container`}>
      <Component name={name} field={field} />
    </Box>
  );
};

export const objectFieldStyles: ObjectFieldStyles = {
  objectContainer: {
    spacing: 4,
    borderWidth: 1,
    borderColor: 'gray.200',
    padding: 2,
    borderRadius: 4,
    marginTop: 2,
    backgroundColor: 'gray.50',
  },
  label: {
    padding: 0,
  },
  toolbar: {
    alignItems: 'center',
  },
  collapseButton: {
    size: 'xs',
    marginLeft: 'auto',
  },
};

export const ObjectField: React.FC<FieldProps<ObjectFieldSchema>> = ({
  name,
  field,
}) => {
  const { label, isCollapsable, isRequired, helperText, styles = {} } = field;

  const { isOpen, onToggle } = useDisclosure(true);

  const objectStyles = useStyles<ObjectFieldStyles>('objectField', styles);

  const errorMessage = useErrorMessage(name, field.label);

  return (
    <FormControl
      isRequired={!!isRequired}
      isInvalid={!!errorMessage}
      {...objectStyles.control}
    >
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
            {...objectStyles.collapseButton}
          />
        )}
      </Flex>
      <Collapse isOpen={isOpen}>
        <Stack {...objectStyles.objectContainer}>
          {Object.entries(field.properties).map(([fieldName, objectField]) => (
            <Box
              key={`${name}-${fieldName}`}
              {...objectStyles.propertyContainer}
            >
              {renderField([`${name}.${fieldName}`, objectField])}
            </Box>
          ))}
        </Stack>
      </Collapse>
      {!!helperText && (
        <FormHelperText {...objectStyles.helperText}>
          {helperText}
        </FormHelperText>
      )}
      <FormErrorMessage {...objectStyles.errorMessage}>
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  );
};
