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
  FormErrorMessage
} from '@chakra-ui/core';
import { useFormContext, useFieldArray } from 'react-hook-form';

import { ArrayFieldProps, ArrayStyles } from '../types';
import { renderField } from '../utils';
import { useStyles, useErrorMessage } from '../hooks';

interface Props {
  name: string;
  field: ArrayFieldProps;
}

export const arrayFieldStyles: ArrayStyles = {
  listWrapper: {
    spacing: 4,
    marginTop: 2
  },
  label: {
    padding: 0
  },
  toolbar: {
    alignItems: 'center'
  },
  buttonGroup: {
    marginLeft: 'auto'
  },
  addIcon: {
    size: 'xs',
    variantColor: 'cyan'
  },
  deleteIcon: {
    size: 'xs',
    variantColor: 'pink',
    margin: 'auto'
  },
  clearIcon: {
    size: 'xs',
    variantColor: 'pink'
  },
  toggleCollapseButton: {
    size: 'xs',
    variantColor: 'purple'
  },
  itemWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 2.5rem',
    paddingLeft: 2,
    paddingBottom: 2,
    paddingTop: 1,
    border: '1px solid',
    borderRadius: 4,
    borderColor: 'gray.200'
  },
  itemWrapperButtonBox: {
    display: 'flex'
  }
};

export const ArrayField: React.FC<Props> = ({ name, field }) => {
  const { label, isRequired, isCollapsable, listItemField, helperText, styles = {} } = field;

  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({ name, control });

  const { isOpen, onOpen, onToggle } = useDisclosure(true);

  const arrayStyles = useStyles<ArrayStyles>('arrayField', styles);

  const errorMessage = useErrorMessage(name, field.label);

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
    <FormControl isRequired={isRequired} isInvalid={!!errorMessage} {...arrayStyles.control}>
      <Flex {...arrayStyles.toolbar}>
        {!!label && (
          <FormLabel htmlFor={name} {...arrayStyles.label}>
            {label} <span className="array-label-item-count" style={{ fontWeight: 400 }}>({fields.length})</span>
          </FormLabel>
        )}
        <ButtonGroup {...arrayStyles.buttonGroup}>
          <IconButton icon="add" aria-label="Add item" onClick={addItem} {...arrayStyles.addIcon} />
          <IconButton icon="delete" aria-label="Clear items" onClick={() => remove()} {...arrayStyles.clearIcon} />
          {isCollapsable && (
            <IconButton
              icon={isOpen ? 'view-off' : 'view'}
              aria-label={isOpen ? 'Hide items' : 'Show items'}
              onClick={onToggle}
              {...arrayStyles.toggleCollapseButton}
            />
          )}
        </ButtonGroup>
      </Flex>
      <Collapse isOpen={isOpen}>
        <Stack {...arrayStyles.listWrapper}>
          {fields.map((item, i) => (
            <Box key={`${name}-listitem-${i}`} {...arrayStyles.itemWrapper}>
              {renderField([`${name}[${i}]`, listItemField], item.id, item.id)}
              <Box {...arrayStyles.itemWrapperButtonBox}>
                <IconButton icon="delete" aria-label="Delete item" onClick={() => tryRemove(i)} {...arrayStyles.deleteIcon} />
              </Box>
            </Box>
          ))}
        </Stack>
      </Collapse>
      {!!helperText && <FormHelperText {...arrayStyles.helperText}>{helperText}</FormHelperText>}
      <FormErrorMessage {...arrayStyles.errorMessage}>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
