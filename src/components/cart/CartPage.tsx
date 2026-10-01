import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  Check, 
  Sparkles,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    discountAmount, 
    deliveryCharge, 
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    coupons,
    setActiveTab,
    setSelectedCategory
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const activeCouponsList = coupons.filter((c) => c.isActive);

  if (cart.length === 0) {
    return (
      <div className="bg-[#FBCAD6] min-h-[70vh] py-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center space-y-5 bg-white p-10 rounded-2xl border border-rose-200/80 shadow-2xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 mx-auto flex items-center justify-center text-rose-400">
            <ShoppingBag size={28} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Your Cart is Empty
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            Looks like you haven't added any luxury beauty treasures to your cart yet. Explore our bestselling botanical formulas!
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActiveTab('shop');
            }}
            className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors shadow-xs"
          >
            START SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBCAD6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <h1 className="font-serif text-3xl font-bold text-stone-900">
              Shopping Cart
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Review your items and proceed to secure checkout
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-rose-700 hover:text-rose-900 font-medium flex items-center gap-1"
          >
            <Trash2 size={13} /> Clear Cart
          </button>
        </div>

        {/* 2-Column Layout: Table of Products & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Table / List */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 bg-rose-50/60 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-4 text-right">Price</th>
                    <th className="py-4 px-6 text-center">Quantity</th>
                    <th className="py-4 px-6 text-right">Total</th>
                    <th className="py-4 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {cart.map((item) => {
                    const lineTotal = item.product.price * item.quantity;
                    return (
                      <tr key={item.product.id} className="hover:bg-stone-50/50 transition-colors">
                        {/* Product info */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-14 h-14 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold tracking-wider uppercase text-stone-400">
                                {item.product.brand}
                              </p>
                              <h4 className="font-serif font-bold text-stone-900 text-sm truncate max-w-xs">
                                {item.product.name}
                              </h4>
                              <p className="text-[11px] text-stone-500">
                                {item.product.category}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-4 px-4 text-right font-medium text-stone-900 tabular-nums">
                          ₹{item.product.price.toLocaleString('en-IN')}
                        </td>

                        {/* Quantity Stepper */}
                        <td className="py-4 px-6 text-center">
                          <div className="inline-flex items-center border border-stone-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="p-1.5 text-stone-500 hover:bg-stone-100 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center font-bold text-xs tabular-nums text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              className="p-1.5 text-stone-500 hover:bg-stone-100 disabled:opacity-30 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </td>

                        {/* Total */}
                        <td className="py-4 px-6 text-right font-bold text-stone-900 text-sm tabular-nums">
                          ₹{lineTotal.toLocaleString('en-IN')}
                        </td>

                        {/* Remove */}
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg transition-colors"
                            title="Remove from Cart"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Delivery threshold bar */}
            <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-stone-600">
                <Truck size={16} className="text-emerald-700" />
                {subtotal >= 499 ? (
                  <span className="text-emerald-700 font-semibold">
                    Congratulations! You unlocked FREE Express Delivery.
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-stone-900">₹{(499 - subtotal).toLocaleString('en-IN')}</strong> more for FREE delivery.
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setActiveTab('shop');
                }}
                className="text-stone-800 hover:text-stone-950 font-semibold flex items-center gap-1"
              >
                <ArrowLeft size={13} /> Continue Shopping
              </button>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Promo Code Box */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Tag size={13} className="text-rose-600" />
                Apply Coupon Code
              </h3>

              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-emerald-900">
                      Code "{appliedCoupon.code}" Applied!
                    </p>
                    <p className="text-[11px] text-emerald-700">
                      {appliedCoupon.description}
                    </p>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-semibold text-rose-700 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="e.g. GLOW200"
                      className="flex-1 bg-[#FAF9F5] border border-stone-300 rounded-l-xl px-3 py-2 text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-stone-500"
                    />
                    <button
                      type="submit"
                      className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-2 rounded-r-xl transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                  )}
                </form>
              )}

              {/* Available Coupons list */}
              <div className="pt-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                  Available Offers:
                </p>
                <div className="space-y-1.5">
                  {activeCouponsList.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => applyCoupon(c.code)}
                      className="w-full text-left p-2 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200/60 transition-colors flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-mono font-bold text-stone-900">{c.code}</span>
                        <p className="text-[10px] text-stone-500">{c.description}</p>
                      </div>
                      <span className="text-[10px] text-rose-700 font-bold">Apply</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Calculations Card */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900 pb-3 border-b border-stone-100">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900 tabular-nums">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-rose-700">
                    <span>Coupon Discount</span>
                    <span className="font-semibold tabular-nums">
                      − ₹{discountAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600">
                  <span>Delivery Charge</span>
                  <span className="font-medium tabular-nums">
                    {deliveryCharge === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryCharge}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-stone-900">Total Amount</span>
                  <span className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons: CONTINUE SHOPPING | PROCEED TO CHECKOUT */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={() => setActiveTab('checkout')}
                  className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  PROCEED TO CHECKOUT <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setActiveTab('shop');
                  }}
                  className="w-full py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs tracking-wider uppercase rounded-xl transition-colors"
                >
                  CONTINUE SHOPPING
                </button>
              </div>

              <div className="pt-2 text-center flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
                <ShieldCheck size={14} />
                <span>Encrypted 256-bit safe checkout</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
