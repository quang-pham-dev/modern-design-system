/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Toast from './Toast';
import { ToastContainer } from './ToastContainer';
import { Button } from '../Button';
import { Box } from '../Box';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'The variant of the toast',
      defaultValue: 'info',
    },
    title: {
      control: 'text',
      description: 'The title of the toast',
    },
    closable: {
      control: 'boolean',
      description: 'If true, the toast will show a close button',
      defaultValue: true,
    },
    duration: {
      control: 'number',
      description: 'The duration in milliseconds the toast should be displayed',
      defaultValue: 5000,
    },
    isOpen: {
      control: 'boolean',
      description: 'If true, the toast will be visible',
      defaultValue: true,
    },
    children: {
      control: 'text',
      description: 'The content of the toast',
    },
  },
};

type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export default meta;
type Story = StoryObj<typeof Toast>;

// Basic Toast
export const Basic: Story = {
  args: {
    children: 'This is a basic toast message',
  },
};

// Toast with Title
export const WithTitle: Story = {
  args: {
    title: 'Toast Title',
    children: 'This is a toast message with a title',
  },
};

// Toast Variants
export const Variants: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="16px">
      <Toast variant="info">This is an info toast</Toast>
      <Toast variant="success">This is a success toast</Toast>
      <Toast variant="warning">This is a warning toast</Toast>
      <Toast variant="error">This is an error toast</Toast>
    </Box>
  ),
};

// Non-closable Toast
export const NonClosable: Story = {
  args: {
    closable: false,
    children: 'This toast cannot be closed manually',
  },
};

// Auto-closing Toast
export const AutoClosing: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Box display="flex" flexDirection="column" gap="16px">
        <Button onClick={() => setIsOpen(true)}>Show Toast</Button>
        {isOpen && (
          <Toast
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            duration={3000}
          >
            This toast will auto-close in 3 seconds
          </Toast>
        )}
      </Box>
    );
  },
};

// Toast with Infinite Duration
export const InfiniteDuration: Story = {
  args: {
    duration: Number.POSITIVE_INFINITY,
    children: 'This toast will not auto-close',
  },
};

// Toast Container with Different Positions
export const ToastPositions: Story = {
  render: () => {
    const [toasts, setToasts] = useState<
      {
        id: number;
        position:
          | 'top-right'
          | 'top-left'
          | 'bottom-right'
          | 'bottom-left'
          | 'top-center'
          | 'bottom-center';
        variant: ToastVariant;
      }[]
    >([]);

    const addToast = (
      position:
        | 'top-right'
        | 'top-left'
        | 'bottom-right'
        | 'bottom-left'
        | 'top-center'
        | 'bottom-center',
      variant: ToastVariant,
    ) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, position, variant }]);

      // Auto remove after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 3000);
    };

    return (
      <Box display="flex" flexDirection="column" gap="16px">
        <Box display="flex" flexWrap="wrap" gap="8px">
          <Button onClick={() => addToast('top-right', 'info')}>
            Top Right
          </Button>
          <Button onClick={() => addToast('top-left', 'success')}>
            Top Left
          </Button>
          <Button onClick={() => addToast('bottom-right', 'warning')}>
            Bottom Right
          </Button>
          <Button onClick={() => addToast('bottom-left', 'error')}>
            Bottom Left
          </Button>
          <Button onClick={() => addToast('top-center', 'info')}>
            Top Center
          </Button>
          <Button onClick={() => addToast('bottom-center', 'success')}>
            Bottom Center
          </Button>
        </Box>

        {/* Toast containers for each position */}
        {(
          [
            'top-right',
            'top-left',
            'bottom-right',
            'bottom-left',
            'top-center',
            'bottom-center',
          ] as const
        ).map((position) => (
          <ToastContainer key={position} position={position}>
            {toasts
              .filter((toast) => toast.position === position)
              .map((toast) => (
                <Toast
                  key={toast.id}
                  variant={toast.variant}
                  onClose={() =>
                    setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                  }
                >
                  Toast in {position} position
                </Toast>
              ))}
          </ToastContainer>
        ))}
      </Box>
    );
  },
};

// Interactive Toast Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [toasts, setToasts] = useState<
      {
        id: number;
        variant: 'info' | 'success' | 'warning' | 'error';
        title?: string;
        message: string;
      }[]
    >([]);

    const addToast = (
      variant: 'info' | 'success' | 'warning' | 'error',
      message: string,
      title?: string,
    ) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, variant, message, title }]);

      // Auto remove after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 5000);
    };

    return (
      <Box display="flex" flexDirection="column" gap="16px">
        <Box display="flex" flexWrap="wrap" gap="8px">
          <Button onClick={() => addToast('info', 'Information message')}>
            Info
          </Button>
          <Button
            onClick={() =>
              addToast('success', 'Operation completed successfully', 'Success')
            }
          >
            Success
          </Button>
          <Button
            onClick={() =>
              addToast(
                'warning',
                'Please be careful with this action',
                'Warning',
              )
            }
          >
            Warning
          </Button>
          <Button
            onClick={() => addToast('error', 'An error occurred', 'Error')}
          >
            Error
          </Button>
        </Box>

        <ToastContainer position="top-right">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              variant={toast.variant}
              title={toast.title}
              onClose={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
            >
              {toast.message}
            </Toast>
          ))}
        </ToastContainer>
      </Box>
    );
  },
};
