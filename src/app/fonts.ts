import { Inter, Playfair_Display, Plus_Jakarta_Sans, Amiri } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-amiri',
});
