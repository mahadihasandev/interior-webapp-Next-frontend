import type { Metadata } from 'next';
import './globals.css';
import { inter, playfair, plusJakarta, amiri } from './fonts';
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
    <html
      lang="en"
      className={`light ${inter.variable} ${playfair.variable} ${plusJakarta.variable} ${amiri.variable}`}
    >
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

