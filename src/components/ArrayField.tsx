import React from 'react';
import {
  FormControl,
  FormLabel,
  ButtonGroup,
  IconButton,
  Flex,
  Collapse,
  useDisclosure,
  Box,
  Stack,
  FormHelperText,
  FormErrorMessage,
  PseudoBox,
} from '@chakra-ui/core';
import { useFormContext, useFieldArray } from 'react-hook-form';

import {
  FieldProps,
  ArrayFieldStyles,
  ArrayFieldSchema,
  Field,
} from '../types';
import { useErrorMessage } from '../hooks/useErrorMessage';
import { useStyles } from '../hooks/useStyles';
import { TextField } from './TextField';
import { NumberField } from './NumberField';

const renderField = ([name, field]: [string, Field], id?: string) => {
  let Component: any = null;

  switch (field.type) {
    case 'text':
      Component = TextField;
      break;

    case 'number':
      Component = NumberField;
      break;

    default:
      break;
  }

  return (
    <Box key={`${name}-container`}>
      <Component id={id} name={name} field={field} />
    </Box>
  );
};

export const arrayFieldStyles: ArrayFieldStyles = {
  arrayContainer: {
    spacing: 4,
    marginTop: 2,
  },
  label: {
    padding: 0,
    display: 'flex',
  },
  countText: {
    fontWeight: 400,
    marginLeft: 1,
  },
  toolbar: {
    alignItems: 'center',
  },
  buttonGroup: {
    marginLeft: 'auto',
  },
  addButton: {
    size: 'xs',
  },
  deleteButton: {
    size: 'xs',
    margin: 'auto',
  },
  clearButton: {
    size: 'xs',
  },
  collapseButton: {
    size: 'xs',
  },
  itemContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 2.5rem',
    paddingLeft: 2,
    paddingBottom: 2,
    paddingTop: 1,
    border: '1px solid',
    borderRadius: 4,
    borderColor: 'gray.200',
    backgroundColor: 'gray.50',
  },
  deleteItemContainer: {
    display: 'flex',
  },
};

export const ArrayField: React.FC<FieldProps<ArrayFieldSchema>> = ({
  name,
  field,
}) => {
  const {
    label,
    isRequired,
    isCollapsable,
    itemField,
    helperText,
    styles = {},
  } = field;

  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({ name, control });

  const { isOpen, onOpen, onToggle } = useDisclosure(true);

  const arrayStyles = useStyles<ArrayFieldStyles>('arrayField', styles);

  const errorMessage = useErrorMessage(name, label);

  const addItem = () => {
    append({});
    onOpen();
  };

  const tryRemove = (i: number) => {
    try {
      remove(i);
    } catch (e) {
      // console.warn(e);
    }
  };

  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!errorMessage}
      {...arrayStyles.control}
    >
      <Flex {...arrayStyles.toolbar}>
        {!!label && (
          <FormLabel htmlFor={name} {...arrayStyles.label}>
            {label}{' '}
            <PseudoBox {...arrayStyles.countText}>({fields.length})</PseudoBox>
          </FormLabel>
        )}
        <ButtonGroup {...arrayStyles.buttonGroup}>
          <IconButton
            icon="add"
            aria-label="Add item"
            onClick={addItem}
            {...arrayStyles.addButton}
          />
          <IconButton
            icon="delete"
            aria-label="Clear items"
            onClick={() => remove()}
            {...arrayStyles.clearButton}
          />
          {isCollapsable && (
            <IconButton
              icon={isOpen ? 'view-off' : 'view'}
              aria-label={isOpen ? 'Hide items' : 'Show items'}
              onClick={onToggle}
              {...arrayStyles.collapseButton}
            />
          )}
        </ButtonGroup>
      </Flex>
      <Collapse isOpen={isOpen}>
        <Stack {...arrayStyles.arrayContainer}>
          {fields.map((item, i) => (
            <Box key={`${name}-listitem-${i}`} {...arrayStyles.itemContainer}>
              {renderField([`${name}[${i}]`, itemField], item.id)}
              <Box {...arrayStyles.deleteItemContainer}>
                <IconButton
                  icon="delete"
                  aria-label="Delete item"
                  onClick={() => tryRemove(i)}
                  {...arrayStyles.deleteButton}
                />
              </Box>
            </Box>
          ))}
        </Stack>
      </Collapse>
      {!!helperText && (
        <FormHelperText {...arrayStyles.helperText}>
          {helperText}
        </FormHelperText>
      )}
      <FormErrorMessage {...arrayStyles.errorMessage}>
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  );
};
