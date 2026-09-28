import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({
  children,
  className = '',
  hoverable = true,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-stone-200/90 shadow-xs text-stone-900 overflow-hidden ${
        hoverable
          ? 'hover:border-stone-400 hover:shadow-md transition-all duration-300'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`p-5 pb-3 border-b border-stone-200 flex items-center justify-between gap-3 text-stone-900 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-5 text-stone-800 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`p-5 pt-3 border-t border-stone-200 bg-stone-50/60 flex items-center justify-between gap-3 text-stone-700 text-xs ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
