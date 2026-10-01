import React from 'react';
import { useApp } from '../../context/AppContext';
import { heroBannerImg } from '../../data/mockData';
import { ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveTab, setSelectedCategory, setIsAdvisorModalOpen } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FBCAD6] via-[#FDCFE0] to-[#FBBECF] border-b border-rose-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-rose-800 bg-rose-100/70 border border-rose-200/60 px-3 py-1 rounded-full">
              <Sparkles size={13} className="text-rose-600" />
              <span>Autumn Glow Atelier 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15] text-balance">
              Glow Your Way
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-xl font-normal leading-relaxed">
              Discover beauty products made for you. Clinically proven bio-ferments, pure cold-pressed botanicals, and high-impact artisanal pigments crafted for effortless radiance.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setActiveTab('shop');
                }}
                className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
              >
                <span>SHOP NOW</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => setActiveTab('offers')}
                className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 text-sm font-semibold rounded-xl shadow-2xs hover:shadow-xs transition-all"
              >
                EXPLORE OFFERS
              </button>

              <button
                onClick={() => setIsAdvisorModalOpen(true)}
                className="px-4 py-3.5 text-rose-800 hover:text-rose-950 text-sm font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Sparkles size={16} />
                <span>Take Beauty Quiz</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-stone-200/60 grid grid-cols-3 gap-4">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">150K+</p>
                <p className="text-xs text-stone-500 font-medium">Radiant Customers</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">100%</p>
                <p className="text-xs text-stone-500 font-medium">Clean & Toxin-Free</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">4.8 / 5</p>
                <p className="text-xs text-stone-500 font-medium">Average Review</p>
              </div>
            </div>

          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto rounded-2xl overflow-hidden shadow-xl border border-stone-200/90 aspect-16/10 bg-stone-100">
              <img
                src={heroBannerImg}
                alt="Glowora Luxury Beauty Collection"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700 ease-out"
              />
              
              {/* Floating feature card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-stone-200/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-700 font-serif font-bold text-base">
                    ✨
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900">Cellular Golden Glow</p>
                    <p className="text-[11px] text-stone-500">15% Triple-Active Vitamin C</p>
                    <p className="text-xs font-semibold text-rose-700 mt-0.5">₹799 <span className="text-[10px] text-stone-400 line-through">₹1,099</span></p>
                  </div>
                </div>
              </div>

            </div>

            {/* Subtle decorative background blur glow */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};
