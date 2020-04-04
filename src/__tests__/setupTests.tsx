import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { useForm, FormContext } from 'react-hook-form';

import { StylesCtx } from '../hooks';

const FormProvider: React.FC<{ defaultValues?: any }> = ({ children, defaultValues = {} }) => {
  const methods = useForm({ defaultValues });

  return (
    <ThemeProvider>
      <CSSReset />
      <StylesCtx.Provider value={{}}>
        <FormContext {...methods}>{children}</FormContext>
      </StylesCtx.Provider>
    </ThemeProvider>
  );
};

const customRender = (ui: any, defaultValues?: any, options?: any) => {
  return render(ui, {
    wrapper: ({ children }) => <FormProvider defaultValues={defaultValues}>{children}</FormProvider>,
    ...options
  });
};

const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

export * from '@testing-library/react';

export { customRender as render };
