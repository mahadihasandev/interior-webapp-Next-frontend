import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs ${className}`}>
      <ol className="flex items-center gap-1.5 text-stone-400">
        <li>
          <Link href="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <li className="text-stone-600">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li>
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-amber-400 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-stone-200 font-medium">{item.label}</span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
