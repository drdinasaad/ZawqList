import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Category,
  Company,
  Brand,
  Product,
  ProductVariant,
  Retailer,
  PriceOffer,
  UserLibrary,
  LibraryItem,
  CustomShelf,
  AnalyticsEvent,
  AnalyticsEventType,
  AppUser,
  DefaultShelfKey
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_COMPANIES,
  INITIAL_BRANDS,
  INITIAL_PRODUCTS,
  INITIAL_VARIANTS,
  INITIAL_RETAILERS,
  INITIAL_OFFERS,
  INITIAL_USER_LIBRARIES,
  INITIAL_LIBRARY_ITEMS,
  INITIAL_CUSTOM_SHELVES,
  INITIAL_ANALYTICS_EVENTS,
  INITIAL_USERS,
  DEFAULT_SHELVES
} from '../data/seedData';

const STORAGE_KEY = 'zawqlist_store_v1';

interface AnalyticsSummary {
  registeredUsersCount: number;
  totalLibrariesCount: number;
  publicLibrariesCount: number;
  totalProductViews: number;
  uniqueUserProductViews: number;
  totalProductsAddedToLibraries: number;
  uniqueUsersAddingProducts: number;
  placementsByShelf: Record<string, { count: number; name_ar: string }>;
  popularSearches: { query: string; count: number }[];
  zeroResultSearches: { query: string; count: number }[];
  retailerOfferViews: Record<string, number>;
  libraryShareCount: number;
}

interface StoreContextType {
  // Data
  categories: Category[];
  activeCategories: Category[];
  companies: Company[];
  brands: Brand[];
  products: Product[];
  variants: ProductVariant[];
  retailers: Retailer[];
  offers: PriceOffer[];
  libraries: UserLibrary[];
  libraryItems: LibraryItem[];
  customShelves: CustomShelf[];
  analyticsEvents: AnalyticsEvent[];
  users: AppUser[];
  currentUser: AppUser | null;

  // User Actions
  setCurrentUser: (user: AppUser | null) => void;
  registerUser: (name: string, email: string) => AppUser;

  // Library Actions
  createLibrary: (data: { title: string; description: string; visibility: 'public' | 'private'; cover_image_url?: string }) => UserLibrary;
  updateLibrary: (libraryId: string, updates: Partial<UserLibrary>) => void;
  deleteLibrary: (libraryId: string) => void;
  setLibraryVisibility: (libraryId: string, visibility: 'public' | 'private') => void;

  // Shelf & Item Actions
  addProductToShelf: (libraryId: string, productId: string, shelfId: string, personalNote?: string) => { success: boolean; message: string };
  moveItemShelf: (itemId: string, newShelfId: string) => void;
  removeItemFromLibrary: (itemId: string) => void;
  updateItemNote: (itemId: string, note: string) => void;
  createCustomShelf: (libraryId: string, name: string, color: string) => CustomShelf;
  updateCustomShelf: (shelfId: string, updates: { name?: string; color?: string; sort_order?: number }) => void;
  deleteCustomShelf: (shelfId: string) => void;

  // Catalog / Admin Actions
  createCategory: (cat: Omit<Category, 'created_at' | 'updated_at'>) => Category;
  updateCategory: (categoryId: string, updates: Partial<Category>) => void;
  createProduct: (prod: Omit<Product, 'created_at' | 'updated_at'>) => Product;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  archiveProduct: (productId: string) => void;
  createBrand: (brand: Brand) => void;
  createRetailer: (retailer: Retailer) => void;
  createOffer: (offer: PriceOffer) => void;
  updateOffer: (offerId: string, updates: Partial<PriceOffer>) => void;
  deleteOffer: (offerId: string) => void;
  importCatalogData: (jsonString: string) => { success: boolean; message: string; count: number };
  exportCatalogData: () => string;
  resetToDefaultData: () => void;

