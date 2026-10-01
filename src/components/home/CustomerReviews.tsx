import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { INITIAL_REVIEWS } from '../../data/mockData';

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-[#FBCAD6] via-[#FDCFE0] to-[#FBBECF] border-b border-rose-300/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-amber-400" />
            ))}
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Loved by 150,000+ Customers
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Real feedback from verified beauty collectors across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white/95 backdrop-blur-xs p-6 rounded-2xl border border-rose-200/70 flex flex-col justify-between hover:shadow-xs transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400 tabular-nums">
                    {rev.date}
                  </span>
                </div>

                <h3 className="font-serif text-sm font-bold text-stone-900 mb-2">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-200/60 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-stone-900">{rev.userName}</p>
                  <p className="text-[10px] text-stone-500">Verified Buyer</p>
                </div>
                <CheckCircle2 size={16} className="text-emerald-600" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
