import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Package, 
  Heart, 
  ShoppingBag, 
  MapPin, 
  Tag, 
  KeyRound, 
  LogOut, 
  Truck, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Trash2, 
  Copy, 
  Check,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';

export const UserDashboard: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    wishlist, 
    cart, 
    coupons, 
    logout, 
    updateProfile, 
    addAddress, 
    deleteAddress, 
    setDefaultAddress,
    setActiveTab, 
    setInvoiceOrder,
    setSelectedOrderForTracking,
    showToast,
    setIsAuthModalOpen
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<
    'profile' | 'orders' | 'wishlist' | 'addresses' | 'coupons' | 'password'
  >('orders');

  // Edit profile form
  const [nameInput, setNameInput] = useState(currentUser?.name || '');
  const [phoneInput, setPhoneInput] = useState(currentUser?.phone || '');

  // Add address form
  const [isAddingAddr, setIsAddingAddr] = useState(false);
  const [addrName, setAddrName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('Maharashtra');
  const [addrPin, setAddrPin] = useState('');
  const [addrType, setAddrType] = useState<'Home' | 'Work'>('Home');

  // Password change form
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  // Selected order for inline tracking modal
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);

  if (!currentUser) {
    return (
      <div className="bg-[#FBCAD6] min-h-[70vh] py-16 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl border border-rose-200 text-center max-w-sm space-y-4">
          <User size={32} className="mx-auto text-stone-400" />
          <h2 className="font-serif text-xl font-bold text-stone-900">Sign in to view Account</h2>
          <p className="text-xs text-stone-500">Please log in to manage your beauty orders, addresses and profile.</p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold"
          >
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  const userOrders = orders.filter((o) => o.userId === currentUser.id || o.userEmail === currentUser.email);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      showToast('Name cannot be empty', 'error');
      return;
    }
    updateProfile({ name: nameInput.trim(), phone: phoneInput.trim() });
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrStreet.trim() || !addrCity.trim() || addrPin.length !== 6) {
      showToast('Please fill all address fields with a valid 6-digit PIN code', 'error');
      return;
    }
    addAddress({
      fullName: addrName || currentUser.name,
      phone: addrPhone || currentUser.phone,
      street: addrStreet.trim(),
      city: addrCity.trim(),
      state: addrState,
      pincode: addrPin.trim(),
      type: addrType,
      isDefault: currentUser.addresses.length === 0,
    });
    setIsAddingAddr(false);
    setAddrStreet('');
    setAddrCity('');
    setAddrPin('');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }
    if (newPw !== confirmPw) {
      showToast('Passwords do not match', 'error');
      return;
    }
    showToast('Password changed successfully');
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Out for Delivery':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Packed':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <div className="bg-[#FBCAD6] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Greeting Bar */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-stone-100 border-2 border-stone-300 overflow-hidden flex items-center justify-center text-stone-700 text-xl font-bold font-serif">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                currentUser.name[0]
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-stone-900">
                  {currentUser.name}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-800 px-2 py-0.5 rounded-full border border-rose-200/60">
                  Glowora Tier Member
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {currentUser.email} · {currentUser.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('cart')}
              className="px-4 py-2 bg-[#FAF9F5] hover:bg-stone-100 border border-stone-300 rounded-xl text-xs font-semibold text-stone-800 flex items-center gap-1.5 transition-colors"
            >
              <ShoppingBag size={14} /> Bag ({cart.length})
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* 2-Column Dashboard: Left Menu + Right Active Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Menu Navigation */}
          <aside className="lg:col-span-4 bg-white rounded-2xl border border-stone-200/80 shadow-2xs overflow-hidden p-3 space-y-1">
            <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Account Management
            </p>

            {[
              { id: 'orders', label: 'My Orders', icon: Package, count: userOrders.length },
              { id: 'profile', label: 'My Profile', icon: User },
              { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: currentUser.addresses.length },
              { id: 'coupons', label: 'My Coupons & Offers', icon: Tag, count: coupons.filter(c => c.isActive).length },
              { id: 'password', label: 'Change Password', icon: KeyRound },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'wishlist') {
                      setActiveTab('wishlist');
                    } else {
                      setActiveSubTab(tab.id as any);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-2xs'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={isActive ? 'text-white' : 'text-stone-500'} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums ${
                      isActive ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 border-t border-stone-100 mt-2">
              <button
                onClick={logout}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              >
                <LogOut size={15} />
                <span>Log Out</span>
              </button>
            </div>
          </aside>

          {/* Right Active Tab Content */}
          <main className="lg:col-span-8 space-y-6">
            
            {/* 1. MY ORDERS */}
            {activeSubTab === 'orders' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <h2 className="font-serif text-xl font-bold text-stone-900">
                    My Orders ({userOrders.length})
                  </h2>
                  <span className="text-xs text-stone-500">Real-time status updates</span>
                </div>

                {userOrders.length > 0 ? (
                  <div className="space-y-4">
                    {userOrders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-xl border border-stone-200/90 overflow-hidden hover:border-stone-400 transition-colors"
                      >
                        {/* Order Bar */}
                        <div className="p-4 bg-[#FAF9F5] border-b border-stone-200/70 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-stone-900">#{order.id}</span>
                            <span className="text-stone-400">·</span>
                            <span className="text-stone-500 tabular-nums">Placed {order.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(order.status)}`}>
                              {order.status}
                            </span>
                            <span className="font-bold text-stone-900 tabular-nums text-sm">
                              ₹{order.totalAmount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Order Items preview */}
                        <div className="p-4 space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-stone-900 truncate">
                                  {item.product.name}
                                </h4>
                                <p className="text-[11px] text-stone-500">
                                  Qty: {item.quantity} × ₹{item.unitPrice.toLocaleString('en-IN')}
                                </p>
                              </div>
                              <span className="text-xs font-semibold text-stone-900 tabular-nums">
                                ₹{item.subtotal.toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Bottom Actions */}
                        <div className="p-3 bg-stone-50 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <p className="text-[11px] text-stone-500">
                            Payment: <strong className="uppercase text-stone-700">{order.paymentMethod}</strong> ({order.paymentStatus})
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setInvoiceOrder(order)}
                              className="px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-stone-700 font-semibold flex items-center gap-1 transition-colors"
                            >
                              <FileText size={13} /> View Invoice
                            </button>
                            <button
                              onClick={() => setTrackingOrder(order)}
                              className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold flex items-center gap-1 transition-colors"
                            >
                              <Truck size={13} /> Track Delivery
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-3">
                    <Package size={36} className="mx-auto text-stone-400" />
                    <p className="text-sm font-semibold text-stone-800">No orders placed yet</p>
                    <p className="text-xs text-stone-500">Explore the shop and treat yourself to our radiant formulations.</p>
                  </div>
                )}
              </div>
            )}

            {/* 2. PROFILE EDIT */}
            {activeSubTab === 'profile' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6">
                <div className="pb-4 border-b border-stone-100">
                  <h2 className="font-serif text-xl font-bold text-stone-900">Personal Information</h2>
                  <p className="text-xs text-stone-500 mt-1">Update your display name and registered contact details</p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-xl focus:outline-none focus:border-stone-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address (Read-only)</label>
                    <input
                      type="email"
                      value={currentUser.email}
                      disabled
                      className="w-full text-xs p-2.5 bg-stone-100 border border-stone-200 rounded-xl text-stone-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Mobile Contact</label>
                    <input
                      type="text"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-xl focus:outline-none focus:border-stone-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-2xs"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* 3. SAVED ADDRESSES */}
            {activeSubTab === 'addresses' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-900">Saved Delivery Addresses</h2>
                    <p className="text-xs text-stone-500 mt-1">Manage delivery locations for quick checkout</p>
                  </div>
                  <button
                    onClick={() => setIsAddingAddr(!isAddingAddr)}
                    className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Address
                  </button>
                </div>

                {/* Add Address Form */}
                {isAddingAddr && (
                  <form onSubmit={handleSaveAddress} className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">Add New Address</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">Recipient Name</label>
                        <input
                          type="text"
                          value={addrName}
                          onChange={(e) => setAddrName(e.target.value)}
                          placeholder="e.g. Priya Sharma"
                          className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={addrPhone}
                          onChange={(e) => setAddrPhone(e.target.value)}
                          placeholder="9876543210"
                          className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Street Address</label>
                      <input
                        type="text"
                        value={addrStreet}
                        onChange={(e) => setAddrStreet(e.target.value)}
                        placeholder="House/Flat number, road name"
                        className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">City</label>
                        <input
                          type="text"
                          value={addrCity}
                          onChange={(e) => setAddrCity(e.target.value)}
                          placeholder="City"
                          className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">State</label>
                        <input
                          type="text"
                          value={addrState}
                          onChange={(e) => setAddrState(e.target.value)}
                          className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">PIN Code (6 digits)</label>
                        <input
                          type="text"
                          maxLength={6}
                          value={addrPin}
                          onChange={(e) => setAddrPin(e.target.value.replace(/\D/g, ''))}
                          placeholder="400050"
                          className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingAddr(false)}
                        className="px-4 py-2 border border-stone-300 text-stone-700 text-xs font-semibold rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Addresses Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentUser.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-4 rounded-xl border-2 flex flex-col justify-between ${
                        addr.isDefault ? 'border-stone-900 bg-[#FAF9F5]' : 'border-stone-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-200 px-2 py-0.5 rounded">
                            {addr.type || 'Home'}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-stone-900">{addr.fullName}</h4>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">{addr.street}</p>
                        <p className="text-xs text-stone-500">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-xs text-stone-700 font-medium mt-1">📞 {addr.phone}</p>
                      </div>

                      <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-3 text-xs">
                        {!addr.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-stone-700 hover:text-stone-950 underline font-medium"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-rose-600 hover:text-rose-800 ml-auto flex items-center gap-1"
                        >
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. COUPONS & OFFERS */}
            {activeSubTab === 'coupons' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6">
                <div className="pb-4 border-b border-stone-100">
                  <h2 className="font-serif text-xl font-bold text-stone-900">Available Beauty Coupons</h2>
                  <p className="text-xs text-stone-500 mt-1">Redeemable directly during checkout</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {coupons.filter(c => c.isActive).map((c) => (
                    <div key={c.code} className="p-4 rounded-xl border border-stone-200 bg-[#FAF9F5] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm font-bold text-stone-900 bg-white px-2.5 py-1 rounded border border-stone-300">
                            {c.code}
                          </span>
                          <span className="text-[10px] text-stone-400">Expires {c.expiresOn}</span>
                        </div>
                        <p className="text-xs font-semibold text-stone-800 mt-2">{c.description}</p>
                        <p className="text-[11px] text-stone-500 mt-0.5">Min Order: ₹{c.minOrderValue.toLocaleString('en-IN')}</p>
                      </div>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(c.code);
                          showToast(`Code "${c.code}" copied to clipboard`);
                        }}
                        className="mt-4 w-full py-2 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-xs font-semibold text-stone-800 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Copy size={12} /> Copy Code
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. CHANGE PASSWORD */}
            {activeSubTab === 'password' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6">
                <div className="pb-4 border-b border-stone-100">
                  <h2 className="font-serif text-xl font-bold text-stone-900">Change Password</h2>
                  <p className="text-xs text-stone-500 mt-1">Ensure your account uses a strong unique password</p>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-sm">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      value={currentPw}
                      onChange={(e) => setCurrentPw(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">New Password (Min 6 chars)</label>
                    <input
                      type="password"
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs p-2.5 bg-[#FAF9F5] border border-stone-300 rounded-xl"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* Inline Real-time Order Tracking Modal */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="p-6 bg-[#FAF9F5] border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Delivery Tracking: #{trackingOrder.id}
                </h3>
                <p className="text-xs text-stone-500">
                  Carrier: BlueDart Express · Estimated Delivery: {trackingOrder.estimatedDelivery}
                </p>
              </div>
              <button
                onClick={() => setTrackingOrder(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700 bg-stone-200/50"
              >
                ✕
              </button>
            </div>

            {/* Tracking Milestones Timeline */}
            <div className="p-6 space-y-6">
              <div className="relative border-l-2 border-stone-200 ml-4 space-y-6">
                {trackingOrder.trackingHistory.map((step, idx) => (
                  <div key={idx} className="relative pl-6">
                    {/* Circle icon */}
                    <div className={`absolute -left-2.5 top-0 w-5 h-5 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-400'
                    }`}>
                      {step.completed ? <Check size={11} /> : <Clock size={11} />}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${step.completed ? 'text-stone-900' : 'text-stone-400'}`}>
                          {step.status}
                        </span>
                        <span className="text-[10px] text-stone-400 tabular-nums">{step.date}</span>
                      </div>
                      <p className="text-[11px] text-stone-600 font-medium">{step.location}</p>
                      <p className="text-[10px] text-stone-500 italic">{step.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/70 text-xs text-stone-600 space-y-1">
                <p className="font-semibold text-stone-900">Delivery Address:</p>
                <p>{trackingOrder.shippingAddress.fullName} ({trackingOrder.shippingAddress.phone})</p>
                <p>{trackingOrder.shippingAddress.street}, {trackingOrder.shippingAddress.city}, {trackingOrder.shippingAddress.state} - {trackingOrder.shippingAddress.pincode}</p>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setInvoiceOrder(trackingOrder);
                    setTrackingOrder(null);
                  }}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-semibold text-stone-800"
                >
                  View Invoice
                </button>
                <button
                  onClick={() => setTrackingOrder(null)}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
