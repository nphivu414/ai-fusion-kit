import React from 'react';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import TextareaAutoResize, { TextareaAutosizeProps } from 'react-textarea-autosize'

import { Label } from './Label';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  containerClassName?: string;
}

const textAreaVariants = cva(
  "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      isError: {
        true: 'border-red-500 dark:border-red-500',
      },
    },
  }
);

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaProps & VariantProps<typeof textAreaVariants> & TextareaAutosizeProps
>(
  (
    { className, label, helperText, isError, containerClassName, ...props },
    ref
  ) => {
    return (
      <div
        className={cn(`grid w-full  items-center gap-1.5`, containerClassName)}
      >
        {label ? <Label htmlFor={props.name}>{label}</Label> : null}
        <TextareaAutoResize
          className={cn(textAreaVariants({ isError, className }))}
          ref={ref}
          {...props}
        />
        {helperText ? (
          <p className="text-xs text-stone-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };
