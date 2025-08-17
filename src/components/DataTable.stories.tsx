import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./DataTable";

// Define a type for our demo data
interface User {
  id: number;
  name: string;
  email: string;
}

// Example columns
const columns: { key: keyof User; title: string; index: number }[] = [
  { key: "id", title: "ID", index: 0 },
  { key: "name", title: "Name", index: 1 },
  { key: "email", title: "Email", index: 2 },
];

// Example data
const data: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component:
          "A flexible data table component supporting column configuration, loading state, row selection, and change callbacks.",
      },
    },
  },
  argTypes: {
    tableProps: {
      control: "object",
      description: "Props for the DataTable component.",
      table: {
        type: { summary: "DataTableProps<User>" },
      },
      defaultValue: {},
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

// ✅ Default
export const Default: Story = {
  args: {
    tableProps: {
      data,
      columns,
      loading: false,
      selectable: false,
    },
  },
};

// ✅ Loading State
export const Loading: Story = {
  args: {
    tableProps: {
      data: [],
      columns,
      loading: true,
    },
  },
};

// ✅ Empty State
export const Empty: Story = {
  args: {
    tableProps: {
      data: [],
      columns,
      loading: false,
    },
  },
};

// ✅ Selectable Rows
export const Selectable: Story = {
  args: {
    tableProps: {
      data,
      columns,
      selectable: true,
    },
  },
};
