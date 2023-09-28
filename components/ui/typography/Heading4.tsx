import { cn } from '@/lib/utils';
import { TypographyProps } from './types';

export function Heading4({ text, className, children }: TypographyProps) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
    >
      {children || text}
    </h4>
  );
}
