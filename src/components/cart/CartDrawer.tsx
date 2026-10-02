'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Copy, Check } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  setDrawerOpen,
} from '@/store/slices/cartSlice';
import { useCreateOrderMutation } from '@/store/services/consultationApi';
import { DemoPaymentGateway, PaymentSuccessDetails } from './DemoPaymentGateway';
import { OrderTrackingModal } from './OrderTrackingModal';
import { resolveImageUrl, FALLBACK_PRODUCT_IMAGE } from '@/utils/imageUrl';

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, isDrawerOpen } = useAppSelector((state) => state.cart);
  const [createOrder, { isLoading: isCheckingOut }] = useCreateOrderMutation();

  const currency = useAppSelector((state) => state.ui.currency);

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'payment' | 'success'>('cart');
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentSuccessDetails | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Riyadh · الرياض',
    postalCode: '',
    notes: '',
  });

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 500 || subtotal === 0 ? 0 : 25;
  const total = subtotal + shippingFee;

  const formatPrice = (usd: number) => {
    if (currency === 'SAR') {
      return `${Math.round(usd * 3.75).toLocaleString()} SAR`;
    }
    return `$${usd.toFixed(2)}`;
  };

  if (!isDrawerOpen) return null;


  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setCheckoutStep('payment');
  };

  const handlePaymentAuthorize = async (details: PaymentSuccessDetails) => {
    try {
      const res = await createOrder({
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        notes: formData.notes,
        payment_method: details.method === 'demo_card' ? 'demo_card' : details.method,
        items: items.map((i) => ({
          product_id: i.product.id,
          quantity: i.quantity,
        })),
      }).unwrap();

      setOrderNumber(res.data.order_number);
      setPaymentDetails(details);
      setCheckoutStep('success');
      dispatch(clearCart());
    } catch (err: unknown) {
      const errorMsg =
        (err as { data?: { message?: string } })?.data?.message ||
        'Unable to place order with backend. Please check your network or try again.';
      alert(errorMsg);
    }
  };

  const handleCopyOrderNumber = () => {
    if (orderNumber) {
      navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const closeDrawer = () => {
    dispatch(setDrawerOpen(false));
    if (checkoutStep === 'success') {
      setCheckoutStep('cart');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 text-stone-900 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-800" />
              <h2 className="text-base font-serif tracking-tight uppercase font-bold text-stone-900">
                {checkoutStep === 'cart' && 'Your Bag'}
                {checkoutStep === 'checkout' && 'Shipping & Delivery'}
                {checkoutStep === 'payment' && 'Simulated Payment Gateway'}
                {checkoutStep === 'success' && 'Order & Payment Confirmed'}
              </h2>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutStep === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 text-stone-500">
                    <ShoppingBag className="w-12 h-12 stroke-[1.2] text-stone-300 mb-4" />
                    <p className="text-stone-900 font-serif text-lg font-semibold mb-1">Your bag is empty</p>
                    <p className="text-xs text-stone-500 mb-6">
                      Explore our handcrafted furniture and architectural fittings.
                    </p>
                    <button
                      onClick={closeDrawer}
                      className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-full transition-colors shadow-sm"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map(({ product, quantity }) => (
                      <div
                        key={product.id}
                        className="flex gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-200/80"
                      >
                        <div className="relative w-20 h-20 bg-stone-200 rounded-xl overflow-hidden shrink-0">
                          {product.image_url ? (
                            <Image
                              src={resolveImageUrl(product.image_url)}
                              alt={product.name}
                              fill
                              sizes="80px"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = FALLBACK_PRODUCT_IMAGE;
                              }}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-xs font-bold text-stone-900 line-clamp-1">
                                {product.name}
                              </h3>
                              <button
                                onClick={() => dispatch(removeFromCart(product.id))}
                                className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-[11px] text-stone-500">{product.color || 'Standard'}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-bold text-stone-900 font-mono">
                              {formatPrice(product.price * quantity)}
                            </span>

                            <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                              <button
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      productId: product.id,
                                      quantity: quantity - 1,
                                    })
                                  )
                                }
                                className="px-2 py-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 py-1 text-xs font-bold text-stone-900">
                                {quantity}
                              </span>
                              <button
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      productId: product.id,
                                      quantity: quantity + 1,
                                    })
                                  )
                                }
                                className="px-2 py-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'checkout' && (
              <form id="checkout-form" onSubmit={handleDeliverySubmit} className="space-y-4">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-600 text-xs">
                  <span className="font-semibold text-stone-900">Step 1 of 2:</span> Enter your delivery information before accessing the client demo payment gateway.
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                    placeholder="Julian Thorne"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                      placeholder="julian@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Phone *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Delivery Address *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                    placeholder="742 Evergreen Terrace"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      City *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                      placeholder="Seattle"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                      placeholder="98101"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Delivery Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 focus:bg-white"
                    placeholder="Service elevator access, gate code..."
                  />
                </div>
              </form>
            )}

            {/* Simulated Payment Gateway Step */}
            {checkoutStep === 'payment' && (
              <DemoPaymentGateway
                totalAmount={total}
                customerName={formData.name}
                customerEmail={formData.email}
                isProcessing={isCheckingOut}
                onPaymentAuthorize={handlePaymentAuthorize}
                onBack={() => setCheckoutStep('checkout')}
              />
            )}

            {/* Order Confirmed & Payment Verified Screen */}
            {checkoutStep === 'success' && (
              <div className="h-full flex flex-col justify-center py-6 space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-3 mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-1">
                    Payment Verified & Confirmed
                  </h3>
                  <p className="text-xs text-stone-500">
                    Demo payment simulation approved · Zero actual charges processed
                  </p>
                </div>

                {/* Digital Receipt Card */}
                <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 space-y-3">
                  <div className="flex justify-between items-center pb-2.5 border-b border-stone-200">
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold">
                        Order Reference
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-sm font-mono font-bold text-stone-900">
                          {orderNumber}
                        </span>
                        <button
                          onClick={handleCopyOrderNumber}
                          className="p-1 text-stone-400 hover:text-stone-700 transition-colors"
                          title="Copy order number"
                        >
                          {copied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Paid in Full
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Payment Gateway:</span>
                      <span className="font-medium text-stone-900">
                        {paymentDetails?.methodLabel || 'Demo Card (Visa •••• 4242)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Transaction ID:</span>
                      <span className="font-mono text-stone-900">
                        {paymentDetails?.transactionId || 'TXN-DEMO-98213'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Client Name:</span>
                      <span className="font-medium text-stone-900">{formData.name || 'Julian Thorne'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Total Paid:</span>
                      <span className="font-bold text-stone-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2.5">
                  <button
                    onClick={() => setIsTrackingModalOpen(true)}
                    className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>Track Live Order & Milestones</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={closeDrawer}
                    className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-700 hover:text-stone-900 border border-stone-200 bg-white hover:bg-stone-100 rounded-xl transition-colors"
                  >
                    Continue Browsing Catalog
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer actions for cart and delivery steps */}
          {items.length > 0 && checkoutStep !== 'payment' && checkoutStep !== 'success' && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-900 font-semibold font-mono">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>White-Glove Shipping</span>
                  <span className="text-stone-900 font-semibold">
                    {shippingFee === 0 ? 'Complimentary (مجاني)' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Due / الإجمالي</span>
                  <span className="font-mono text-base font-bold text-[#163b2f]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-[#163b2f] hover:bg-[#1f4e3f] border border-[#c5a059]/40 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <span>Proceed to Delivery Info</span>
                  <ArrowRight className="w-4 h-4 text-[#dfca92]" />
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-1/3 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-700 hover:text-stone-900 border border-stone-300 rounded-xl transition-colors bg-white cursor-pointer"
                  >
                    Back to Bag
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="w-2/3 flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-[#163b2f] hover:bg-[#1f4e3f] border border-[#c5a059]/40 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    <span>Proceed to Demo Payment</span>
                    <ArrowRight className="w-4 h-4 text-[#dfca92]" />
                  </button>
                </div>
              )}

            </div>
          )}
        </div>
      </div>

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        initialOrderNumber={orderNumber}
      />
    </div>
  );
}
