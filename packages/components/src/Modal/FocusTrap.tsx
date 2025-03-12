import { useEffect, useRef } from 'react';

import type React from 'react';

interface FocusTrapProps {
  /**
   * If true, the focus trap is active
   */
  isActive: boolean;
  /**
   * The content of the focus trap
   */
  children: React.ReactNode;
}

export const FocusTrap: React.FC<FocusTrapProps> = ({ isActive, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive) {
      // Store the currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive || !containerRef.current) {
      return undefined;
    }

    // Get all focusable elements
    const focusableElements =
      containerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus the first element when the trap becomes active
    if (firstElement) {
      firstElement.focus();
    }

    // Handle tab key to trap focus
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          // If shift+tab and on first element, move to last element
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus when the trap is deactivated
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isActive]);

  return <div ref={containerRef}>{children}</div>;
};
