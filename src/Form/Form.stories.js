import React from 'react';
import { action } from '@storybook/addon-actions';

import { Form } from '.';

export default {
  title: 'Form'
};

const basicFormSchema = {
  name: {
    fieldType: 'input',
    inputType: 'text',
    label: 'Name',
    placeholder: 'Name'
  },
  numbers: {
    fieldType: 'array',
    label: 'Numbers',
    isCollapsable: true,
    listItemField: {
      fieldType: 'input',
      inputType: 'text',
      label: 'Number',
      placeholder: 'Number',
      htmlInputType: 'tel',
      isRequired: true
    }    
  },
  custom: {
    fieldType: 'custom',
    component: () => <h1>Custom Component</h1>
  }
};

export const BasicForm = () => (
  <Form 
    title="Basic Example"
    schema={basicFormSchema}
    handleSubmit={action('submit')}
    useFormOptions={{
      defaultValues: {
        name: 'hello',
        numbers: ['bing']
      }
    }}
  />
);
