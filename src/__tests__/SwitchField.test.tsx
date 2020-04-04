import React from 'react';

import { render, fireEvent } from './setupTests';
import { SwitchField } from '../Fields';

const field = {
  fieldType: 'input' as const,
  inputType: 'switch' as const,
  label: 'Switch Field'
};

const defaultValues = {
  switchField: false
};

describe('switch field', () => {
  const { getByText, getByTestId } = render(<SwitchField id="test_id" name="switchField" field={field} />, defaultValues);
  const input = getByTestId('test_id').childNodes[0];

  it('renders default value', () => {
    expect(getByText('Switch Field')).toBeInTheDocument();
    expect(input).not.toBeChecked();
  });
  
  it('updates value correctly', () => {
    fireEvent.change(input, { target: { checked: true }});
    expect(input).toBeChecked();
  });
});
