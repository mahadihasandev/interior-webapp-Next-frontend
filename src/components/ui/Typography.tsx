import React from 'react';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export function PageTitle({ children, className = '', ...props }: TypographyProps) {
  return (
    <h1
      className={`text-3xl sm:text-5xl font-serif font-bold tracking-tight text-stone-900 leading-tight ${className}`}
      {...props}
    >
      {children}
    </h1>
  );
}

interface SectionHeadingProps extends TypographyProps {
  badge?: string;
  subtitle?: string;
}

export function SectionHeading({
  children,
  badge,
  subtitle,
  className = '',
  ...props
}: SectionHeadingProps) {
  return (
    <div className="space-y-1.5">
      {badge && (
        <span className="text-xs uppercase tracking-widest text-amber-900 font-bold block">
          {badge}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight ${className}`}
        {...props}
      >
        {children}
      </h2>
      {subtitle && (
        <p className="text-sm text-stone-700 font-normal max-w-xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }: TypographyProps) {
  return (
    <h3
      className={`font-serif text-base sm:text-lg font-bold text-stone-900 tracking-normal ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function Text({ children, className = '', ...props }: TypographyProps) {
  return (
    <p
      className={`text-sm sm:text-base text-stone-800 font-normal leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function SmallText({ children, className = '', ...props }: TypographyProps) {
  return (
    <p
      className={`text-xs text-stone-700 font-medium leading-normal ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}
