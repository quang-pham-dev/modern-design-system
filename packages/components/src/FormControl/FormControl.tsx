import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useState,
} from 'react';
import styled from '@emotion/styled';

import { useTheme } from '@modern-design-system/hooks';
import { Typography } from '../Typography';
import { Box } from '../Box';

import type { Theme } from '@modern-design-system/theme';

/**
 * Available form control sizes
 */
export type FormControlSize = 'sm' | 'md' | 'lg';

/**
 * FormControl component props interface
 */
export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The label for the form control
   */
  label?: React.ReactNode;

  /**
   * The helper text for the form control
   */
  helperText?: React.ReactNode;

  /**
   * The error message for the form control
   */
  errorMessage?: React.ReactNode;

  /**
   * If true, the form control will be in an error state
   * @default false
   */
  error?: boolean;

  /**
   * If true, the form control will be required
   * @default false
   */
  required?: boolean;

  /**
   * If true, the form control will be disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * The size of the form control
   * @default 'md'
   */
  size?: FormControlSize;

  /**
   * The ID to use for the form control
   * If not provided, a unique ID will be generated
   */
  id?: string;

  /**
   * The content of the form control
   */
  children: React.ReactNode;

  /**
   * Ref forwarded to the root element
   */
  ref?: React.Ref<HTMLDivElement>;
}

const FormControlContainer = styled.div<{
  $disabled: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  opacity: ${(props) => (props.$disabled ? 0.7 : 1)};
`;

// Add these helper functions after the styled components declarations

// Helper function to determine text color based on state
const getTextColor = (props: {
  $disabled: boolean;
  $error: boolean;
  theme: Theme;
}) => {
  if (props.$disabled) {
    return props.theme.colors.text.secondary;
  }

  if (props.$error) {
    return props.theme.colors.error.main;
  }

  return props.theme.colors.text.primary;
};

// Helper function to determine required asterisk color
const getRequiredAsteriskColor = (props: { $error: boolean; theme: Theme }) => {
  return props.$error
    ? props.theme.colors.error.main
    : props.theme.colors.primary.main;
};

// Update the LabelContainer styled component
const LabelContainer = styled.div<{
  $required: boolean;
  $error: boolean;
  $disabled: boolean;
  theme: Theme;
}>`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  color: ${getTextColor};

  &::after {
    content: ${(props) => (props.$required ? '"*"' : '""')};
    color: ${getRequiredAsteriskColor};
    margin-left: 4px;
  }
`;

const StyledLabel = styled.label`
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
`;

const HelperTextContainer = styled.div<{
  $error: boolean;
  theme: Theme;
}>`
  margin-top: 6px;
  color: ${(props) =>
    props.$error
      ? props.theme.colors.error.main
      : props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.typography.fontSizes.xs};
`;

/**
 * FormControl Component
 *
 * A wrapper component for form controls that provides consistent styling and behavior.
 *
 * @example
 * ```tsx
 * <FormControl label="Email" required>
 *   <Input placeholder="Enter your email" />
 * </FormControl>
 *
 * <FormControl label="Message" helperText="Optional message" error={!!error} errorMessage={error}>
 *   <Textarea placeholder="Enter your message" />
 * </FormControl>
 * ```
 */
const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      error = false,
      required = false,
      disabled = false,
      size = 'md',
      id,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    // Generate a unique ID if one is not provided
    const [generatedId] = useState(
      () => id ?? `form-control-${Math.random().toString(36).substring(2, 9)}`,
    );
    const controlId = id ?? generatedId;

    // Determine which message to show (error message takes precedence)
    const displayMessage = error && errorMessage ? errorMessage : helperText;

    // Clone children to pass down props
    const childrenWithProps = Children.map(children, (child) => {
      if (isValidElement(child)) {
        const childProps = {
          error,
          disabled,
          size,
          id: controlId,
          'aria-required': required,
          'aria-invalid': error,
          'aria-describedby': displayMessage
            ? `${controlId}-helper`
            : undefined,
          ...(typeof child.props === 'object' ? child.props : {}),
        };
        return cloneElement(child, childProps);
      }
      return child;
    });

    return (
      <FormControlContainer
        ref={ref}
        className={className}
        $disabled={disabled}
        {...props}
      >
        {label && (
          <LabelContainer
            $required={required}
            $error={error}
            $disabled={disabled}
            theme={theme}
          >
            <Typography variant="label" color="inherit">
              <StyledLabel htmlFor={controlId}>{label}</StyledLabel>
            </Typography>
          </LabelContainer>
        )}
        <Box>{childrenWithProps}</Box>
        {displayMessage && (
          <HelperTextContainer
            $error={error}
            theme={theme}
            id={`${controlId}-helper`}
          >
            {displayMessage}
          </HelperTextContainer>
        )}
      </FormControlContainer>
    );
  },
);

FormControl.displayName = 'FormControl';
export default FormControl;
