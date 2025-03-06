import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { RiCloseLine } from 'react-icons/ri';

const meta: Meta<typeof Button> = {
  title: 'component/Button/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    type: 'button',
    color: 'primary',
    variant: 'contained',
    align: 'center',
    size: 'md',
    full: false,
    rounded: 'sm',
    disabled: false,
    children: 'Button',
  },
};

export const With_Icon: Story = {
  args: {
    size: 'lg',
    disabled: false,
  },
  render: (args) => <Button icon={<RiCloseLine />} {...args} />,
};
