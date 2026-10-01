import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Tag, 
  Minus, 
  Plus, 
  ArrowLeft, 
  Share2, 
  CheckCircle2, 
  Maximize2, 
  X,
  MessageSquarePlus
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack }) => {
  const { 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    setActiveTab, 
    showToast,
    reviews: allReviews,
    addReview,
    currentUser,
    setIsAuthModalOpen
  } = useApp();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveInfoTab] = useState<'desc' | 'ingredients' | 'howTo' | 'benefits' | 'specs' | 'reviews'>('desc');
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  // Review submission state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const productReviews = allReviews.filter((r) => r.productId === product.id && r.approved !== false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setActiveTab('checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Glowora!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!reviewTitle.trim() || !reviewComment.trim()) {
      showToast('Please enter both review title and comment', 'error');
      return;
    }
    addReview(product.id, {
      rating: reviewRating,
      title: reviewTitle.trim(),
      comment: reviewComment.trim(),
    });
    setReviewTitle('');
    setReviewComment('');
    setIsReviewFormOpen(false);
  };

  return (
    <div className="bg-[#FBCAD6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Back Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-stone-950 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Products</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors"
          >
            <Share2 size={15} />
            <span>Share</span>
          </button>
        </div>

        {/* Main Product Section: Left Image Gallery & Right Contiguous Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Gallery: Sticky Column */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-4/3 w-full bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.badge && (
                  <span className="text-[11px] font-semibold tracking-wider uppercase bg-stone-900 text-white px-2.5 py-0.5 rounded-sm">
                    {product.badge}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-sm">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Zoom Trigger Button */}
              <button
                onClick={() => setIsZoomModalOpen(true)}
                className="absolute bottom-4 right-4 p-2.5 bg-white/90 backdrop-blur-xs text-stone-700 hover:text-stone-950 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 text-xs font-medium"
                title="Click to Zoom Fullscreen"
              >
                <Maximize2 size={15} />
                <span>Zoom</span>
              </button>
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-stone-900 shadow-xs'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6">
            
            {/* Header: Brand, Title, Rating */}
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span className="font-bold tracking-widest uppercase text-stone-500 text-[11px]">
                  {product.brand}
                </span>
                <span className="text-stone-400">{product.category}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-2.5 mt-3">
                <div className="flex items-center text-amber-500">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-stone-900 ml-1.5">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-stone-300">·</span>
                <span className="text-xs text-stone-500 tabular-nums font-medium">
                  {product.ratingCount.toLocaleString()} ratings
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={13} /> In Stock ({product.stock} units)
                </span>
              </div>
            </div>

            {/* Price Module */}
            <div className="p-4 bg-rose-50/70 rounded-xl border border-rose-200/70 flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-stone-900 tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                </>
              )}
              <span className="text-[11px] text-stone-500 ml-auto">Inclusive of all taxes</span>
            </div>

            {/* Available Offers section (matching prompt specs) */}
            <div className="space-y-2 pt-1 border-t border-stone-100">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <Tag size={13} className="text-rose-600" />
                Available Offers
              </p>
              <ul className="space-y-2 text-xs text-stone-700">
                <li className="flex items-start gap-2 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/50">
                  <span className="font-bold text-amber-800 text-[11px] uppercase bg-amber-100 px-1.5 py-0.5 rounded shrink-0">10% OFF</span>
                  <span>10% instant discount on UPI and selected payment methods at checkout.</span>
                </li>
                <li className="flex items-start gap-2 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200/50">
                  <span className="font-bold text-emerald-800 text-[11px] uppercase bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">FREE SHIPPING</span>
                  <span>Complimentary express delivery on all orders above ₹499.</span>
                </li>
                <li className="flex items-start gap-2 bg-rose-50/60 p-2.5 rounded-lg border border-rose-200/50">
                  <span className="font-bold text-rose-800 text-[11px] uppercase bg-rose-100 px-1.5 py-0.5 rounded shrink-0">GLOW200</span>
                  <span>Apply coupon <strong>GLOW200</strong> in cart to receive flat ₹200 off on ₹999+.</span>
                </li>
              </ul>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-2 border-t border-stone-100">
              
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-stone-600 hover:bg-stone-100 disabled:opacity-30 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-stone-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="p-2 text-stone-600 hover:bg-stone-100 disabled:opacity-30 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="text-xs text-stone-400">
                  Total: <strong className="text-stone-900">₹{(product.price * quantity).toLocaleString('en-IN')}</strong>
                </span>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} />
                  ADD TO CART
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="w-full py-3.5 px-4 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  BUY NOW
                </button>
              </div>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-full py-2.5 text-xs font-semibold rounded-xl border flex items-center justify-center gap-2 transition-colors ${
                  isFavorited
                    ? 'border-rose-300 bg-rose-50 text-rose-700'
                    : 'border-stone-300 text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Heart size={15} className={isFavorited ? 'fill-rose-600 text-rose-600' : 'text-stone-500'} />
                {isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}
              </button>

            </div>

            {/* Quick Guarantees row */}
            <div className="pt-4 border-t border-stone-100 grid grid-cols-3 gap-2 text-center text-[11px] text-stone-500">
              <div className="flex flex-col items-center gap-1">
                <Truck size={16} className="text-stone-700" />
                <span>Fast 3-Day Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={16} className="text-stone-700" />
                <span>100% Genuine Origin</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw size={16} className="text-stone-700" />
                <span>7-Day Easy Returns</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Tabbed Information Module (Description, Ingredients, How to Use, Benefits, Specifications, Reviews) */}
        <div className="mt-14 bg-white rounded-2xl border border-stone-200/80 shadow-2xs overflow-hidden">
          
          {/* Tab Navigation */}
          <div className="flex items-center overflow-x-auto border-b border-rose-200/80 px-6 bg-rose-50/50">
            {[
              { id: 'desc', label: 'Description' },
              { id: 'ingredients', label: 'Ingredients' },
              { id: 'howTo', label: 'How to Use' },
              { id: 'benefits', label: 'Benefits' },
              { id: 'specs', label: 'Specifications' },
              { id: 'reviews', label: `Reviews (${productReviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveInfoTab(tab.id as any)}
                className={`py-4 px-5 text-xs font-bold tracking-wide uppercase transition-colors relative whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-stone-900 border-b-2 border-stone-900 bg-white'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Container */}
          <div className="p-6 sm:p-10">
            
            {/* Description Tab */}
            {activeTab === 'desc' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="font-serif text-xl font-bold text-stone-900">About the Formulation</h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {product.description}
                </p>
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70">
                    <p className="text-xs font-bold text-stone-900">Sensory Texture</p>
                    <p className="text-xs text-stone-600 mt-1">{product.specifications['Finish'] || 'Effortless silk glide'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70">
                    <p className="text-xs font-bold text-stone-900">Safety & Standards</p>
                    <p className="text-xs text-stone-600 mt-1">{product.specifications['Safety'] || 'Dermatologically evaluated'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Ingredients Tab */}
            {activeTab === 'ingredients' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="font-serif text-xl font-bold text-stone-900">Full Ingredients Disclosure</h3>
                <p className="text-xs text-stone-500">
                  Glowora enforces complete ingredient transparency. Free from parabens, mineral oils, phthalates, and formaldehyde donors.
                </p>
                <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono text-stone-700 leading-relaxed">
                  {product.ingredients}
                </div>
              </div>
            )}

            {/* How to Use Tab */}
            {activeTab === 'howTo' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="font-serif text-xl font-bold text-stone-900">Application Ritual</h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {product.howToUse}
                </p>
              </div>
            )}

            {/* Benefits Tab */}
            {activeTab === 'benefits' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="font-serif text-xl font-bold text-stone-900">Key Proven Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-800 font-medium leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specs' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="font-serif text-xl font-bold text-stone-900">Product Specifications</h3>
                <div className="border border-stone-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, val], idx) => (
                        <tr key={key} className={idx % 2 === 0 ? 'bg-stone-50/50' : 'bg-white'}>
                          <td className="py-3 px-4 font-semibold text-stone-700 border-b border-stone-100 w-1/3">
                            {key}
                          </td>
                          <td className="py-3 px-4 text-stone-900 border-b border-stone-100">
                            {val}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Customer Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="max-w-4xl space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">
                      Customer Reviews & Ratings
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={15} className="fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-stone-800">{product.rating} out of 5</span>
                      <span className="text-xs text-stone-400">({product.ratingCount} global ratings)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquarePlus size={14} />
                    {isReviewFormOpen ? 'Cancel Review' : 'Write a Review'}
                  </button>
                </div>

                {/* Review Form */}
                {isReviewFormOpen && (
                  <form onSubmit={handleReviewSubmit} className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                    <h4 className="text-sm font-bold text-stone-900">Share your experience with this product</h4>
                    
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Your Rating</label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewRating(star)}
                            className="p-1 text-amber-400 focus:outline-none"
                          >
                            <Star size={20} className={star <= reviewRating ? 'fill-amber-400' : 'text-stone-300'} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Review Headline</label>
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="e.g. Glowing skin within a week!"
                        className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Detailed Review</label>
                      <textarea
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Describe texture, smell, performance, packaging..."
                        className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-stone-500"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      Submit Review
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-4">
                  {productReviews.length > 0 ? (
                    productReviews.map((rev) => (
                      <div key={rev.id} className="p-5 rounded-xl border border-stone-200/70 bg-[#FAF9F5]/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex text-amber-400">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} size={13} className="fill-amber-400" />
                              ))}
                            </div>
                            <span className="text-xs font-bold text-stone-900">{rev.title}</span>
                          </div>
                          <span className="text-[11px] text-stone-400 tabular-nums">{rev.date}</span>
                        </div>
                        <p className="text-xs text-stone-700 leading-relaxed">{rev.comment}</p>
                        <div className="flex items-center gap-2 text-[11px] text-stone-400 pt-1">
                          <span className="font-medium text-stone-600">{rev.userName}</span>
                          <span>·</span>
                          <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                            <CheckCircle2 size={11} /> Verified Buyer
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-stone-500 italic">No reviews written yet. Be the first to share your thoughts!</p>
                  )}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomModalOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={product.images[selectedImageIndex] || product.images[0]}
            alt={product.name}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}

    </div>
  );
};
