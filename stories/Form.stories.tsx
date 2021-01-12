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
      area: {
        type: 'array',
        itemField: {
          type: 'textArea',
          label: 'Bing'
        }
      },
      data: {
        type: 'array',
        label: 'Opening Hours',
        isCollapsable: true,
        itemField: {
          type: 'object',
          styles: {
            objectContainer: {
              spacing: 0,
              border: 0,
              padding: 0,
              margin: '2px 0 0 0',
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gridColumnGap: '1rem'
            },
            propertyContainer: {
              width: '100%'
            }
          },
          properties: {
            dayOfWeek: {
              type: 'select',
              options: [
                { value: 'Mon' }, { value: 'Tue' }, { value: 'Wed' }
              ]
            },
            opens: {
              type: 'text',
              label: 'Opening Time',
              isRequired: true,
              styles: {
                label: {
                  fontSize: '0.85rem'
                },
                input: {
                  isFullWidth: true,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0
                }
              }
            },
            closes: {
              type: 'text',
              label: 'Closing Time',
              isRequired: true,
              styles: {
                control: {
                  width: '100%'
                },
                label: {
                  fontSize: '0.85rem'
                },
                input: {
                  isFullWidth: true,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0
                }
              }
            }
          }
        }
      }
    }}
    handleSubmit={action('Submit')}
    formOptions={{
      defaultValues: {
        area: [{ value: 'bingo' }, { value: 'bango' }]
      }
    }}
  />
);