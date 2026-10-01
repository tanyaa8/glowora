import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    isInWishlist, 
    toggleWishlist, 
    addToCart, 
    viewProductDetails 
  } = useApp();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col bg-white rounded-xl border border-stone-200/80 overflow-hidden hover:border-stone-400/80 transition-all duration-300 hover:shadow-md">
      {/* Badge / Tag if any */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.badge && (
          <span className="text-[11px] font-medium tracking-wider uppercase bg-stone-900/90 text-white px-2.5 py-0.5 rounded-sm backdrop-blur-xs">
            {product.badge}
          </span>
        )}
        {product.discount > 0 && (
          <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-sm">
            {product.discount}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        aria-label="Save to Wishlist"
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-xs text-stone-600 hover:text-rose-600 hover:bg-white shadow-xs transition-colors"
      >
        <Heart 
          size={16} 
          className={isFavorited ? 'fill-rose-600 text-rose-600' : 'text-stone-600'} 
        />
      </button>

      {/* Product Image */}
      <div 
        onClick={() => viewProductDetails(product)}
        className="relative aspect-4/3 w-full bg-rose-50/60 overflow-hidden cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            // graceful fallback
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Hover Quick View overlay */}
        <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-stone-900 text-xs font-medium px-3 py-1.5 rounded-md shadow-xs flex items-center gap-1.5">
            <Eye size={13} /> Quick View
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
          <span className="font-semibold tracking-wider uppercase text-[10px] text-stone-500">
            {product.brand}
          </span>
          <span className="text-[11px] text-stone-400">
            {product.category}
          </span>
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => viewProductDetails(product)}
          className="font-serif text-sm font-semibold text-stone-900 line-clamp-1 hover:text-stone-700 cursor-pointer mb-1.5"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Star Rating */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="flex items-center text-amber-500">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-stone-800 ml-1">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-[11px] text-stone-400 tabular-nums">
            ({product.ratingCount.toLocaleString()})
          </span>
          {product.stock <= 10 && product.stock > 0 && (
            <span className="ml-auto text-[10px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="mt-auto pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-stone-900 tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock === 0}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
              product.stock === 0
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
            }`}
          >
            <ShoppingBag size={13} />
            {product.stock === 0 ? 'Out of Stock' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};
