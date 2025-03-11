import type { Meta, StoryObj } from '@storybook/react';
import { ToastContainer } from './ToastContainer';
import Toast from './Toast';

const meta: Meta<typeof ToastContainer> = {
  title: 'Feedback/ToastContainer',
  component: ToastContainer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-right',
        'top-left',
        'bottom-right',
        'bottom-left',
        'top-center',
        'bottom-center',
      ],
      description: 'The position of the toast container',
      defaultValue: 'top-right',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToastContainer>;

// Basic ToastContainer
export const Basic: Story = {
  args: {
    position: 'top-right',
    children: (
      <>
        <Toast variant="info">Info toast message</Toast>
        <Toast variant="success">Success toast message</Toast>
        <Toast variant="warning">Warning toast message</Toast>
      </>
    ),
  },
};

// Different Positions
export const Positions: Story = {
  render: () => (
    <>
      <ToastContainer position="top-right">
        <Toast variant="info">Top Right Toast</Toast>
      </ToastContainer>

      <ToastContainer position="top-left">
        <Toast variant="success">Top Left Toast</Toast>
      </ToastContainer>

      <ToastContainer position="bottom-right">
        <Toast variant="warning">Bottom Right Toast</Toast>
      </ToastContainer>

      <ToastContainer position="bottom-left">
        <Toast variant="error">Bottom Left Toast</Toast>
      </ToastContainer>

      <ToastContainer position="top-center">
        <Toast variant="info">Top Center Toast</Toast>
      </ToastContainer>

      <ToastContainer position="bottom-center">
        <Toast variant="success">Bottom Center Toast</Toast>
      </ToastContainer>
    </>
  ),
};

// Multiple Toasts
export const MultipleToasts: Story = {
  render: () => (
    <ToastContainer position="top-right">
      <Toast variant="info">First toast message</Toast>
      <Toast variant="success">Second toast message</Toast>
      <Toast variant="warning">Third toast message</Toast>
      <Toast variant="error">Fourth toast message</Toast>
    </ToastContainer>
  ),
};
