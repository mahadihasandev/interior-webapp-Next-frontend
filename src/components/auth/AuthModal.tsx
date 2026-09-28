'use client';

import React, { useState } from 'react';
import {
  X,
  User as UserIcon,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  closeAuthModal,
  setAuthMode,
  setCredentials,
} from '@/store/slices/authSlice';

export function AuthModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.auth.isAuthModalOpen);
  const mode = useAppSelector((state) => state.auth.authMode);

  // Form State
  const [email, setEmail] = useState('customer@interior.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    dispatch(closeAuthModal());
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://interior-webapp-php-backend.onrender.com/api';
    try {
      const res = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed. Please verify credentials.');
      }

      setSuccessMsg('Welcome back! Successfully signed in.');
      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
        })
      );
      setTimeout(() => {
        handleClose();
      }, 800);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to connect to authentication service.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://interior-webapp-php-backend.onrender.com/api';
    try {
      const res = await fetch(`${apiBase}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      setSuccessMsg('Account created successfully! Welcome to L’Atelier.');
      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
        })
      );
      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to complete registration.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCustomer = () => {
    setEmail('customer@interior.com');
    setPassword('password123');
    dispatch(setAuthMode('login'));
  };

  return (
    <div className="fixed inset-0 z-[99999] overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Dark backdrop with high z-index */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md my-auto bg-white border border-stone-200 rounded-3xl shadow-2xl overflow-hidden z-10 text-stone-900 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-white font-serif font-bold text-lg shadow-xs">
              L
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {mode === 'login' ? 'Customer Sign In' : 'Create Customer Account'}
              </h3>
              <p className="text-[11px] text-stone-600 font-medium">
                {mode === 'login'
                  ? 'Access your custom architectural orders & orders history'
                  : 'Join L’Atelier Studio for curated collections & tracking'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-stone-100 border-b border-stone-200 text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => {
              setErrorMsg(null);
              dispatch(setAuthMode('login'));
            }}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setErrorMsg(null);
              dispatch(setAuthMode('register'));
            }}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Notification Banners */}
          {errorMsg && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-medium">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1-Click Demo Shortcut */}
          {mode === 'login' && (
            <button
              type="button"
              onClick={fillDemoCustomer}
              className="w-full p-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl flex items-center justify-between text-xs font-bold text-stone-800 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-stone-900" />
                <span>Fill Seeded Demo Customer Credentials</span>
              </div>
              <span className="text-[10px] font-mono text-stone-600 font-semibold">customer@interior.com</span>
            </button>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@archstudio.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 font-medium focus:bg-white focus:border-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800">
                    Password
                  </label>
                  <span className="text-[10px] text-stone-600 font-mono font-bold">Demo: password123</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 font-medium focus:bg-white focus:border-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 active:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Account</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                  Full Name / Studio Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Jenkins"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 font-medium focus:bg-white focus:border-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@jenkinsdesign.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 font-medium focus:bg-white focus:border-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Phone (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 0192"
                      className="w-full pl-8 pr-2 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 font-medium focus:bg-white focus:border-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Password (Min 6)
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-8 pr-2 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 font-medium focus:bg-white focus:border-stone-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 active:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Customer Account</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Security footnote */}
          <div className="pt-2 border-t border-stone-200 flex items-center justify-center gap-2 text-[11px] text-stone-700 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Encrypted customer authentication & session management</span>
          </div>
        </div>
      </div>
    </div>
  );
}
