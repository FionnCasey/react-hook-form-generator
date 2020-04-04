import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import { Form } from '../Form';

const schema = {
  textField: {
    fieldType: 'input' as const,
    inputType: 'text',
    label: 'Text Field'
  }
};

const defaultValues: any = {
  textField: 'test value'
};

const handler = () => {
  let storedValues: any = undefined;
  return {
    setValues: (values: any) => {
      storedValues = values;
    },
    getValues: () => storedValues
  };
};

describe('form', () => {
  const { setValues, getValues } = handler();

  const { getByText } = render(
    <ThemeProvider>
      <CSSReset />
      <Form schema={schema} handleSubmit={setValues} useFormOptions={{ defaultValues }} />
    </ThemeProvider>
  );

  const submit = getByText('Submit');

  it('submits values correctly', async () => {
    await waitFor(() => fireEvent.click(submit));
    expect(getValues()).toEqual(defaultValues);
  });
});
