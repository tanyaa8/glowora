import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, CategoryType, OrderStatus, Coupon } from '../../types';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  Ticket, 
  Star, 
  BarChart3, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Search, 
  RotateCcw,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    restockProduct,
    categories,
    orders, 
    updateOrderStatus,
    allUsers,
    coupons,
    addCoupon,
    toggleCoupon,
    deleteCoupon,
    reviews,
    approveReview,
    deleteReview,
    setInvoiceOrder,
    setActiveTab,
    showToast,
    currentUser,
    switchRole
  } = useApp();

  const [adminTab, setAdminTab] = useState<
    | 'dashboard'
    | 'products'
    | 'categories'
    | 'orders'
    | 'users'
    | 'inventory'
    | 'coupons'
    | 'reviews'
    | 'reports'
  >('dashboard');

  // Product Add / Edit Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Product Form State
  const [pName, setPName] = useState('');
  const [pBrand, setPBrand] = useState('Glowora Atelier');
  const [pCategory, setPCategory] = useState<CategoryType>('Skincare');
  const [pPrice, setPPrice] = useState(799);
  const [pOriginalPrice, setPOriginalPrice] = useState(1099);
  const [pDiscount, setPDiscount] = useState(27);
  const [pStock, setPStock] = useState(50);
  const [pDescription, setPDescription] = useState('');
  const [pIngredients, setPIngredients] = useState('');
  const [pImage, setPImage] = useState('');

  // Coupon Creation Form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'fixed' | 'percentage'>('fixed');
  const [newCouponVal, setNewCouponVal] = useState(150);
  const [newCouponMin, setNewCouponMin] = useState(799);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // Product search in admin
  const [productSearch, setProductSearch] = useState('');

  // Open Add Product
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setPName('');
    setPBrand('Glowora Atelier');
    setPCategory('Skincare');
    setPPrice(799);
    setPOriginalPrice(1099);
    setPDiscount(27);
    setPStock(50);
    setPDescription('A deeply hydrating and brightening botanical formula crafted with clean active extracts.');
    setPIngredients('Aqua, Niacinamide, Hyaluronic Acid, Vitamin E, Botanical Ferments, Glycerin.');
    setPImage('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80');
    setIsProductModalOpen(true);
  };

  // Open Edit Product
  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setPName(p.name);
    setPBrand(p.brand);
    setPCategory(p.category);
    setPPrice(p.price);
    setPOriginalPrice(p.originalPrice);
    setPDiscount(p.discount);
    setPStock(p.stock);
    setPDescription(p.description);
    setPIngredients(p.ingredients);
    setPImage(p.images[0] || '');
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName.trim()) {
      showToast('Product name is required', 'error');
      return;
    }

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: pName.trim(),
        brand: pBrand.trim(),
        category: pCategory,
        price: Number(pPrice),
        originalPrice: Number(pOriginalPrice),
        discount: Number(pDiscount),
        stock: Number(pStock),
        description: pDescription,
        ingredients: pIngredients,
        images: pImage ? [pImage, ...editingProduct.images.slice(1)] : editingProduct.images,
      });
    } else {
      addProduct({
        name: pName.trim(),
        brand: pBrand.trim(),
        category: pCategory,
        price: Number(pPrice),
        originalPrice: Number(pOriginalPrice),
        discount: Number(pDiscount),
        stock: Number(pStock),
        images: [pImage || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80'],
        description: pDescription,
        ingredients: pIngredients,
        howToUse: 'Apply gently to clean skin daily.',
        benefits: ['Nourishing hydration', 'Smooth luminous finish'],
        specifications: { 'Net Weight': '50 ml', 'Safety': 'Dermatologist tested' },
        rating: 5.0,
        ratingCount: 1,
      });
    }

    setIsProductModalOpen(false);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountType: newCouponType,
      discountValue: Number(newCouponVal),
      minOrderValue: Number(newCouponMin),
      description: newCouponDesc || `Save ₹${newCouponVal} on your order`,
      expiresOn: '2026-12-31',
      isActive: true,
    });

    setNewCouponCode('');
    setNewCouponDesc('');
  };

  // KPI Calculations
  const totalRevenue = useMemo(() => {
    // Combine mock base revenue + actual runtime orders
    const dynamicOrdersRev = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    return 1845900 + dynamicOrdersRev;
  }, [orders]);

  const totalUsersCount = 12450 + allUsers.length - 2;
  const totalOrdersCount = 8745 + orders.length - 2;
  const totalProductsCount = 1280 + products.length - 12;

  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return products;
    const q = productSearch.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  }, [products, productSearch]);

  const lowStockProducts = useMemo(() => {
    return products.filter((p) => p.stock < 25);
  }, [products]);

  return (
    <div className="bg-stone-100 min-h-screen">
      
      {/* Admin Top Header Bar */}
      <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center font-serif font-bold text-white">
            G
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold tracking-tight">
              Glowora Administration Console
            </h1>
            <p className="text-[11px] text-stone-400">
              E-Commerce Store Operations & Business Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-xs text-stone-400">
            Signed in as: <strong className="text-white">{currentUser?.name || 'Administrator'}</strong>
          </span>
          <button
            onClick={() => switchRole('customer')}
            className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-stone-700"
          >
            <ExternalLink size={13} /> View Live Storefront
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Admin Sidebar Navigation */}
          <aside className="lg:col-span-3 bg-white p-3 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1 sticky top-6">
            <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Operations Menu
            </p>

            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'products', label: 'Product Management', icon: Package, count: products.length },
              { id: 'categories', label: 'Category Management', icon: Tags, count: categories.length },
              { id: 'orders', label: 'Order Management', icon: ShoppingBag, count: orders.length },
              { id: 'users', label: 'User Management', icon: Users, count: allUsers.length },
              { id: 'inventory', label: 'Inventory Monitor', icon: AlertTriangle, count: lowStockProducts.length },
              { id: 'coupons', label: 'Coupons & Offers', icon: Ticket, count: coupons.length },
              { id: 'reviews', label: 'Reviews Moderation', icon: Star, count: reviews.length },
              { id: 'reports', label: 'Sales Reports', icon: BarChart3 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = adminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={15} className={isActive ? 'text-white' : 'text-stone-500'} />
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
          </aside>

          {/* Admin Main Content Area */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* 1. DASHBOARD OVERVIEW */}
            {adminTab === 'dashboard' && (
              <div className="space-y-6">
                
                {/* 4 KPI Cards (Matching prompt Section 13) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between text-stone-400 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Total Users</span>
                      <Users size={16} className="text-blue-600" />
                    </div>
                    <p className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                      {totalUsersCount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-0.5">
                      <TrendingUp size={11} /> +12.4% this month
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between text-stone-400 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Total Products</span>
                      <Package size={16} className="text-purple-600" />
                    </div>
                    <p className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                      {totalProductsCount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[11px] text-stone-500 mt-1">Across 8 Categories</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between text-stone-400 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Total Orders</span>
                      <ShoppingBag size={16} className="text-amber-600" />
                    </div>
                    <p className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                      {totalOrdersCount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-0.5">
                      <TrendingUp size={11} /> +8.9% growth
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between text-stone-400 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Total Revenue</span>
                      <DollarSign size={16} className="text-emerald-600" />
                    </div>
                    <p className="font-serif text-2xl font-bold text-stone-900 tabular-nums">
                      ₹{totalRevenue.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-0.5">
                      <TrendingUp size={11} /> +18.2% vs last month
                    </p>
                  </div>
                </div>

                {/* Visual Charts: Monthly Sales & Category Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Monthly Sales Bar Simulation */}
                  <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-base font-bold text-stone-900">
                        Monthly Sales Revenue (2026)
                      </h3>
                      <span className="text-xs text-stone-500">In Lakhs (₹)</span>
                    </div>

                    <div className="h-48 flex items-end gap-3 pt-6 pb-2 px-2 border-b border-stone-100">
                      {[
                        { m: 'May', val: 12.8, h: '55%' },
                        { m: 'Jun', val: 14.2, h: '62%' },
                        { m: 'Jul', val: 15.6, h: '68%' },
                        { m: 'Aug', val: 16.9, h: '74%' },
                        { m: 'Sep', val: 18.5, h: '82%' },
                        { m: 'Oct (est)', val: 21.0, h: '94%' },
                      ].map((bar) => (
                        <div key={bar.m} className="flex-1 flex flex-col items-center gap-2 group">
                          <span className="text-[10px] font-bold text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            ₹{bar.val}L
                          </span>
                          <div
                            style={{ height: bar.h }}
                            className="w-full bg-stone-900 group-hover:bg-rose-700 rounded-t-md transition-colors"
                          />
                          <span className="text-[10px] text-stone-500 font-medium">{bar.m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category-Wise Share */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      Category-wise Sales Share
                    </h3>

                    <div className="space-y-3 pt-1">
                      {[
                        { name: 'Skincare', pct: 42, color: 'bg-rose-500' },
                        { name: 'Makeup', pct: 28, color: 'bg-stone-900' },
                        { name: 'Fragrance', pct: 16, color: 'bg-amber-500' },
                        { name: 'Haircare', pct: 9, color: 'bg-emerald-600' },
                        { name: 'Others', pct: 5, color: 'bg-blue-500' },
                      ].map((item) => (
                        <div key={item.name} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold text-stone-700">
                            <span>{item.name}</span>
                            <span className="tabular-nums">{item.pct}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                            <div
                              style={{ width: `${item.pct}%` }}
                              className={`h-full ${item.color} rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Top Products & Low Stock Warnings */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Top Products */}
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      Top Performing Products
                    </h3>
                    <div className="space-y-3">
                      {products.slice(0, 4).map((p) => (
                        <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50">
                          <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-stone-100" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-stone-900 truncate">{p.name}</h4>
                            <p className="text-[10px] text-stone-500">{p.brand} · {p.category}</p>
                          </div>
                          <span className="text-xs font-bold text-stone-900 tabular-nums">
                            ₹{p.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Low Stock Alerts */}
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-1.5 text-amber-900">
                        <AlertTriangle size={16} className="text-amber-600" /> Low Stock Alerts
                      </h3>
                      <button
                        onClick={() => setAdminTab('inventory')}
                        className="text-xs text-rose-700 font-semibold hover:underline"
                      >
                        Manage Inventory
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {lowStockProducts.slice(0, 4).map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs">
                          <div className="min-w-0 flex-1 mr-2">
                            <p className="font-bold text-stone-900 truncate">{p.name}</p>
                            <p className="text-[10px] text-amber-800 font-medium">Only {p.stock} units remaining</p>
                          </div>
                          <button
                            onClick={() => restockProduct(p.id, 25)}
                            className="px-2.5 py-1 bg-stone-900 text-white rounded text-[11px] font-semibold hover:bg-stone-800 shrink-0"
                          >
                            + Restock 25
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* 2. PRODUCT MANAGEMENT (Section 14: Add Product, Edit, Delete, Manage Table) */}
            {adminTab === 'products' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-900">
                      Product Catalog Management
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Add, update pricing, inventory stock, and descriptions
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        placeholder="Search products..."
                        className="pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={handleOpenAddProduct}
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Plus size={14} /> ADD PRODUCT
                    </button>
                  </div>
                </div>

                {/* Manage Products Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-200 bg-[#FAF9F5] text-stone-600 uppercase text-[10px] font-bold tracking-wider">
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-3">Brand</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3 text-right">Price</th>
                        <th className="py-3 px-3 text-center">Stock</th>
                        <th className="py-3 px-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0" />
                              <span className="font-bold text-stone-900 line-clamp-1 max-w-xs">{p.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-stone-600 font-medium">{p.brand}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[11px]">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right font-bold text-stone-900 tabular-nums">
                            ₹{p.price.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-3 text-center tabular-nums">
                            <span className={`px-2 py-0.5 rounded font-semibold ${
                              p.stock <= 10 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {p.stock}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded"
                                title="Edit Product"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="p-1.5 text-rose-600 hover:text-rose-900 hover:bg-rose-100 rounded"
                                title="Delete Product"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. CATEGORY MANAGEMENT */}
            {adminTab === 'categories' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
                <div className="pb-4 border-b border-stone-100">
                  <h2 className="font-serif text-xl font-bold text-stone-900">
                    Category Management
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Structure catalog taxonomy and collection assignments
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((c) => {
                    const countInCat = products.filter((p) => p.category === c.id).length;
                    return (
                      <div key={c.id} className="p-4 rounded-xl border border-stone-200 bg-[#FAF9F5] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{c.icon}</span>
                          <div>
                            <h4 className="text-xs font-bold text-stone-900">{c.name}</h4>
                            <p className="text-[10px] text-stone-500">{c.description}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-stone-800 bg-white px-2 py-1 rounded border border-stone-200">
                          {countInCat} Items
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. ORDER MANAGEMENT */}
            {adminTab === 'orders' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
                <div className="pb-4 border-b border-stone-100 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-900">
                      Order Management ({orders.length})
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Process shipments, update order lifecycle, and issue invoices
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-4 rounded-xl border border-stone-200/90 bg-[#FAF9F5]/40 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div>
                          <span className="font-mono font-bold text-stone-900 text-sm">#{ord.id}</span>
                          <span className="text-stone-400 mx-2">·</span>
                          <span className="font-medium text-stone-700">{ord.userName}</span>
                          <span className="text-stone-400 mx-2">·</span>
                          <span className="text-stone-500 tabular-nums">{ord.date}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-bold text-stone-900 tabular-nums">
                            ₹{ord.totalAmount.toLocaleString('en-IN')}
                          </span>

                          {/* Status Dropdown */}
                          <div className="relative">
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className="text-xs font-bold bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-stone-800 cursor-pointer focus:outline-none"
                            >
                              <option value="Ordered">Ordered</option>
                              <option value="Packed">Packed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>

                          <button
                            onClick={() => setInvoiceOrder(ord)}
                            className="p-1.5 text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-lg"
                            title="Invoice"
                          >
                            <FileText size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-stone-600 flex flex-wrap items-center gap-4 pt-1">
                        <span>Items: <strong>{ord.items.length}</strong></span>
                        <span>Payment: <strong className="uppercase">{ord.paymentMethod}</strong> ({ord.paymentStatus})</span>
                        <span>Deliver to: <strong>{ord.shippingAddress.city}, {ord.shippingAddress.pincode}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. USER MANAGEMENT */}
            {adminTab === 'users' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
                <div className="pb-4 border-b border-stone-100">
                  <h2 className="font-serif text-xl font-bold text-stone-900">
                    User Management ({allUsers.length})
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Customer registry, role credentials, and delivery addresses
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-200 bg-[#FAF9F5] text-stone-600 uppercase text-[10px] font-bold tracking-wider">
                        <th className="py-3 px-4">User</th>
                        <th className="py-3 px-3">Email</th>
                        <th className="py-3 px-3">Phone</th>
                        <th className="py-3 px-3 text-center">Role</th>
                        <th className="py-3 px-3">Registered</th>
                        <th className="py-3 px-4 text-center">Addresses</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {allUsers.map((u) => (
                        <tr key={u.id}>
                          <td className="py-3 px-4 font-bold text-stone-900">{u.name}</td>
                          <td className="py-3 px-3 text-stone-600">{u.email}</td>
                          <td className="py-3 px-3 text-stone-600 font-mono">{u.phone}</td>
                          <td className="py-3 px-3 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              u.role === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-stone-100 text-stone-700'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-stone-400 tabular-nums">{u.createdAt}</td>
                          <td className="py-3 px-4 text-center text-stone-700 font-medium">
                            {u.addresses.length} Saved
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. INVENTORY MANAGEMENT */}
            {adminTab === 'inventory' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
                <div className="pb-4 border-b border-stone-100 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-900">
                      Real-Time Inventory & Stock Warnings
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Monitor warehouse reserve levels and dispatch replenishment
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-200 bg-[#FAF9F5] text-stone-600 uppercase text-[10px] font-bold tracking-wider">
                        <th className="py-3 px-4">Product Name</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3 text-center">Stock Level</th>
                        <th className="py-3 px-3 text-center">Status</th>
                        <th className="py-3 px-4 text-center">Quick Restock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {products.map((p) => (
                        <tr key={p.id}>
                          <td className="py-3 px-4 font-bold text-stone-900">{p.name}</td>
                          <td className="py-3 px-3 text-stone-600">{p.category}</td>
                          <td className="py-3 px-3 text-center font-bold tabular-nums">{p.stock}</td>
                          <td className="py-3 px-3 text-center">
                            {p.stock === 0 ? (
                              <span className="text-[10px] font-bold uppercase bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                                Out of Stock
                              </span>
                            ) : p.stock < 25 ? (
                              <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                                Low Stock
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                                Healthy
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="inline-flex gap-1.5">
                              <button
                                onClick={() => restockProduct(p.id, 25)}
                                className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded text-[11px]"
                              >
                                +25
                              </button>
                              <button
                                onClick={() => restockProduct(p.id, 50)}
                                className="px-2 py-1 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded text-[11px]"
                              >
                                +50
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 7. COUPON / OFFERS MANAGEMENT */}
            {adminTab === 'coupons' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
                <div className="pb-4 border-b border-stone-100">
                  <h2 className="font-serif text-xl font-bold text-stone-900">
                    Coupon & Promotional Campaigns
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Create instant discount codes and set minimum purchase thresholds
                  </p>
                </div>

                {/* Create Coupon Form */}
                <form onSubmit={handleCreateCoupon} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">Create New Coupon</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">Coupon Code</label>
                      <input
                        type="text"
                        value={newCouponCode}
                        onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                        placeholder="e.g. FLASH25"
                        className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg uppercase font-mono font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">Discount Type</label>
                      <select
                        value={newCouponType}
                        onChange={(e) => setNewCouponType(e.target.value as any)}
                        className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg"
                      >
                        <option value="fixed">Fixed ₹ Off</option>
                        <option value="percentage">Percentage (%) Off</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">Discount Value</label>
                      <input
                        type="number"
                        value={newCouponVal}
                        onChange={(e) => setNewCouponVal(Number(e.target.value))}
                        className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">Min Order (₹)</label>
                      <input
                        type="number"
                        value={newCouponMin}
                        onChange={(e) => setNewCouponMin(Number(e.target.value))}
                        className="w-full text-xs p-2 bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={newCouponDesc}
                      onChange={(e) => setNewCouponDesc(e.target.value)}
                      placeholder="Description e.g. Flat ₹150 OFF on skincare orders"
                      className="flex-1 text-xs p-2 bg-white border border-stone-300 rounded-lg"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
                    >
                      Save Coupon
                    </button>
                  </div>
                </form>

                {/* Coupons Table */}
                <div className="space-y-3">
                  {coupons.map((c) => (
                    <div key={c.code} className="p-3.5 rounded-xl border border-stone-200 bg-white flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                            {c.code}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            c.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-500'
                          }`}>
                            {c.isActive ? 'Active' : 'Disabled'}
                          </span>
                        </div>
                        <p className="text-stone-600 text-xs mt-1">{c.description}</p>
                        <p className="text-[11px] text-stone-400">Min Order: ₹{c.minOrderValue} · Expires: {c.expiresOn}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleCoupon(c.code)}
                          className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded text-xs"
                        >
                          {c.isActive ? 'Disable' : 'Enable'}
                        </button>
                        <button
                          onClick={() => deleteCoupon(c.code)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. REVIEWS MANAGEMENT */}
            {adminTab === 'reviews' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
                <div className="pb-4 border-b border-stone-100">
                  <h2 className="font-serif text-xl font-bold text-stone-900">
                    Product Reviews Moderation ({reviews.length})
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Approve genuine customer feedback and remove inappropriate content
                  </p>
                </div>

                <div className="space-y-3">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl border border-stone-200 bg-[#FAF9F5] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900">{rev.userName}</span>
                          <span className="text-stone-400">·</span>
                          <span className="text-amber-500 font-bold">{rev.rating}★</span>
                          <span className="text-stone-900 font-medium">"{rev.title}"</span>
                        </div>
                        <span className="text-stone-400 text-[11px]">{rev.date}</span>
                      </div>
                      <p className="text-stone-700 italic">"{rev.comment}"</p>
                      <div className="flex items-center justify-between pt-1 border-t border-stone-200/60">
                        <span className="text-[10px] text-stone-400">Product ID: {rev.productId}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => deleteReview(rev.id)}
                            className="px-2.5 py-1 text-rose-700 hover:bg-rose-50 rounded font-semibold text-[11px]"
                          >
                            Delete Review
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. SALES REPORTS */}
            {adminTab === 'reports' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
                <div className="pb-4 border-b border-stone-100 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-stone-900">
                      Executive Sales Reports & Analytics
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Business metrics for BCA capstone evaluation
                    </p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold"
                  >
                    Export / Print Report
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="text-stone-500 font-medium">Average Order Value (AOV)</p>
                    <p className="font-serif text-2xl font-bold text-stone-900 mt-1">₹1,748</p>
                    <p className="text-emerald-700 mt-0.5 font-semibold">Healthy retail benchmark</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="text-stone-500 font-medium">COD vs Online Payment</p>
                    <p className="font-serif text-2xl font-bold text-stone-900 mt-1">68% UPI / Card</p>
                    <p className="text-stone-600 mt-0.5">32% Cash on Delivery</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="text-stone-500 font-medium">Customer Repeat Purchase</p>
                    <p className="font-serif text-2xl font-bold text-stone-900 mt-1">34.2%</p>
                    <p className="text-emerald-700 mt-0.5 font-semibold">+4.1% MoM retention</p>
                  </div>
                </div>

                <div className="p-5 bg-[#FAF9F5] rounded-xl border border-stone-200 text-xs space-y-2">
                  <h4 className="font-bold text-stone-900">Technical Database Schema Documentation (BCA Project):</h4>
                  <p className="text-stone-600">The relational database supports 8 core tables: <code>users</code>, <code>products</code>, <code>categories</code>, <code>orders</code>, <code>order_items</code>, <code>wishlist</code>, <code>reviews</code>, and <code>addresses</code> with foreign key cascades and transactional consistency.</p>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
            <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product to Catalog'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 sm:p-8 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                  placeholder="e.g. Cellular Golden Glow Vitamin C Serum"
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Brand</label>
                  <input
                    type="text"
                    value={pBrand}
                    onChange={(e) => setPBrand(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                  >
                    <option value="Skincare">Skincare</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Haircare">Haircare</option>
                    <option value="Fragrance">Fragrance</option>
                    <option value="Bath & Body">Bath & Body</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Men">Men Grooming</option>
                    <option value="Nails">Nails</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={pPrice}
                    onChange={(e) => setPPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={pOriginalPrice}
                    onChange={(e) => setPOriginalPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Initial Stock</label>
                  <input
                    type="number"
                    value={pStock}
                    onChange={(e) => setPStock(Number(e.target.value))}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Product Description</label>
                <textarea
                  rows={2}
                  value={pDescription}
                  onChange={(e) => setPDescription(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Ingredients</label>
                <textarea
                  rows={2}
                  value={pIngredients}
                  onChange={(e) => setPIngredients(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Product Image URL / Asset</label>
                <input
                  type="text"
                  value={pImage}
                  onChange={(e) => setPImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold"
                >
                  {editingProduct ? 'Save Changes' : 'ADD PRODUCT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
