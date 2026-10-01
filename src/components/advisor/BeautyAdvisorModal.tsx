import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, X, ArrowRight, Check, ShoppingBag, RotateCcw } from 'lucide-react';
import { Product } from '../../types';

export const BeautyAdvisorModal: React.FC = () => {
  const { 
    isAdvisorModalOpen, 
    setIsAdvisorModalOpen, 
    products, 
    viewProductDetails, 
    addToCart 
  } = useApp();

  const [step, setStep] = useState(1);
  const [skinType, setSkinType] = useState('All');
  const [primaryConcern, setPrimaryConcern] = useState('Glow');
  const [formatPref, setFormatPref] = useState('Serum');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  if (!isAdvisorModalOpen) return null;

  const handleRunAdvisor = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // Find matching products
      let matches = products.filter((p) => {
        const text = (p.name + ' ' + p.description + ' ' + p.category).toLowerCase();
        if (primaryConcern === 'Glow' && text.includes('vitamin c') || text.includes('glow')) return true;
        if (primaryConcern === 'Hydration' && (text.includes('hyaluronic') || text.includes('hydrat') || text.includes('dew'))) return true;
        if (primaryConcern === 'Anti-Aging' && (text.includes('bakuchiol') || text.includes('night oil') || text.includes('firm'))) return true;
        if (primaryConcern === 'Hair Restoration' && (p.category === 'Haircare')) return true;
        if (primaryConcern === 'Luxury Fragrance' && (p.category === 'Fragrance')) return true;
        return false;
      });

      if (matches.length === 0) {
        matches = products.slice(0, 3);
      }

      setRecommendations(matches.slice(0, 3));
      setIsAnalyzing(false);
      setStep(4);
    }, 900);
  };

  const handleReset = () => {
    setStep(1);
    setRecommendations([]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-stone-900 to-stone-850 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-500/30">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-white">
                Glowora AI Beauty & Skin Advisor
              </h2>
              <p className="text-[11px] text-stone-300">
                Personalized skincare & fragrance matchmaking
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdvisorModalOpen(false)}
            className="p-1 rounded-full text-stone-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Skin Profile */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2 py-0.5 rounded">
                  Step 1 of 3
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-2">
                  What is your primary skin or beauty profile?
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Select your current texture and hydration tendency.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'Dry', label: 'Dry / Dehydrated', desc: 'Flakiness, tight feeling, needs deep moisture' },
                  { id: 'Oily', label: 'Oily / Acne-Prone', desc: 'Excess shine, enlarged pores, breakouts' },
                  { id: 'Combination', label: 'Combination Skin', desc: 'Oily T-zone, normal or dry cheeks' },
                  { id: 'Sensitive', label: 'Sensitive / Redness', desc: 'Easily irritated, reactive to fragrance' },
                  { id: 'Hair', label: 'Hair & Scalp Focus', desc: 'Thinning, frizz, dry ends or dandruff' },
                  { id: 'All', label: 'Normal / Balanced', desc: 'Generally comfortable, maintaining glow' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSkinType(item.id)}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                      skinType === item.id
                        ? 'border-stone-900 bg-stone-50/70 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-stone-900">{item.label}</p>
                    <p className="text-[10px] text-stone-500 mt-0.5 leading-snug">{item.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  Continue <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Main Concern */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2 py-0.5 rounded">
                  Step 2 of 3
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-2">
                  What result do you want to achieve first?
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Choose your targeted skincare or beauty priority.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'Glow', title: 'Radiant Porcelain Glow & Brightening', desc: 'Fade dark spots, even out tanning and boost luminosity' },
                  { id: 'Hydration', title: 'Plumping 24h Glass Hydration', desc: 'Repair moisture barrier, bouncy dewy skin without oiliness' },
                  { id: 'Anti-Aging', title: 'Collagen Renewal & Smoothing', desc: 'Retinol-alternative Bakuchiol, soften fine expression lines' },
                  { id: 'Hair Restoration', title: 'Hair Fall Control & Follicle Strength', desc: 'Cold-pressed rosemary, bhringraj and scalp nourishment' },
                  { id: 'Luxury Fragrance', title: 'Long-Lasting Artisanal Perfumery', desc: 'Niche sandalwood, French jasmine and warm amber trail' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPrimaryConcern(item.id)}
                    className={`w-full p-3.5 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                      primaryConcern === item.id
                        ? 'border-stone-900 bg-stone-50/70 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-stone-900">{item.title}</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">{item.desc}</p>
                    </div>
                    {primaryConcern === item.id && (
                      <Check size={16} className="text-stone-900 shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700"
                >
                  Back
                </button>
                <button
                  onClick={handleRunAdvisor}
                  disabled={isAnalyzing}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {isAnalyzing ? (
                    <span>Analyzing formulation matches...</span>
                  ) : (
                    <>
                      <span>Get Recommendations</span>
                      <Sparkles size={14} className="text-rose-300" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 (RESULTS): Tailored Curations */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    Match Complete
                  </span>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">
                    Your Personalized Beauty Routine
                  </h3>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1"
                >
                  <RotateCcw size={12} /> Retake Quiz
                </button>
              </div>

              <p className="text-xs text-stone-600 bg-[#FAF9F5] p-3.5 rounded-xl border border-stone-200">
                Based on your <strong>{skinType}</strong> profile and desire for <strong>{primaryConcern}</strong>, our laboratory advisor recommends these active bio-botanicals:
              </p>

              {/* Recommended cards */}
              <div className="space-y-3">
                {recommendations.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-stone-400 transition-colors flex items-center justify-between gap-4"
                  >
                    <div 
                      onClick={() => {
                        viewProductDetails(prod);
                        setIsAdvisorModalOpen(false);
                      }}
                      className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-14 h-14 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-stone-400">
                          {prod.brand} · {prod.category}
                        </span>
                        <h4 className="text-xs font-bold text-stone-900 truncate">
                          {prod.name}
                        </h4>
                        <p className="text-xs font-bold text-stone-900 mt-0.5 tabular-nums">
                          ₹{prod.price.toLocaleString('en-IN')}{' '}
                          {prod.originalPrice > prod.price && (
                            <span className="text-[10px] text-stone-400 line-through">
                              ₹{prod.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
                    >
                      <ShoppingBag size={12} /> Add
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsAdvisorModalOpen(false)}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider"
              >
                Close & Continue Exploring
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
