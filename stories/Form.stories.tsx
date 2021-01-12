import React from 'react';
import { action } from '@storybook/addon-actions';

import { Form } from '../src/components/Form';

export default {
  title: 'Form',
};

export const Default = () => (
  <Form
    title="Default Styles"
    schema={{
      text: {
        type: 'text',
        label: 'Name',
        placeholder: 'Name',
        isRequired: true,
      },
      about: {
        type: 'textArea',
        label: 'About',
        placeholder: 'Write something about yourself',
      },
      number: {
        type: 'number',
        label: 'Age',
        placeholder: 'Age',
      },
      select: {
        type: 'select',
        label: 'Gender',
        options: [
          {
            value: 'Male',
          },
          {
            value: 'Female',
          },
          {
            value: 'Rather not say',
          },
        ],
      },
      toggle: {
        type: 'switch',
        label: 'Some Toggle',
      },
      days: {
        type: 'checkbox',
        label: 'Days of the Week',
        checkboxes: [
          {
            name: 'Monday',
          },
          {
            name: 'Tuesday',
          },
          {
            name: 'Wednesday',
          },
          {
            name: 'Thursday',
          },
          {
            name: 'Friday',
          },
        ],
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