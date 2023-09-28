import { cn } from '@/lib/utils';
import { TypographyProps } from './types';

export function Subtle({ text, className, children }: TypographyProps) {
  return (
    <p className={cn('text-sm text-slate-500 dark:text-slate-400', className)}>
      {children || text}
    </p>
  );
}
