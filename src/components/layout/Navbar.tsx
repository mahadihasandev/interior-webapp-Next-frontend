'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Sparkles,
  Menu,
  X,
  Compass,
  Package,
  User as UserIcon,
  LogOut,
  ChevronDown,
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

  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const primaryNavLinks = [
    { name: 'Collection', href: '/shop' },
    { name: 'Bespoke Studio', href: '/#custom-fitting-studio' },
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

  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#c5a059]/20 text-stone-900 transition-all duration-300 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* 1. Brand Logo with Bilingual Saudi Signature */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-[#0c0a09] border border-[#c5a059]/40 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-xs relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c5a059]/25 to-transparent pointer-events-none" />
              <Compass className="w-5 h-5 text-[#dfca92]" />
            </div>
            <div>
              <span className="text-xl font-serif tracking-tight font-bold uppercase text-stone-900 group-hover:text-stone-700 transition-colors block leading-tight">
                L’Atelier
              </span>
              <span className="block text-[9.5px] tracking-[0.22em] text-[#8f7033] font-sans font-bold">
                الرياض · جدة · الخبر
              </span>
            </div>
          </Link>

          {/* 2. Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link
              href="/"
              className={`text-sm tracking-wide transition-colors ${
                pathname === '/' ? 'text-stone-950 font-bold border-b-2 border-[#163b2f] pb-0.5' : 'text-stone-700 hover:text-stone-950 font-medium'
              }`}
            >
              Home
            </Link>

            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm tracking-wide transition-colors ${
                    isActive
                      ? 'text-stone-950 font-bold border-b-2 border-[#163b2f] pb-0.5'
                      : 'text-stone-700 hover:text-stone-950 font-medium'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Curated Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors cursor-pointer py-2"
              >
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute top-full -left-4 w-56 pt-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="bg-white rounded-2xl border border-stone-200 shadow-xl p-2 space-y-1">
                    {categoryMenu.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className="block px-3 py-2 text-xs font-semibold text-stone-800 hover:text-stone-950 hover:bg-[#faf8f5] rounded-xl transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* 3. Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Interactive Currency Switcher */}
            <button
              onClick={() => dispatch(toggleCurrency())}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold border border-[#c5a059]/40 bg-[#f5f0e6] hover:bg-[#ebe4d5] text-stone-900 transition-all cursor-pointer shadow-2xs"
              title="Click to toggle SAR / USD"
            >
              <span className="font-mono text-[11px]">
                {currency === 'SAR' ? '🇸🇦 SAR (ر.س)' : '🌐 USD ($)'}
              </span>
            </button>

            {/* Track Order Trigger */}
            <button
              onClick={() => dispatch(openTrackingModal(undefined))}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-[#f5f0e6] border border-stone-300 rounded-full transition-colors cursor-pointer"
              title="Track Existing Order"
            >
              <Package className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden xl:inline">Track Order</span>
            </button>

            {/* Customer Authentication */}
            {isAuthenticated && user ? (
              <div className="hidden sm:flex items-center gap-1.5">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f5f0e6] border border-stone-300 rounded-full text-xs font-bold text-stone-900">
                  <div className="w-5 h-5 rounded-full bg-[#163b2f] text-white flex items-center justify-center text-[10px]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate max-w-[80px]">{user.name}</span>
                </div>
                <button
                  onClick={() => dispatch(logout())}
                  title="Sign Out"
                  className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-[#f5f0e6] rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => dispatch(openAuthModal('login'))}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-stone-800 hover:text-stone-950 hover:bg-[#f5f0e6] border border-stone-300 rounded-full transition-colors cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5 text-stone-700" />
                <span className="hidden xl:inline">Sign In</span>
              </button>
            )}

            {/* Consultation Trigger with Royal Emerald Accent */}
            <button
              onClick={() => dispatch(openConsultationModal(undefined))}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#163b2f] hover:bg-[#1f4e3f] border border-[#c5a059]/40 rounded-full transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#dfca92] group-hover:rotate-12 transition-transform" />
              <span>Consultation</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => dispatch(toggleDrawer())}
              aria-label="View shopping bag"
              className="relative p-2.5 rounded-full text-stone-900 hover:bg-[#f5f0e6] transition-colors border border-stone-300 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-stone-900" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold text-white bg-[#163b2f] rounded-full animate-in zoom-in">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button (Hamburger) */}
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="lg:hidden p-2 rounded-xl text-stone-900 hover:bg-[#f5f0e6] border border-stone-300 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>


      {/* Mobile Drawer (Tablet & Smartphone) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => dispatch(toggleMobileMenu())}
              className="block py-2.5 text-sm font-bold text-stone-900 hover:text-stone-700 border-b border-stone-100"
            >
              Home
            </Link>
            <Link
              href="/#custom-fitting-studio"
              onClick={() => dispatch(toggleMobileMenu())}
              className="block py-2.5 text-sm font-bold text-amber-900 hover:text-amber-950 border-b border-stone-100"
            >
              ✨ Bespoke Studio · فلل ومجالس
            </Link>
            <Link
              href="/shop"
              onClick={() => dispatch(toggleMobileMenu())}
              className="block py-2.5 text-sm font-bold text-stone-900 hover:text-stone-700 border-b border-stone-100"
            >
              Ready-Made Collection
            </Link>
            <div className="pl-3 py-1 space-y-1 border-l-2 border-stone-200">
              {categoryMenu.slice(1).map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={() => dispatch(toggleMobileMenu())}
                  className="block py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  ↳ {cat.name}
                </Link>
              ))}
            </div>
            <Link
              href="/consultation"
              onClick={() => dispatch(toggleMobileMenu())}
              className="block py-2.5 text-sm font-bold text-stone-900 hover:text-stone-700 border-b border-stone-100"
            >
              Design Consultation
            </Link>
          </div>

          <div className="pt-2 space-y-2">
            {/* Currency switcher on mobile */}
            <div className="flex items-center justify-between p-2.5 bg-[#f5f0e6] rounded-xl border border-[#c5a059]/30">
              <span className="text-xs font-bold text-stone-800">Currency / العملة:</span>
              <button
                type="button"
                onClick={() => dispatch(toggleCurrency())}
                className="px-3 py-1 bg-white border border-[#c5a059]/50 rounded-lg text-xs font-bold text-stone-900 shadow-2xs"
              >
                {currency === 'SAR' ? '🇸🇦 SAR (ر.س)' : '🌐 USD ($)'}
              </button>
            </div>

            {isAuthenticated && user ? (
              <div className="flex items-center justify-between p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs">
                <span className="font-bold text-stone-900">Signed in as {user.name}</span>
                <button
                  onClick={() => dispatch(logout())}
                  className="font-bold text-rose-600 hover:underline cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  dispatch(toggleMobileMenu());
                  dispatch(openAuthModal('login'));
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl transition-colors cursor-pointer"
              >
                <UserIcon className="w-4 h-4 text-stone-900" />
                <span>Customer Sign In / Register</span>
              </button>
            )}

            <button
              onClick={() => {
                dispatch(toggleMobileMenu());
                dispatch(openTrackingModal(undefined));
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl transition-colors cursor-pointer"
            >
              <Package className="w-4 h-4 text-stone-700" />
              <span>Track Order & View Receipt</span>
            </button>

            <button
              onClick={() => {
                dispatch(toggleMobileMenu());
                dispatch(openConsultationModal(undefined));
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#163b2f] hover:bg-[#1f4e3f] border border-[#c5a059]/40 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#dfca92]" />
              <span>Book Design Consultation · استشارة</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
