import React from 'react';

import { render, fireEvent } from './setupTests';
import { NumberField } from '../Fields';

const field = {
  fieldType: 'input' as const,
  inputType: 'number' as const,
  label: 'Number Field'
};

const defaultValues = {
  numberField: 100
};

describe('number field', () => {
  const { getByText, getByTestId } = render(<NumberField id="test_id" name="numberField" field={field} />, defaultValues);
  const input = getByTestId('test_id');

  it('renders default value', () => {
    expect(getByText('Number Field')).toBeInTheDocument();
    expect(input).toHaveValue('100');
  });

  it('updates value correctly', () => {
    fireEvent.change(input, { target: { value: 200 }});
    expect(input).toHaveValue('200');
  });
});
