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
      pillars: {
        type: 'array',
        label: 'Pillars',
        isCollapsable: true,
        itemField: {
          type: 'object',
          properties: {
            name: {
              type: 'text',
              label: 'Pillar Name',
              isRequired: true,
            },
            action: {
              type: 'textArea',
              label: 'Action',
            },
            behaviour: {
              type: 'textArea',
              label: 'Behaviour',
            },
          },
        },
      },
      metrics: {
        type: 'array',
        label: 'Commercial Metrics',
        isCollapsable: true,
        itemField: {
          type: 'text',
          label: 'Metric Name',
          isRequired: true,
        },
      },
      questions: {
        type: 'array',
        label: 'Employee Questions',
        isCollapsable: true,
        itemField: {
          type: 'object',
          properties: {
            section: {
              type: 'text',
              label: 'Section',
              isRequired: true,
            },
            questions: {
              type: 'array',
              isCollapsable: true,
              itemField: {
                type: 'text',
                label: 'Question Text',
                isRequired: true,
              },
            },
          },
        },
      },
    }}
    handleSubmit={action('Submit')}
  />
);