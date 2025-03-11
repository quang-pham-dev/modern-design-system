import {
  forwardRef,
  useState,
  useEffect,
  Children,
  isValidElement,
  useRef,
} from 'react';
import styled from '@emotion/styled';
import { css, type SerializedStyles } from '@emotion/react';

import { useTheme } from '@modern-design-system/hooks';
import { getColor } from '@modern-design-system/utils';

import type React from 'react';
import type { Theme } from '@modern-design-system/theme';

export type TabsVariant = 'filled' | 'outlined' | 'text';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsSize = 'sm' | 'md' | 'lg';

type SxProp = React.CSSProperties | SerializedStyles | Record<string, unknown>;

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * The currently selected tab index
   */
  value?: number;
  /**
   * Callback fired when a tab is clicked
   */
  onChange?: (event: React.SyntheticEvent, value: number) => void;
  /**
   * The variant of the tabs
   * @default 'filled'
   */
  variant?: TabsVariant;
  /**
   * The orientation of the tabs
   * @default 'horizontal'
   */
  orientation?: TabsOrientation;
  /**
   * The size of the tabs
   * @default 'md'
   */
  size?: TabsSize;
  /**
   * If true, the tabs will take up the full width of their container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * If true, the tabs will be centered
   * @default false
   */
  centered?: boolean;
  /**
   * The color of the indicator
   * @default 'primary'
   */
  indicatorColor?: string;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: SxProp;
  /**
   * The content of the component
   */
  children: React.ReactNode;
}

export interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, the tab will be disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * The label for the tab
   */
  label: React.ReactNode;
  /**
   * The value of the tab
   */
  value?: number;
  /**
   * The icon to display before the label
   */
  icon?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The value of the tab panel
   */
  value: number;
  /**
   * The index of the tab panel
   */
  index: number;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles
   */
  sx?: React.CSSProperties | SerializedStyles | Record<string, unknown>;
  /**
   * The content of the component
   */
  children: React.ReactNode;
}

const TabsContainer = styled.div<{
  orientation: TabsOrientation;
  theme: Theme;
  fullWidth: boolean;
  centered: boolean;
}>`
  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === 'vertical' ? 'column' : 'row'};
  position: relative;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  justify-content: ${({ centered, fullWidth }) => {
    if (fullWidth) return 'space-between';
    if (centered) return 'center';
    return 'flex-start';
  }};
  border-bottom: ${({ orientation, theme }) =>
    orientation === 'horizontal'
      ? `1px solid ${getColor(theme, ['grey', '200'], '#e0e0e0')}`
      : 'none'};
  border-right: ${({ orientation, theme }) =>
    orientation === 'vertical'
      ? `1px solid ${getColor(theme, ['grey', '200'], '#e0e0e0')}`
      : 'none'};
`;

const TabsIndicator = styled.span<{
  orientation: TabsOrientation;
  position: number;
  tabWidth: number;
  tabHeight: number;
  indicatorColor: string;
  theme: Theme;
}>`
  position: absolute;
  height: ${({ orientation }) =>
    orientation === 'horizontal' ? '2px' : '100%'};
  width: ${({ orientation, tabWidth }) =>
    orientation === 'horizontal' ? `${tabWidth}px` : '2px'};
  bottom: ${({ orientation }) => (orientation === 'horizontal' ? '0' : 'auto')};
  left: ${({ orientation, position }) =>
    orientation === 'horizontal' ? `${position}px` : '0'};
  top: ${({ orientation, position }) =>
    orientation === 'vertical' ? `${position}px` : 'auto'};
  background-color: ${({ indicatorColor, theme }) =>
    getColor(theme, [indicatorColor, 'main'], indicatorColor)};
  transition: all 0.3s ease;
`;

const getTabStyles = (
  variant: TabsVariant,
  size: TabsSize,
  disabled: boolean,
  selected: boolean,
  theme: Theme,
) => {
  const baseStyles = css`
    padding: ${size === 'sm'
      ? '8px 12px'
      : size === 'md'
        ? '12px 16px'
        : '16px 24px'};
    font-size: ${size === 'sm'
      ? '0.875rem'
      : size === 'md'
        ? '1rem'
        : '1.125rem'};
    font-weight: ${selected ? '600' : '400'};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    opacity: ${disabled ? 0.5 : 1};
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      background-color: ${disabled
        ? 'transparent'
        : getColor(theme, ['grey', '100'], '#f5f5f5')};
    }
  `;

  if (variant === 'filled') {
    return css`
      ${baseStyles}
      background-color: ${selected
        ? getColor(theme, ['primary', '50'], '#e3f2fd')
        : 'transparent'};
      color: ${selected
        ? getColor(theme, ['primary', 'main'], '#1976d2')
        : getColor(theme, ['grey', '700'], '#616161')};
    `;
  }

  if (variant === 'outlined') {
    return css`
      ${baseStyles}
      border: 1px solid ${getColor(theme, ['grey', '200'], '#e0e0e0')};
      border-bottom: ${selected
        ? 'none'
        : `1px solid ${getColor(theme, ['grey', '200'], '#e0e0e0')}`};
      border-radius: 4px 4px 0 0;
      margin-bottom: -1px;
      color: ${selected
        ? getColor(theme, ['primary', 'main'], '#1976d2')
        : getColor(theme, ['grey', '700'], '#616161')};
    `;
  }

  // text variant
  return css`
    ${baseStyles}
    color: ${selected
      ? getColor(theme, ['primary', 'main'], '#1976d2')
      : getColor(theme, ['grey', '700'], '#616161')};
  `;
};

