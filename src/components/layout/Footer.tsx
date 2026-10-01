import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Truck, Sparkles, RefreshCw, Mail, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setSelectedCategory, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast(`Thank you! 15% discount coupon sent to ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Guarantees Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-rose-300">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Free Express Delivery</p>
              <p className="text-xs text-stone-400">On all orders above ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-rose-300">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">100% Authentic Beauty</p>
              <p className="text-xs text-stone-400">Sourced directly from verified brands</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-rose-300">
              <RefreshCw size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Hassle-Free Returns</p>
              <p className="text-xs text-stone-400">7-day easy replacement policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-rose-300">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Clean & Cruelty-Free</p>
              <p className="text-xs text-stone-400">Dermatologist tested formulations</p>
            </div>
          </div>
        </div>

        {/* 4-Column Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-stone-800">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-white">
              Glowora
            </h2>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Curated luxury cosmetics, high-performance botanical skincare, and artisanal perfumery tailored for radiant Indian skin tones and diverse climates.
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                Join the Glowora Circle
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-stone-800 text-stone-100 text-xs px-3.5 py-2.5 rounded-l-lg border border-stone-700 focus:outline-none focus:border-rose-400 flex-1"
                />
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-4 py-2.5 rounded-r-lg transition-colors flex items-center gap-1"
                >
                  Join <ArrowRight size={13} />
                </button>
              </form>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-4">
              Beauty Categories
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-400">
              {['Makeup', 'Skincare', 'Haircare', 'Fragrance', 'Bath & Body', 'Wellness', 'Men', 'Nails'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat as any);
                      setActiveTab('shop');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-4">
              Customer Experience
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => setActiveTab('orders')} className="hover:text-white transition-colors">
                  My Orders & Tracking
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('wishlist')} className="hover:text-white transition-colors">
                  Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('offers')} className="hover:text-white transition-colors">
                  Exclusive Offers & Coupons
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">
                  About Our Formulations
                </button>
              </li>
            </ul>
          </div>

          {/* Project Architecture Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-4">
              System Architecture
            </h3>
            <div className="space-y-2 text-xs text-stone-400">
              <p>🎓 <span className="text-stone-300 font-medium">BCA Capstone Project</span></p>
              <p>⚡ Frontend: React 19 + TypeScript + Tailwind CSS</p>
              <p>🗄️ Relational DB Schema: Users, Products, Categories, Orders, Order_Items, Wishlist, Reviews, Addresses</p>
              <p>💳 Payment Simulation: COD, UPI QR & Card</p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('admin')}
                  className="text-xs font-semibold text-rose-400 hover:text-rose-300 underline underline-offset-2"
                >
                  Access Admin Console →
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Glowora Cosmetics Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Prices inclusive of all taxes</span>
            <span>·</span>
            <span>Security: 256-Bit SSL Encrypted</span>
            <span>·</span>
            <span className="text-stone-400">Currency: INR (₹)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
