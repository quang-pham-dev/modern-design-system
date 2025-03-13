/**
 * @file Validation utilities for the design system
 * @module utils/validation
 */

/**
 * Validates an email address format
 *
 * Uses a regular expression to check if the provided string matches
 * standard email format requirements.
 *
 * @param {string} email - The email address to validate
 * @returns {boolean} True if the email format is valid, false otherwise
 *
 * @example
 * // Returns true
 * validateEmail('user@example.com');
 *
 * @example
 * // Returns false
 * validateEmail('invalid-email');
 */
export const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates a password against security requirements
 *
 * Checks if the password meets minimum length requirements and contains
 * required character types (uppercase, lowercase, numbers).
 *
 * @param {string} password - The password to validate
 * @param {number} minLength - The minimum required password length (default: 8)
 * @returns {{ valid: boolean; errors: string[] }} Object containing validation result and error messages
 *
 * @example
 * // Returns { valid: true, errors: [] }
 * validatePassword('Secure123');
 *
 * @example
 * // Returns { valid: false, errors: ['Password must be at least 8 characters', ...] }
 * validatePassword('weak');
 */
export const validatePassword = (
  password: string,
  minLength = 8,
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters`);
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
