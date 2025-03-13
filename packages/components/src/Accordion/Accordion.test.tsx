import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@modern-design-system/theme';
import { Accordion } from './Accordion';
import { AccordionItem } from './AccordionItem';

describe('Accordion', () => {
  const renderAccordion = (props = {}) => {
    return render(
      <ThemeProvider>
        <Accordion {...props}>
          <AccordionItem title="Section 1">Content for section 1</AccordionItem>
          <AccordionItem title="Section 2">Content for section 2</AccordionItem>
          <AccordionItem title="Section 3">Content for section 3</AccordionItem>
        </Accordion>
      </ThemeProvider>,
    );
  };

  test('renders correctly', () => {
    renderAccordion();

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
  });

  test('expands and collapses items when clicked', async () => {
    renderAccordion();

    // Initially, all content should be hidden
    const content1 = screen.queryByText('Content for section 1');
    expect(content1?.closest('[aria-hidden="true"]')).toBeInTheDocument();

    // Click on the first section header
    fireEvent.click(screen.getByText('Section 1'));

    // The first section content should now be visible
    await waitFor(() => {
      expect(
        screen
          .getByText('Content for section 1')
          .closest('[aria-hidden="true"]'),
      ).toBeFalsy();
    });

    // Click on the first section header again to collapse
    fireEvent.click(screen.getByText('Section 1'));

    // The first section content should be hidden again
    await waitFor(() => {
      expect(
        screen
          .getByText('Content for section 1')
          .closest('[aria-hidden="true"]'),
      ).toBeInTheDocument();
    });
  });

  test('only one item can be expanded at a time by default', async () => {
    renderAccordion();

    // Click on the first section header
    fireEvent.click(screen.getByText('Section 1'));

    // The first section content should be visible
    await waitFor(() => {
      expect(
        screen
          .getByText('Content for section 1')
          .closest('[aria-hidden="true"]'),
      ).toBeFalsy();
    });

    // Click on the second section header
    fireEvent.click(screen.getByText('Section 2'));

    // The second section content should be visible
    await waitFor(() => {
      expect(
        screen
          .getByText('Content for section 2')
          .closest('[aria-hidden="true"]'),
      ).toBeFalsy();
    });

    // The first section content should now be hidden
    await waitFor(() => {
      expect(
        screen
          .getByText('Content for section 1')
          .closest('[aria-hidden="true"]'),
      ).toBeInTheDocument();
    });
  });

  test('allows multiple items to be expanded when allowMultiple is true', async () => {
    renderAccordion({ allowMultiple: true });

    // Click on the first section header
    fireEvent.click(screen.getByText('Section 1'));

    // The first section content should be visible
    await waitFor(() => {
      expect(
        screen
          .getByText('Content for section 1')
          .closest('[aria-hidden="true"]'),
      ).toBeFalsy();
    });

    // Click on the second section header
    fireEvent.click(screen.getByText('Section 2'));

    // Both section contents should be visible
    await waitFor(() => {
      expect(
        screen
          .getByText('Content for section 1')
          .closest('[aria-hidden="true"]'),
      ).toBeFalsy();
      expect(
        screen
          .getByText('Content for section 2')
          .closest('[aria-hidden="true"]'),
      ).toBeFalsy();
    });
  });

  test('respects defaultExpandedItems prop', () => {
    renderAccordion({ defaultExpandedItems: [1] });

    // The second section content should be visible by default
    expect(
      screen.getByText('Content for section 2').closest('[aria-hidden="true"]'),
    ).toBeFalsy();

    // The first section content should be hidden
    expect(
      screen.getByText('Content for section 1').closest('[aria-hidden="true"]'),
    ).toBeInTheDocument();
  });

  test('disabled items cannot be expanded', async () => {
    render(
      <ThemeProvider>
        <Accordion>
          <AccordionItem title="Regular Section">
            Content for regular section
          </AccordionItem>
          <AccordionItem title="Disabled Section" isDisabled={true}>
            Content for disabled section
          </AccordionItem>
        </Accordion>
      </ThemeProvider>,
    );

    // Click on the disabled section header
    fireEvent.click(screen.getByText('Disabled Section'));

    // The disabled section content should remain hidden
    await waitFor(() => {
      expect(
        screen
          .getByText('Content for disabled section')
          .closest('[aria-hidden="true"]'),
      ).toBeInTheDocument();
    });
  });

  test('renders with different variants', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Accordion variant="outlined">
          <AccordionItem title="Section 1">Content for section 1</AccordionItem>
        </Accordion>
      </ThemeProvider>,
    );

    // Test filled variant
    rerender(
      <ThemeProvider>
        <Accordion variant="filled">
          <AccordionItem title="Section 1">Content for section 1</AccordionItem>
        </Accordion>
      </ThemeProvider>,
    );

    // Test elevated variant
    rerender(
      <ThemeProvider>
        <Accordion variant="elevated">
          <AccordionItem title="Section 1">Content for section 1</AccordionItem>
        </Accordion>
      </ThemeProvider>,
    );

    // Just checking that the component renders without errors
    expect(screen.getByText('Section 1')).toBeInTheDocument();
  });

  test('renders with different sizes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Accordion size="sm">
          <AccordionItem title="Section 1">Content for section 1</AccordionItem>
        </Accordion>
      </ThemeProvider>,
    );

    // Test medium size
    rerender(
      <ThemeProvider>
        <Accordion size="md">
          <AccordionItem title="Section 1">Content for section 1</AccordionItem>
        </Accordion>
      </ThemeProvider>,
    );

    // Test large size
    rerender(
      <ThemeProvider>
        <Accordion size="lg">
          <AccordionItem title="Section 1">Content for section 1</AccordionItem>
        </Accordion>
      </ThemeProvider>,
    );

    // Just checking that the component renders without errors
    expect(screen.getByText('Section 1')).toBeInTheDocument();
  });
});
