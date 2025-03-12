import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ThemeProvider } from '@modern-design-system/theme';
import { Card, CardHeader, CardContent, CardMedia, CardActions } from './index';
import { Button } from '..';

describe('Card', () => {
  test('renders card with content', () => {
    render(
      <ThemeProvider>
        <Card data-testid="card">
          <div>Card Content</div>
        </Card>
      </ThemeProvider>,
    );

    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('Card Content');
  });

  test('renders card with different variants', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Card variant="elevated" data-testid="card" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Card variant="outlined" data-testid="card" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Card variant="filled" data-testid="card" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  test('renders card with different sizes', () => {
    const { rerender } = render(
      <ThemeProvider>
        <Card size="sm" data-testid="card" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Card size="md" data-testid="card" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Card size="lg" data-testid="card" />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  test('renders card with fullWidth prop', () => {
    render(
      <ThemeProvider>
        <Card fullWidth data-testid="card" />
      </ThemeProvider>,
    );

    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveStyle('width: 100%');
  });

  test('renders card with noPadding prop', () => {
    render(
      <ThemeProvider>
        <Card noPadding data-testid="card" />
      </ThemeProvider>,
    );

    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveStyle('padding: 0');
  });

  test('renders CardHeader with title and subtitle', () => {
    render(
      <ThemeProvider>
        <Card>
          <CardHeader
            title="Card Title"
            subtitle="Card Subtitle"
            data-testid="card-header"
          />
        </Card>
      </ThemeProvider>,
    );

    const header = screen.getByTestId('card-header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Card Title');
    expect(header).toHaveTextContent('Card Subtitle');
  });

  test('renders CardHeader with avatar and action', () => {
    render(
      <ThemeProvider>
        <Card>
          <CardHeader
            avatar={<div data-testid="avatar">Avatar</div>}
            action={<Button data-testid="action">Action</Button>}
            data-testid="card-header"
          />
        </Card>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('action')).toBeInTheDocument();
  });

  test('renders CardContent', () => {
    render(
      <ThemeProvider>
        <Card>
          <CardContent data-testid="card-content">Content</CardContent>
        </Card>
      </ThemeProvider>,
    );

    const content = screen.getByTestId('card-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent('Content');
  });

  test('renders CardMedia with image', () => {
    render(
      <ThemeProvider>
        <Card>
          <CardMedia
            image="test-image.jpg"
            alt="Test Image"
            data-testid="card-media"
          />
        </Card>
      </ThemeProvider>,
    );

    const media = screen.getByTestId('card-media');
    expect(media).toBeInTheDocument();
    expect(media).toHaveStyle('background-image: url(test-image.jpg)');
    expect(media).toHaveAttribute('role', 'img');
    expect(media).toHaveAttribute('aria-label', 'Test Image');
  });

  test('renders CardMedia with custom height', () => {
    render(
      <ThemeProvider>
        <Card>
          <CardMedia
            image="test-image.jpg"
            height={300}
            data-testid="card-media"
          />
        </Card>
      </ThemeProvider>,
    );

    const media = screen.getByTestId('card-media');
    expect(media).toBeInTheDocument();
    expect(media).toHaveStyle('height: 300px');
  });

  test('renders CardActions', () => {
    render(
      <ThemeProvider>
        <Card>
          <CardActions data-testid="card-actions">
            <Button>Action 1</Button>
            <Button>Action 2</Button>
          </CardActions>
        </Card>
      </ThemeProvider>,
    );

    const actions = screen.getByTestId('card-actions');
    expect(actions).toBeInTheDocument();
    expect(actions).toHaveTextContent('Action 1');
    expect(actions).toHaveTextContent('Action 2');
  });

  test('renders CardActions with disableSpacing', () => {
    render(
      <ThemeProvider>
        <Card>
          <CardActions disableSpacing data-testid="card-actions">
            <Button>Action 1</Button>
            <Button>Action 2</Button>
          </CardActions>
        </Card>
      </ThemeProvider>,
    );

    const actions = screen.getByTestId('card-actions');
    expect(actions).toBeInTheDocument();
    expect(actions).toHaveStyle('padding: 8px 0');
  });

  test('renders complete card with all subcomponents', () => {
    render(
      <ThemeProvider>
        <Card data-testid="card">
          <CardHeader title="Card Title" subtitle="Card Subtitle" />
          <CardMedia image="test-image.jpg" height={200} />
          <CardContent>Card content goes here</CardContent>
          <CardActions>
            <Button>Action 1</Button>
            <Button>Action 2</Button>
          </CardActions>
        </Card>
      </ThemeProvider>,
    );

    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent('Card Title');
    expect(card).toHaveTextContent('Card Subtitle');
    expect(card).toHaveTextContent('Card content goes here');
    expect(card).toHaveTextContent('Action 1');
    expect(card).toHaveTextContent('Action 2');
  });
});
