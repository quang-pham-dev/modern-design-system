import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './index';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'overline',
      ],
      description: 'The typography variant to use',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    noWrap: {
      control: 'boolean',
      description: 'If true, the text will not wrap',
    },
    gutterBottom: {
      control: 'boolean',
      description: 'If true, the text will have a bottom margin',
    },
    color: {
      control: 'color',
      description: 'The color of the component',
    },
    component: {
      control: 'text',
      description: 'The component used for the root node',
    },
    children: {
      control: 'text',
      description: 'The content of the component',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'This is a Typography component',
  },
};

export const Headings: Story = {
  render: () => (
    <div>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
};

export const TextVariants: Story = {
  render: () => (
    <div>
      <Typography variant="subtitle1">Subtitle 1</Typography>
      <Typography variant="subtitle2">Subtitle 2</Typography>
      <Typography variant="body1">
        Body 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography variant="body2">
        Body 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography variant="caption">Caption text</Typography>
      <Typography variant="overline">Overline text</Typography>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <Typography align="left" gutterBottom>
        Left aligned text - Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.
      </Typography>
      <Typography align="center" gutterBottom>
        Center aligned text - Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.
      </Typography>
      <Typography align="right" gutterBottom>
        Right aligned text - Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.
      </Typography>
      <Typography align="justify" gutterBottom>
        Justified text - Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
    </div>
  ),
};

export const NoWrap: Story = {
  render: () => (
    <div style={{ width: '200px', border: '1px dashed #ccc', padding: '8px' }}>
      <Typography noWrap>
        This text is too long to fit in the container and will be truncated with
        an ellipsis.
      </Typography>
      <Typography style={{ marginTop: '16px' }}>
        This text is too long to fit in the container but will wrap to the next
        line.
      </Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div>
      <Typography color="primary">Primary Color</Typography>
      <Typography color="secondary">Secondary Color</Typography>
      <Typography color="#ff5722">Custom Color (Hex)</Typography>
      <Typography color="rgba(33, 150, 243, 0.7)">
        Custom Color (RGBA)
      </Typography>
    </div>
  ),
};

export const CustomComponent: Story = {
  render: () => (
    <Typography
      component="a"
      {...{ href: 'https://example.com' }}
      {...{ target: '_blank' }}
      color="blue"
    >
      This is a link styled as Typography
    </Typography>
  ),
};