  // Analytics
  logEvent: (eventType: AnalyticsEventType, details?: Partial<AnalyticsEvent>) => void;
  getAnalyticsSummary: () => AnalyticsSummary;

  // Helper Queries
  getProductById: (id: string) => Product | undefined;
  getBrandById: (id: string) => Brand | undefined;
  getCompanyById: (id: string) => Company | undefined;
  getCategoryById: (id: string) => Category | undefined;
  getOffersForProduct: (productId: string) => PriceOffer[];
  getLibraryBySlug: (slug: string) => UserLibrary | undefined;
  getLibraryById: (id: string) => UserLibrary | undefined;
  getItemsForLibrary: (libraryId: string) => LibraryItem[];
  getCustomShelvesForLibrary: (libraryId: string) => CustomShelf[];
  getUserLibraries: (userId: string) => UserLibrary[];
  getProductLibraryPlacements: (productId: string) => {
    totalPlacements: number;
    byShelf: Record<string, { count: number; shelf_name_ar: string }>;
  };
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or initialize from seed data
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  const [companies, setCompanies] = useState<Company[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_companies');
      return saved ? JSON.parse(saved) : INITIAL_COMPANIES;
    } catch {
      return INITIAL_COMPANIES;
    }
  });

  const [brands, setBrands] = useState<Brand[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_brands');
      return saved ? JSON.parse(saved) : INITIAL_BRANDS;
    } catch {
      return INITIAL_BRANDS;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [variants] = useState<ProductVariant[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_variants');
      return saved ? JSON.parse(saved) : INITIAL_VARIANTS;
    } catch {
      return INITIAL_VARIANTS;
    }
  });

  const [retailers, setRetailers] = useState<Retailer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_retailers');
      return saved ? JSON.parse(saved) : INITIAL_RETAILERS;
    } catch {
      return INITIAL_RETAILERS;
    }
  });

  const [offers, setOffers] = useState<PriceOffer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_offers');
      return saved ? JSON.parse(saved) : INITIAL_OFFERS;
    } catch {
      return INITIAL_OFFERS;
    }
  });

  const [libraries, setLibraries] = useState<UserLibrary[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_libraries');
      return saved ? JSON.parse(saved) : INITIAL_USER_LIBRARIES;
    } catch {
      return INITIAL_USER_LIBRARIES;
    }
  });

  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_items');
      return saved ? JSON.parse(saved) : INITIAL_LIBRARY_ITEMS;
    } catch {
      return INITIAL_LIBRARY_ITEMS;
    }
  });

  const [customShelves, setCustomShelves] = useState<CustomShelf[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_custom_shelves');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOM_SHELVES;
    } catch {
      return INITIAL_CUSTOM_SHELVES;
    }
  });

  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_analytics');
      return saved ? JSON.parse(saved) : INITIAL_ANALYTICS_EVENTS;
    } catch {
      return INITIAL_ANALYTICS_EVENTS;
    }
  });

  const [users, setUsers] = useState<AppUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Default logged in user: Dina Saad (Admin)
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    try {
      const savedUid = localStorage.getItem(STORAGE_KEY + '_current_uid');
      if (savedUid === 'guest') return null;
      const found = INITIAL_USERS.find(u => u.uid === savedUid);
      return found || INITIAL_USERS[0];
    } catch {
      return INITIAL_USERS[0];
    }
  });

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_categories', JSON.stringify(categories));
  }, [categories]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_companies', JSON.stringify(companies));
  }, [companies]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_brands', JSON.stringify(brands));
  }, [brands]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_products', JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_retailers', JSON.stringify(retailers));
  }, [retailers]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_offers', JSON.stringify(offers));
  }, [offers]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_libraries', JSON.stringify(libraries));
  }, [libraries]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_items', JSON.stringify(libraryItems));
  }, [libraryItems]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_custom_shelves', JSON.stringify(customShelves));
  }, [customShelves]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_analytics', JSON.stringify(analyticsEvents));
  }, [analyticsEvents]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_users', JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_current_uid', currentUser ? currentUser.uid : 'guest');
  }, [currentUser]);

  // Log analytics event
  const logEvent = (eventType: AnalyticsEventType, details: Partial<AnalyticsEvent> = {}) => {
    const newEvent: AnalyticsEvent = {
      event_id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      event_type: eventType,
      user_id: currentUser ? currentUser.uid : `guest_${sessionStorage.getItem('zawq_sid') || 'visitor'}`,
      ...details
    };
    setAnalyticsEvents(prev => [newEvent, ...prev.slice(0, 500)]);
  };

  // Set visitor session id if not set
  useEffect(() => {
    if (!sessionStorage.getItem('zawq_sid')) {
      sessionStorage.setItem('zawq_sid', Math.random().toString(36).substring(2, 9));
    }
  }, []);

  // Filter active categories
  const activeCategories = useMemo(() => {
    return categories.filter(c => c.status === 'active').sort((a, b) => a.sort_order - b.sort_order);
  }, [categories]);

  // Helper queries
  const getProductById = (id: string) => products.find(p => p.product_id === id);
  const getBrandById = (id: string) => brands.find(b => b.brand_id === id);
  const getCompanyById = (id: string) => companies.find(c => c.company_id === id);
  const getCategoryById = (id: string) => categories.find(c => c.category_id === id);
  const getOffersForProduct = (productId: string) =>
    offers
      .filter(o => o.product_id === productId)
      .sort((a, b) => a.price_amount - b.price_amount);

  const getLibraryBySlug = (slug: string) => libraries.find(l => l.slug === slug);
  const getLibraryById = (id: string) => libraries.find(l => l.library_id === id);
  const getItemsForLibrary = (libraryId: string) =>
    libraryItems
      .filter(i => i.library_id === libraryId)
      .sort((a, b) => a.sort_order - b.sort_order);

  const getCustomShelvesForLibrary = (libraryId: string) =>
    customShelves
      .filter(s => s.library_id === libraryId)
      .sort((a, b) => a.sort_order - b.sort_order);

  const getUserLibraries = (userId: string) =>
    libraries.filter(l => l.owner_uid === userId);

  // Placements of a product across public libraries (or all libraries)
  const getProductLibraryPlacements = (productId: string) => {
    // Check public libraries
    const publicLibIds = new Set(libraries.filter(l => l.visibility === 'public').map(l => l.library_id));
    const items = libraryItems.filter(i => i.product_id === productId && publicLibIds.has(i.library_id));

    const byShelf: Record<string, { count: number; shelf_name_ar: string }> = {};

    items.forEach(item => {
      let shelfName = 'المفضلة';
      const defShelf = DEFAULT_SHELVES.find(ds => ds.key === item.shelf_id);
      if (defShelf) {
        shelfName = defShelf.name_ar;
      } else {
        const custom = customShelves.find(cs => cs.shelf_id === item.shelf_id);
        if (custom) shelfName = custom.name;
      }

      if (!byShelf[item.shelf_id]) {
        byShelf[item.shelf_id] = { count: 0, shelf_name_ar: shelfName };
      }
      byShelf[item.shelf_id].count += 1;
    });

    return {
      totalPlacements: items.length,
      byShelf
    };
  };

  // Register User
  const registerUser = (name: string, email: string): AppUser => {
    const newUser: AppUser = {
      uid: `user_${Date.now()}`,
      name,
      email,
      role: 'user',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);

    // Auto-create initial default library for new user
    const slugBase = name.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'my-library';
    const newLib: UserLibrary = {
      library_id: `lib_${Date.now()}`,
      owner_uid: newUser.uid,
      owner_name: newUser.name,
      title: `مكتبة ${newUser.name} الشخصية`,
      description: 'مجموعتي الشخصية لتقييم واختيار منتجات الجمال والعناية المفضلة.',
      slug: `${slugBase}-${Math.random().toString(36).substring(2, 6)}`,
      visibility: 'public',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setLibraries(prev => [newLib, ...prev]);

    return newUser;
  };

  // Create Library
  const createLibrary = (data: { title: string; description: string; visibility: 'public' | 'private'; cover_image_url?: string }): UserLibrary => {
    if (!currentUser) {
      throw new Error('يجب تسجيل الدخول لإنشاء مكتبة جديدة');
    }
    const slugBase = data.title.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'collection';
    const uniqueSlug = `${slugBase}-${Date.now().toString().slice(-4)}`;

    const newLib: UserLibrary = {
      library_id: `lib_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      owner_uid: currentUser.uid,
      owner_name: currentUser.name,
      title: data.title.trim(),
      description: data.description.trim(),
      slug: uniqueSlug,
      visibility: data.visibility,
      cover_image_url: data.cover_image_url || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setLibraries(prev => [newLib, ...prev]);
    return newLib;
  };

  // Update Library
  const updateLibrary = (libraryId: string, updates: Partial<UserLibrary>) => {
    setLibraries(prev =>
      prev.map(l => (l.library_id === libraryId ? { ...l, ...updates, updated_at: new Date().toISOString() } : l))
    );
  };

  // Delete Library
  const deleteLibrary = (libraryId: string) => {
    setLibraries(prev => prev.filter(l => l.library_id !== libraryId));
    setLibraryItems(prev => prev.filter(i => i.library_id !== libraryId));
    setCustomShelves(prev => prev.filter(s => s.library_id !== libraryId));
  };

  // Toggle Library Visibility with immediate effect
  const setLibraryVisibility = (libraryId: string, visibility: 'public' | 'private') => {
    setLibraries(prev =>
      prev.map(l => (l.library_id === libraryId ? { ...l, visibility, updated_at: new Date().toISOString() } : l))
    );
  };

  // Add Product to Shelf
  const addProductToShelf = (
    libraryId: string,
    productId: string,
    shelfId: string,
    personalNote?: string
  ): { success: boolean; message: string } => {
    // Check if the product is already in this library on this shelf
    const existingOnSameShelf = libraryItems.find(
      i => i.library_id === libraryId && i.product_id === productId && i.shelf_id === shelfId
    );

    if (existingOnSameShelf) {
      // Update note if provided
      if (personalNote && personalNote !== existingOnSameShelf.personal_note) {
        setLibraryItems(prev =>
          prev.map(i => (i.item_id === existingOnSameShelf.item_id ? { ...i, personal_note: personalNote } : i))
        );
        return { success: true, message: 'تم تحديث ملاحظتك الخاصة بالمنتج بنجاح' };
      }
      return { success: false, message: 'هذا المنتج موجود بالفعل على هذا الرف في مكتبتك' };
    }

    // Check if already in another shelf in the same library: move or allow?
    const existingInLib = libraryItems.find(
      i => i.library_id === libraryId && i.product_id === productId
    );

    if (existingInLib) {
      // Move to new shelf
      setLibraryItems(prev =>
        prev.map(i =>
          i.item_id === existingInLib.item_id
            ? {
                ...i,
                shelf_id: shelfId,
                personal_note: personalNote ?? i.personal_note,
                updated_at: new Date().toISOString()
              }
            : i
        )
      );
      logEvent('shelf_placement_changed', { product_id: productId, library_id: libraryId, shelf_id: shelfId });
      return { success: true, message: 'تم نقل المنتج إلى الرف المحدد بنجاح' };
    }

    // Add new item
    const newItem: LibraryItem = {
      item_id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      library_id: libraryId,
      product_id: productId,
      shelf_id: shelfId,
      personal_note: personalNote?.trim(),
      sort_order: libraryItems.filter(i => i.library_id === libraryId).length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setLibraryItems(prev => [...prev, newItem]);
    logEvent('product_added_to_library', { product_id: productId, library_id: libraryId, shelf_id: shelfId });
    return { success: true, message: 'تمت إضافة المنتج إلى رفك بنجاح' };
  };

  // Move Item Shelf
  const moveItemShelf = (itemId: string, newShelfId: string) => {
    const item = libraryItems.find(i => i.item_id === itemId);
    if (!item) return;

    setLibraryItems(prev =>
      prev.map(i => (i.item_id === itemId ? { ...i, shelf_id: newShelfId, updated_at: new Date().toISOString() } : i))
    );
    logEvent('shelf_placement_changed', {
      product_id: item.product_id,
      library_id: item.library_id,
      shelf_id: newShelfId
    });
  };

  // Remove Item
  const removeItemFromLibrary = (itemId: string) => {
    setLibraryItems(prev => prev.filter(i => i.item_id !== itemId));
  };

  // Update item note
  const updateItemNote = (itemId: string, note: string) => {
    setLibraryItems(prev =>
      prev.map(i => (i.item_id === itemId ? { ...i, personal_note: note.trim(), updated_at: new Date().toISOString() } : i))
    );
  };

  // Create Custom Shelf
  const createCustomShelf = (libraryId: string, name: string, color: string): CustomShelf => {
    const newShelf: CustomShelf = {
      shelf_id: `cs_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      library_id: libraryId,
      name: name.trim(),
      color: color || '#9E3D52',
      sort_order: customShelves.filter(s => s.library_id === libraryId).length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setCustomShelves(prev => [...prev, newShelf]);
    return newShelf;
  };

  // Update Custom Shelf
  const updateCustomShelf = (shelfId: string, updates: { name?: string; color?: string; sort_order?: number }) => {
    setCustomShelves(prev =>
      prev.map(s => (s.shelf_id === shelfId ? { ...s, ...updates, updated_at: new Date().toISOString() } : s))
    );
  };

  // Delete Custom Shelf safely (move items to default favorites so they are not orphaned)
  const deleteCustomShelf = (shelfId: string) => {
    // Reassign items from this shelf to 'favorites'
    setLibraryItems(prev =>
      prev.map(i => (i.shelf_id === shelfId ? { ...i, shelf_id: 'favorites', updated_at: new Date().toISOString() } : i))
    );
    setCustomShelves(prev => prev.filter(s => s.shelf_id !== shelfId));
  };

  // Catalog / Admin Actions
  const createCategory = (cat: Omit<Category, 'created_at' | 'updated_at'>): Category => {
    const newCat: Category = {
      ...cat,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setCategories(prev => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = (categoryId: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(c => (c.category_id === categoryId ? { ...c, ...updates, updated_at: new Date().toISOString() } : c))
    );
  };

  const createProduct = (prod: Omit<Product, 'created_at' | 'updated_at'>): Product => {
    const newProd: Product = {
      ...prod,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setProducts(prev => [newProd, ...prev]);
    return newProd;
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.product_id === productId ? { ...p, ...updates, updated_at: new Date().toISOString() } : p))
    );
  };

  const archiveProduct = (productId: string) => {
    updateProduct(productId, { status: 'archived' });
  };

  const createBrand = (brand: Brand) => {
    setBrands(prev => [...prev, brand]);
  };

  const createRetailer = (retailer: Retailer) => {
    setRetailers(prev => [...prev, retailer]);
  };

  const createOffer = (offer: PriceOffer) => {
    setOffers(prev => [offer, ...prev]);
  };

  const updateOffer = (offerId: string, updates: Partial<PriceOffer>) => {
    setOffers(prev => prev.map(o => (o.offer_id === offerId ? { ...o, ...updates } : o)));
  };

  const deleteOffer = (offerId: string) => {
    setOffers(prev => prev.filter(o => o.offer_id !== offerId));
  };

  // Import catalog data
  const importCatalogData = (jsonString: string): { success: boolean; message: string; count: number } => {
    try {
      const data = JSON.parse(jsonString);
      let count = 0;

      if (Array.isArray(data.products)) {
        // Validate required fields
        const validProducts: Product[] = [];
        data.products.forEach((p: any) => {
          if (p.product_id && p.name_ar && p.primary_category_id && p.brand_id) {
            validProducts.push({
              product_id: p.product_id,
              primary_category_id: p.primary_category_id,
              brand_id: p.brand_id,
              name_ar: p.name_ar,
              name_en: p.name_en || p.name_ar,
              slug: p.slug || p.product_id,
              description: p.description || '',
              variant_name: p.variant_name || '50ml',
              image_url: p.image_url || 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800',
              barcode: p.barcode,
              official_product_url: p.official_product_url || '',
              status: p.status || 'published',
              verification_status: p.verification_status || 'verified',
              source_url: p.source_url || '',
              last_verified_at: p.last_verified_at || new Date().toISOString(),
              created_at: p.created_at || new Date().toISOString(),
              updated_at: new Date().toISOString(),
              attributes: p.attributes || {}
            });
            count++;
          }
        });

        if (validProducts.length > 0) {
          setProducts(prev => {
            const existingIds = new Set(prev.map(p => p.product_id));
            const newOnes = validProducts.filter(p => !existingIds.has(p.product_id));
            const updated = prev.map(p => {
              const matched = validProducts.find(vp => vp.product_id === p.product_id);
              return matched ? { ...p, ...matched } : p;
            });
            return [...newOnes, ...updated];
          });
        }
      }

      if (Array.isArray(data.categories)) {
        setCategories(prev => {
          const map = new Map(prev.map(c => [c.category_id, c]));
          data.categories.forEach((c: Category) => {
            if (c.category_id && c.name_ar) {
              map.set(c.category_id, {
                ...c,
                created_at: c.created_at || new Date().toISOString(),
                updated_at: new Date().toISOString()
              });
            }
          });
          return Array.from(map.values());
        });
      }

      if (Array.isArray(data.offers)) {
        setOffers(prev => {
          const map = new Map(prev.map(o => [o.offer_id, o]));
          data.offers.forEach((o: PriceOffer) => {
            if (o.offer_id && o.product_id && o.retailer_id && o.price_amount) {
              map.set(o.offer_id, o);
            }
          });
          return Array.from(map.values());
        });
      }

      return { success: true, message: `تم استيراد ${count} منتج بنجاح`, count };
    } catch (e: any) {
      return { success: false, message: `فشل التحليل: ${e.message}`, count: 0 };
    }
  };

  const exportCatalogData = (): string => {
    const data = {
      version: '1.0',
      exported_at: new Date().toISOString(),
      categories,
      companies,
      brands,
      products,
      retailers,
      offers
    };
    return JSON.stringify(data, null, 2);
  };

  const resetToDefaultData = () => {
    setCategories(INITIAL_CATEGORIES);
    setCompanies(INITIAL_COMPANIES);
    setBrands(INITIAL_BRANDS);
    setProducts(INITIAL_PRODUCTS);
    setRetailers(INITIAL_RETAILERS);
    setOffers(INITIAL_OFFERS);
    setLibraries(INITIAL_USER_LIBRARIES);
    setLibraryItems(INITIAL_LIBRARY_ITEMS);
    setCustomShelves(INITIAL_CUSTOM_SHELVES);
    setAnalyticsEvents(INITIAL_ANALYTICS_EVENTS);
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    localStorage.clear();
  };

  // Analytics Calculation (Distinguish total events from unique users as mandated in PDF Page 11)
  const getAnalyticsSummary = (): AnalyticsSummary => {
    // Unique users viewing products
    const productViews = analyticsEvents.filter(e => e.event_type === 'product_view');
    const uniqueUsersViewing = new Set(productViews.map(e => e.user_id)).size;

    // Unique users adding products
    const addEvents = analyticsEvents.filter(e => e.event_type === 'product_added_to_library');
    const uniqueUsersAdding = new Set(addEvents.map(e => e.user_id)).size;

    // Placements by shelf
    const placementsByShelf: Record<string, { count: number; name_ar: string }> = {};

    DEFAULT_SHELVES.forEach(ds => {
      placementsByShelf[ds.key] = { count: 0, name_ar: ds.name_ar };
    });

    libraryItems.forEach(item => {
      if (placementsByShelf[item.shelf_id]) {
        placementsByShelf[item.shelf_id].count += 1;
      } else {
        const custom = customShelves.find(cs => cs.shelf_id === item.shelf_id);
        const name = custom ? custom.name : 'رف مخصص';
        if (!placementsByShelf[item.shelf_id]) {
          placementsByShelf[item.shelf_id] = { count: 0, name_ar: name };
        }
        placementsByShelf[item.shelf_id].count += 1;
      }
    });

    // Popular searches & zero results
    const searchEvents = analyticsEvents.filter(e => e.event_type === 'search_submitted');
    const searchCounts: Record<string, number> = {};
    const zeroResults: Record<string, number> = {};

    searchEvents.forEach(e => {
      if (e.search_query) {
        const q = e.search_query.trim().toLowerCase();
        searchCounts[q] = (searchCounts[q] || 0) + 1;
        if (e.result_count === 0) {
          zeroResults[q] = (zeroResults[q] || 0) + 1;
        }
      }
    });

    const popularSearches = Object.entries(searchCounts)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const zeroResultSearches = Object.entries(zeroResults)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Retailer offer views
    const retailerViews: Record<string, number> = {};
    analyticsEvents
      .filter(e => e.event_type === 'price_offer_viewed')
      .forEach(e => {
        if (e.retailer_id) {
          retailerViews[e.retailer_id] = (retailerViews[e.retailer_id] || 0) + 1;
        }
      });

    // Share events
    const libraryShareCount = analyticsEvents.filter(e => e.event_type === 'library_shared').length;

    return {
      registeredUsersCount: users.length,
      totalLibrariesCount: libraries.length,
      publicLibrariesCount: libraries.filter(l => l.visibility === 'public').length,
      totalProductViews: productViews.length,
      uniqueUserProductViews: uniqueUsersViewing,
      totalProductsAddedToLibraries: addEvents.length,
      uniqueUsersAddingProducts: uniqueUsersAdding,
      placementsByShelf,
      popularSearches,
      zeroResultSearches,
      retailerOfferViews: retailerViews,
      libraryShareCount
    };
  };

  return (
    <StoreContext.Provider
      value={{
        categories,
        activeCategories,
        companies,
        brands,
        products,
        variants,
        retailers,
        offers,
        libraries,
        libraryItems,
        customShelves,
        analyticsEvents,
        users,
        currentUser,
        setCurrentUser,
        registerUser,
        createLibrary,
        updateLibrary,
        deleteLibrary,
        setLibraryVisibility,
        addProductToShelf,
        moveItemShelf,
        removeItemFromLibrary,
        updateItemNote,
        createCustomShelf,
        updateCustomShelf,
        deleteCustomShelf,
        createCategory,
        updateCategory,
        createProduct,
        updateProduct,
        archiveProduct,
        createBrand,
        createRetailer,
        createOffer,
        updateOffer,
        deleteOffer,
        importCatalogData,
        exportCatalogData,
        resetToDefaultData,
        logEvent,
        getAnalyticsSummary,
        getProductById,
        getBrandById,
        getCompanyById,
        getCategoryById,
        getOffersForProduct,
        getLibraryBySlug,
        getLibraryById,
        getItemsForLibrary,
        getCustomShelvesForLibrary,
        getUserLibraries,
        getProductLibraryPlacements
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
