import React from 'react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { configure, addDecorator } from '@storybook/react';

configure(
  [
    require.context('../src', true, /\.stories\.js$/),
  ],
  module
);

addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));