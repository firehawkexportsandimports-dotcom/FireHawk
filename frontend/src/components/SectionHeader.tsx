import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  description, 
  align = 'center',
  className,
  children 
}: SectionHeaderProps) {
  return (
    <div 
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      {subtitle && (
        <p className="text-sm font-semibold text-ember uppercase tracking-wider mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
        {title}
      </h2>
      {description && (
        <p className={cn(
          'mt-4 text-muted-foreground text-lg max-w-2xl',
          align === 'center' && 'mx-auto'
        )}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
