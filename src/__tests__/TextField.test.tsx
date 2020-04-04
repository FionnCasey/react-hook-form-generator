import React from 'react';

import { render, fireEvent } from './setupTests';
import { TextField } from '../Fields';

const field = {
  fieldType: 'input' as const,
  inputType: 'text' as const,
  label: 'Text Field'
};

const defaultValues = {
  textField: 'test value'
};

describe('text field', () => {
  const { getByText, getByTestId } = render(<TextField id="test_id" name="textField" field={field} />, defaultValues);
  const input = getByTestId('test_id');

  it('renders default value', () => {
    expect(getByText('Text Field')).toBeInTheDocument();
    expect(input).toHaveValue('test value');
  });
  
  it('updates value correctly', () => {
    fireEvent.change(input, { target: { value: 'new text' }});
    expect(input).toHaveValue('new text');
  });
});
