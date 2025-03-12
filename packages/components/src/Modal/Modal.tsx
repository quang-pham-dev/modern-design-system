import { forwardRef, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';
import { FocusTrap } from './FocusTrap';

import type React from 'react';
import type { SerializedStyles } from '@emotion/react';
import type { Theme } from '@modern-design-system/theme';

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, the modal is open
   */
  isOpen: boolean;
  /**
   * Callback fired when the modal is requested to be closed
   */
  onClose: () => void;
  /**
   * The size of the modal
   * @default 'md'
   */
  size?: ModalSize;
  /**
   * If true, the modal will close when the overlay is clicked
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * If true, the modal will close when the escape key is pressed
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * If true, scrolling will be disabled on the body while the modal is open
   * @default true
   */
  blockScrollOnMount?: boolean;
  /**
   * If true, a close button will be shown in the upper right corner
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * If true, the modal will be centered vertically
   * @default true
   */
  isCentered?: boolean;
  /**
   * The z-index of the modal
   * @default 1000
   */
  zIndex?: number;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
  /**
   * The content of the modal
   */
  children: React.ReactNode;
}

const sizeMap: Record<ModalSize, string> = {
  xs: '20rem', // 320px
  sm: '30rem', // 480px
  md: '40rem', // 640px
  lg: '50rem', // 800px
  xl: '60rem', // 960px
  full: '100%',
};

const ModalOverlay = styled.div<{
  isOpen: boolean;
  isCentered: boolean;
  zIndex: number;
  theme: Theme;
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) =>
    getColor(theme, ['blackAlpha', '600'], 'rgba(0, 0, 0, 0.6)')};
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: ${({ isCentered }: { isCentered: boolean }) =>
    isCentered ? 'center' : 'flex-start'};
  justify-content: center;
  z-index: ${({ zIndex }) => zIndex};
  overflow-y: auto;
  padding: 3.75rem 1rem;
`;

const ModalContent = styled.div<{
  size: ModalSize;
  theme: Theme;
}>`
  background-color: ${({ theme }) => getColor(theme, ['white'], '#ffffff')};
  border-radius: ${({ theme }) => theme.borderRadius.md || '0.375rem'};
  box-shadow: ${({ theme }) =>
    theme.shadows.lg ||
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'};
  width: 100%;
  max-width: ${({ size }) => sizeMap[size]};
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 7.5rem);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }: { theme: Theme }) =>
    getColor(theme, ['gray', '500'], '#718096')};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }: { theme: Theme }) =>
      getColor(theme, ['gray', '100'], '#EDF2F7')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px
      ${({ theme }: { theme: Theme }) =>
        getColor(theme, ['blue', '100'], '#EBF8FF')};
  }
`;

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      size = 'md',
      closeOnOverlayClick = true,
      closeOnEsc = true,
      blockScrollOnMount = true,
      showCloseButton = true,
      isCentered = true,
      zIndex = 1000,
      children,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const overlayRef = useRef<HTMLDivElement>(null);

    // Handle ESC key press
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && closeOnEsc && isOpen) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen, closeOnEsc, onClose]);

    // Handle body scroll lock
    useEffect(() => {
      if (blockScrollOnMount && isOpen) {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
          document.body.style.overflow = originalStyle;
        };
      }
      return undefined;
    }, [isOpen, blockScrollOnMount]);

    // Handle overlay click
    const handleOverlayClick = (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === overlayRef.current) {
        onClose();
      }
    };

    const modalContent = (
      <ModalOverlay
        ref={overlayRef}
        isOpen={isOpen}
        zIndex={zIndex}
        theme={theme}
        isCentered={isCentered}
        onClick={handleOverlayClick}
        data-testid="modal-overlay"
      >
        <FocusTrap isActive={isOpen}>
          <ModalContent
            ref={ref}
            as="dialog"
            size={size}
            theme={theme}
            aria-modal="true"
            {...props}
          >
            {showCloseButton && (
              <CloseButton
                onClick={onClose}
                aria-label="Close modal"
                theme={theme}
                data-testid="modal-close-button"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>close</title>
                  <path
                    d="M1 1L11 11M1 11L11 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </CloseButton>
            )}
            {children}
          </ModalContent>
        </FocusTrap>
      </ModalOverlay>
    );

    return isOpen ? createPortal(modalContent, document.body) : null;
  },
);

Modal.displayName = 'Modal';
