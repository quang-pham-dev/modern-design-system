import styled from '@emotion/styled';

import type React from 'react';
import type { ToastPosition } from './Toast';

export interface ToastContainerProps {
  /**
   * The position of the toast container
   * @default 'top-right'
   */
  position?: ToastPosition;
  /**
   * The children of the toast container
   */
  children: React.ReactNode;
}

const positionStyles: Record<ToastPosition, string> = {
  'top-right': `
    top: 0;
    right: 0;
    align-items: flex-end;
  `,
  'top-left': `
    top: 0;
    left: 0;
    align-items: flex-start;
  `,
  'bottom-right': `
    bottom: 0;
    right: 0;
    align-items: flex-end;
    flex-direction: column-reverse;
  `,
  'bottom-left': `
    bottom: 0;
    left: 0;
    align-items: flex-start;
    flex-direction: column-reverse;
  `,
  'top-center': `
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  `,
  'bottom-center': `
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
    flex-direction: column-reverse;
  `,
};

const Container = styled.div<{ position: ToastPosition }>`
  position: fixed;
  z-index: 1500;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow-y: auto;
  padding: 16px;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }

  ${({ position }) => positionStyles[position]}
`;

export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'top-right',
  children,
}) => {
  return <Container position={position}>{children}</Container>;
};

ToastContainer.displayName = 'ToastContainer';

export default ToastContainer;
