import React from 'react';

import { render, fireEvent } from './setupTests';
import { ObjectField } from '../Fields';

const field = {
  fieldType: 'object' as const,
  label: 'Object Field',
  fields: {
    text: {
      fieldType: 'input' as const,
      inputType: 'text',
      label: 'Text Field',
      placeholder: 'text placeholder'
    },
    number: {
      fieldType: 'input' as const,
      inputType: 'number',
      label: 'Number Field',
      placeholder: 'number placeholder'
    }
  }
};

const defaultValues = {
  objectField: {
    text: 'test text',
    number: 100
  }
};

describe('text field - basic', () => {
  const { getByText, getByPlaceholderText } = render(<ObjectField name="objectField" field={field} />, defaultValues);
  const textInput = getByPlaceholderText('text placeholder');
  const numberInput = getByPlaceholderText('number placeholder');

  it('renders default values', () => {
    expect(getByText('Text Field')).toBeInTheDocument();
    expect(textInput).toHaveValue('test text');
    expect(getByText('Number Field')).toBeInTheDocument();
    expect(numberInput).toHaveValue('100');
  });
  
  it('updates value correctly', () => {
    fireEvent.change(textInput, { target: { value: 'new text' }});
    expect(textInput).toHaveValue('new text');
    fireEvent.change(numberInput, { target: { value: 200 }});
    expect(numberInput).toHaveValue('200');
  });
});
