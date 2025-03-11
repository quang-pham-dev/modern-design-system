/**
 * Adjusts the alpha (opacity) of a color
 * @param color - The color in hex format (e.g., #ffffff)
 * @param alpha - The alpha value between 0 and 1
 * @returns RGBA color string
 */
export const adjustAlpha = (color: string, alpha: number): string => {
  // Convert hex to RGB
  const r = Number.parseInt(color.slice(1, 3), 16);
  const g = Number.parseInt(color.slice(3, 5), 16);
  const b = Number.parseInt(color.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Lightens a color by a percentage
 * @param color - The color in hex format (e.g., #ffffff)
 * @param amount - The amount to lighten (0-1)
 * @returns Lightened color in hex format
 */
export const lighten = (color: string, amount: number): string => {
  const r = Number.parseInt(color.slice(1, 3), 16);
  const g = Number.parseInt(color.slice(3, 5), 16);
  const b = Number.parseInt(color.slice(5, 7), 16);

  const newR = Math.min(255, Math.round(r + (255 - r) * amount));
  const newG = Math.min(255, Math.round(g + (255 - g) * amount));
  const newB = Math.min(255, Math.round(b + (255 - b) * amount));

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

/**
 * Darkens a color by a percentage
 * @param color - The color in hex format (e.g., #ffffff)
 * @param amount - The amount to darken (0-1)
 * @returns Darkened color in hex format
 */
export const darken = (color: string, amount: number): string => {
  const r = Number.parseInt(color.slice(1, 3), 16);
  const g = Number.parseInt(color.slice(3, 5), 16);
  const b = Number.parseInt(color.slice(5, 7), 16);

  const newR = Math.max(0, Math.round(r * (1 - amount)));
  const newG = Math.max(0, Math.round(g * (1 - amount)));
  const newB = Math.max(0, Math.round(b * (1 - amount)));

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};
