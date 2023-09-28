import { cn } from '@/lib/utils';
import { TypographyProps } from './types';

export function Heading3({ text, className, children }: TypographyProps) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
    >
      {children || text}
    </h3>
  );
}
