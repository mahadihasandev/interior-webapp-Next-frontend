'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Package,
  Search,
  Truck,
  Printer,
  Copy,
  Check,
  Layers,
  ArrowLeft,
} from 'lucide-react';
import { useGetOrderQuery, useFakePayOrderMutation } from '@/store/services/consultationApi';
import { OrderItemDetail } from '@/types';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') || 'INT-91K7A4';

  const [searchInput, setSearchInput] = useState(initialRef);
  const [activeOrderNumber, setActiveOrderNumber] = useState(initialRef);
  const [copied, setCopied] = useState(false);

  const { data, isLoading, isError, refetch } = useGetOrderQuery(activeOrderNumber, {
    skip: !activeOrderNumber,
  });

  const [fakePay, { isLoading: isPaying }] = useFakePayOrderMutation();
  const order = data?.data;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveOrderNumber(searchInput.trim());
    }
  };

  const handleQuickSelect = (ref: string) => {
    setSearchInput(ref);
    setActiveOrderNumber(ref);
  };

  const handleCopy = () => {
    if (activeOrderNumber) {
      navigator.clipboard.writeText(activeOrderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInstantFakePay = async () => {
    if (!activeOrderNumber) return;
    try {
      await fakePay(activeOrderNumber).unwrap();
      refetch();
    } catch {
      // Mock fallback
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Collection</span>
          </Link>
          <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-widest">
            Order Logistics Engine
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-stone-200 rounded-3xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-stone-200 bg-stone-100/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 text-stone-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Package className="w-3.5 h-3.5" />
                <span>Client Fulfillment Tracking</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Track Architectural Order
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Enter your order reference to view live workshop fabrication progress and verified digital receipt.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Search Bar & Demo Chips */}
            <div className="space-y-3">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Enter order reference (e.g. INT-91K7A4)..."
                    className="w-full pl-9 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold text-stone-900 uppercase focus:outline-none focus:border-stone-900 focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors shadow-sm shrink-0"
                >
                  Track Order
                </button>
              </form>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="font-bold text-stone-700">Quick Demo References:</span>
                <button
                  type="button"
                  onClick={() => handleQuickSelect('INT-91K7A4')}
                  className={`px-3 py-1 rounded-lg font-mono font-bold border transition-colors ${
                    activeOrderNumber === 'INT-91K7A4'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200'
                  }`}
                >
                  INT-91K7A4 (Solstice Chandelier)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickSelect('INT-CUSTOM-900')}
                  className={`px-3 py-1 rounded-lg font-mono font-bold border transition-colors ${
                    activeOrderNumber === 'INT-CUSTOM-900'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200'
                  }`}
                >
                  INT-CUSTOM-900 (Architectural Glass)
                </button>
              </div>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="py-12 text-center text-stone-600 space-y-3">
                <div className="w-8 h-8 border-3 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-semibold">Contacting workshop logistics server...</p>
              </div>
            )}

            {/* Error */}
            {!isLoading && isError && (
              <div className="p-8 bg-stone-100 rounded-2xl text-center space-y-3">
                <p className="text-base font-bold text-stone-900">Reference Not Found</p>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  No order record matched &ldquo;{activeOrderNumber}&rdquo;. Please click one of the quick demo buttons above.
                </p>
              </div>
            )}

            {/* Active Order Record */}
            {order && (
              <div className="space-y-8">
                {/* Reference Pill */}
                <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold block">
                      Order Reference
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-xl font-bold text-stone-900">
                        {order.order_number}
                      </span>
                      <button
                        onClick={handleCopy}
                        className="p-1.5 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-200/50"
                        title="Copy Reference"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        order.payment_status === 'paid'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-amber-100 text-amber-950 border border-amber-300'
                      }`}
                    >
                      {order.payment_status === 'paid' ? '● Verified Payment' : '○ Awaiting Deposit'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-200 text-stone-900">
                      Status: {order.status}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                    Fulfillment Line Items
                  </h3>
                  <div className="border border-stone-200 rounded-2xl divide-y divide-stone-100 overflow-hidden bg-white">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item: OrderItemDetail, idx: number) => (
                        <div key={idx} className="p-4 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 overflow-hidden">
                              {item.product?.image_url ? (
                                <img src={item.product.image_url} alt={item.product_name} className="w-full h-full object-cover" />
                              ) : (
                                <Layers className="w-6 h-6 text-stone-700" />
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-stone-900">{item.product_name}</p>
                              <p className="text-[11px] text-stone-500">Qty: {item.quantity} × ${Number(item.unit_price || item.price || 0).toFixed(2)}</p>
                            </div>
                          </div>
                          <span className="text-sm font-mono font-bold text-stone-900">
                            ${Number(item.subtotal || (item.unit_price || item.price || 0) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-stone-900 text-white flex items-center justify-center">
                            <Package className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-900">{order.title || 'Architectural Custom Order'}</p>
                            <p className="text-[11px] text-stone-500">Quantity: 1 Unit</p>
                          </div>
                        </div>
                        <span className="text-sm font-mono font-bold text-stone-900">${order.total_amount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Stepper */}
                <div className="p-6 bg-stone-50 border border-stone-200 rounded-2xl space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                    Manufacturing & Logistics Timeline
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900">1. Order Spec Registered</p>
                        <p className="text-[11px] text-stone-600">Material cuts and engineering specs verified.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900">2. Payment Authorization</p>
                        <p className="text-[11px] text-stone-600">Verified through L’Atelier Privé Gateway.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0 animate-pulse">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900">3. Precision Fabrication (Active)</p>
                        <p className="text-[11px] text-stone-600">Alloy extrusion CNC joinery & powder coating in workshop.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center shrink-0">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-500">4. White-Glove Installation & Delivery</p>
                        <p className="text-[11px] text-stone-500">Scheduled upon quality control approval.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Print button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-900 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Invoice</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-stone-600">Loading tracking page...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
