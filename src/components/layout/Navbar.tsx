'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Menu,
  X,
  Compass,
  Package,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleDrawer } from '@/store/slices/cartSlice';
import { openConsultationModal, toggleMobileMenu, openTrackingModal, toggleCurrency } from '@/store/slices/uiSlice';
import { openAuthModal, logout } from '@/store/slices/authSlice';

export function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const mobileMenuOpen = useAppSelector((state) => state.ui.mobileMenuOpen);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const currency = useAppSelector((state) => state.ui.currency);
  const [catOpen, setCatOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Collection', href: '/shop' },
    { name: 'Bespoke', href: '/#custom-fitting-studio' },
    { name: 'Services', href: '/consultation' },
  ];

  const categoryMenu = [
    { name: 'All Editions', href: '/shop' },
    { name: 'Living Room & Majlis', href: '/shop?category=living-room' },
    { name: 'Bedroom & Suites', href: '/shop?category=bedroom' },
    { name: 'Lighting & Fixtures', href: '/shop?category=lighting' },
    { name: 'Dining & Kitchen', href: '/shop?category=dining' },
    { name: 'Decor & Objects', href: '/shop?category=decor' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e2d9cc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-[#1a1815] flex items-center justify-center group-hover:opacity-80 transition-opacity">
              <Compass className="w-4 h-4 text-[#d4b06a]" />
            </div>
            <div>
              <span className="text-base font-serif font-bold text-[#1a1815] block leading-none tracking-tight">
                L&apos;Atelier
              </span>
              <span className="text-[9px] tracking-[0.2em] text-[#b8933f] font-medium">
                RIYADH · JEDDAH
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 translate-x-[55px]">
            <Link
              href="/"
              className={`text-sm transition-colors whitespace-nowrap ${
                isActive('/') ? 'text-[#1a1815] font-semibold' : 'text-[#7a7166] hover:text-[#1a1815] font-medium'
              }`}
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors whitespace-nowrap ${
                  isActive(link.href) ? 'text-[#1a1815] font-semibold' : 'text-[#7a7166] hover:text-[#1a1815] font-medium'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Categories dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-[#7a7166] hover:text-[#1a1815] transition-colors cursor-pointer py-1"
              >
                Categories
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
              </button>
              {catOpen && (
                <div className="absolute top-full -left-3 w-52 pt-2 z-50">
                  <div className="bg-white border border-[#e2d9cc] rounded-xl shadow-lg p-1.5 space-y-0.5">
                    {categoryMenu.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={() => setCatOpen(false)}
                        className="block px-3 py-2 text-xs font-medium text-[#3d3833] hover:text-[#1a1815] hover:bg-[#f3ede4] rounded-lg transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Currency */}
            <button
              onClick={() => dispatch(toggleCurrency())}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-[#e2d9cc] bg-white hover:bg-[#f3ede4] text-[#3d3833] transition-colors cursor-pointer"
              title="Toggle SAR / USD"
            >
              {currency === 'SAR' ? '🇸🇦 SAR' : '🌐 USD'}
            </button>

            {/* Track order */}
            <button
              onClick={() => dispatch(openTrackingModal(undefined))}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#3d3833] hover:text-[#1a1815] hover:bg-[#f3ede4] border border-[#e2d9cc] rounded-lg transition-colors cursor-pointer"
              title="Track Order"
            >
              <Package className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Track</span>
            </button>

            {/* Auth */}
            {isAuthenticated && user ? (
              <div className="hidden sm:flex items-center gap-1.5">
                <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white border border-[#e2d9cc] rounded-lg text-xs font-medium text-[#1a1815]">
                  <div className="w-5 h-5 rounded-full bg-[#1a3d30] text-white flex items-center justify-center text-[10px] font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate max-w-[80px]">{user.name}</span>
                </div>
                <button
                  onClick={() => dispatch(logout())}
                  title="Sign Out"
                  className="p-1.5 text-[#7a7166] hover:text-red-500 hover:bg-[#f3ede4] rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => dispatch(openAuthModal('login'))}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#3d3833] hover:text-[#1a1815] hover:bg-[#f3ede4] border border-[#e2d9cc] rounded-lg transition-colors cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Sign In</span>
              </button>
            )}

            {/* Consultation CTA */}
            <button
              onClick={() => dispatch(openConsultationModal(undefined))}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#1a3d30] hover:bg-[#1f4e3f] rounded-full transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4b06a]" />
              Consult
            </button>

            {/* Cart */}
            <button
              onClick={() => dispatch(toggleDrawer())}
              aria-label="Shopping bag"
              className="relative p-2 rounded-lg text-[#1a1815] hover:bg-[#f3ede4] transition-colors border border-[#e2d9cc] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 text-[10px] font-bold text-white bg-[#1a3d30] rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="lg:hidden p-2 rounded-lg text-[#1a1815] hover:bg-[#f3ede4] border border-[#e2d9cc] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#e2d9cc] px-4 pt-4 pb-6 space-y-1 shadow-lg">
          {[
            { name: 'Home', href: '/' },
            { name: 'Collection', href: '/shop' },
            { name: 'Bespoke Studio', href: '/#custom-fitting-studio' },
            { name: 'Consultation', href: '/consultation' },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => dispatch(toggleMobileMenu())}
              className="block py-3 text-sm font-medium text-[#1a1815] border-b border-[#f3ede4] last:border-0"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-between p-3 bg-[#f3ede4] rounded-xl border border-[#e2d9cc]">
              <span className="text-xs font-medium text-[#3d3833]">Currency</span>
              <button
                type="button"
                onClick={() => dispatch(toggleCurrency())}
                className="px-3 py-1 bg-white border border-[#e2d9cc] rounded-lg text-xs font-semibold text-[#1a1815]"
              >
                {currency === 'SAR' ? '🇸🇦 SAR' : '🌐 USD'}
              </button>
            </div>

            {isAuthenticated && user ? (
              <div className="flex items-center justify-between p-3 bg-[#f3ede4] rounded-xl text-xs border border-[#e2d9cc]">
                <span className="font-semibold text-[#1a1815]">{user.name}</span>
                <button onClick={() => dispatch(logout())} className="font-semibold text-red-500 cursor-pointer">
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { dispatch(toggleMobileMenu()); dispatch(openAuthModal('login')); }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-[#1a1815] bg-[#f3ede4] hover:bg-[#e8ddd0] border border-[#e2d9cc] rounded-xl transition-colors cursor-pointer"
              >
                <UserIcon className="w-4 h-4" />
                Sign In / Register
              </button>
            )}

            <button
              onClick={() => { dispatch(toggleMobileMenu()); dispatch(openTrackingModal(undefined)); }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-[#1a1815] bg-[#f3ede4] hover:bg-[#e8ddd0] border border-[#e2d9cc] rounded-xl transition-colors cursor-pointer"
            >
              <Package className="w-4 h-4" />
              Track Order
            </button>

            <button
              onClick={() => { dispatch(toggleMobileMenu()); dispatch(openConsultationModal(undefined)); }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#1a3d30] hover:bg-[#1f4e3f] rounded-xl transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#d4b06a]" />
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
