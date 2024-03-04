import clsx from 'clsx';
import { forwardRef } from 'react';

const variants = {
  primary: 'bg-indigo-600 text-white',
  secondary: 'bg-white text-gray-600',
  danger: 'bg-red-600 text-white',
};
const rings = {
  primary: 'focus:ring-2 focus:ring-indigo-500/50',
  secondary: 'focus:ring-2 focus:ring-gray-500/50',
  danger: 'focus:ring-2 focus:ring-red-500/50',
};

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  ring?: boolean;
  size?: keyof typeof sizes;
  isLoading?: boolean;
} & IconProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      ring = false,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={isLoading}
        className={clsx(
          'flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80',
          variants[variant],
          sizes[size],
          ring && rings[variant],
          className
        )}
        {...props}
      >
        {isLoading && <span>x</span>}
        {!isLoading && startIcon}
        <span className="flex items-center mx-2">{props.children}</span> {!isLoading && endIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';