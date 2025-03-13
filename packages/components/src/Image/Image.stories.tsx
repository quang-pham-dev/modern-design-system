import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './index';

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
    },
    variant: {
      control: 'select',
      options: ['default', 'rounded', 'circle'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto',
    alt: 'Placeholder image',
    style: { width: '300px', height: '200px' },
  },
};

export const Rounded: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto',
    alt: 'Rounded image',
    variant: 'rounded',
    style: { width: '300px', height: '200px' },
  },
};

export const Circle: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto',
    alt: 'Circle image',
    variant: 'circle',
    style: { width: '200px', height: '200px' },
  },
};

export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    fallbackSrc:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto?text=Fallback+Image',
    alt: 'Image with fallback',
    style: { width: '300px', height: '200px' },
  },
};

export const WithError: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    alt: 'Image with error',
    style: { width: '300px', height: '200px' },
  },
};

export const LazyLoaded: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto',
    alt: 'Lazy loaded image',
    lazy: true,
    style: { width: '300px', height: '200px' },
  },
};

export const DifferentFits: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      <div>
        <h4>Cover</h4>
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto"
          alt="Cover fit"
          fit="cover"
          style={{ width: '200px', height: '150px' }}
        />
      </div>
      <div>
        <h4>Contain</h4>
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto"
          alt="Contain fit"
          fit="contain"
          style={{ width: '200px', height: '150px' }}
        />
      </div>
      <div>
        <h4>Fill</h4>
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto"
          alt="Fill fit"
          fit="fill"
          style={{ width: '200px', height: '150px' }}
        />
      </div>
      <div>
        <h4>None</h4>
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto"
          alt="None fit"
          fit="none"
          style={{ width: '200px', height: '150px' }}
        />
      </div>
      <div>
        <h4>Scale-down</h4>
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto"
          alt="Scale-down fit"
          fit="scale-down"
          style={{ width: '200px', height: '150px' }}
        />
      </div>
    </div>
  ),
};

export const WithPlaceholder: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto',
    placeholderSrc:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto?text=Loading...',
    alt: 'Image with placeholder',
    style: { width: '300px', height: '200px' },
  },
};

export const WithBlurEffect: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto',
    alt: 'Image with blur effect',
    blurOnLoad: true,
    style: { width: '300px', height: '200px' },
  },
};

export const CustomStyling: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto',
    alt: 'Custom styled image',
    sx: {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      border: '2px solid #3f51b5',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
    style: { width: '300px', height: '200px' },
  },
};
