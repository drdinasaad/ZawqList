import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import {
  Search,
  Filter,
  Plus,
  ShieldCheck,
  Tag,
  ArrowUpDown,
  Sparkles,
  X,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

interface CatalogPageProps {
  onSelectProduct: (product: Product) => void;
  onOpenAddToShelf: (product: Product) => void;
  initialCategoryId?: string;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onSelectProduct,
  onOpenAddToShelf,
  initialCategoryId
}) => {
  const {
    products,
    categories,
    brands,
    offers,
    activeCategories,
    logEvent
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryId || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name_asc' | 'price_asc' | 'price_desc'>('name_asc');

  // Category specific filters state
  // Sunscreens:
  const [filterSpf, setFilterSpf] = useState<string>('all');
  const [filterSkinType, setFilterSkinType] = useState<string>('all');
  // Fragrances:
  const [filterConcentration, setFilterConcentration] = useState<string>('all');
  const [filterFragranceFamily, setFilterFragranceFamily] = useState<string>('all');

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Helper for lowest price
  const getLowestPrice = (productId: string): number | null => {
    const prodOffers = offers.filter(o => o.product_id === productId);
    if (!prodOffers.length) return null;
    return Math.min(...prodOffers.map(o => o.price_amount));
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Must be published
      if (p.status !== 'published') return false;

      // Category filter
      if (selectedCategory !== 'all' && p.primary_category_id !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'all' && p.brand_id !== selectedBrand) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const brand = brands.find(b => b.brand_id === p.brand_id);
        const matchNameAr = p.name_ar.toLowerCase().includes(q);
        const matchNameEn = p.name_en.toLowerCase().includes(q);
        const matchBrand = brand && (brand.name_ar.toLowerCase().includes(q) || brand.name_en.toLowerCase().includes(q));
        const matchDesc = p.description.toLowerCase().includes(q);
        if (!matchNameAr && !matchNameEn && !matchBrand && !matchDesc) {
          return false;
        }
      }

      // Category-specific attribute filtering (Requirement Section 5)
      if (selectedCategory === 'sunscreens' || p.primary_category_id === 'sunscreens') {
        if (filterSpf !== 'all' && p.attributes.spf !== filterSpf) return false;
        if (filterSkinType !== 'all' && !p.attributes.skin_type?.includes(filterSkinType)) return false;
      }

      if (selectedCategory === 'fragrances' || p.primary_category_id === 'fragrances') {
        if (filterConcentration !== 'all' && !p.attributes.concentration?.includes(filterConcentration)) return false;
        if (filterFragranceFamily !== 'all' && !p.attributes.fragrance_family?.includes(filterFragranceFamily)) return false;
      }

      return true;
    });
  }, [
    products,
    selectedCategory,
    selectedBrand,
    searchQuery,
    filterSpf,
    filterSkinType,
    filterConcentration,
    filterFragranceFamily,
    brands
  ]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'name_asc') {
        return a.name_ar.localeCompare(b.name_ar, 'ar');
      }
      const priceA = getLowestPrice(a.product_id) ?? 999999;
      const priceB = getLowestPrice(b.product_id) ?? 999999;
      if (sortBy === 'price_asc') {
        return priceA - priceB;
      }
      if (sortBy === 'price_desc') {
        return priceB - priceA;
      }
      return 0;
    });
  }, [filteredProducts, sortBy, offers]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSearchQuery('');
    setFilterSpf('all');
    setFilterSkinType('all');
    setFilterConcentration('all');
    setFilterFragranceFamily('all');
    setSortBy('name_asc');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    searchQuery !== '' ||
    filterSpf !== 'all' ||
    filterSkinType !== 'all' ||
    filterConcentration !== 'all' ||
    filterFragranceFamily !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-200">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFC8]">
        <div>
          <span className="text-xs font-bold text-[#9E3D52] block mb-1">كتالوج المنتجات الرسمي</span>
          <h1 className="text-2xl font-bold text-[#2D2A29]">اكتشفي المنتجات الموثقة ومقارنة أسعارها</h1>
          <p className="text-xs text-[#8C7A75] mt-1">
            ابحثي وصنّفي واقيات الشمس والعطور المصرية والعالمية مع رصد شفاف لأقل الأسعار.
          </p>
        </div>

        {/* Category switcher pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#9E3D52] text-white shadow-xs'
                : 'bg-[#FAF8F5] text-[#5A524E] border border-[#E8DFC8] hover:bg-[#F4EFEB]'
            }`}
          >
            جميع الفئات ({products.length})
          </button>
          {activeCategories.map(cat => (
            <button
              key={cat.category_id}
              onClick={() => setSelectedCategory(cat.category_id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                selectedCategory === cat.category_id
                  ? 'bg-[#9E3D52] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#5A524E] border border-[#E8DFC8] hover:bg-[#F4EFEB]'
              }`}
            >
              {cat.name_ar}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8DFC8] flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8C7A75] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم العربي، الإنجليزي، أو الماركة..."
            className="w-full pr-10 pl-3 py-2 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl text-xs focus:border-[#9E3D52] outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A75] hover:text-[#2D2A29]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter controls row */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Brand Filter */}
          <div className="flex items-center gap-1.5 text-xs text-[#5A524E]">
            <span className="hidden sm:inline text-[#8C7A75]">الماركة:</span>
            <select
              value={selectedBrand}
              onChange={e => setSelectedBrand(e.target.value)}
              className="bg-[#FAF8F5] border border-[#E8DFC8] text-xs font-semibold text-[#2D2A29] rounded-xl px-2.5 py-2 outline-none"
            >
              <option value="all">جميع الماركات</option>
              {brands.map(b => (
                <option key={b.brand_id} value={b.brand_id}>
                  {b.name_ar} ({b.name_en})
                </option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-1.5 text-xs text-[#5A524E]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8C7A75]" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-[#FAF8F5] border border-[#E8DFC8] text-xs font-semibold text-[#2D2A29] rounded-xl px-2.5 py-2 outline-none"
            >
              <option value="name_asc">الترتيب: بالاسم (أ - ي)</option>
              <option value="price_asc">السعر: من الأقل للأعلى</option>
              <option value="price_desc">السعر: من الأعلى للأقل</option>
            </select>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="px-2.5 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl transition-colors font-medium"
            >
              إلغاء التصفية
            </button>
          )}
        </div>
      </div>

      {/* Category-Specific Filters Bar (Requirement Section 5: "Display category-specific filters only") */}
      {selectedCategory === 'sunscreens' && (
        <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E8DFC8]/70 flex flex-wrap items-center gap-3 text-xs">
          <span className="font-bold text-[#7A283C] flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>فلاتر واقيات الشمس:</span>
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-[#8C7A75]">عامل الحماية:</span>
            <select
              value={filterSpf}
              onChange={e => setFilterSpf(e.target.value)}
              className="bg-white border border-[#E8DFC8] rounded-lg px-2 py-1 text-xs"
            >
              <option value="all">الكل</option>
              <option value="SPF 50+">SPF 50+</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#8C7A75]">نوع البشرة:</span>
            <select
              value={filterSkinType}
              onChange={e => setFilterSkinType(e.target.value)}
              className="bg-white border border-[#E8DFC8] rounded-lg px-2 py-1 text-xs"
            >
              <option value="all">الكل</option>
              <option value="دهنية">بشرة دهنية ومختلطة</option>
              <option value="جافة">بشرة جافة</option>
              <option value="حساسة">بشرة حساسة</option>
            </select>
          </div>
        </div>
      )}

      {selectedCategory === 'fragrances' && (
        <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E8DFC8]/70 flex flex-wrap items-center gap-3 text-xs">
          <span className="font-bold text-[#7A283C] flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>فلاتر العطور:</span>
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-[#8C7A75]">التركيز:</span>
            <select
              value={filterConcentration}
              onChange={e => setFilterConcentration(e.target.value)}
              className="bg-white border border-[#E8DFC8] rounded-lg px-2 py-1 text-xs"
            >
              <option value="all">الكل</option>
              <option value="Parfum">Eau de Parfum (EDP)</option>
              <option value="Toilette">Eau de Toilette (EDT)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#8C7A75]">العائلة العطرية:</span>
            <select
              value={filterFragranceFamily}
              onChange={e => setFilterFragranceFamily(e.target.value)}
              className="bg-white border border-[#E8DFC8] rounded-lg px-2 py-1 text-xs"
            >
              <option value="all">الكل</option>
              <option value="خشبي">خشبي أروماتك</option>
              <option value="جورماند">جورماند شرقي</option>
              <option value="حار">شرقي حار</option>
            </select>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#E8DFC8] space-y-3">
          <p className="text-base font-bold text-[#2D2A29]">لا توجد منتجات تطابق خيارات التصفية</p>
          <p className="text-xs text-[#8C7A75] max-w-sm mx-auto">
            جربي إلغاء بعض الفلاتر أو البحث باسم عام للمنتج أو الماركة.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-[#9E3D52] text-white rounded-xl text-xs font-bold shadow-2xs"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => {
            const brand = brands.find(b => b.brand_id === product.brand_id);
            const lowest = getLowestPrice(product.product_id);

            return (
              <div
                key={product.product_id}
                className="bg-white rounded-3xl border border-[#E8DFC8] overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Image area with click to detail */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-square overflow-hidden bg-[#FAF8F5] cursor-pointer"
                  >
                    <img
                      src={product.image_url}
                      alt={product.name_ar}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {product.verification_status === 'verified' && (
                      <div className="absolute top-3 right-3 bg-white/95 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>موثق</span>
                      </div>
                    )}

                    {product.variant_name && (
                      <div className="absolute bottom-3 left-3 bg-[#2D2A29]/80 backdrop-blur-xs text-white text-[10px] font-latin px-2 py-0.5 rounded-md">
                        {product.variant_name}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2.5">
                    {brand && (
                      <span className="text-[11px] font-bold text-[#9E3D52] block">
                        {brand.name_ar}
                      </span>
                    )}

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="text-sm font-bold text-[#2D2A29] group-hover:text-[#9E3D52] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {product.name_ar}
                    </h3>

                    <p className="text-[11px] text-[#8C7A75] font-latin truncate">
                      {product.name_en}
                    </p>

                    {/* Key Attributes Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.attributes.spf && (
                        <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md font-semibold">
                          {product.attributes.spf}
                        </span>
                      )}
                      {product.attributes.formulation && (
                        <span className="text-[10px] bg-[#FAF8F5] text-[#5A524E] border border-[#E8DFC8] px-2 py-0.5 rounded-md">
                          {product.attributes.formulation}
                        </span>
                      )}
                      {product.attributes.concentration && (
                        <span className="text-[10px] bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded-md font-semibold">
                          {product.attributes.concentration}
                        </span>
                      )}
                      {product.attributes.fragrance_family && (
                        <span className="text-[10px] bg-[#FAF8F5] text-[#5A524E] border border-[#E8DFC8] px-2 py-0.5 rounded-md">
                          {product.attributes.fragrance_family}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer with Price and Add to Shelf Button */}
                <div className="p-4 bg-[#FAF8F5] border-t border-[#F4EFEB] flex items-center justify-between gap-2">
                  <div>
                    {lowest ? (
                      <div>
                        <span className="text-[10px] text-[#8C7A75] block leading-none">أفضل سعر</span>
                        <span className="text-xs font-bold text-[#7A283C] font-latin">
                          {lowest.toFixed(2)} ج.م
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-[#8C7A75]">الأسعار غير متوفرة</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onOpenAddToShelf(product)}
                      className="p-2 bg-[#9E3D52] hover:bg-[#852C3E] text-white rounded-xl shadow-2xs transition-colors"
                      title="أضيفي إلى مكتبتي الشخصية"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-1.5 bg-white hover:bg-[#FAF8F5] text-[#2D2A29] rounded-xl border border-[#E8DFC8] text-xs font-medium transition-colors"
                    >
                      التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
