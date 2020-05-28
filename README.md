# React Hook Form Generator

> A [React](https://reactjs.org/) component to quickly and easily generate forms from object schema. Built with [React Hook Form](https://react-hook-form.com/) and [Chakra UI](https://chakra-ui.com/).

## Live Demo

[Storybook](https://fionncasey.github.io/react-hook-form-generator/)

---

## Installation

> This package requires chakra-ui and react-hook-form as peer dependencies

```shell
npm install react-hook-form-generator
npm install @chakra-ui/core @emotion/core @emotion/styled emotion-theming
npm install react-hook-form
```

---

## Usage

```javascript
// MyForm.js
import React from 'react';
import { Form } from 'react-hook-form-generator';

const schema = {
  firstName: {
    type: 'text',
    label: 'First Name',
    isRequired: true,
  },
  age: {
    type: 'number',
    label: 'Number',
  },
  contacts: {
    type: 'array',
    label: 'Contacts',
    itemField: {
      type: 'object',
      properties: {
        firstName: {
          type: 'text',
          label: 'First Name',
        },
        phoneNumber: {
          type: 'text',
          label: 'Phone Number',
          htmlInputType: 'tel',
        },
      },
    },
  },
};

const MyForm = () => {
  const handleSubmit = values => {
    // Do something
  };

  return <Form title="My Form" schema={schema} handleSubmit={handleSubmit} />;
};
```

> This package uses Chakra UI for default styles so you need to wrap the form in a ThemeProvider

```javascript
// App.js
import React from 'react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import MyForm from './MyForm';

const App = () => (
  <ThemeProvider>
    <CSSReset />
    <MyForm />
  </ThemeProvider>
);
```

---

## Styling

> Chakra UI [style props](https://chakra-ui.com/style-props) can be passed in as global styles for an a group of components (e.g. all text input fields) or on an individual field basis

```javascript
// Global style method
<Form
  styles={{
    textField: {
      control: {
        margin: 4,
      },
      input: {
        focusBorderColor: 'teal.500',
      },
    },
  }}
/>
```

```javascript
// Individual fields method
<Form
  schema={{
    firstName: {
      type: 'text',
      style: {
        control: {
          margin: 4,
        },
        input: {
          focusBorderColor: 'teal.500',
        },
      },
    },
  }}
/>
```

> Individual styles will be merged with global styles and take priority

---

## Validation

> React Hook Form [schema validation](https://www.react-hook-form.com/advanced-usage#SchemaValidation) and other methods are forwarded through the `formOptions` property on the `Form` component
