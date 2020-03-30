import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { useForm, FormContext } from 'react-hook-form';

import { StylesCtx } from './src/hooks';

const FormProvider: React.FC = ({ children }) => {
  const methods = useForm();

  return (
    <ThemeProvider>
      <CSSReset />
      <StylesCtx.Provider value={{}}>
        <FormContext {...methods}>{children}</FormContext>
      </StylesCtx.Provider>
    </ThemeProvider>
  );
};

const customRender = (ui: any, options?: any) => render(ui, { wrapper: FormProvider, ...options });

export * from '@testing-library/react';

export { customRender as render };
