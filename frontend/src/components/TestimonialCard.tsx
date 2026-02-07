import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div 
      className={cn(
        'bg-white rounded-2xl p-6 border border-border/30 shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-500',
        className
      )}
    >
      {/* Quote Icon */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-ember/10 to-saffron/10 flex items-center justify-center mb-4">
        <Quote className="w-5 h-5 text-ember" />
      </div>
      
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'w-4 h-4',
              i < testimonial.rating
                ? 'text-saffron fill-saffron'
                : 'text-muted-foreground/30'
            )}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-foreground/80 leading-relaxed mb-6 italic">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ember via-burnt-orange to-saffron flex items-center justify-center">
          <span className="text-white font-semibold">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <p className="font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">
            {testimonial.company}, {testimonial.country}
          </p>
        </div>
      </div>
    </div>
  );
}
