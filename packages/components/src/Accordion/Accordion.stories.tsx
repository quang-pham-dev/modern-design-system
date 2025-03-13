import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { AccordionItem } from './AccordionItem';
import { Icon } from '../Icon';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'elevated'],
      description: 'The visual style of the accordion',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the accordion',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Whether multiple items can be expanded simultaneously',
    },
    defaultExpandedItems: {
      control: [],
      description:
        'Array of indices for items that should be expanded by default',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Accordion
export const Basic: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    allowMultiple: false,
    defaultExpandedItems: [0],
    children: 'This is an Basic Accordion.',
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <Accordion {...args}>
        <AccordionItem title="What is a design system?">
          A design system is a collection of reusable components, guided by
          clear standards, that can be assembled to build any number of
          applications.
        </AccordionItem>
        <AccordionItem title="Why use a design system?">
          Design systems help maintain consistency across products, speed up
          development, and make it easier to scale design across multiple
          projects and teams.
        </AccordionItem>
        <AccordionItem title="How to implement a design system?">
          Start by defining your design tokens, create core components, document
          usage guidelines, and establish processes for contribution and
          maintenance.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// Accordion with Icons
export const WithIcons: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    children: 'This is an WithIcons Accordion.',
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <Accordion {...args}>
        <AccordionItem
          title="Getting Started"
          icon={<Icon name="book-open" size="md" />}
        >
          Learn how to install and set up the design system in your project.
        </AccordionItem>
        <AccordionItem
          title="Components"
          icon={<Icon name="puzzle" size="md" />}
        >
          Explore the available components and their usage.
        </AccordionItem>
        <AccordionItem title="Theming" icon={<Icon name="palette" size="md" />}>
          Customize the look and feel of the components to match your brand.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// Accordion Variants
export const Variants: Story = {
  args: {
    children: 'This is an Variants Accordion.',
  },
  render: () => (
    <div
      style={{
        width: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div>
        <h3>Outlined (Default)</h3>
        <Accordion variant="outlined">
          <AccordionItem title="Section 1">Content for section 1</AccordionItem>
          <AccordionItem title="Section 2">Content for section 2</AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3>Filled</h3>
        <Accordion variant="filled">
          <AccordionItem title="Section 1">Content for section 1</AccordionItem>
          <AccordionItem title="Section 2">Content for section 2</AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3>Elevated</h3>
        <Accordion variant="elevated">
          <AccordionItem title="Section 1">Content for section 1</AccordionItem>
          <AccordionItem title="Section 2">Content for section 2</AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// Accordion Sizes
export const Sizes: Story = {
  args: {
    children: 'This is an Sizes Accordion.',
  },
  render: () => (
    <div
      style={{
        width: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div>
        <h3>Small</h3>
        <Accordion size="sm">
          <AccordionItem title="Section 1">Content for section 1</AccordionItem>
          <AccordionItem title="Section 2">Content for section 2</AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3>Medium (Default)</h3>
        <Accordion size="md">
          <AccordionItem title="Section 1">Content for section 1</AccordionItem>
          <AccordionItem title="Section 2">Content for section 2</AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3>Large</h3>
        <Accordion size="lg">
          <AccordionItem title="Section 1">Content for section 1</AccordionItem>
          <AccordionItem title="Section 2">Content for section 2</AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
};

// Allow Multiple
export const AllowMultiple: Story = {
  args: {
    allowMultiple: true,
    defaultExpandedItems: [0, 1],
    children: 'This is an AllowMultiple Accordion.',
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <Accordion {...args}>
        <AccordionItem title="Section 1">
          This is the content for section 1. Multiple sections can be expanded
          at once.
        </AccordionItem>
        <AccordionItem title="Section 2">
          This is the content for section 2. Multiple sections can be expanded
          at once.
        </AccordionItem>
        <AccordionItem title="Section 3">
          This is the content for section 3. Multiple sections can be expanded
          at once.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

// Disabled Item
export const DisabledItem: Story = {
  args: {
    children: 'This is an DisabledItem Accordion.',
  },
  render: () => (
    <div style={{ width: '500px' }}>
      <Accordion>
        <AccordionItem title="Regular Section">
          This is a regular section that can be expanded and collapsed.
        </AccordionItem>
        <AccordionItem title="Disabled Section" isDisabled={true}>
          This section is disabled and cannot be interacted with.
        </AccordionItem>
        <AccordionItem title="Another Regular Section">
          This is another regular section that can be expanded and collapsed.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
