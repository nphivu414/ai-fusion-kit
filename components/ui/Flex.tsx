'use client';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const flexVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
    },
    justify: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    align: {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    wrap: {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
      wrapReverse: 'flex-wrap-reverse',
    },
  },
});

export interface FlexProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}

export const Flex = ({
  className,
  direction,
  justify,
  align,
  wrap,
  children,
  ...props
}: FlexProps) => {
  return (
    <div
      className={cn(
        flexVariants({ direction, justify, align, wrap, className })
      )}
      {...props}
    >
      {children}
    </div>
  );
};
