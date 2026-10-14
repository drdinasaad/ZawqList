import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { UserLibrary, Product } from '../types';
import {
  BookOpen,
  Sparkles,
  ArrowLeft,
  Lock,
  Globe,
  Heart,
  TrendingUp,
  Tag
} from 'lucide-react';

interface DiscoverLibrariesPageProps {
  onSelectLibrary: (library: UserLibrary) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateToCatalog: () => void;
}

export const DiscoverLibrariesPage: React.FC<DiscoverLibrariesPageProps> = ({
  onSelectLibrary,
  onSelectProduct,
  onNavigateToCatalog
}) => {
  const {
    libraries,
    libraryItems,
    products,
    categories,
    brands,
    users
  } = useStore();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Only public libraries
  const publicLibraries = libraries.filter(l => l.visibility === 'public');

  // Filter libraries that contain products in the selected category
  const filteredLibraries = publicLibraries.filter(lib => {
    if (categoryFilter === 'all') return true;
    const items = libraryItems.filter(i => i.library_id === lib.library_id);
    return items.some(it => {
      const prod = products.find(p => p.product_id === it.product_id);
      return prod?.primary_category_id === categoryFilter;
    });
  });

  // Calculate most placed products in public libraries (Transparent measured activity)
  const productPlacementCounts: Record<string, number> = {};
  publicLibraries.forEach(lib => {
    const items = libraryItems.filter(i => i.library_id === lib.library_id);
    items.forEach(it => {
      productPlacementCounts[it.product_id] = (productPlacementCounts[it.product_id] || 0) + 1;
    });
  });

  const popularProducts = Object.entries(productPlacementCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([productId, count]) => ({
      product: products.find(p => p.product_id === productId),
      count
    }))
    .filter(item => item.product !== undefined);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#9E3D52]/10 via-[#FAF8F5] to-[#E8DFC8]/40 rounded-3xl border border-[#E8DFC8] p-6 sm:p-10 space-y-4">
        <div className="max-w-2xl">
          <span className="text-xs font-bold text-[#9E3D52] bg-white/80 px-3 py-1 rounded-full border border-[#9E3D52]/20 inline-block mb-2">
            مكتبات وتجميعات المجتمع المصري
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2A29] leading-tight">
            استكشفي المفضلات وروتين العناية عبر مكتبات الأعضاء
          </h1>
          <p className="text-xs sm:text-sm text-[#5A524E] mt-2 leading-relaxed">
            تصفحي مجموعات منتقاة بعناية لواقيات الشمس والعطور من مستخدمين وصيادلة ومهتمين بالجمال في مصر، مع المقارنة الفورية للأسعار بين المتاجر.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
              categoryFilter === 'all'
                ? 'bg-[#9E3D52] text-white shadow-xs'
                : 'bg-white text-[#5A524E] border border-[#E8DFC8] hover:bg-[#FAF8F5]'
            }`}
          >
            جميع المكتبات ({publicLibraries.length})
          </button>
          {categories.filter(c => c.status === 'active').map(c => (
            <button
              key={c.category_id}
              onClick={() => setCategoryFilter(c.category_id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                categoryFilter === c.category_id
                  ? 'bg-[#9E3D52] text-white shadow-xs'
                  : 'bg-white text-[#5A524E] border border-[#E8DFC8] hover:bg-[#FAF8F5]'
              }`}
            >
              مكتبات {c.name_ar}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Products by Real Platform Activity */}
      {popularProducts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#2D2A29] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#9E3D52]" />
                <span>المنتجات الأكثر إضافة إلى الرفوف العامة</span>
              </h2>
              <p className="text-xs text-[#8C7A75]">
                محسوبة بدقة بناءً على إضافات أعضاء مجتمع ZawqList بدون تزييف أو إعلانات مدفوعة
              </p>
            </div>
            <button
              onClick={onNavigateToCatalog}
              className="text-xs font-bold text-[#7A283C] hover:text-[#9E3D52] flex items-center gap-1"
            >
              <span>عرض كل الكتالوج</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {popularProducts.map(({ product, count }) => {
              if (!product) return null;
              const brand = brands.find(b => b.brand_id === product.brand_id);

              return (
                <div
                  key={product.product_id}
                  onClick={() => onSelectProduct(product)}
                  className="bg-white rounded-2xl border border-[#E8DFC8] p-3.5 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-[#FAF8F5] border border-[#E8DFC8]/60">
                      <img
                        src={product.image_url}
                        alt={product.name_ar}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute bottom-2 right-2 bg-[#2D2A29]/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                        <span className="font-latin">{count}</span>
                        <span>مكتبة</span>
                      </div>
                    </div>

                    <div>
                      {brand && (
                        <span className="text-[10px] font-bold text-[#9E3D52] block">
                          {brand.name_ar}
                        </span>
                      )}
                      <h4 className="text-xs font-bold text-[#2D2A29] line-clamp-1 group-hover:text-[#9E3D52] transition-colors">
                        {product.name_ar}
                      </h4>
                      <p className="text-[10px] text-[#8C7A75] font-latin truncate">
                        {product.name_en}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Public Libraries Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#2D2A29] flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#9E3D52]" />
          <span>المكتبات العامة المتاحة للاستكشاف</span>
        </h2>

        {filteredLibraries.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-[#E8DFC8]">
            <p className="text-xs text-[#8C7A75]">لا توجد مكتبات عامة تطابق هذا التصنيف حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLibraries.map(library => {
              const items = libraryItems.filter(i => i.library_id === library.library_id);
              const owner = users.find(u => u.uid === library.owner_uid);
              const previewItems = items.slice(0, 3).map(it => products.find(p => p.product_id === it.product_id));

              return (
                <div
                  key={library.library_id}
                  onClick={() => onSelectLibrary(library)}
                  className="bg-white rounded-3xl border border-[#E8DFC8] overflow-hidden hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    {/* Owner & Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={owner?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                          alt={library.owner_name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-[#9E3D52]/20"
                        />
                        <div>
                          <span className="text-xs font-bold text-[#2D2A29] block leading-none">
                            {library.owner_name}
                          </span>
                          <span className="text-[10px] text-[#8C7A75] block mt-0.5">
                            {owner?.role === 'admin' ? 'مديرة المحتوى' : 'عضو في مجتمع ذوق'}
                          </span>
                        </div>
                      </div>

                      <span className="text-[11px] text-[#7A283C] bg-[#9E3D52]/10 px-2.5 py-0.5 rounded-full font-bold font-latin">
                        {items.length} منتجات
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#2D2A29] group-hover:text-[#9E3D52] transition-colors leading-tight">
                        {library.title}
                      </h3>
                      {library.description && (
                        <p className="text-xs text-[#5A524E] mt-1.5 line-clamp-2 leading-relaxed">
                          {library.description}
                        </p>
                      )}
                    </div>

                    {/* Product Thumbnails Preview */}
                    <div className="pt-2 flex items-center gap-2">
                      {previewItems.map((prod, idx) => {
                        if (!prod) return null;
                        return (
                          <img
                            key={idx}
                            src={prod.image_url}
                            alt={prod.name_ar}
                            className="w-12 h-12 rounded-xl object-cover bg-[#FAF8F5] border border-[#E8DFC8]"
                            title={prod.name_ar}
                          />
                        );
                      })}
                      {items.length > 3 && (
                        <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8DFC8] flex items-center justify-center text-xs font-bold text-[#8C7A75] font-latin">
                          +{items.length - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 bg-[#FAF8F5] border-t border-[#F4EFEB] flex items-center justify-between text-xs font-bold text-[#7A283C] group-hover:bg-[#9E3D52]/10 transition-colors">
                    <span>تصفح محتويات المكتبة</span>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
