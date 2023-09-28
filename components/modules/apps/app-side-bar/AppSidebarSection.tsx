import { Heading5 } from '@/components/ui/typography';
import React from 'react';

type AppSidebarSectionProps = {
    title: string;
    children: React.ReactNode;
}

export const AppSidebarSection = ({ title, children }: AppSidebarSectionProps) => {
  return(
    <div className="py-2">
      <Heading5 className='px-4 py-2 text-muted-foreground'>{title}</Heading5>
      {children}
    </div>
  );
}