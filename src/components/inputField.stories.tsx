import type { Meta, StoryObj } from "@storybook/react";
import InputField from "./inputField";
import '../index.css'
//import InputFieldProps from "./inputField"; 

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    docs: {
      description: {
        component:
          "A customizable input field supporting variants, sizes, validation, loading state, clearable input, and theming.",
      },
    },
  },
  argTypes: {
    input: {
      control: "object",
      description: "Props for the InputField component.",
      table: { type: { summary: "InputFieldProps" } },
      defaultValue: {},
      // You can further specify controls for nested props if needed:
      // For example:
      // value: { control: "text" },
      // label: { control: "text" },
      // etc.
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

// ✅ Default usage
export const Default: Story = {
  args: {
    input: {
      label: "Username",
      placeholder: "Enter your username",
      value: "",
      variant: "outlined",
      size: "md",
    },
  },
};

// ✅ Variants
export const Filled: Story = {
  args: {
    input: {
      label: "Email",
      placeholder: "example@mail.com",
      variant: "filled",
    },
  },
};

export const Ghost: Story = {
  args: {
    input: {
      label: "Search",
      placeholder: "Type here...",
      variant: "ghost",
    },
  },
};

// ✅ Sizes
export const Small: Story = {
  args: {
    input: {
      label: "Small Field",
      placeholder: "sm input",
      size: "sm",
    },
  },
};

export const Large: Story = {
  args: {
    input: {
      label: "Large Field",
      placeholder: "lg input",
      size: "lg",
    },
  },
};

// ✅ States
export const Disabled: Story = {
  args: {
    input: {
      label: "Disabled",
      placeholder: "Can't type",
      disabled: true,
    },
  },
};

export const Loading: Story = {
  args: {
    input: {
      label: "Loading Field",
      placeholder: "Fetching...",
      loading: true,
    },
  },
};

export const Invalid: Story = {
  args: {
    input: {
      label: "Password",
      placeholder: "Enter password",
      invalid: true,
      errorMessage: "Password is required",
    },
  },
};

export const WithHelperText: Story = {
  args: {
    input: {
      label: "Email",
      placeholder: "example@mail.com",
      helperText: "We’ll never share your email.",
    },
  },
};

export const Clearable: Story = {
  args: {
    input: {
      label: "Search",
      value: "Removable text",
      clearable: true,
    },
  },
};
