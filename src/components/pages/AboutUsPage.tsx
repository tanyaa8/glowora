import React from 'react';
import { useApp } from '../../context/AppContext';
import { heroBannerImg } from '../../data/mockData';
import { Sparkles, Shield, Heart, Award, ArrowRight } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="bg-[#FBCAD6] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Intro Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-wider uppercase text-rose-800">
            Our Heritage & Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
            Clean Science Meets Ancient Botanical Wisdom
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            Founded with a singular mission: to eliminate the compromise between pure non-toxic ingredients and opulent, high-performance cosmetic results.
          </p>
        </div>

        {/* Feature Visual */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200 aspect-16/9 bg-stone-100">
          <img
            src={heroBannerImg}
            alt="Glowora Laboratory & Formulation Atelier"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-700">
              <Sparkles size={20} />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900">100% Transparency</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every drop, seed extract, and preservative is fully disclosed. We formulate with zero parabens, mineral oils, or synthetic sulfates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-700">
              <Shield size={20} />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900">Dermatologically Verified</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tested rigorously across diverse Indian skin types and weather conditions—from humid coastal climates to dry winter air.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-700">
              <Award size={20} />
            </div>
            <h3 className="font-serif text-base font-bold text-stone-900">Ethical & Cruelty-Free</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Never tested on animals. Packaged in recyclable amber glass flacons and biodegradable FSC-certified mailers.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-stone-900 text-white p-8 rounded-2xl text-center space-y-4">
          <h2 className="font-serif text-2xl font-bold">Experience the Glowora Ritual</h2>
          <p className="text-xs text-stone-400 max-w-md mx-auto">
            Discover formulations loved by over 150,000 customers across India.
          </p>
          <button
            onClick={() => setActiveTab('shop')}
            className="px-6 py-3 bg-white text-stone-900 hover:bg-stone-100 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
          >
            Explore Catalog <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};
