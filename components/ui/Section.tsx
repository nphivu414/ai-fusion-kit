import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

import { Flex } from './Flex';
import { Separator } from './Separator';
import { Heading4 } from './typography';

const sectionVariants = cva(`rounded-lg bg-white p-4 dark:bg-slate-900`, {
  variants: {
    compact: {
      true: 'p-2',
    },
    shadow: {
      true: 'shadow',
    },
  },
});

export type SectionProps = {
  title?: string | React.ReactNode;
  className?: string;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  children?: React.ReactNode;
} & VariantProps<typeof sectionVariants>;

export const Section = ({
  title,
  compact,
  shadow = true,
  className,
  leftElement,
  rightElement,
  children,
}: SectionProps) => {
  return (
    <div className={cn(sectionVariants({ compact, shadow, className }))}>
      {title || rightElement || leftElement ? (
        <Flex direction="row" justify="between" align="center">
          <Flex direction="row" align="center">
            {leftElement && <div className="mr-2">{leftElement}</div>}
            {typeof title === 'string' ? <Heading4>{title}</Heading4> : title}
          </Flex>
          {rightElement && <div className="ml-2">{rightElement}</div>}
        </Flex>
      ) : null}
      {title ? <Separator className="my-2" /> : null}
      <div className="py-2">{children}</div>
    </div>
  );
};
