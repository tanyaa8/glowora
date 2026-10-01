import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { coupons, applyCoupon, setActiveTab, setSelectedCategory, showToast } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    showToast(`Coupon "${code}" copied & applied to your cart!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="bg-[#FBCAD6] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-rose-800 bg-rose-100/70 border border-rose-200/60 px-3 py-1 rounded-full mb-3">
            <Sparkles size={13} className="text-rose-600" />
            <span>Exclusive Privileges</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Beauty Deals & Promo Codes
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Unlock instant savings, complimentary express delivery thresholds, and seasonal discounts on our luxury collection.
          </p>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs flex flex-col justify-between hover:border-stone-400 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-base font-bold text-stone-900 bg-[#FAF9F5] border border-stone-300 px-3 py-1 rounded-lg">
                    {coupon.code}
                  </span>
                  <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full">
                    {coupon.discountType === 'percentage'
                      ? `${coupon.discountValue}% OFF`
                      : `₹${coupon.discountValue} FLAT OFF`}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                  {coupon.description}
                </h3>
                <p className="text-xs text-stone-500">
                  Minimum cart value required: <strong className="text-stone-800">₹{coupon.minOrderValue.toLocaleString('en-IN')}</strong>
                </p>
                <p className="text-[11px] text-stone-400 mt-1">
                  Valid until: {coupon.expiresOn} · One use per checkout
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span>Copied & Applied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy & Apply</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setActiveTab('shop');
                  }}
                  className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1"
                >
                  Shop Now <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bank & Payment Offers */}
        <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-2xs">
          <h2 className="font-serif text-xl font-bold text-stone-900 mb-4">
            Payment Partner Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1">
              <span className="font-bold text-stone-900">UPI Payments</span>
              <p className="text-stone-600">Extra 10% instant auto-discount verified at checkout on Google Pay & PhonePe.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1">
              <span className="font-bold text-stone-900">Complimentary Shipping</span>
              <p className="text-stone-600">Free courier air delivery threshold applied automatically on all orders above ₹499.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1">
              <span className="font-bold text-stone-900">First Purchase Welcome</span>
              <p className="text-stone-600">New accounts receive an instant ₹50 welcome coupon code (WELCOME50).</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
