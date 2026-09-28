import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'gold' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'gold',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-[11px] gap-1.5',
    md: 'px-5 py-2.5 text-xs gap-2',
    lg: 'px-7 py-3.5 text-sm gap-2.5',
  };

  const variantStyles = {
    gold: 'bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-md shadow-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20',
    secondary: 'bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-700',
    outline: 'bg-transparent border border-stone-700 hover:border-amber-400 text-stone-200 hover:text-amber-300',
    ghost: 'bg-transparent hover:bg-stone-800/80 text-stone-300 hover:text-white',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
}
