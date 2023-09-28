import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { Label } from './Label';

const inputVariants = cva(
  `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
  {
    variants: {
      isError: {
        true: 'border-red-500 dark:border-red-500',
      },
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  containerClassName?: string;
}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & VariantProps<typeof inputVariants>
>(
  (
    { className, label, helperText, containerClassName, isError, ...props },
    ref
  ) => {
    return (
      <div
        className={cn(
          `relative grid w-full items-center gap-1.5`,
          containerClassName
        )}
      >
        {label ? <Label htmlFor={props.name}>{label}</Label> : null}
        <input
          className={cn(inputVariants({ isError, className }))}
          ref={ref}
          {...props}
        />
        {helperText ? (
          <p
            className={cn(
              'text-xs text-stone-500',
              isError && 'text-red-500'
            )}
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
