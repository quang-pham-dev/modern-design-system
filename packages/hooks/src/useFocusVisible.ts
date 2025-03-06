import { useCallback, useRef, type FocusEvent } from 'react';

// Track if we're currently using keyboard navigation
const hadKeyboardEvent = true;
let hadFocusVisibleRecentlyTimeout: number | undefined;

const inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  'datetime-local': true,
};

/**
 * Computes whether the given element should automatically trigger the
 * `focus-visible` class being added, based on the current input type.
 */
function focusTriggersKeyboardModality(node: HTMLElement) {
  const tagName = node.tagName;
  // Cast to HTMLInputElement to access the type property
  const type = (node as HTMLInputElement).type;

  if (
    tagName === 'INPUT' &&
    inputTypesWhitelist[type as keyof typeof inputTypesWhitelist]
  ) {
    return false;
  }

  if (tagName === 'TEXTAREA') {
    return false;
  }

  return true;
}

export function useFocusVisible() {
  const ref = useRef<HTMLElement>(null);
  // Move the variable inside the hook to track state per-instance
  const hadFocusVisibleRecentlyRef = useRef(false);

  const isFocusVisible = useCallback((event: FocusEvent) => {
    const { target } = event;
    try {
      return target.matches(':focus-visible');
    } catch (error) {
      console.log('isFocusVisible', error);
      // Browsers not implementing :focus-visible will throw a SyntaxError
      return (
        hadKeyboardEvent && focusTriggersKeyboardModality(target as HTMLElement)
      );
    }
  }, []);

  const onBlurVisible = useCallback(() => {
    // Use the ref instead of the module-level variable
    hadFocusVisibleRecentlyRef.current = true;

    window.clearTimeout(hadFocusVisibleRecentlyTimeout);
    hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
      hadFocusVisibleRecentlyRef.current = false;
    }, 100);
  }, []);

  return {
    isFocusVisible,
    onBlurVisible,
    focusVisibleRef: ref,
    // Export the ref so it can be used by consumers if needed
    hadFocusVisibleRecently: hadFocusVisibleRecentlyRef,
  };
}
