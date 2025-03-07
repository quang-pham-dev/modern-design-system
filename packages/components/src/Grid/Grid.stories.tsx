import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './index';
import { Box } from '../Box';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    templateColumns: {
      control: 'text',
      description: 'Defines the columns of the grid',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    templateRows: {
      control: 'text',
      description: 'Defines the rows of the grid',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    columnGap: {
      control: 'text',
      description: 'Defines the size of the gap between columns',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    rowGap: {
      control: 'text',
      description: 'Defines the size of the gap between rows',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    gap: {
      control: 'text',
      description: 'Shorthand for both columnGap and rowGap',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    justifyItems: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch'],
      description:
        'Defines how the auto-placed items are aligned along the row axis',
      table: {
        type: { summary: 'start | end | center | stretch' },
        defaultValue: { summary: 'undefined' },
      },
    },
    alignItems: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch'],
      description:
        'Defines how the auto-placed items are aligned along the column axis',
      table: {
        type: { summary: 'start | end | center | stretch' },
        defaultValue: { summary: 'undefined' },
      },
    },
    justifyContent: {
      control: 'select',
      options: [
        'start',
        'end',
        'center',
        'stretch',
        'space-around',
        'space-between',
        'space-evenly',
      ],
      description:
        'Defines how the content is distributed within the grid container along the row axis',
      table: {
        type: {
          summary:
            'start | end | center | stretch | space-around | space-between | space-evenly',
        },
        defaultValue: { summary: 'undefined' },
      },
    },
    alignContent: {
      control: 'select',
      options: [
        'start',
        'end',
        'center',
        'stretch',
        'space-around',
        'space-between',
        'space-evenly',
      ],
      description:
        'Defines how the content is distributed within the grid container along the column axis',
      table: {
        type: {
          summary:
            'start | end | center | stretch | space-around | space-between | space-evenly',
        },
        defaultValue: { summary: 'undefined' },
      },
    },
    templateAreas: {
      control: 'text',
      description: 'Defines named grid areas',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    autoColumns: {
      control: 'text',
      description: 'Defines the number of columns in the grid (auto-fill)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    autoRows: {
      control: 'text',
      description: 'Defines the number of rows in the grid (auto-fill)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    padding: {
      control: 'text',
      description: 'Padding applied to all sides',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    children: {
      control: 'text',
      description: 'The content of the grid container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

// Helper function to create grid items
const createGridItems = (count: number) => {
  return Array.from({ length: count }).map((_, index) => (
    <Box
      key={index.toString()}
      padding="16px"
      backgroundColor={index % 2 === 0 ? '#e0e0e0' : '#f0f0f0'}
      border="1px solid #ccc"
      borderRadius="4px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      Item {index + 1}
    </Box>
  ));
};

export const Default: Story = {
  args: {
    templateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    children: createGridItems(9),
  },
};

export const TwoColumnGrid: Story = {
  args: {
    templateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    children: createGridItems(4),
  },
};

export const VariableColumnSizes: Story = {
  args: {
    templateColumns: '1fr 2fr 1fr',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    children: createGridItems(6),
  },
};

export const DefinedRowsAndColumns: Story = {
  args: {
    templateColumns: 'repeat(3, 1fr)',
    templateRows: 'repeat(2, 100px)',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    children: createGridItems(6),
  },
};

export const DifferentGaps: Story = {
  args: {
    templateColumns: 'repeat(3, 1fr)',
    columnGap: '32px',
    rowGap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    children: createGridItems(9),
  },
};

export const CenteredItems: Story = {
  args: {
    templateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    justifyItems: 'center',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    height: '300px',
    children: Array.from({ length: 9 }).map((_, index) => (
      <Box
        key={index.toString()}
        padding="16px"
        backgroundColor={index % 2 === 0 ? '#e0e0e0' : '#f0f0f0'}
        border="1px solid #ccc"
        borderRadius="4px"
        width="80px"
        height="80px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        Item {index + 1}
      </Box>
    )),
  },
};

export const NamedGridAreas: Story = {
  args: {
    templateAreas: `
      "header header header"
      "sidebar content content"
      "footer footer footer"
    `,
    templateColumns: '200px 1fr 1fr',
    templateRows: 'auto 1fr auto',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    height: '400px',
    children: (
      <>
        <Box
          padding="16px"
          backgroundColor="#2196f3"
          color="white"
          style={{ gridArea: 'header' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Header
        </Box>
        <Box
          padding="16px"
          backgroundColor="#4caf50"
          color="white"
          style={{ gridArea: 'sidebar' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Sidebar
        </Box>
        <Box
          padding="16px"
          backgroundColor="#f5f5f5"
          border="1px solid #ccc"
          style={{ gridArea: 'content' }}
          overflow="auto"
        >
          <h3 style={{ margin: '0 0 16px 0' }}>Main Content</h3>
          <p>
            This is an example of a grid layout with named areas. The
            grid-template-areas property allows you to create a visual
            representation of your grid layout.
          </p>
          <p>
            Each string in the grid-template-areas value represents a row, and
            each word represents a column cell. Repeating a name causes the
            content to span those cells.
          </p>
        </Box>
        <Box
          padding="16px"
          backgroundColor="#ff9800"
          color="white"
          style={{ gridArea: 'footer' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Footer
        </Box>
      </>
    ),
  },
};

export const AutoFillColumns: Story = {
  args: {
    autoColumns: 'minmax(100px, 1fr)',
    templateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '800px',
    children: createGridItems(12),
  },
};

export const DenseGrid: Story = {
  args: {
    templateColumns: 'repeat(4, 1fr)',
    autoRows: 'minmax(50px, auto)',
    gap: '8px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    children: Array.from({ length: 12 }).map((_, index) => {
      // Make some items span multiple columns or rows
      const gridColumn = index % 5 === 0 ? 'span 2' : undefined;
      const gridRow = index % 7 === 0 ? 'span 2' : undefined;

      return (
        <Box
          key={index.toString()}
          padding="16px"
          backgroundColor={index % 2 === 0 ? '#e0e0e0' : '#f0f0f0'}
          border="1px solid #ccc"
          borderRadius="4px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ gridColumn, gridRow }}
        >
          Item {index + 1}
        </Box>
      );
    }),
  },
};

export const ResponsiveGallery: Story = {
  args: {
    templateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '1000px',
    children: Array.from({ length: 9 }).map((_, index) => (
      <Box
        key={index.toString()}
        backgroundColor={index % 2 === 0 ? '#e0e0e0' : '#f0f0f0'}
        borderRadius="4px"
        overflow="hidden"
        boxShadow="0 2px 4px rgba(0,0,0,0.1)"
      >
        <Box
          height="150px"
          backgroundColor={`hsl(${index * 40}, 70%, 65%)`}
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="white"
          style={{ fontWeight: 'bold' }}
        >
          Image {index + 1}
        </Box>
        <Box padding="16px">
          <h4 style={{ margin: '0 0 8px 0' }}>Gallery Item {index + 1}</h4>
          <p style={{ margin: '0', color: '#666' }}>
            Short description for gallery item {index + 1}
          </p>
        </Box>
      </Box>
    )),
  },
};

export const DashboardLayout: Story = {
  args: {
    templateAreas: `
      "header header header"
      "sidebar main main"
      "sidebar widget1 widget2"
      "sidebar widget3 widget4"
    `,
    templateColumns: '250px 1fr 1fr',
    templateRows: 'auto 1fr auto auto',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    height: '600px',
    children: (
      <>
        <Box
          padding="16px"
          backgroundColor="#2196f3"
          color="white"
          style={{ gridArea: 'header' }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Dashboard</div>
          <div>User Profile</div>
        </Box>
        <Box
          padding="16px"
          backgroundColor="#4caf50"
          color="white"
          style={{ gridArea: 'sidebar' }}
          display="flex"
          flexDirection="column"
          gap="16px"
        >
          <div style={{ fontWeight: 'bold', marginBottom: '16px' }}>
            Navigation
          </div>
          {['Dashboard', 'Analytics', 'Reports', 'Users', 'Settings'].map(
            (item, index) => (
              <div key={index.toString()} style={{ padding: '8px 0' }}>
                {item}
              </div>
            ),
          )}
        </Box>
        <Box
          padding="16px"
          backgroundColor="white"
          border="1px solid #ddd"
          borderRadius="4px"
          style={{ gridArea: 'main' }}
        >
          <h3 style={{ margin: '0 0 16px 0' }}>Main Content</h3>
          <p>
            This is the main content area of the dashboard. It typically
            contains charts, tables, or other data visualizations.
          </p>
        </Box>
        {['widget1', 'widget2', 'widget3', 'widget4'].map((area, index) => (
          <Box
            key={area}
            padding="16px"
            backgroundColor="white"
            border="1px solid #ddd"
            borderRadius="4px"
            style={{ gridArea: area }}
          >
            <h4 style={{ margin: '0 0 8px 0' }}>Widget {index + 1}</h4>
            <p style={{ margin: '0', color: '#666' }}>
              {index % 2 === 0
                ? 'Statistics and metrics visualization'
                : 'Recent activity and notifications'}
            </p>
          </Box>
        ))}
      </>
    ),
  },
};

export const CardGrid: Story = {
  args: {
    templateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
    padding: '24px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '1200px',
    children: Array.from({ length: 6 }).map((_, index) => (
      <Box
        key={index.toString()}
        backgroundColor="white"
        borderRadius="8px"
        overflow="hidden"
        boxShadow="0 4px 6px rgba(0,0,0,0.1)"
        display="flex"
        flexDirection="column"
      >
        <Box
          height="180px"
          backgroundColor={`hsl(${index * 60}, 70%, 65%)`}
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="white"
          style={{ fontWeight: 'bold', fontSize: '18px' }}
        >
          Card {index + 1}
        </Box>
        <Box padding="20px" display="flex" flexDirection="column" gap="12px">
          <h3 style={{ margin: '0' }}>Card Title {index + 1}</h3>
          <p style={{ margin: '0', color: '#666' }}>
            This is a card component displayed in a responsive grid layout.
            Cards are versatile containers that can hold various types of
            content.
          </p>
          <Box
            marginTop="12px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <button
              type="button"
              style={{
                padding: '8px 16px',
                backgroundColor: `hsl(${index * 60}, 70%, 65%)`,
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              View Details
            </button>
            <span style={{ color: '#999' }}>Last updated: Today</span>
          </Box>
        </Box>
      </Box>
    )),
  },
};

export const MasonryLayout: Story = {
  args: {
    templateColumns: 'repeat(3, 1fr)',
    autoRows: '20px',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '1000px',
    children: Array.from({ length: 12 }).map((_, index) => {
      // Randomly determine the height of each item to create a masonry effect
      const spanRows = Math.floor(Math.random() * 10) + 5; // Between 5-14 rows

      return (
        <Box
          key={index.toString()}
          backgroundColor={`hsl(${index * 30}, 70%, 75%)`}
          borderRadius="4px"
          padding="16px"
          style={{
            gridRowEnd: `span ${spanRows}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0' }}>Item {index + 1}</h4>
          <p style={{ margin: '0', textAlign: 'center' }}>
            {spanRows > 10
              ? 'Tall content'
              : spanRows > 7
                ? 'Medium content'
                : 'Short content'}
          </p>
        </Box>
      );
    }),
  },
};

export const GridWithOverlappingItems: Story = {
  args: {
    templateColumns: 'repeat(4, 1fr)',
    templateRows: 'repeat(4, 100px)',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '800px',
    children: (
      <>
        <Box
          backgroundColor="#2196f3"
          color="white"
          padding="16px"
          borderRadius="4px"
          style={{ gridArea: '1 / 1 / 3 / 3' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Item 1 (spans 2x2)
        </Box>
        <Box
          backgroundColor="#4caf50"
          color="white"
          padding="16px"
          borderRadius="4px"
          style={{ gridArea: '1 / 3 / 2 / 5' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Item 2 (spans 1x2)
        </Box>
        <Box
          backgroundColor="#ff9800"
          color="white"
          padding="16px"
          borderRadius="4px"
          style={{ gridArea: '2 / 3 / 4 / 5' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Item 3 (spans 2x2)
        </Box>
        <Box
          backgroundColor="#9c27b0"
          color="white"
          padding="16px"
          borderRadius="4px"
          style={{ gridArea: '3 / 1 / 5 / 3' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Item 4 (spans 2x2)
        </Box>
        <Box
          backgroundColor="#e91e63"
          color="white"
          padding="16px"
          borderRadius="4px"
          style={{ gridArea: '4 / 3 / 5 / 5' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Item 5 (spans 1x2)
        </Box>
      </>
    ),
  },
};

export const ResponsiveLayoutWithMediaQueries: Story = {
  render: (args) => {
    // This is a demonstration of how you might use media queries with Grid
    // In a real application, you would use a responsive approach with your styling system
    return (
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <p style={{ marginBottom: '16px' }}>
          Resize the browser window to see the layout change at different
          breakpoints.
        </p>
        <Grid
          {...args}
          // Using emotion's css prop instead of style for media queries
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '16px',
            '@media (min-width: 768px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
            '@media (min-width: 1024px)': {
              gridTemplateColumns: 'repeat(4, 1fr)',
            },
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <Box
              key={index.toString()}
              padding="16px"
              backgroundColor={index % 2 === 0 ? '#e0e0e0' : '#f0f0f0'}
              border="1px solid #ccc"
              borderRadius="4px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100px"
            >
              Item {index + 1}
            </Box>
          ))}
        </Grid>
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          Note: This example demonstrates the concept of responsive layouts. In
          a real application, you would implement this using your styling
          system's media query approach.
        </div>
      </div>
    );
  },
};
