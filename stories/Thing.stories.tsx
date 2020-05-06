import React from 'react';
import { action } from '@storybook/addon-actions';

import { Form } from '../.';

export default {
  title: 'Form',
};

export const Default = () => (
  <Form
    title="Default Styles"
    schema={{
      name: {
        type: 'text',
        label: 'Name',
        placeholder: 'Name',
        isRequired: true
      },
      age: {
        type: 'number',
        label: 'Age',
        placeholder: 'Age',
      },
      address: {
        type: 'object',
        label: 'Address',
        properties: {
          city: {
            type: 'text',
            placeholder: 'City',
          },
          country: {
            type: 'text',
            placeholder: 'Country',
          },
        },
      },
      favouriteThings: {
        type: 'array',
        label: 'Favourite Things',
        isCollapsable: true,
        itemField: {
          type: 'text',
          label: 'Thing',
          placeholder: 'Thing',
        },
      },
    }}
    handleSubmit={action('Submit')}
  />
);
