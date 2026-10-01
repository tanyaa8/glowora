import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order Enquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    setIsSent(true);
    showToast('Your message has been received! Our beauty team will reply within 4 hours.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="bg-[#FBCAD6] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-rose-800">
            We Are Here To Assist You
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Contact Glowora Atelier
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Have a question about skin consultations, custom orders, or courier tracking? Connect with our dedicated beauty concierge.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-5">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Customer Care & Concierge
              </h3>

              <div className="space-y-4 text-xs text-stone-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Email Inquiries</p>
                    <p className="text-stone-500">concierge@glowora.com</p>
                    <p className="text-[10px] text-stone-400">Response within 2-4 business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Toll-Free Support</p>
                    <p className="text-stone-500">1800-266-GLOW (9 AM - 8 PM IST)</p>
                    <p className="text-[10px] text-stone-400">Monday through Saturday</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">Registered Office & Atelier</p>
                    <p className="text-stone-500 leading-relaxed">
                      Glowora House, Plot C-42, G Block, Bandra Kurla Complex, Bandra East, Mumbai 400051
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ card */}
            <div className="p-5 bg-stone-900 text-white rounded-2xl space-y-2 text-xs">
              <p className="font-serif font-bold text-sm">Need immediate delivery tracking?</p>
              <p className="text-stone-300">You can look up your real-time courier consignment by visiting the My Orders tab in your profile anytime.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs">
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-4">
              Send Us a Message
            </h3>

            {isSent ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full mx-auto flex items-center justify-center">
                  <MessageCircle size={22} />
                </div>
                <h4 className="font-serif text-base font-bold text-emerald-950">Thank you for reaching out!</h4>
                <p className="text-xs text-emerald-800">Your inquiry has been routed to our skin consultants. We will get back to you shortly.</p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-4 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-lg mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-xl focus:outline-none focus:border-stone-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-xl focus:outline-none focus:border-stone-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-xl focus:outline-none"
                  >
                    <option value="Order Enquiry">Order Status & Tracking</option>
                    <option value="Product Recommendation">Skincare & Shade Match Advice</option>
                    <option value="Returns">Returns & Refunds</option>
                    <option value="Partnership">B2B & Distribution Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help your beauty routine today?"
                    className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-xl focus:outline-none focus:border-stone-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-2xs"
                >
                  <Send size={14} /> Send Message
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
