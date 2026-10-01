import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { CategoryGrid } from './components/home/CategoryGrid';
import { TrendingProducts } from './components/home/TrendingProducts';
import { ExclusiveOffers } from './components/home/ExclusiveOffers';
import { BrandsSection } from './components/home/BrandsSection';
import { CustomerReviews } from './components/home/CustomerReviews';
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CartPage } from './components/cart/CartPage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { UserDashboard } from './components/user/UserDashboard';
import { OffersPage } from './components/pages/OffersPage';
import { AboutUsPage } from './components/pages/AboutUsPage';
import { ContactUsPage } from './components/pages/ContactUsPage';
import { AdminPortal } from './components/admin/AdminPortal';
import { AuthModal } from './components/auth/AuthModal';
import { BeautyAdvisorModal } from './components/advisor/BeautyAdvisorModal';
import { InvoiceModal } from './components/orders/InvoiceModal';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    activeTab, 
    selectedProduct, 
    setSelectedProduct,
    toasts, 
    dismissToast,
    currentUser 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBCAD6] text-stone-900 selection:bg-rose-300 selection:text-rose-950 font-sans">
      {/* Navbar (Only on Customer Views, Admin has its own top console) */}
      {activeTab !== 'admin' && <Navbar />}

      {/* Main View Router */}
      <div className="flex-1">
        {activeTab === 'home' && (
          <main>
            <HeroBanner />
            <CategoryGrid />
            <TrendingProducts />
            <ExclusiveOffers />
            <BrandsSection />
            <CustomerReviews />
          </main>
        )}

        {activeTab === 'shop' && (
          selectedProduct ? (
            <ProductDetailPage
              product={selectedProduct}
              onBack={() => setSelectedProduct(null)}
            />
          ) : (
            <ShopPage />
          )
        )}

        {activeTab === 'cart' && <CartPage />}

        {activeTab === 'wishlist' && <WishlistPage />}

        {activeTab === 'checkout' && <CheckoutPage />}

        {(activeTab === 'profile' || activeTab === 'orders') && <UserDashboard />}

        {activeTab === 'offers' && <OffersPage />}

        {activeTab === 'about' && <AboutUsPage />}

        {activeTab === 'contact' && <ContactUsPage />}

        {activeTab === 'admin' && <AdminPortal />}
      </div>

      {/* Footer (On customer pages) */}
      {activeTab !== 'admin' && <Footer />}

      {/* Modals & Dialogs */}
      <AuthModal />
      <BeautyAdvisorModal />
      <InvoiceModal />

      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-lg border text-xs font-medium animate-in slide-in-from-bottom-2 fade-in duration-200 ${
              toast.type === 'error'
                ? 'bg-rose-900 text-white border-rose-800'
                : toast.type === 'info'
                ? 'bg-stone-900 text-white border-stone-800'
                : 'bg-stone-900 text-white border-stone-800'
            }`}
          >
            <div className="flex items-center gap-2 mr-3">
              {toast.type === 'error' ? (
                <AlertCircle size={15} className="text-rose-400 shrink-0" />
              ) : toast.type === 'info' ? (
                <Info size={15} className="text-blue-400 shrink-0" />
              ) : (
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-full text-stone-400 hover:text-white transition-colors"
            >
              <X size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
