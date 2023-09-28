import { cn } from '@/lib/utils';
import { TypographyProps } from './types';

export function Paragraph({ text, className, children }: TypographyProps) {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
      {children || text}
    </p>
  );
}
