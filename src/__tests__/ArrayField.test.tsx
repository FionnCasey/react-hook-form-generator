import React from 'react';

import { render, fireEvent } from './setupTests';
import { ArrayField } from '../Fields';

const field = {
  fieldType: 'array' as const,
  label: 'Array Field',
  listItemField: {
    fieldType: 'input' as const,
    inputType: 'text',
    placeholder: 'placeholder'
  }
};

const defaultValues = {
  arrayField: ['test value 0', 'test value 1']
};

describe('array field - text', () => {
  const { getByText, getAllByPlaceholderText } = render(<ArrayField name="arrayField" field={field} />, defaultValues);
  const input = getAllByPlaceholderText('placeholder');

  it('renders default values', () => {
    expect(getByText('Array Field')).toBeInTheDocument();
    input.forEach((el, i) => {
      expect(el).toHaveValue(`test value ${i}`);
    });
  });

  it('updates values correctly', () => {
    input.forEach((el, i) => {
      fireEvent.change(el, { target: { value: `new text ${i}` } });
      expect(el).toHaveValue(`new text ${i}`);
    });
  });
});
