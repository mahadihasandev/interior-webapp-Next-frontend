'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Package,
  Truck,
  Printer,
  Copy,
  Check,
  Search,
  Calendar,
  MapPin,
  Layers,
} from 'lucide-react';
import { useGetOrderQuery, useFakePayOrderMutation } from '@/store/services/consultationApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeTrackingModal } from '@/store/slices/uiSlice';

interface OrderTrackingModalProps {
  initialOrderNumber?: string | null;
  isOpen?: boolean;
  onClose?: () => void;
}

export function OrderTrackingModal({
  initialOrderNumber,
  isOpen: propsIsOpen,
  onClose: propsOnClose,
}: OrderTrackingModalProps) {
  const dispatch = useAppDispatch();
  const reduxIsOpen = useAppSelector((state) => state.ui.isTrackingModalOpen);
  const reduxOrderNum = useAppSelector((state) => state.ui.trackingOrderNumber);

  // Derive active open state
  const isOpen = typeof propsIsOpen === 'boolean' ? propsIsOpen : reduxIsOpen;
  const initialRef = initialOrderNumber || reduxOrderNum || 'INT-91K7A4';

  const [searchInput, setSearchInput] = useState(initialRef);
  const [activeOrderNumber, setActiveOrderNumber] = useState(initialRef);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialOrderNumber || reduxOrderNum) {
      const ref = initialOrderNumber || reduxOrderNum || 'INT-91K7A4';
      setSearchInput(ref);
      setActiveOrderNumber(ref);
    }
  }, [initialOrderNumber, reduxOrderNum]);

  // RTK Query hooks
  const { data, isLoading, isError, refetch } = useGetOrderQuery(activeOrderNumber, {
    skip: !activeOrderNumber || !isOpen,
  });

  const [fakePay, { isLoading: isPaying }] = useFakePayOrderMutation();

  if (!isOpen) return null;

  const handleClose = () => {
    if (propsOnClose) {
      propsOnClose();
    } else {
      dispatch(closeTrackingModal());
    }
  };

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
    <div className="fixed inset-0 z-[99999] overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Dark Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Modal Dialog (Centered, High Contrast, Guaranteed on Top) */}
      <div className="relative w-full max-w-2xl my-auto bg-white border border-stone-200 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] text-stone-900 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-white shadow-xs">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Order Tracking & Proof of Purchase
              </h3>
              <p className="text-xs text-stone-600 font-medium">
                Live workshop schedule, milestone verification & digital dispatch receipt
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Order Search & Quick Demo Chips */}
          <div className="space-y-2.5">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter Order Reference (e.g. INT-91K7A4)..."
                  className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono font-bold text-stone-900 uppercase focus:outline-none focus:border-stone-900 focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 active:bg-black rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
              >
                Track Order
              </button>
            </form>

            {/* Quick Demo Order Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-stone-700 mr-1">Quick Demo Orders:</span>
              <button
                type="button"
                onClick={() => handleQuickSelect('INT-91K7A4')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer ${
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
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer ${
                  activeOrderNumber === 'INT-CUSTOM-900'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200'
                }`}
              >
                INT-CUSTOM-900 (Architectural Glass Partition)
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="py-12 text-center text-stone-700 space-y-3">
              <div className="w-8 h-8 border-3 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-semibold">Retrieving real-time workshop logistics...</p>
            </div>
          )}

          {/* Error / Fallback View */}
          {!isLoading && isError && (
            <div className="p-6 bg-stone-50 border border-stone-200 rounded-2xl text-center space-y-3">
              <p className="text-sm font-bold text-stone-900">Reference Not Located</p>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                No active order found for <span className="font-mono font-bold text-stone-900">{activeOrderNumber}</span>. Please click one of the demo chips above to view a live order receipt.
              </p>
              <button
                onClick={() => handleQuickSelect('INT-91K7A4')}
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Load Demo Order INT-91K7A4
              </button>
            </div>
          )}

          {/* Active Order Details */}
          {order && (
            <div className="space-y-6">
              {/* Order Reference & Status Header */}
              <div className="p-4 sm:p-5 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold block">
                    Verified Order Reference
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-lg font-bold text-stone-900">
                      {order.order_number}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer"
                      title="Copy reference number"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-500" />
                      <span>{new Date(order.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-stone-500" />
                      <span>Carrier: L’Atelier White-Glove Fleet</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 ${
                      order.payment_status === 'paid'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-amber-100 text-amber-950 border border-amber-300'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span>{order.payment_status === 'paid' ? 'Payment Confirmed' : 'Deposit Required'}</span>
                  </span>
                  <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider bg-white px-2.5 py-1 rounded-lg border border-stone-200">
                    Fulfillment Stage: {order.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* If unpaid, show 1-Click Fast Pay */}
              {order.payment_status !== 'paid' && (
                <div className="p-4 bg-stone-100 border border-stone-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-stone-900">Demo Showcase: Payment Pending</p>
                    <p className="text-[11px] text-stone-700 leading-relaxed mt-0.5">
                      Authorize this order with our simulated luxury payment gateway to progress to production.
                    </p>
                  </div>
                  <button
                    onClick={handleInstantFakePay}
                    disabled={isPaying}
                    className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-colors shrink-0 cursor-pointer"
                  >
                    {isPaying ? 'Authorizing...' : 'Authorize Demo Pay ($' + order.total_amount.toFixed(2) + ')'}
                  </button>
                </div>
              )}

              {/* ORDER ITEMS LIST: Show WHAT was ordered */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center justify-between">
                  <span>Ordered Items & Specifications</span>
                  <span className="text-stone-500 font-normal">({order.items?.length || 1} Item)</span>
                </h4>

                <div className="bg-white border border-stone-200 rounded-2xl divide-y divide-stone-100 overflow-hidden">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item: any, idx: number) => {
                      const isCustom = item.product_name?.toLowerCase().includes('custom') || item.custom_specs;
                      return (
                        <div key={idx} className="p-4 flex items-center gap-4 hover:bg-stone-50/50 transition-colors">
                          {/* Image or CAD Icon */}
                          <div className="w-16 h-16 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 overflow-hidden">
                            {item.product?.image_url ? (
                              <img
                                src={item.product.image_url}
                                alt={item.product_name}
                                className="w-full h-full object-cover"
                              />
                            ) : isCustom ? (
                              <div className="w-full h-full bg-stone-900 flex flex-col items-center justify-center text-white">
                                <Layers className="w-6 h-6 text-white" />
                                <span className="text-[8px] uppercase tracking-wider mt-0.5 font-mono">CAD Spec</span>
                              </div>
                            ) : (
                              <Package className="w-6 h-6 text-stone-400" />
                            )}
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-stone-900 truncate">
                              {item.product_name}
                            </h5>

                            {/* Custom Specs Pills */}
                            {item.custom_specs && (
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {item.custom_specs.color_finish && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-800 border border-stone-200">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full border border-stone-300"
                                      style={{ backgroundColor: item.custom_specs.alloy_hex || '#C5A059' }}
                                    />
                                    <span>{item.custom_specs.color_finish}</span>
                                  </span>
                                )}
                                {item.custom_specs.height && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-stone-100 text-stone-700">
                                    {item.custom_specs.height}"H x {item.custom_specs.width}"W
                                  </span>
                                )}
                                {item.custom_specs.glass_type && (
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-stone-100 text-stone-700">
                                    {item.custom_specs.glass_type}
                                  </span>
                                )}
                              </div>
                            )}

                            <p className="text-[11px] text-stone-500 mt-1">
                              Qty: <span className="font-bold text-stone-800">{item.quantity}</span> × ${Number(item.unit_price).toFixed(2)}
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-sm font-bold text-stone-900 font-mono">
                              ${Number(item.subtotal || item.unit_price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    /* Fallback Single Mock Item if backend returns plain order */
                    <div className="p-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0">
                        <Package className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-xs font-bold text-stone-900">
                          {(order as any).title || 'Architectural Custom Order'}
                        </h5>
                        <p className="text-[11px] text-stone-600 mt-0.5">
                          Extruded 6063-T6 alloy architectural fitting with tempered glass and soft-close pivots
                        </p>
                        <p className="text-[11px] text-stone-500 mt-1 font-mono">
                          1 Unit × ${order.total_amount.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-stone-900 font-mono">
                          ${order.total_amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 4-Stage Visual Fulfillment Progress Stepper */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Live Workshop & Logistics Milestones
                </h4>
                <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-4">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <p className="text-xs font-bold text-stone-900">Order Registered & CAD Specs Locked</p>
                        <span className="text-[10px] font-semibold text-emerald-800">Completed</span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        Architectural dimensions and material bill generated for workshop floor.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs ${
                        order.payment_status === 'paid'
                          ? 'bg-emerald-700 text-white'
                          : 'bg-stone-300 text-stone-700'
                      }`}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <p className="text-xs font-bold text-stone-900">Deposit & Payment Verification</p>
                        <span
                          className={`text-[10px] font-semibold ${
                            order.payment_status === 'paid' ? 'text-emerald-800' : 'text-stone-600'
                          }`}
                        >
                          {order.payment_status === 'paid' ? 'Verified' : 'Pending Deposit'}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        {order.payment_status === 'paid'
                          ? 'Digital escrow and card authorization confirmed.'
                          : 'Awaiting client deposit verification.'}
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs animate-pulse">
                      <Layers className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <p className="text-xs font-bold text-stone-900">
                          Precision Fabrication & Surface Coating
                        </p>
                        <span className="text-[10px] font-bold text-stone-900 uppercase">In Production</span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        Extrusion cutting, CNC miter joint assembly, electrostatic powder coating, and laser inspection.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <p className="text-xs font-bold text-stone-500">White-Glove Delivery & Installation</p>
                        <span className="text-[10px] text-stone-500">Scheduled Dispatch</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Hand delivery by trained master technicians with unboxing and hardware mounting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recipient & Financial Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-stone-600 font-bold mb-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-700" />
                    <span>Shipping Destination</span>
                  </div>
                  <p className="text-xs font-bold text-stone-900">{order.customer_name || 'Client Spec'}</p>
                  <p className="text-[11px] text-stone-700 mt-0.5">{order.shipping_address || 'Design District Suite 400'}</p>
                  <p className="text-[11px] text-stone-700">
                    {order.city || 'Austin'}, {order.postal_code || '78701'}
                  </p>
                  <p className="text-[11px] text-stone-600 mt-1">Phone: {order.customer_phone || '+1 (555) 0192'}</p>
                </div>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
                  <p className="text-[10px] uppercase tracking-wider text-stone-600 font-bold mb-1">
                    Financial Ledger
                  </p>
                  <div className="flex justify-between text-stone-700">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900">
                      ${Number(order.subtotal || order.total_amount).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>White-Glove Logistics</span>
                    <span className="font-semibold text-stone-900">
                      {order.shipping_fee === 0 || !order.shipping_fee ? 'Complimentary' : `$${Number(order.shipping_fee).toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-300">
                    <span>Total Amount</span>
                    <span className="text-emerald-800 font-mono font-bold">${Number(order.total_amount).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-between items-center">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-800 hover:text-stone-900 hover:bg-stone-200/60 rounded-xl transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Invoice</span>
          </button>
          <button
            onClick={handleClose}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
