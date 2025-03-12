/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Modal, type ModalSize } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';

const meta = {
  title: 'Overlay/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'The size of the modal',
    },
    isOpen: {
      control: 'boolean',
      description: 'If true, the modal is open',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'If true, the modal will close when the overlay is clicked',
    },
    closeOnEsc: {
      control: 'boolean',
      description:
        'If true, the modal will close when the escape key is pressed',
    },
    blockScrollOnMount: {
      control: 'boolean',
      description:
        'If true, scrolling will be disabled on the body while the modal is open',
    },
    showCloseButton: {
      control: 'boolean',
      description:
        'If true, a close button will be shown in the upper right corner',
    },
    isCentered: {
      control: 'boolean',
      description: 'If true, the modal will be centered vertically',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Modal
export const Basic: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEsc: true,
    blockScrollOnMount: true,
    showCloseButton: true,
    isCentered: true,
    children: 'Modal Content',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={onClose}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <p>
              This is the content of the modal. You can put any content here.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

// Different Sizes
export const Sizes: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEsc: true,
    blockScrollOnMount: true,
    showCloseButton: true,
    isCentered: true,
    children: 'Modal Content',
  },
  render: () => {
    const [size, setSize] = useState<ModalSize>('md');
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = (selectedSize: typeof size) => {
      setSize(selectedSize);
      setIsOpen(true);
    };
    const onClose = () => setIsOpen(false);

    return (
      <>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button onClick={() => onOpen('xs')}>XS Modal</Button>
          <Button onClick={() => onOpen('sm')}>SM Modal</Button>
          <Button onClick={() => onOpen('md')}>MD Modal</Button>
          <Button onClick={() => onOpen('lg')}>LG Modal</Button>
          <Button onClick={() => onOpen('xl')}>XL Modal</Button>
          <Button onClick={() => onOpen('full')}>Full Modal</Button>
        </div>
        <Modal isOpen={isOpen} onClose={onClose} size={size}>
          <ModalHeader>{size.toUpperCase()} Modal</ModalHeader>
          <ModalBody>
            <p>This is a {size} sized modal.</p>
            <p>The content will adjust based on the modal size.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

// Modal with Scrollable Content
export const ScrollableContent: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEsc: true,
    blockScrollOnMount: true,
    showCloseButton: true,
    isCentered: true,
    children: 'Modal Content',
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
      <>
        <Button onClick={onOpen}>Open Scrollable Modal</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalHeader>Scrollable Content</ModalHeader>
          <ModalBody>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i.toString()}>
                This is paragraph {i + 1}. Adding lots of content to demonstrate
                scrolling. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat
                molestie vehicula.
              </p>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

// Modal without Close Button
export const WithoutCloseButton: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEsc: true,
    blockScrollOnMount: true,
    showCloseButton: false,
    isCentered: true,
    children: 'Modal Content',
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
      <>
        <Button onClick={onOpen}>Open Modal without Close Button</Button>
        <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
          <ModalHeader>No Close Button</ModalHeader>
          <ModalBody>
            <p>This modal doesn't have a close button in the corner.</p>
            <p>
              You can still close it using the buttons below or by pressing ESC.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

// Modal with Form
export const WithForm: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEsc: true,
    blockScrollOnMount: true,
    showCloseButton: true,
    isCentered: true,
    children: 'Modal Content',
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
      <>
        <Button onClick={onOpen}>Open Form Modal</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalHeader>Contact Form</ModalHeader>
          <ModalBody>
            <form
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div>
                <label
                  htmlFor="name"
                  style={{ display: 'block', marginBottom: '4px' }}
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #e2e8f0',
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  style={{ display: 'block', marginBottom: '4px' }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #e2e8f0',
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  style={{ display: 'block', marginBottom: '4px' }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #e2e8f0',
                  }}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>Submit</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
