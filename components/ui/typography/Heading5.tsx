import { cn } from '@/lib/utils';
import { TypographyProps } from './types';

export function Heading5({ text, className, children }: TypographyProps) {
  return (
    <h5
      className={cn(
        'scroll-m-20 text-lg font-semibold tracking-tight',
        className
      )}
    >
      {children || text}
    </h5>
  );
}
