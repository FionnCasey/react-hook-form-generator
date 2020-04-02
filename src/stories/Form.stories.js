import React from 'react';
import { action } from '@storybook/addon-actions';

import { Form } from '../Form';

export default {
  title: 'Form',
};

const basicFormSchema = {
  name: {
    fieldType: 'input',
    inputType: 'text',
    label: 'Name',
    placeholder: 'Name',
  },
  numbers: {
    fieldType: 'array',
    label: 'Numbers',
    isCollapsable: true,
    styles: {
      clearIcon: {
        variantColor: 'blue'
      }
    },
    listItemField: {
      fieldType: 'input',
      inputType: 'number',
      label: 'Number',
      placeholder: 'Number',
      isRequired: true,
    },
  },
  switch: {
    fieldType: 'input',
    inputType: 'switch',
    label: 'Switch Field',
  },
  objectField: {
    fieldType: 'object',
    label: 'Person',
    isCollapsable: true,
    helperText: 'This is an object field',
    fields: {
      firstName: {
        fieldType: 'input',
        inputType: 'text',
        label: 'First Name',
        placeholder: 'First Name',
        helperText: 'Helper text',
      },
      lastName: {
        fieldType: 'input',
        inputType: 'text',
        label: 'Last Name',
        placeholder: 'Last Name',
      },
    },
  },
};

export const BasicForm = () => (
  <Form
    title="Basic Example"
    schema={basicFormSchema}
    handleSubmit={action('submit')}
    styles={{
      form: {
        submitButton: {
          variantColor: 'cyan'
        }
      },
      arrayField: {
        addIcon: {
          variantColor: 'pink'
        }
      }
    }}
    useFormOptions={{
      defaultValues: {
        name: 'hello',
        numbers: [100],
        objectField: {
          firstName: 'Fionn',
        },
      },
    }}
  />
);
