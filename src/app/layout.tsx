import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/layout/Providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ConsultationModal } from '@/components/consultation/ConsultationModal';
import { OrderTrackingModal } from '@/components/cart/OrderTrackingModal';
import { AuthModal } from '@/components/auth/AuthModal';

export const metadata: Metadata = {
  title: "L'Atelier Interior Shop & Architectural Studio",
  description:
    'Curated modern furniture, artisan lighting, tactile textiles, and bespoke interior design consultation services.',
  keywords: [
    'interior shop',
    'modern furniture',
    'architectural lighting',
    'interior designer',
    'custom architectural fittings',
    'bespoke decor',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-stone-50 text-stone-900 antialiased selection:bg-stone-200 selection:text-stone-900">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <ConsultationModal />
          <OrderTrackingModal />
          <AuthModal />
        </Providers>
      </body>
    </html>
  );
}
