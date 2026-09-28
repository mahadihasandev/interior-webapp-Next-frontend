import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/layout/Providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ConsultationModal } from '@/components/consultation/ConsultationModal';
import { OrderTrackingModal } from '@/components/cart/OrderTrackingModal';
import { AuthModal } from '@/components/auth/AuthModal';
import { SaudiConciergeFAB } from '@/components/layout/SaudiConciergeFAB';

export const metadata: Metadata = {
  title: "L'Atelier Interior Shop & Saudi Architectural Studio | لآتولييه",
  description:
    'Bespoke architectural interiors, 50°C thermal-break windows, fluted Majlis partitions, and curated modern furniture across Riyadh, Jeddah, and Khobar.',
  keywords: [
    'interior shop saudi arabia',
    'saudi villa architecture',
    'royal majlis design',
    '50c thermal break windows',
    'riyadh interior designer',
    'custom architectural fittings',
    'jeddah bespoke decor',
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
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 antialiased selection:bg-[#c5a059]/20 selection:text-stone-900">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <ConsultationModal />
          <OrderTrackingModal />
          <AuthModal />
          <SaudiConciergeFAB />
        </Providers>
      </body>
    </html>
  );
}

