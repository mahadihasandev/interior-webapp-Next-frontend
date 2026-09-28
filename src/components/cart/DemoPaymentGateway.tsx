'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  Lock,
  Building2,
  Truck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text, SmallText } from '@/components/ui/Typography';

export interface PaymentSuccessDetails {
  method: 'demo_card' | 'bank_transfer' | 'cash';
  methodLabel: string;
  transactionId: string;
  cardLast4?: string;
}

interface DemoPaymentGatewayProps {
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  isProcessing: boolean;
  onPaymentAuthorize: (details: PaymentSuccessDetails) => Promise<void>;
  onBack: () => void;
}

export function DemoPaymentGateway({
  totalAmount,
  customerName,
  customerEmail,
  isProcessing,
  onPaymentAuthorize,
  onBack,
}: DemoPaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState<'demo_card' | 'bank_transfer' | 'cash'>(
    'demo_card'
  );

  // Simulated card details
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardHolder, setCardHolder] = useState(
    customerName ? customerName.toUpperCase() : 'JULIAN THORNE'
  );

  // Simulated gateway processing steps
  const [simulationStep, setSimulationStep] = useState<string | null>(null);

  const handleSimulatePayment = async () => {
    if (selectedMethod === 'demo_card') {
      setSimulationStep('Connecting to secure demo payment gateway...');
      await new Promise((r) => setTimeout(r, 400));
      setSimulationStep('Verifying simulated card authorization...');
      await new Promise((r) => setTimeout(r, 600));
      setSimulationStep('Payment verified and approved!');
      await new Promise((r) => setTimeout(r, 300));
    }

    const txnId = 'TXN-DEMO-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const label =
      selectedMethod === 'demo_card'
        ? 'Demo Card (Visa •••• 4242)'
        : selectedMethod === 'bank_transfer'
        ? 'Direct Bank Wire (Architectural Escrow)'
        : 'Cash / Project Invoice on Delivery';

    await onPaymentAuthorize({
      method: selectedMethod,
      methodLabel: label,
      transactionId: txnId,
      cardLast4: selectedMethod === 'demo_card' ? '4242' : undefined,
    });

    setSimulationStep(null);
  };

  return (
    <div className="space-y-6">
      {/* Client Demo Notice Banner */}
      <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex items-start gap-3">
        <div className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-800">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-amber-900 uppercase tracking-wider">
            Client Showcase · Instant Simulated Payment
          </p>
          <p className="text-[11px] text-amber-800/90 leading-relaxed mt-0.5">
            Real merchant gateways (Stripe / Bank Wire) can be connected later. Authorizing below simulates real-time approval and generates your client order.
          </p>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div className="space-y-2">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
          Select Payment Method
        </label>
        <div className="grid grid-cols-1 gap-2">
          {/* Option 1: Demo Virtual Luxury Card */}
          <button
            type="button"
            onClick={() => setSelectedMethod('demo_card')}
            className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
              selectedMethod === 'demo_card'
                ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  selectedMethod === 'demo_card'
                    ? 'bg-stone-800 text-amber-300'
                    : 'bg-stone-100 text-stone-700'
                }`}
              >
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">Simulated Credit Card</span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                      selectedMethod === 'demo_card'
                        ? 'bg-amber-400/20 text-amber-300'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    Instant Demo
                  </span>
                </div>
                <p
                  className={`text-[11px] mt-0.5 ${
                    selectedMethod === 'demo_card' ? 'text-stone-300' : 'text-stone-500'
                  }`}
                >
                  Visa / Mastercard · 1-Click Instant Authorization
                </p>
              </div>
            </div>
            {selectedMethod === 'demo_card' && (
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            )}
          </button>

          {/* Option 2: Architectural Escrow / Wire Transfer */}
          <button
            type="button"
            onClick={() => setSelectedMethod('bank_transfer')}
            className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
              selectedMethod === 'bank_transfer'
                ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  selectedMethod === 'bank_transfer'
                    ? 'bg-stone-800 text-amber-300'
                    : 'bg-stone-100 text-stone-700'
                }`}
              >
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold">Bank Wire / Architectural Deposit</p>
                <p
                  className={`text-[11px] ${
                    selectedMethod === 'bank_transfer' ? 'text-stone-300' : 'text-stone-500'
                  }`}
                >
                  Corporate wire transfer instructions sent via email
                </p>
              </div>
            </div>
            {selectedMethod === 'bank_transfer' && (
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            )}
          </button>

          {/* Option 3: Cash / Invoice on Delivery */}
          <button
            type="button"
            onClick={() => setSelectedMethod('cash')}
            className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
              selectedMethod === 'cash'
                ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  selectedMethod === 'cash'
                    ? 'bg-stone-800 text-amber-300'
                    : 'bg-stone-100 text-stone-700'
                }`}
              >
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold">White-Glove Delivery Invoice</p>
                <p
                  className={`text-[11px] ${
                    selectedMethod === 'cash' ? 'text-stone-300' : 'text-stone-500'
                  }`}
                >
                  Pay via certified check on professional installation
                </p>
              </div>
            </div>
            {selectedMethod === 'cash' && (
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            )}
          </button>
        </div>
      </div>

      {/* Simulated Virtual Card Graphic & Fields (when Card selected) */}
      {selectedMethod === 'demo_card' && (
        <div className="space-y-4 pt-1">
          {/* Luxury Virtual Card Visual */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 p-5 text-white shadow-xl border border-stone-700/60">
            {/* Background subtle watermark */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="font-serif tracking-widest text-xs uppercase font-bold text-amber-200">
                  L’Atelier Privé
                </span>
                <span className="text-[9px] px-1.5 py-0.2 bg-white/10 rounded font-mono text-stone-300 uppercase">
                  DEMO PASS
                </span>
              </div>
              {/* EMV Gold Chip Icon */}
              <div className="w-9 h-6.5 rounded-md bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 border border-amber-500/50 shadow-inner flex items-center justify-center">
                <div className="w-full h-full border border-amber-600/30 rounded grid grid-cols-2 opacity-60" />
              </div>
            </div>

            {/* Card Number */}
            <div className="font-mono text-base tracking-widest text-stone-100 mb-4 drop-shadow-sm font-semibold">
              {cardNumber}
            </div>

            <div className="flex justify-between items-end text-[10px] text-stone-400">
              <div>
                <p className="uppercase tracking-wider text-[9px] text-stone-400">Cardholder</p>
                <p className="font-bold text-stone-100 tracking-wider text-xs uppercase font-sans mt-0.5">
                  {cardHolder}
                </p>
              </div>
              <div>
                <p className="uppercase tracking-wider text-[9px] text-stone-400">Expires</p>
                <p className="font-mono font-bold text-stone-100 text-xs mt-0.5">{cardExpiry}</p>
              </div>
              <div className="text-right">
                <span className="font-serif italic font-bold text-sm tracking-wider text-stone-200">
                  VISA
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Simulated Inputs */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="col-span-3">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Card Number (Demo)
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 uppercase focus:outline-none focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                CVV
              </label>
              <input
                type="text"
                maxLength={4}
                value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono text-stone-900 focus:outline-none focus:border-stone-900 text-center"
              />
            </div>
          </div>
        </div>
      )}

      {/* Simulated Live Gateway Progress Indicator */}
      {simulationStep && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-emerald-800 text-xs">
          <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
          <span className="font-semibold">{simulationStep}</span>
        </div>
      )}

      {/* Security & Guarantee Badges */}
      <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-200">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit SSL Encrypted Handshake</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
          <span>Client Showcase Mode</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing || !!simulationStep}
          className="w-1/3 py-3 text-xs font-semibold uppercase tracking-wider text-stone-700 hover:text-stone-900 border border-stone-300 rounded-xl transition-colors bg-white disabled:opacity-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleSimulatePayment}
          disabled={isProcessing || !!simulationStep}
          className="w-2/3 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest text-white bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 rounded-xl transition-all shadow-md shadow-emerald-700/20 disabled:opacity-50 cursor-pointer"
        >
          {isProcessing || simulationStep ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Authorize & Pay ${totalAmount.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
