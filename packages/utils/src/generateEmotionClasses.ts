const PREFIX = 'cds';

/**
 * Generates a unique class name for a component
 */
export const generateClassName = (
  componentName: string,
  className?: string,
) => {
  if (className) {
    return `${PREFIX}-${componentName}-${className}`;
  }
  return `${PREFIX}-${componentName}`;
};

/**
 * Creates class name map for a component
 */
export const generateEmotionClasses = (
  componentName: string,
  classNames: string[] = [],
) => {
  const result: Record<string, string> = {
    root: generateClassName(componentName),
  };

  for (const className of classNames) {
    result[className] = generateClassName(componentName, className);
  }

  return result;
};

export default generateEmotionClasses;
