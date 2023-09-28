import { cn } from '@/lib/utils';
import { TypographyProps } from './types';

export function Blockquote({ text, className, children }: TypographyProps) {
  return (
    <blockquote
      className={cn(
        'mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200',
        className
      )}
    >
      {children || text}
    </blockquote>
  );
}
