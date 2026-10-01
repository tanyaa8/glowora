import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CategoryType } from '../../types';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Sparkles, 
  ShieldCheck, 
  X, 
  ChevronRight,
  LogOut,
  Package,
  SlidersHorizontal,
  Menu
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    cartCount, 
    wishlist, 
    currentUser, 
    logout, 
    switchRole,
    setIsAuthModalOpen,
    setAuthModalMode,
    setIsAdvisorModalOpen,
    setSelectedCategory,
    products,
    viewProductDetails
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Focus search input when open
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for live search preview
  const liveResults = searchInput.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
          p.category.toLowerCase().includes(searchInput.toLowerCase()) ||
          p.description.toLowerCase().includes(searchInput.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleCategoryNav = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setActiveTab('shop');
    setIsMobileMenuOpen(false);
  };

  const navLinks: { label: string; action: () => void }[] = [
    { label: 'Shop All', action: () => { setSelectedCategory('All'); setActiveTab('shop'); } },
    { label: 'Makeup', action: () => handleCategoryNav('Makeup') },
    { label: 'Skincare', action: () => handleCategoryNav('Skincare') },
    { label: 'Haircare', action: () => handleCategoryNav('Haircare') },
    { label: 'Fragrance', action: () => handleCategoryNav('Fragrance') },
    { label: 'Offers', action: () => setActiveTab('offers') },
  ];

  return (
    <>
      {/* Top micro-announcement banner */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-3">
        <span>✨ Free Express Shipping across India on orders above ₹499</span>
        <span className="hidden sm:inline text-stone-500">·</span>
        <span className="hidden sm:inline text-rose-300 font-semibold">Use code GLOW200 for ₹200 OFF</span>
        <span className="hidden md:inline text-stone-500">·</span>
        <button
          onClick={() => switchRole(currentUser?.role === 'admin' ? 'customer' : 'admin')}
          className="hidden md:inline-flex items-center gap-1 text-[11px] underline underline-offset-2 text-stone-300 hover:text-white"
        >
          {currentUser?.role === 'admin' ? 'Switch to Customer View' : 'Demo: Switch to Admin Portal'}
        </button>
      </div>

      {/* Main Top Navigation conforming strictly to Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FBCAD6]/95 backdrop-blur-md border-b border-rose-300/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>

          {/* Zone 1: Single text element Brand wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory('All');
              setActiveTab('home');
            }}
            className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 hover:opacity-90 transition-opacity"
          >
            Glowora
          </a>

          {/* Zone 2: Clean 4–6 navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="hover:text-stone-950 transition-colors whitespace-nowrap cursor-pointer py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-stone-900 hover:after:w-full after:transition-all"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1–2 primary action clusters */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search beauty products"
              className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-200/50 rounded-full transition-colors flex items-center gap-1.5"
            >
              <Search size={19} />
              <span className="hidden xl:inline text-xs font-normal text-stone-500">Search</span>
            </button>

            {/* AI Skin Advisor CTA */}
            <button
              onClick={() => setIsAdvisorModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-900 bg-rose-100/80 hover:bg-rose-100 rounded-lg border border-rose-200/60 transition-colors shadow-2xs whitespace-nowrap"
            >
              <Sparkles size={14} className="text-rose-600" />
              <span>Skin Advisor</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActiveTab('wishlist')}
              aria-label="Wishlist"
              className="relative p-2 text-stone-700 hover:text-rose-600 hover:bg-stone-200/50 rounded-full transition-colors"
            >
              <Heart size={20} className={wishlist.length > 0 ? 'text-stone-800' : 'text-stone-600'} />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-0.5 right-0.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setActiveTab('cart')}
              aria-label="Shopping Bag"
              className="relative p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-200/50 rounded-full transition-colors"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-stone-200/50 transition-colors"
                aria-label="User Account"
              >
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-stone-300"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center">
                    <User size={15} />
                  </div>
                )}
              </button>

              {/* Profile Menu Popup */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-stone-200 py-2 z-50 text-stone-800">
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 border-b border-stone-100">
                        <p className="text-xs font-semibold text-stone-900 truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-stone-500 truncate">{currentUser.email}</p>
                        <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 bg-stone-100 text-stone-700 rounded capitalize">
                          {currentUser.role} Account
                        </span>
                      </div>
                      
                      <button
                        onClick={() => {
                          setActiveTab('profile');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-stone-50 flex items-center gap-2"
                      >
                        <User size={14} className="text-stone-500" />
                        My Profile & Account
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('orders');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-stone-50 flex items-center gap-2"
                      >
                        <Package size={14} className="text-stone-500" />
                        My Orders & Tracking
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('wishlist');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-stone-50 flex items-center gap-2"
                      >
                        <Heart size={14} className="text-stone-500" />
                        My Wishlist ({wishlist.length})
                      </button>

                      <div className="border-t border-stone-100 my-1"></div>

                      <button
                        onClick={() => {
                          switchRole(currentUser.role === 'admin' ? 'customer' : 'admin');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-50 flex items-center gap-2"
                      >
                        <SlidersHorizontal size={14} />
                        {currentUser.role === 'admin' ? 'Storefront View' : 'Admin Dashboard'}
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 border-b border-stone-100">
                        <p className="text-xs font-semibold text-stone-900">Welcome to Glowora</p>
                        <p className="text-[11px] text-stone-500">Sign in to track orders & rewards</p>
                      </div>

                      <button
                        onClick={() => {
                          setAuthModalMode('login');
                          setIsAuthModalOpen(true);
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-stone-900 hover:bg-stone-50"
                      >
                        Log In
                      </button>

                      <button
                        onClick={() => {
                          setAuthModalMode('signup');
                          setIsAuthModalOpen(true);
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-stone-50"
                      >
                        Create Account
                      </button>

                      <div className="border-t border-stone-100 my-1"></div>

                      <button
                        onClick={() => {
                          switchRole('admin');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-indigo-700 hover:bg-indigo-50 flex items-center gap-2 font-medium"
                      >
                        <ShieldCheck size={14} />
                        Quick Admin Portal Access
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-5 space-y-2">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-100">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="text-left py-2 px-3 text-sm font-medium text-stone-700 hover:bg-stone-50 rounded-lg"
                >
                  {link.label}
                </button>
              ))}
            </div>
            
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsAdvisorModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 text-xs font-semibold text-rose-900 bg-rose-50 rounded-lg flex items-center gap-2"
              >
                <Sparkles size={14} className="text-rose-600" />
                AI Skin & Beauty Advisor Quiz
              </button>

              <button
                onClick={() => {
                  switchRole(currentUser?.role === 'admin' ? 'customer' : 'admin');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 text-xs font-semibold text-stone-800 bg-stone-100 rounded-lg flex items-center gap-2"
              >
                <ShieldCheck size={14} />
                Switch to {currentUser?.role === 'admin' ? 'Customer Storefront' : 'Admin Dashboard'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Live Interactive Search Overlay Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-start justify-center pt-16 px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Search Input Box */}
            <div className="flex items-center px-4 py-3.5 border-b border-stone-200 gap-3">
              <Search size={20} className="text-stone-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search lipsticks, face serums, fragrances, bath essentials..."
                className="w-full text-base text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none"
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput('')}
                  className="p-1 text-stone-400 hover:text-stone-600 rounded-full"
                >
                  <X size={16} />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs font-medium text-stone-500 hover:text-stone-900 px-2 py-1 rounded bg-stone-100"
              >
                ESC
              </button>
            </div>

            {/* Popular search pills when empty */}
            {!searchInput.trim() ? (
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                  Trending Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Vitamin C Serum', 'Velvet Lipstick', 'Sandalwood Perfume', 'Hydrating Dew Gel', 'Rosemary Hair Oil', 'French Body Butter'].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => setSearchInput(term)}
                        className="text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Search size={12} className="text-stone-400" />
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : (
              /* Live Results list */
              <div className="max-h-96 overflow-y-auto p-4 space-y-2">
                <p className="text-xs font-semibold text-stone-500 px-2">
                  {liveResults.length} {liveResults.length === 1 ? 'match' : 'matches'} found
                </p>

                {liveResults.length > 0 ? (
                  liveResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        viewProductDetails(product);
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 cursor-pointer transition-colors group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-stone-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-[11px] text-stone-400">
                          <span>{product.brand}</span>
                          <span>·</span>
                          <span>{product.category}</span>
                        </div>
                        <h4 className="text-sm font-medium text-stone-900 truncate group-hover:text-rose-900 transition-colors">
                          {product.name}
                        </h4>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-stone-900 tabular-nums">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                        {product.discount > 0 && (
                          <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
                            {product.discount}% OFF
                          </span>
                        )}
                      </div>
                      <ChevronRight size={16} className="text-stone-300 group-hover:text-stone-600 transition-colors" />
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-stone-500 text-sm">
                    No beauty products matching "{searchInput}". Try searching for "serum", "lipstick", or "perfume".
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
