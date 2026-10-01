import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Address } from '../../types';
import { 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  QrCode, 
  Banknote, 
  ArrowLeft, 
  Check, 
  Truck,
  Plus,
  Lock,
  Loader2
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    subtotal, 
    discountAmount, 
    deliveryCharge, 
    finalTotal, 
    currentUser, 
    addAddress, 
    placeOrder, 
    setActiveTab, 
    showToast,
    setIsAuthModalOpen
  } = useApp();

  // Selected address id or 'new'
  const [selectedAddressId, setSelectedAddressId] = useState<string>(() => {
    if (currentUser?.addresses && currentUser.addresses.length > 0) {
      const def = currentUser.addresses.find((a) => a.isDefault);
      return def ? def.id : currentUser.addresses[0].id;
    }
    return 'new';
  });

  // New address form state
  const [newAddrName, setNewAddrName] = useState(currentUser?.name || '');
  const [newAddrPhone, setNewAddrPhone] = useState(currentUser?.phone || '');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('Maharashtra');
  const [newAddrPin, setNewAddrPin] = useState('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('upi');
  
  // UPI details
  const [upiId, setUpiId] = useState('user@okaxis');
  const [upiVerified, setUpiVerified] = useState(true);

  // Card details
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('789');

  const [isProcessing, setIsProcessing] = useState(false);

  // Validation
  const validateAndGetAddress = (): Address | null => {
    if (selectedAddressId !== 'new' && currentUser?.addresses) {
      const found = currentUser.addresses.find((a) => a.id === selectedAddressId);
      if (found) return found;
    }

    // Validate new address form
    if (!newAddrName.trim()) {
      showToast('Please enter full recipient name', 'error');
      return null;
    }
    if (!newAddrPhone.trim() || newAddrPhone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return null;
    }
    if (!newAddrStreet.trim()) {
      showToast('Please enter complete delivery address', 'error');
      return null;
    }
    if (!newAddrCity.trim()) {
      showToast('Please enter city name', 'error');
      return null;
    }
    if (!newAddrPin.trim() || newAddrPin.length !== 6) {
      showToast('Please enter a valid 6-digit PIN code', 'error');
      return null;
    }

    const created: Address = {
      id: 'addr-' + Date.now(),
      fullName: newAddrName.trim(),
      phone: newAddrPhone.trim(),
      street: newAddrStreet.trim(),
      city: newAddrCity.trim(),
      state: newAddrState,
      pincode: newAddrPin.trim(),
      type: 'Home',
    };

    if (currentUser) {
      addAddress(created);
    }
    return created;
  };

  const handlePlaceOrder = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const addr = validateAndGetAddress();
    if (!addr) return;

    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        address: addr,
        paymentMethod,
      });

      setIsProcessing(false);
      if (order) {
        setActiveTab('orders');
      }
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#FBCAD6] min-h-[70vh] py-16 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-rose-200/80 text-center space-y-4">
          <h2 className="font-serif text-2xl font-bold text-stone-900">Your bag is empty</h2>
          <p className="text-xs text-stone-500">Please add items to your cart before proceeding to checkout.</p>
          <button
            onClick={() => setActiveTab('shop')}
            className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold"
          >
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBCAD6] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('cart')}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Cart</span>
          </button>
        </div>

        <h1 className="font-serif text-3xl font-bold text-stone-900 mb-8">
          Secure Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 1. Delivery Address + 3. Payment Methods */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Delivery Address */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="font-serif text-lg font-bold text-stone-900">
                    Delivery Address
                  </h2>
                </div>
                <span className="text-xs text-stone-400">Step 1 of 2</span>
              </div>

              {/* Saved Addresses list if logged in */}
              {currentUser?.addresses && currentUser.addresses.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-stone-700">Choose from Saved Addresses:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentUser.addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          selectedAddressId === addr.id
                            ? 'border-stone-900 bg-stone-50/50'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <input
                              type="radio"
                              name="shippingAddr"
                              checked={selectedAddressId === addr.id}
                              onChange={() => setSelectedAddressId(addr.id)}
                              className="text-stone-900 focus:ring-stone-900"
                            />
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-200/70 text-stone-700 px-1.5 py-0.5 rounded">
                              {addr.type || 'Home'}
                            </span>
                          </div>
                          <p className="font-semibold text-xs text-stone-900 mt-2">{addr.fullName}</p>
                          <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">{addr.street}, {addr.city}</p>
                          <p className="text-[11px] text-stone-500">{addr.state} - {addr.pincode}</p>
                        </div>
                        <p className="text-[11px] text-stone-700 font-medium mt-2">📞 {addr.phone}</p>
                      </label>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedAddressId('new')}
                    className="text-xs font-semibold text-rose-700 hover:underline flex items-center gap-1 mt-2"
                  >
                    <Plus size={13} /> Deliver to a different address
                  </button>
                </div>
              )}

              {/* New Address Form */}
              {(selectedAddressId === 'new' || !currentUser?.addresses?.length) && (
                <div className="space-y-4 pt-2 border-t border-stone-100">
                  <p className="text-xs font-bold text-stone-900">Enter Shipping Address Details:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={newAddrName}
                        onChange={(e) => setNewAddrName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-lg focus:outline-none focus:border-stone-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Phone Number (10 digits) *</label>
                      <input
                        type="tel"
                        value={newAddrPhone}
                        onChange={(e) => setNewAddrPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-lg focus:outline-none focus:border-stone-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Flat / House No. / Street Address *</label>
                    <input
                      type="text"
                      value={newAddrStreet}
                      onChange={(e) => setNewAddrStreet(e.target.value)}
                      placeholder="e.g. Flat 402, Lotus Bloom Heights, Link Road"
                      className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-lg focus:outline-none focus:border-stone-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">City *</label>
                      <input
                        type="text"
                        value={newAddrCity}
                        onChange={(e) => setNewAddrCity(e.target.value)}
                        placeholder="e.g. Mumbai"
                        className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-lg focus:outline-none focus:border-stone-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">State *</label>
                      <select
                        value={newAddrState}
                        onChange={(e) => setNewAddrState(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-lg focus:outline-none focus:border-stone-500"
                      >
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Other">Other State</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">PIN Code (6 digits) *</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={newAddrPin}
                        onChange={(e) => setNewAddrPin(e.target.value.replace(/\D/g, ''))}
                        placeholder="e.g. 400050"
                        className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-lg focus:outline-none focus:border-stone-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Payment Method (Cash on Delivery, Simulated UPI, Simulated Card) */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-serif text-lg font-bold text-stone-900">
                    Payment Method (Simulated)
                  </h2>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                  <Lock size={12} />
                  <span>100% Encrypted</span>
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="space-y-3">
                {/* 1. UPI Option */}
                <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'border-stone-900 bg-rose-50/70' : 'border-stone-200 hover:border-stone-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="text-stone-900 focus:ring-stone-900"
                      />
                      <QrCode size={18} className="text-stone-700" />
                      <div>
                        <span className="text-xs font-bold text-stone-900">Instant UPI (GPay, PhonePe, Paytm, BHIM)</span>
                        <p className="text-[11px] text-stone-500">Fastest one-click simulation with QR or VPA ID</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      Instant 10% Extra
                    </span>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-4 pt-3 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div className="space-y-2">
                        <label className="block text-[11px] font-semibold text-stone-700">Enter Virtual Payment Address (VPA)</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="yourname@okhdfcbank"
                            className="flex-1 text-xs p-2 bg-white border border-stone-300 rounded-lg focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setUpiVerified(true);
                              showToast('UPI VPA ID Verified successfully');
                            }}
                            className="px-3 py-1.5 bg-stone-800 text-white text-xs font-semibold rounded-lg"
                          >
                            Verify
                          </button>
                        </div>
                        {upiVerified && (
                          <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                            <Check size={12} /> Verified for instant debit
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-center p-3 bg-white rounded-xl border border-stone-200 text-center">
                        <div>
                          <div className="w-20 h-20 bg-stone-900 rounded-lg mx-auto flex items-center justify-center text-white text-xs p-1">
                            <QrCode size={56} className="text-white" />
                          </div>
                          <p className="text-[10px] text-stone-500 mt-1 font-medium">Scan with any UPI app</p>
                        </div>
                      </div>
                    </div>
                  )}
                </label>

                {/* 2. Credit / Debit Card Option */}
                <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-stone-900 bg-rose-50/70' : 'border-stone-200 hover:border-stone-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-stone-900 focus:ring-stone-900"
                    />
                    <CreditCard size={18} className="text-stone-700" />
                    <div>
                      <span className="text-xs font-bold text-stone-900">Credit / Debit Card</span>
                      <p className="text-[11px] text-stone-500">Visa, Mastercard, RuPay & American Express</p>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-4 pt-3 border-t border-stone-200 space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4532 0000 0000 0000"
                          className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">Valid Thru (MM/YY)</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="•••"
                            className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </label>

                {/* 3. Cash on Delivery (COD) */}
                <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-stone-900 bg-rose-50/70' : 'border-stone-200 hover:border-stone-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-stone-900 focus:ring-stone-900"
                    />
                    <Banknote size={18} className="text-stone-700" />
                    <div>
                      <span className="text-xs font-bold text-stone-900">Cash on Delivery (COD)</span>
                      <p className="text-[11px] text-stone-500">Pay cash or UPI directly to delivery partner upon arrival</p>
                    </div>
                  </div>
                </label>
              </div>

            </div>

          </div>

          {/* Right Column: 2. Order Summary & Place Order */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h2 className="font-serif text-lg font-bold text-stone-900">
                Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </h2>
            </div>

            {/* Selected Products list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 py-2 border-b border-stone-100 last:border-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Qty: {item.quantity} × ₹{item.product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-stone-900 tabular-nums">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs pt-3 border-t border-stone-100">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-medium text-stone-900 tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-700">
                  <span>Discount Applied</span>
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
                <span className="text-sm font-bold text-stone-900">Total Payable</span>
                <span className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* PLACE ORDER Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-4 px-4 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-500 text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>PROCESSING ORDER...</span>
                </>
              ) : (
                <>
                  <Lock size={14} />
                  <span>PLACE ORDER (₹{finalTotal.toLocaleString('en-IN')})</span>
                </>
              )}
            </button>

            <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-200/70 text-[11px] text-stone-600 space-y-1">
              <p className="font-semibold text-stone-900">🛡️ Glowora Buyer Protection</p>
              <p>Safe payment verification, real-time BlueDart/Delhivery dispatch tracking, and 7-day hassle-free replacement.</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
