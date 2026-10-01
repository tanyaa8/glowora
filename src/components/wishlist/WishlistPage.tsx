import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { 
    wishlist, 
    removeFromWishlist, 
    addToCart, 
    viewProductDetails, 
    setActiveTab,
    setSelectedCategory
  } = useApp();

  return (
    <div className="bg-[#FBCAD6] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <Heart size={22} className="fill-rose-600 text-rose-600" />
              <h1 className="font-serif text-3xl font-bold text-stone-900">
                My Wishlist
              </h1>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {wishlist.length} {wishlist.length === 1 ? 'curated item' : 'curated items'} saved for later
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setActiveTab('shop');
            }}
            className="text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1.5"
          >
            <ArrowLeft size={14} /> Back to Catalog
          </button>
        </div>

        {wishlist.length > 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200/80 shadow-2xs divide-y divide-stone-100 overflow-hidden">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-stone-50/50 transition-colors"
              >
                {/* Product thumbnail & Info */}
                <div 
                  onClick={() => viewProductDetails(product)}
                  className="flex items-center gap-4 w-full sm:w-auto cursor-pointer flex-1"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-stone-400">
                      {product.brand} · {product.category}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-stone-900 truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-bold text-stone-900 tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-stone-400 line-through tabular-nums">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                      {product.discount > 0 && (
                        <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
                          {product.discount}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      removeFromWishlist(product.id);
                    }}
                    disabled={product.stock === 0}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white text-xs font-semibold rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} />
                    <span>ADD TO CART</span>
                  </button>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="p-2.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200/80 p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 mx-auto flex items-center justify-center">
              <Heart size={28} />
            </div>
            <h2 className="font-serif text-xl font-bold text-stone-900">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              Explore our boutique catalog and tap the heart icon on any product to save it to your wishlist.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setActiveTab('shop');
              }}
              className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl"
            >
              Explore Products
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
