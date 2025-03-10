import styled from '@emotion/styled';
import { css } from '@emotion/react';

import type { Theme } from '@modern-design-system/theme';
import type { SelectSize, SelectVariant } from './types';

export const getSizeStyles = (theme: Theme, size: SelectSize) => {
  const sizeMap = {
    sm: css`
      padding: 8px 12px;
      font-size: ${theme.typography.fontSizes.xs};
    `,
    md: css`
      padding: 10px 14px;
      font-size: ${theme.typography.fontSizes.sm};
    `,
    lg: css`
      padding: 12px 16px;
      font-size: ${theme.typography.fontSizes.base};
    `,
  };

  return sizeMap[size];
};

export const getVariantStyles = (
  theme: Theme,
  variant: SelectVariant,
  error: boolean,
) => {
  const borderColor = error
    ? theme.colors.error.main
    : theme.colors.primary.light;
  const focusBorderColor = error
    ? theme.colors.error.main
    : theme.colors.primary.main;

  const variantMap = {
    outlined: css`
      border: 1px solid ${borderColor};
      background-color: transparent;

      &:focus-within {
        border-color: ${focusBorderColor};
        box-shadow: 0 0 0 2px
          ${error ? theme.colors.error.light : theme.colors.primary.light}20;
      }
    `,
    filled: css`
      border: 1px solid transparent;
      border-bottom: 1px solid ${borderColor};
      background-color: rgba(0, 0, 0, 0.05);

      &:focus-within {
        background-color: rgba(0, 0, 0, 0.02);
        border-bottom-color: ${focusBorderColor};
      }
    `,
    standard: css`
      border: none;
      border-bottom: 1px solid ${borderColor};
      background-color: transparent;
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;

      &:focus-within {
        border-bottom: 2px solid ${focusBorderColor};
        margin-bottom: -1px;
      }
    `,
  };

  return variantMap[variant];
};

export const SelectContainer = styled.div<{
  $size: SelectSize;
  $variant: SelectVariant;
  $error: boolean;
  $fullWidth: boolean;
  $disabled: boolean;
  theme: Theme;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  transition: all 0.2s ease-in-out;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.7 : 1)};
  color: ${({ theme }) => theme.colors.text.primary};

  ${({ theme, $size }) => getSizeStyles(theme, $size)}
  ${({ theme, $variant, $error }) => getVariantStyles(theme, $variant, $error)}
`;

export const SelectValue = styled.div<{
  $hasValue: boolean;
  theme: Theme;
}>`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme, $hasValue }) =>
    $hasValue ? 'inherit' : theme.colors.text.secondary};
  opacity: ${(props) => (props.$hasValue ? 1 : 0.7)};
`;

export const ChevronIcon = styled.div<{
  $isOpen: boolean;
}>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%)
    ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  transition: transform 0.2s ease-in-out;
  pointer-events: none;

  svg {
    display: block;
  }
`;

export const DropdownContainer = styled.div<{
  $width: number;
  theme: Theme;
}>`
  position: absolute;
  top: 100%;
  left: 0;
  width: ${(props) => props.$width}px;
  max-height: 300px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background.default};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 4px;
`;

export const OptionItem = styled.div<{
  $isSelected: boolean;
  $isDisabled: boolean;
  theme: Theme;
}>`
  padding: 10px 14px;
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  background-color: ${(props) =>
    props.$isSelected
      ? `${props.theme.colors.primary.light}20`
      : 'transparent'};
  color: ${(props) =>
    props.$isDisabled
      ? props.theme.colors.text.secondary
      : props.theme.colors.text.primary};
  opacity: ${(props) => (props.$isDisabled ? 0.5 : 1)};

  &:hover {
    background-color: ${(props) =>
      !props.$isDisabled && !props.$isSelected
        ? 'rgba(0, 0, 0, 0.04)'
        : props.$isSelected
          ? `${props.theme.colors.primary.light}20`
          : 'transparent'};
  }
`;
