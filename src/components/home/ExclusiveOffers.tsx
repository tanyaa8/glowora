import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Tag, ArrowRight } from 'lucide-react';
import { perfumeImg } from '../../data/mockData';

export const ExclusiveOffers: React.FC = () => {
  const { setActiveTab, setSelectedCategory, showToast, applyCoupon } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    showToast(`Code "${code}" copied & applied!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="py-16 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <div className="relative rounded-2xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white overflow-hidden shadow-xl border border-stone-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-rose-300 bg-rose-950/60 border border-rose-800/60 px-3 py-1 rounded-full">
                <Tag size={13} />
                <span>Limited Period Festive Privilege</span>
              </div>

              <div>
                <p className="text-sm font-semibold tracking-wider text-rose-300 uppercase">
                  Autumn Solstice Offer
                </p>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2 leading-tight">
                  FLAT 30% OFF
                </h2>
                <p className="text-stone-300 text-base sm:text-lg mt-2">
                  On selected high-science skincare & artisanal fragrances.
                </p>
              </div>

              {/* Promo Code Box */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center bg-stone-800/90 border border-stone-700 rounded-xl px-4 py-2.5">
                  <span className="text-xs text-stone-400 mr-2 uppercase tracking-wider">Coupon Code:</span>
                  <span className="font-mono text-base font-bold text-amber-300 tracking-wider">LUXE30</span>
                  <button
                    onClick={() => handleCopyCode('LUXE30')}
                    className="ml-3 p-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-white transition-colors"
                    title="Copy and apply coupon"
                  >
                    {copiedCode === 'LUXE30' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory('Skincare');
                    setActiveTab('shop');
                  }}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold tracking-wide uppercase rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
                >
                  Shop Skincare Now <ArrowRight size={14} />
                </button>
              </div>

              {/* Subtext info */}
              <p className="text-xs text-stone-400">
                *Valid on orders above ₹1,499. Instant deduction applied automatically at checkout.
              </p>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden bg-stone-800">
              <img
                src={perfumeImg}
                alt="Exclusive Skincare Offer"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-900 via-transparent to-transparent" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