const TabItem = styled.div<{
  variant: TabsVariant;
  size: TabsSize;
  disabled: boolean;
  selected: boolean;
  theme: Theme;
  fullWidth: boolean;
}>`
  ${({ variant, size, disabled, selected, theme }) =>
    getTabStyles(variant, size, disabled, selected, theme)}
  flex: ${({ fullWidth }) => (fullWidth ? 1 : 'none')};
  text-align: ${({ fullWidth }) => (fullWidth ? 'center' : 'left')};
`;

const TabPanelContainer = styled.div<{
  hidden: boolean;
}>`
  padding: 16px;
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};
`;

export const Tab = forwardRef<HTMLDivElement, TabProps>(
  ({ label, icon, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </div>
    );
  },
);

Tab.displayName = 'Tab';

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ children, value, index, ...props }, ref) => {
    const hidden = value !== index;

    return (
      <TabPanelContainer
        ref={ref}
        role="tabpanel"
        hidden={hidden}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...props}
      >
        {!hidden && children}
      </TabPanelContainer>
    );
  },
);

TabPanel.displayName = 'TabPanel';

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      children,
      value = 0,
      onChange,
      variant = 'filled',
      orientation = 'horizontal',
      size = 'md',
      fullWidth = false,
      centered = false,
      indicatorColor = 'primary',
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const [selectedTab, setSelectedTab] = useState(value);
    const [indicatorPos, setIndicatorPos] = useState(0);
    const [tabWidth, setTabWidth] = useState(0);
    const [tabHeight, setTabHeight] = useState(0);
    const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
      setSelectedTab(value);
    }, [value]);

    useEffect(() => {
      if (tabRefs.current[selectedTab]) {
        const tabElement = tabRefs.current[selectedTab];
        if (orientation === 'horizontal') {
          setIndicatorPos(tabElement?.offsetLeft || 0);
          setTabWidth(tabElement?.offsetWidth || 0);
        } else {
          setIndicatorPos(tabElement?.offsetTop || 0);
          setTabHeight(tabElement?.offsetHeight || 0);
        }
      }
    }, [selectedTab, orientation]);

    const handleTabClick = (event: React.SyntheticEvent, index: number) => {
      if (onChange) {
        onChange(event, index);
      } else {
        setSelectedTab(index);
      }
    };

    const childrenArray = Children.toArray(children);
    const tabs = childrenArray.filter(
      (child) => isValidElement(child) && child.type === Tab,
    );

    // Ensure tabRefs has enough slots for all tabs
    if (tabRefs.current.length !== tabs.length) {
      tabRefs.current = Array(tabs.length).fill(null);
    }

    return (
      <div ref={ref} {...props}>
        <TabsContainer
          role="tablist"
          aria-orientation={orientation}
          orientation={orientation}
          theme={theme}
          fullWidth={fullWidth}
          centered={centered}
        >
          {tabs.map((tab, index) => {
            if (!isValidElement(tab)) return null;

            const isSelected = selectedTab === index;
            const tabProps = tab.props as TabProps;

            return (
              <TabItem
                key={`tabItem-${index.toString()}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`tabpanel-${index}`}
                id={`tab-${index}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={(e) => !tabProps.disabled && handleTabClick(e, index)}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                variant={variant}
                size={size}
                disabled={!!tabProps.disabled}
                selected={isSelected}
                theme={theme}
                fullWidth={fullWidth}
              >
                {tabProps.icon && <span>{tabProps.icon}</span>}
                <span>{tabProps.label}</span>
              </TabItem>
            );
          })}
          <TabsIndicator
            orientation={orientation}
            position={indicatorPos}
            tabWidth={tabWidth}
            tabHeight={tabHeight}
            indicatorColor={indicatorColor}
            theme={theme}
          />
        </TabsContainer>
        {childrenArray.filter(
          (child) => isValidElement(child) && child.type === TabPanel,
        )}
      </div>
    );
  },
);

Tabs.displayName = 'Tabs';
