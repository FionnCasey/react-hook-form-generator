import React from 'react';

import { render, screen } from './setupTests';
import { TextField } from '../Fields';

const field = {
  fieldType: 'input' as 'input',
  inputType: 'text' as 'text',
  label: 'Text Field'
};

test("renders correctly", () => {
  render(<TextField name="text-field" field={field} />);
  expect(screen.queryByText('Text Field')).toBeInTheDocument();
});
