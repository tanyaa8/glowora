export type CategoryType = 
  | 'Makeup'
  | 'Skincare'
  | 'Haircare'
  | 'Fragrance'
  | 'Bath & Body'
  | 'Wellness'
  | 'Men'
  | 'Nails';

export interface ReviewItem {
  id: string;
  userName: string;
  userEmail?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  approved?: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryType;
  price: number;           // Discounted selling price
  originalPrice: number;   // MRP
  discount: number;        // Percentage e.g. 27
  rating: number;
  ratingCount: number;
  stock: number;
  images: string[];
  description: string;
  ingredients: string;
  howToUse: string;
  benefits: string[];
  specifications: Record<string, string>;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isExclusiveOffer?: boolean;
  badge?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
  type?: 'Home' | 'Work';
}

export type OrderStatus = 
  | 'Ordered'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface TrackingStep {
  status: OrderStatus;
  date: string;
  location: string;
  note: string;
  completed: boolean;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  totalAmount: number;
  couponCode?: string;
  shippingAddress: Address;
  paymentMethod: 'cod' | 'upi' | 'card';
  paymentStatus: 'Paid' | 'Pending';
  status: OrderStatus;
  trackingHistory: TrackingStep[];
  estimatedDelivery: string;
}

export interface Coupon {
  code: string;
  discountType: 'fixed' | 'percentage';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  expiresOn: string;
  isActive: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  avatar?: string;
  addresses: Address[];
  createdAt: string;
}

export type ActiveTab = 
  | 'home'
  | 'shop'
  | 'cart'
  | 'wishlist'
  | 'checkout'
  | 'orders'
  | 'profile'
  | 'offers'
  | 'about'
  | 'contact'
  | 'admin';
