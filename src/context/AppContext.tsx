import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  Coupon, 
  UserProfile, 
  ActiveTab, 
  CategoryType, 
  Address, 
  OrderStatus,
  ReviewItem
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_COUPONS, 
  INITIAL_USER, 
  INITIAL_ADMIN_USER, 
  INITIAL_ORDERS,
  INITIAL_REVIEWS,
  CATEGORIES
} from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Navigation & View state
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedCategory: CategoryType | 'All';
  setSelectedCategory: (cat: CategoryType | 'All') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  viewProductDetails: (p: Product) => void;

  // Catalog
  products: Product[];
  categories: typeof CATEGORIES;
  addProduct: (p: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  restockProduct: (id: string, amount: number) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  deliveryCharge: number;
  finalTotal: number;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (c: Coupon) => void;
  toggleCoupon: (code: string) => void;
  deleteCoupon: (code: string) => void;

  // Wishlist
  wishlist: Product[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;

  // User & Auth
  currentUser: UserProfile | null;
  allUsers: UserProfile[];
  login: (email: string, role?: 'customer' | 'admin') => boolean;
  signup: (name: string, email: string, phone: string) => boolean;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  switchRole: (role: 'customer' | 'admin') => void;

  // Orders
  orders: Order[];
  placeOrder: (data: {
    address: Address;
    paymentMethod: 'cod' | 'upi' | 'card';
  }) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  selectedOrderForTracking: Order | null;
  setSelectedOrderForTracking: (order: Order | null) => void;
  
  // Reviews
  reviews: (ReviewItem & { productId: string })[];
  addReview: (productId: string, review: { rating: number; title: string; comment: string }) => void;
  deleteReview: (id: string) => void;
  approveReview: (id: string) => void;

  // Modals & Notifications
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (b: boolean) => void;
  authModalMode: 'login' | 'signup' | 'forgot';
  setAuthModalMode: (m: 'login' | 'signup' | 'forgot') => void;
  isAdvisorModalOpen: boolean;
  setIsAdvisorModalOpen: (b: boolean) => void;
  invoiceOrder: Order | null;
  setInvoiceOrder: (o: Order | null) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & views
  const [activeTab, setActiveTabState] = useState<ActiveTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('glowora_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PRODUCTS;
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('glowora_coupons');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_COUPONS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('glowora_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('glowora_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[2]];
  });

  // Users
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('glowora_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [INITIAL_USER, INITIAL_ADMIN_USER];
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('glowora_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_USER;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('glowora_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_ORDERS;
  });

  // Reviews
  const [reviews, setReviews] = useState<(ReviewItem & { productId: string })[]>(() => {
    const saved = localStorage.getItem('glowora_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_REVIEWS;
  });

  // Modals & temporary state
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<Order | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState<boolean>(false);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('glowora_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('glowora_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('glowora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('glowora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('glowora_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('glowora_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('glowora_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('glowora_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('glowora_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  // Delivery: Free above ₹499, otherwise ₹50
  const deliveryCharge = useMemo(() => {
    if (cart.length === 0) return 0;
    return subtotal >= 499 ? 0 : 50;
  }, [subtotal, cart.length]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (subtotal < appliedCoupon.minOrderValue) return 0;

    if (appliedCoupon.discountType === 'fixed') {
      return appliedCoupon.discountValue;
    } else {
      const computed = (subtotal * appliedCoupon.discountValue) / 100;
      return appliedCoupon.maxDiscount ? Math.min(computed, appliedCoupon.maxDiscount) : computed;
    }
  }, [appliedCoupon, subtotal]);

  const finalTotal = useMemo(() => {
    if (cart.length === 0) return 0;
    const calc = subtotal - discountAmount + deliveryCharge;
    return Math.max(calc, 0);
  }, [subtotal, discountAmount, deliveryCharge, cart.length]);

  // Coupon handling
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode && c.isActive);

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    if (subtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Coupon requires minimum order of ₹${found.minOrderValue.toLocaleString('en-IN')}`,
      };
    }

    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied successfully!`);
    return { success: true, message: `Applied! ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const addCoupon = (c: Coupon) => {
    setCoupons((prev) => [c, ...prev]);
    showToast(`Coupon ${c.code} created`);
  };

  const toggleCoupon = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showToast(`Coupon ${code} removed`, 'info');
  };

  // Wishlist
  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed from wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Saved to wishlist`);
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    showToast(`Removed from wishlist`, 'info');
  };

  // Auth & Profile
  const login = (email: string, role?: 'customer' | 'admin') => {
    const existing = allUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existing) {
      setCurrentUser(existing);
      showToast(`Welcome back, ${existing.name}!`);
      return true;
    }

    // Auto-create or login fallback
    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0],
      email: email,
      phone: '+91 98000 00000',
      role: role || (email.toLowerCase().includes('admin') ? 'admin' : 'customer'),
      addresses: [
        {
          id: 'addr-' + Date.now(),
          fullName: email.split('@')[0],
          phone: '+91 98000 00000',
          street: '12th Main, Indiranagar',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038',
          isDefault: true,
          type: 'Home',
        },
      ],
      createdAt: new Date().toISOString().split('T')[0],
    };

    setAllUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Logged in as ${newUser.name}`);
    return true;
  };

  const signup = (name: string, email: string, phone: string) => {
    const existing = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      showToast('Account with this email already exists', 'error');
      return false;
    }

    const newUser: UserProfile = {
      id: 'usr-' + Date.now(),
      name,
      email,
      phone,
      role: 'customer',
      addresses: [
        {
          id: 'addr-' + Date.now(),
          fullName: name,
          phone,
          street: 'Marine Drive Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400020',
          isDefault: true,
          type: 'Home',
        },
      ],
      createdAt: new Date().toISOString().split('T')[0],
    };

    setAllUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Account created! Welcome to Glowora, ${name}`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
    setActiveTab('home');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setAllUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    showToast('Profile updated');
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    if (!currentUser) return;
    const newAddress: Address = {
      ...addr,
      id: 'addr-' + Date.now(),
    };
    const updatedAddresses = [...currentUser.addresses, newAddress];
    updateProfile({ addresses: updatedAddresses });
    showToast('Delivery address saved');
  };

  const deleteAddress = (id: string) => {
    if (!currentUser) return;
    const updatedAddresses = currentUser.addresses.filter((a) => a.id !== id);
    updateProfile({ addresses: updatedAddresses });
    showToast('Address removed', 'info');
  };

  const setDefaultAddress = (id: string) => {
    if (!currentUser) return;
    const updatedAddresses = currentUser.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    updateProfile({ addresses: updatedAddresses });
    showToast('Default address updated');
  };

  const switchRole = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser(INITIAL_ADMIN_USER);
      setActiveTab('admin');
      showToast('Switched to Admin Portal (Aarav Mehta)');
    } else {
      setCurrentUser(INITIAL_USER);
      setActiveTab('home');
      showToast('Switched to Customer Storefront (Priya Sharma)');
    }
  };

  // Orders
  const placeOrder = ({
    address,
    paymentMethod,
  }: {
    address: Address;
    paymentMethod: 'cod' | 'upi' | 'card';
  }): Order | null => {
    if (cart.length === 0 || !currentUser) return null;

    const orderId = 'GLW-' + Math.floor(10000 + Math.random() * 90000);
    const orderDate = new Date().toISOString().split('T')[0];
    
    // Estimated delivery in 3 days
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);
    const estDateStr = estDate.toISOString().split('T')[0];

    const newOrder: Order = {
      id: orderId,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userPhone: address.phone || currentUser.phone,
      date: orderDate,
      items: cart.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        unitPrice: item.product.price,
        subtotal: item.product.price * item.quantity,
      })),
      subtotal,
      discount: discountAmount,
      deliveryCharge,
      totalAmount: finalTotal,
      couponCode: appliedCoupon?.code,
      shippingAddress: address,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      status: 'Ordered',
      estimatedDelivery: estDateStr,
      trackingHistory: [
        {
          status: 'Ordered',
          date: 'Just now',
          location: paymentMethod === 'cod' ? 'Cash on Delivery Verified' : 'Online Payment Approved',
          note: `Order ${orderId} received and queued for dispatch.`,
          completed: true,
        },
        {
          status: 'Packed',
          date: 'Expected Today',
          location: 'Mumbai Central Warehouse',
          note: 'Items undergoing quality and batch checks.',
          completed: false,
        },
        {
          status: 'Shipped',
          date: 'Expected Tomorrow',
          location: 'Express Logistics Hub',
          note: 'Package assigned to courier partner.',
          completed: false,
        },
        {
          status: 'Out for Delivery',
          date: estDateStr,
          location: `${address.city} Distribution Hub`,
          note: 'Courier partner will contact you upon dispatch.',
          completed: false,
        },
        {
          status: 'Delivered',
          date: estDateStr,
          location: `${address.city}, ${address.state}`,
          note: 'Delivery will require recipient confirmation.',
          completed: false,
        },
      ],
    };

    // Deduct stock
    setProducts((prev) =>
      prev.map((prod) => {
        const cartMatch = cart.find((c) => c.product.id === prod.id);
        if (cartMatch) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - cartMatch.quantity),
          };
        }
        return prod;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setInvoiceOrder(newOrder);
    showToast(`Order #${orderId} placed successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        
        // Update tracking history completion
        const statusOrder: OrderStatus[] = ['Ordered', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
        const currentIdx = statusOrder.indexOf(status);

        const updatedHistory = ord.trackingHistory.map((step) => {
          const stepIdx = statusOrder.indexOf(step.status);
          const isDone = stepIdx !== -1 && currentIdx !== -1 && stepIdx <= currentIdx;
          return {
            ...step,
            completed: isDone,
            date: isDone ? (step.date.includes('Expected') ? 'Updated Today' : step.date) : step.date,
          };
        });

        return {
          ...ord,
          status,
          paymentStatus: status === 'Delivered' && ord.paymentMethod === 'cod' ? 'Paid' : ord.paymentStatus,
          trackingHistory: updatedHistory,
        };
      })
    );
    showToast(`Order ${orderId} status set to ${status}`);
  };

  // Products CRUD for Admin
  const addProduct = (p: Omit<Product, 'id' | 'createdAt'>) => {
    const newProd: Product = {
      ...p,
      id: 'prod-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      rating: p.rating || 5.0,
      ratingCount: p.ratingCount || 1,
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" added to catalog`);
  };

  const updateProduct = (p: Product) => {
    setProducts((prev) => prev.map((item) => (item.id === p.id ? p : item)));
    showToast(`Product "${p.name}" updated`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  const restockProduct = (id: string, amount: number) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: item.stock + amount } : item
      )
    );
    showToast(`Restocked ${amount} units`);
  };

  // Reviews
  const addReview = (productId: string, rev: { rating: number; title: string; comment: string }) => {
    const newReview: ReviewItem & { productId: string } = {
      id: 'rev-' + Date.now(),
      productId,
      userName: currentUser?.name || 'Verified Customer',
      userEmail: currentUser?.email || 'customer@example.com',
      rating: rev.rating,
      date: new Date().toISOString().split('T')[0],
      title: rev.title,
      comment: rev.comment,
      verifiedPurchase: true,
      approved: true,
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you! Your verified review has been submitted.');
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review removed', 'info');
  };

  const approveReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: true } : r))
    );
    showToast('Review approved');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        viewProductDetails,

        products,
        categories: CATEGORIES,
        addProduct,
        updateProduct,
        deleteProduct,
        restockProduct,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        deliveryCharge,
        finalTotal,

        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        toggleCoupon,
        deleteCoupon,

        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,

        currentUser,
        allUsers,
        login,
        signup,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
        setDefaultAddress,
        switchRole,

        orders,
        placeOrder,
        updateOrderStatus,
        selectedOrderForTracking,
        setSelectedOrderForTracking,

        reviews,
        addReview,
        deleteReview,
        approveReview,

        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isAdvisorModalOpen,
        setIsAdvisorModalOpen,
        invoiceOrder,
        setInvoiceOrder,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
