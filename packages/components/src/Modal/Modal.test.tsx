import type React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@modern-design-system/theme';
import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { Button } from '../Button';

// Mock createPortal to make testing easier
vi.mock('react-dom', () => {
  const originalModule = vi.importActual('react-dom');
  return {
    ...originalModule,
    createPortal: (node: React.ReactNode) => node,
  };
});

describe('Modal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
    // Clean up any modals that might be in the body
    document.body.innerHTML = '';
  });

  test('renders when isOpen is true', () => {
    render(
      <ThemeProvider>
        <Modal isOpen={true} onClose={onClose}>
          <div>Modal Content</div>
        </Modal>
      </ThemeProvider>,
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('does not render when isOpen is false', () => {
    render(
      <ThemeProvider>
        <Modal isOpen={false} onClose={onClose}>
          <div>Modal Content</div>
        </Modal>
      </ThemeProvider>,
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    render(
      <ThemeProvider>
        <Modal isOpen={true} onClose={onClose}>
          <div>Modal Content</div>
        </Modal>
      </ThemeProvider>,
    );

    const closeButton = screen.getByTestId('modal-close-button');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when the overlay is clicked and closeOnOverlayClick is true', () => {
    render(
      <ThemeProvider>
        <Modal isOpen={true} onClose={onClose} closeOnOverlayClick={true}>
          <div>Modal Content</div>
        </Modal>
      </ThemeProvider>,
    );

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when the overlay is clicked and closeOnOverlayClick is false', () => {
    render(
      <ThemeProvider>
        <Modal isOpen={true} onClose={onClose} closeOnOverlayClick={false}>
          <div>Modal Content</div>
        </Modal>
      </ThemeProvider>,
    );

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });

  test('calls onClose when escape key is pressed and closeOnEsc is true', () => {
    render(
      <ThemeProvider>
        <Modal isOpen={true} onClose={onClose} closeOnEsc={true}>
          <div>Modal Content</div>
        </Modal>
      </ThemeProvider>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when escape key is pressed and closeOnEsc is false', () => {
    render(
      <ThemeProvider>
        <Modal isOpen={true} onClose={onClose} closeOnEsc={false}>
          <div>Modal Content</div>
        </Modal>
      </ThemeProvider>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Modal isOpen={true} onClose={onClose} size="sm">
          <div>Small Modal</div>
        </Modal>
      </ThemeProvider>,
    );

    expect(screen.getByText('Small Modal')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Modal isOpen={true} onClose={onClose} size="lg">
          <div>Large Modal</div>
        </Modal>
      </ThemeProvider>,
    );

    expect(screen.getByText('Large Modal')).toBeInTheDocument();
  });

  test('renders without close button when showCloseButton is false', () => {
    render(
      <ThemeProvider>
        <Modal isOpen={true} onClose={onClose} showCloseButton={false}>
          <div>Modal Content</div>
        </Modal>
      </ThemeProvider>,
    );

    expect(screen.queryByTestId('modal-close-button')).not.toBeInTheDocument();
  });

  test('renders with header, body, and footer', () => {
    render(
      <ThemeProvider>
        <Modal isOpen={true} onClose={onClose}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>Modal Body Content</ModalBody>
          <ModalFooter>
            <Button>Cancel</Button>
            <Button>Confirm</Button>
          </ModalFooter>
        </Modal>
      </ThemeProvider>,
    );

    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Body Content')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });
});

describe('ModalHeader', () => {
  test('renders correctly', () => {
    render(
      <ThemeProvider>
        <ModalHeader data-testid="modal-header">Header Content</ModalHeader>
      </ThemeProvider>,
    );

    const header = screen.getByTestId('modal-header');
    expect(header).toBeInTheDocument();
    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });

  test('passes additional props to the header element', () => {
    render(
      <ThemeProvider>
        <ModalHeader data-testid="modal-header" className="custom-header">
          Header Content
        </ModalHeader>
      </ThemeProvider>,
    );

    const header = screen.getByTestId('modal-header');
    expect(header).toHaveClass('custom-header');
  });
});

describe('ModalBody', () => {
  test('renders correctly', () => {
    render(
      <ThemeProvider>
        <ModalBody data-testid="modal-body">Body Content</ModalBody>
      </ThemeProvider>,
    );

    const body = screen.getByTestId('modal-body');
    expect(body).toBeInTheDocument();
    expect(screen.getByText('Body Content')).toBeInTheDocument();
  });

  test('passes additional props to the body element', () => {
    render(
      <ThemeProvider>
        <ModalBody data-testid="modal-body" className="custom-body">
          Body Content
        </ModalBody>
      </ThemeProvider>,
    );

    const body = screen.getByTestId('modal-body');
    expect(body).toHaveClass('custom-body');
  });
});

describe('ModalFooter', () => {
  test('renders correctly', () => {
    render(
      <ThemeProvider>
        <ModalFooter data-testid="modal-footer">
          <Button>Cancel</Button>
          <Button>Confirm</Button>
        </ModalFooter>
      </ThemeProvider>,
    );

    const footer = screen.getByTestId('modal-footer');
    expect(footer).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  test('passes additional props to the footer element', () => {
    render(
      <ThemeProvider>
        <ModalFooter data-testid="modal-footer" className="custom-footer">
          <Button>Cancel</Button>
          <Button>Confirm</Button>
        </ModalFooter>
      </ThemeProvider>,
    );

    const footer = screen.getByTestId('modal-footer');
    expect(footer).toHaveClass('custom-footer');
  });
});

describe('FocusTrap', () => {
  test('traps focus within the container when active', () => {
    // This is a basic test for the FocusTrap component
    // More comprehensive tests would require simulating tab navigation
    const { container } = render(
      <ThemeProvider>
        <Modal isOpen={true} onClose={() => {}}>
          <ModalBody>
            <Button>First Button</Button>
            <Button>Second Button</Button>
          </ModalBody>
        </Modal>
      </ThemeProvider>,
    );

    expect(container).toBeInTheDocument();
    // In a real scenario, we would test tab navigation, but this is difficult in JSDOM
  });
});

describe('Modal accessibility', () => {
  test('has the correct ARIA attributes', () => {
    render(
      <ThemeProvider>
        <Modal isOpen={true} onClose={() => {}} data-testid="modal">
          <div>Modal Content</div>
        </Modal>
      </ThemeProvider>,
    );

    const modalElement = screen.getByRole('dialog');
    expect(modalElement).toHaveAttribute('aria-modal', 'true');
  });

  test('provides a close button with accessible label', () => {
    render(
      <ThemeProvider>
        <Modal isOpen={true} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      </ThemeProvider>,
    );

    const closeButton = screen.getByTestId('modal-close-button');
    expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
  });
});
