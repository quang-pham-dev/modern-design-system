import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import { CardHeader, CardContent, CardMedia, CardActions } from './index';
import { Button } from '../Button';
import { Avatar } from '../Avatar';
import { Typography } from '../Typography';
import { Box } from '../Box';
import { Grid } from '../Grid';

const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'elevated', 'filled'],
      description: 'The variant of the card',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the card',
    },
    fullWidth: {
      control: 'boolean',
      description:
        'If true, the card will take up the full width of its container',
    },
    noPadding: {
      control: 'boolean',
      description: 'If true, the card will have no padding',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic Card
export const Basic: Story = {
  args: {
    children: (
      <CardContent>
        <Typography>This is a basic card</Typography>
      </CardContent>
    ),
  },
};

// Card Variants
export const Variants: Story = {
  render: () => (
    <Box display="flex" gap="24px" flexDirection="column">
      <Card variant="elevated">
        <CardContent>
          <Typography>Elevated Card (Default)</Typography>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Typography>Outlined Card</Typography>
        </CardContent>
      </Card>
      <Card variant="filled">
        <CardContent>
          <Typography>Filled Card</Typography>
        </CardContent>
      </Card>
    </Box>
  ),
};

// Card Sizes
export const Sizes: Story = {
  render: () => (
    <Box display="flex" gap="24px" flexDirection="column">
      <Card size="sm">
        <CardContent>
          <Typography>Small Card</Typography>
        </CardContent>
      </Card>
      <Card size="md">
        <CardContent>
          <Typography>Medium Card (Default)</Typography>
        </CardContent>
      </Card>
      <Card size="lg">
        <CardContent>
          <Typography>Large Card</Typography>
        </CardContent>
      </Card>
    </Box>
  ),
};

// Card with Header
export const WithHeader: Story = {
  render: () => (
    <Card>
      <CardHeader
        avatar={<Avatar>JD</Avatar>}
        action={
          <Button variant="text" size="sm">
            More
          </Button>
        }
        title="Card Title"
        subtitle="Card Subtitle"
      />
      <CardContent>
        <Typography>Card content goes here</Typography>
      </CardContent>
    </Card>
  ),
};

// Card with Media
export const WithMedia: Story = {
  render: () => (
    <Card>
      <CardMedia
        image="https://source.unsplash.com/random/800x400?nature"
        height={200}
        alt="Random nature image"
      />
      <CardContent>
        <Typography variant="h6">Nature</Typography>
        <Typography>A beautiful landscape captured in the wild.</Typography>
      </CardContent>
    </Card>
  ),
};

// Card with Actions
export const WithActions: Story = {
  render: () => (
    <Card>
      <CardContent>
        <Typography>Card content with actions</Typography>
      </CardContent>
      <CardActions>
        <Button variant="text">Cancel</Button>
        <Button>Submit</Button>
      </CardActions>
    </Card>
  ),
};

// Full Width Card
export const FullWidth: Story = {
  render: () => (
    <Card fullWidth>
      <CardContent>
        <Typography>
          This card takes up the full width of its container
        </Typography>
      </CardContent>
    </Card>
  ),
};

// Complex Card Example
export const ComplexExample: Story = {
  render: () => (
    <Card>
      <CardMedia
        image="https://source.unsplash.com/random/800x400?food"
        height={240}
        alt="Random food image"
      />
      <CardHeader
        avatar={<Avatar>RC</Avatar>}
        action={
          <Button variant="text" size="sm">
            Share
          </Button>
        }
        title="Delicious Recipe"
        subtitle="By Chef John Doe • 15 min read"
      />
      <CardContent>
        <Typography>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
        <Box display="flex" gap="8px">
          <Typography variant="caption" color="text.secondary">
            5.0 ★★★★★
          </Typography>
          <Typography variant="caption" color="text.secondary">
            •
          </Typography>
          <Typography variant="caption" color="text.secondary">
            2.3k Reviews
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="text">Save for Later</Button>
        <Button>View Recipe</Button>
      </CardActions>
    </Card>
  ),
};

// Interactive Card
export const Interactive: Story = {
  render: () => (
    <Box display="flex" gap="16px">
      <Card
        sx={{
          cursor: 'pointer',
          maxWidth: '200px',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        }}
      >
        <CardMedia
          image="https://source.unsplash.com/random/400x400?tech"
          height={120}
          alt="Random tech image"
        />
        <CardContent>
          <Typography variant="h6">Interactive Card</Typography>
          <Typography variant="body2">Hover to see the effect</Typography>
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{
          cursor: 'pointer',
          maxWidth: '200px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        <CardMedia
          image="https://source.unsplash.com/random/400x400?design"
          height={120}
          alt="Random design image"
        />
        <CardContent>
          <Typography variant="h6">Interactive Card</Typography>
          <Typography variant="body2">With different hover effect</Typography>
        </CardContent>
      </Card>
    </Box>
  ),
};

// Loading Card
export const Loading: Story = {
  render: () => (
    <Card>
      <CardHeader
        avatar={
          <Box
            width="40px"
            height="40px"
            borderRadius="50%"
            backgroundColor="grey.200"
          />
        }
        title={
          <Box
            width="200px"
            height="24px"
            backgroundColor="grey.200"
            borderRadius="4px"
          />
        }
        subtitle={
          <Box
            width="140px"
            height="20px"
            backgroundColor="grey.200"
            borderRadius="4px"
            marginTop="8px"
          />
        }
      />
      <Box padding="16px">
        <Box height="200px" backgroundColor="grey.200" borderRadius="4px" />
      </Box>
      <CardContent>
        <Box
          width="100%"
          height="20px"
          backgroundColor="grey.200"
          borderRadius="4px"
        />
        <Box
          width="80%"
          height="20px"
          backgroundColor="grey.200"
          borderRadius="4px"
        />
      </CardContent>
      <CardActions>
        <Box
          width="80px"
          height="36px"
          backgroundColor="grey.200"
          borderRadius="4px"
          marginRight="8px"
        />
        <Box
          width="80px"
          height="36px"
          backgroundColor="grey.200"
          borderRadius="4px"
        />
      </CardActions>
    </Card>
  ),
};

// Grid of Cards
export const CardGrid: Story = {
  render: () => (
    <Grid templateColumns="repeat(3, 1fr)" gap="16px" maxWidth="800px">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Card key={item}>
          <CardMedia
            image={`https://source.unsplash.com/random/400x400?nature=${item}`}
            height={140}
            alt={`Random nature image ${item}`}
          />
          <CardContent>
            <Typography variant="h6">Card {item}</Typography>
            <Typography variant="body2">
              A brief description for card {item}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Grid>
  ),
};
