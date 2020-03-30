import React from "react";
import { action } from "@storybook/addon-actions";

import { Form } from ".";

export default {
  title: "Form",
};

const basicFormSchema = {
  name: {
    fieldType: "input",
    inputType: "text",
    label: "Name",
    placeholder: "Name",
  },
  numbers: {
    fieldType: "array",
    label: "Numbers",
    isCollapsable: true,
    listItemField: {
      fieldType: "input",
      inputType: "text",
      label: "Number",
      placeholder: "Number",
      htmlInputType: "tel",
      isRequired: true,
    },
  },
  objectField: {
    fieldType: "object",
    label: "Person",
    isCollapsable: true,
    helperText: "This is an object field",
    fields: {
      firstName: {
        fieldType: "input",
        inputType: "text",
        label: "First Name",
        placeholder: "First Name",
        helperText: "Helper text",
      },
      lastName: {
        fieldType: "input",
        inputType: "text",
        label: "Last Name",
        placeholder: "Last Name",
      },
    },
  },
};

export const BasicForm = () => (
  <Form
    title="Basic Example"
    schema={basicFormSchema}
    handleSubmit={action("submit")}
    useFormOptions={{
      defaultValues: {
        name: "hello",
        numbers: ["bing"],
        objectField: {
          firstName: "Fionn",
        },
      },
    }}
  />
);
