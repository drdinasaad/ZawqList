import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import {
  Tag,
  Store,
  ExternalLink,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  TrendingDown
} from 'lucide-react';

interface PriceComparisonPageProps {
  onSelectProduct: (product: Product) => void;
  onOpenAddToShelf: (product: Product) => void;
}

export const PriceComparisonPage: React.FC<PriceComparisonPageProps> = ({
  onSelectProduct,
  onOpenAddToShelf
}) => {
  const {
    offers,
    products,
    retailers,
    brands,
    categories,
    logEvent
  } = useStore();

  const [selectedRetailer, setSelectedRetailer] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Group offers by product to easily see comparisons
  const groupedByProduct = products.map(product => {
    const brand = brands.find(b => b.brand_id === product.brand_id);
    const cat = categories.find(c => c.category_id === product.primary_category_id);
    const productOffers = offers
      .filter(o => o.product_id === product.product_id)
      .sort((a, b) => a.price_amount - b.price_amount);

    return {
      product,
      brand,
      category: cat,
      offers: productOffers,
      lowestPrice: productOffers.length ? productOffers[0].price_amount : null,
      highestPrice: productOffers.length ? productOffers[productOffers.length - 1].price_amount : null,
      difference: productOffers.length > 1
        ? productOffers[productOffers.length - 1].price_amount - productOffers[0].price_amount
        : 0
    };
  }).filter(group => group.offers.length > 0);

  // Filter groups
  const filteredGroups = groupedByProduct.filter(group => {
    if (selectedCategory !== 'all' && group.product.primary_category_id !== selectedCategory) {
      return false;
    }

    if (selectedRetailer !== 'all') {
      const hasRetailer = group.offers.some(o => o.retailer_id === selectedRetailer);
      if (!hasRetailer) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNameAr = group.product.name_ar.toLowerCase().includes(q);
      const matchNameEn = group.product.name_en.toLowerCase().includes(q);
      const matchBrand = group.brand && (group.brand.name_ar.toLowerCase().includes(q) || group.brand.name_en.toLowerCase().includes(q));
      return matchNameAr || matchNameEn || matchBrand;
    }

    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFC8] space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#9E3D52]">
          <Tag className="w-4 h-4" />
          <span>مرصد الأسعار في السوق المصري</span>
        </div>
        <h1 className="text-2xl font-bold text-[#2D2A29]">
          مقارنة حية لأسعار واقيات الشمس والعطور
        </h1>
        <p className="text-xs sm:text-sm text-[#5A524E] leading-relaxed max-w-3xl">
          نرصد العروض الفعلية الموثقة عبر المتاجر والصيدليات الكبرى في مصر (نون مصر، أمازون مصر، صيدليات د. داوود، صيدليات العزبي) لمساعدتكِ في العثور على أفضل سعر وتوفير الفارق.
        </p>

        {/* Retailers Badges */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-[#8C7A75]">المتاجر المعتمدة المشمولة:</span>
          {retailers.map(r => (
            <div
              key={r.retailer_id}
              className="flex items-center gap-2 bg-[#FAF8F5] px-3 py-1.5 rounded-xl border border-[#E8DFC8] text-xs font-semibold text-[#2D2A29]"
            >
              <img src={r.logo_url} alt={r.name_ar} className="w-5 h-5 rounded-md object-cover" />
              <span>{r.name_ar}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8DFC8] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#8C7A75] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="بحث بالمنتج أو الماركة..."
            className="w-full pr-8 pl-3 py-1.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl text-xs focus:border-[#9E3D52] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Retailer filter */}
          <select
            value={selectedRetailer}
            onChange={e => setSelectedRetailer(e.target.value)}
            className="bg-[#FAF8F5] border border-[#E8DFC8] text-xs rounded-xl px-2.5 py-1.5 outline-none font-medium"
          >
            <option value="all">جميع المتاجر</option>
            {retailers.map(r => (
              <option key={r.retailer_id} value={r.retailer_id}>
                {r.name_ar}
              </option>
            ))}
          </select>

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-[#FAF8F5] border border-[#E8DFC8] text-xs rounded-xl px-2.5 py-1.5 outline-none font-medium"
          >
            <option value="all">جميع الفئات</option>
            {categories.filter(c => c.status === 'active').map(c => (
              <option key={c.category_id} value={c.category_id}>
                {c.name_ar}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Product Cards */}
      <div className="space-y-6">
        {filteredGroups.map(group => {
          return (
            <div
              key={group.product.product_id}
              className="bg-white rounded-3xl border border-[#E8DFC8] p-6 shadow-xs space-y-4"
            >
              {/* Product Info Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F4EFEB] pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={group.product.image_url}
                    alt={group.product.name_ar}
                    className="w-16 h-16 rounded-2xl object-cover bg-[#FAF8F5] border border-[#E8DFC8] shrink-0 cursor-pointer"
                    onClick={() => onSelectProduct(group.product)}
                  />
                  <div>
                    {group.brand && (
                      <span className="text-xs font-bold text-[#9E3D52] block">
                        {group.brand.name_ar}
                      </span>
                    )}
                    <h3
                      onClick={() => onSelectProduct(group.product)}
                      className="text-base font-bold text-[#2D2A29] hover:text-[#9E3D52] transition-colors cursor-pointer"
                    >
                      {group.product.name_ar}
                    </h3>
                    <p className="text-xs text-[#8C7A75] font-latin">
                      {group.product.name_en}
                    </p>
                  </div>
                </div>

                {group.difference > 0 && (
                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 self-start sm:self-auto">
                    <TrendingDown className="w-4 h-4 text-emerald-600" />
                    <span>توفير يصل إلى {group.difference.toFixed(2)} ج.م بين المتاجر</span>
                  </div>
                )}
              </div>

              {/* Retailer Offers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.offers.map(offer => {
                  const retailer = retailers.find(r => r.retailer_id === offer.retailer_id);
                  const isLowest = offer.price_amount === group.lowestPrice;

                  return (
                    <div
                      key={offer.offer_id}
                      className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                        isLowest
                          ? 'border-emerald-400 bg-emerald-50/40 ring-1 ring-emerald-300'
                          : 'border-[#E8DFC8] bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={retailer?.logo_url || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100'}
                              alt={retailer?.name_ar || ''}
                              className="w-6 h-6 rounded-md object-cover border border-[#E8DFC8]"
                            />
                            <span className="text-xs font-bold text-[#2D2A29]">
                              {retailer?.name_ar || 'متجر مصري'}
                            </span>
                          </div>

                          {isLowest && (
                            <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                              أقل سعر
                            </span>
                          )}
                        </div>

                        <div>
                          <span className="text-base font-bold text-[#7A283C] font-latin block">
                            {offer.price_amount.toFixed(2)} ج.م
                          </span>
                          {offer.seller_name && (
                            <span className="text-[10px] text-[#8C7A75] block mt-0.5">
                              {offer.seller_name}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 mt-3 border-t border-[#E8DFC8]/60 flex items-center justify-between text-[10px]">
                        <span className="text-[#8C7A75] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(offer.captured_at).toLocaleDateString('ar-EG')}</span>
                        </span>

                        <a
                          href={offer.product_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            logEvent('price_offer_viewed', {
                              product_id: group.product.product_id,
                              retailer_id: offer.retailer_id
                            })
                          }
                          className="px-3 py-1 bg-white hover:bg-[#9E3D52] hover:text-white text-[#7A283C] font-bold rounded-lg border border-[#E8DFC8] flex items-center gap-1 transition-colors"
                        >
                          <span>المتجر</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
