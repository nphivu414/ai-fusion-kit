import { cn } from '@/lib/utils';
import { TypographyProps } from './types';

export function Heading1({ text, className, children }: TypographyProps) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className
      )}
    >
      {children || text}
    </h1>
  );
}
