import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, UserLibrary, DefaultShelfKey } from '../types';
import { DEFAULT_SHELVES } from '../data/seedData';
import {
  Globe,
  Lock,
  ArrowRight,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Sparkles,
  ExternalLink,
  BookOpen,
  Plus
} from 'lucide-react';

interface PublicLibraryViewProps {
  library: UserLibrary;
  onSelectProduct: (product: Product) => void;
  onNavigateToDiscover: () => void;
  onOpenAddToShelf: (product: Product) => void;
}

export const PublicLibraryView: React.FC<PublicLibraryViewProps> = ({
  library,
  onSelectProduct,
  onNavigateToDiscover,
  onOpenAddToShelf
}) => {
  const {
    currentUser,
    libraryItems,
    customShelves,
    products,
    categories,
    brands,
    offers,
    users
  } = useStore();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Enforce Section 13 #7: A private library cannot be viewed by another user, including through a guessed URL
  const isOwner = currentUser && currentUser.uid === library.owner_uid;
  if (library.visibility === 'private' && !isOwner) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-[#2D2A29]">هذه المكتبة خاصة</h2>
        <p className="text-xs text-[#8C7A75] max-w-sm mx-auto leading-relaxed">
          قام مالك هذه المكتبة بضبط الخصوصية على "خاصة"، وبالتالي لا يمكن للزوار أو المستخدمين الآخرين الاطلاع على محتوياتها.
        </p>
        <button
          onClick={onNavigateToDiscover}
          className="mt-4 px-5 py-2.5 bg-[#9E3D52] hover:bg-[#852C3E] text-white text-xs font-bold rounded-xl"
        >
          استكشاف مكتبات عامة أخرى
        </button>
      </div>
    );
  }

  const items = libraryItems.filter(i => i.library_id === library.library_id);
  const userCustomShelves = customShelves.filter(s => s.library_id === library.library_id);
  const owner = users.find(u => u.uid === library.owner_uid);

  const filteredItems = items.filter(item => {
    const prod = products.find(p => p.product_id === item.product_id);
    if (!prod) return false;
    if (categoryFilter !== 'all' && prod.primary_category_id !== categoryFilter) return false;
    return true;
  });

  const allShelvesList = [
    ...DEFAULT_SHELVES.map(ds => ({
      id: ds.key,
      name: ds.name_ar,
      color: ds.color,
      description: ds.description_ar
    })),
    ...userCustomShelves.map(cs => ({
      id: cs.shelf_id,
      name: cs.name,
      color: cs.color,
      description: 'رف مخصص من صاحب المكتبة'
    }))
  ];

  const getLowestPrice = (productId: string) => {
    const productOffers = offers.filter(o => o.product_id === productId);
    if (!productOffers.length) return null;
    return Math.min(...productOffers.map(o => o.price_amount));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onNavigateToDiscover}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A283C] hover:text-[#9E3D52] bg-white px-3.5 py-2 rounded-xl border border-[#E8DFC8] shadow-xs transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لمكتبات المستخدمين</span>
        </button>

        <span className="text-xs text-[#8C7A75] flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-emerald-600" />
          <span>مكتبة عامة معتمدة</span>
        </span>
      </div>

      {/* Library Banner Card */}
      <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <img
              src={owner?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
              alt={library.owner_name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#9E3D52]/20 shrink-0"
            />
            <div>
              <span className="text-xs text-[#9E3D52] font-semibold block">
                مكتبة بواسطة: {library.owner_name}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-[#2D2A29] leading-tight">
                {library.title}
              </h1>
              {library.description && (
                <p className="text-xs sm:text-sm text-[#5A524E] mt-1 leading-relaxed max-w-2xl">
                  {library.description}
                </p>
              )}
            </div>
          </div>

          <div className="text-left shrink-0 bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8DFC8]/60">
            <span className="text-xs text-[#8C7A75] block">إجمالي المنتجات:</span>
            <span className="text-lg font-bold text-[#7A283C] font-latin">{items.length}</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5 pt-3 border-t border-[#F4EFEB] overflow-x-auto">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
              categoryFilter === 'all'
                ? 'bg-[#9E3D52] text-white'
                : 'bg-[#FAF8F5] text-[#5A524E] hover:bg-[#F4EFEB]'
            }`}
          >
            جميع المنتجات ({items.length})
          </button>
          {categories.map(c => {
            const count = items.filter(it => {
              const prod = products.find(p => p.product_id === it.product_id);
              return prod?.primary_category_id === c.category_id;
            }).length;
            if (count === 0) return null;
            return (
              <button
                key={c.category_id}
                onClick={() => setCategoryFilter(c.category_id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                  categoryFilter === c.category_id
                    ? 'bg-[#9E3D52] text-white'
                    : 'bg-[#FAF8F5] text-[#5A524E] hover:bg-[#F4EFEB]'
                }`}
              >
                {c.name_ar} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Shelves List */}
      <div className="space-y-6">
        {allShelvesList.map(shelf => {
          const shelfItems = filteredItems.filter(i => i.shelf_id === shelf.id);
          if (shelfItems.length === 0) return null;

          return (
            <div
              key={shelf.id}
              className="bg-white rounded-3xl border border-[#E8DFC8] p-5 sm:p-7 shadow-2xs space-y-4"
            >
              <div className="flex items-center gap-2.5 border-b border-[#F4EFEB] pb-3">
                <div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: shelf.color }}
                />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#2D2A29]">
                    {shelf.name} ({shelfItems.length})
                  </h3>
                  <p className="text-[11px] text-[#8C7A75]">{shelf.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {shelfItems.map(item => {
                  const prod = products.find(p => p.product_id === item.product_id);
                  if (!prod) return null;
                  const brand = brands.find(b => b.brand_id === prod.brand_id);
                  const lowest = getLowestPrice(prod.product_id);

                  return (
                    <div
                      key={item.item_id}
                      className="bg-[#FAF8F5] rounded-2xl border border-[#E8DFC8] p-4 flex flex-col justify-between hover:shadow-xs transition-shadow"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <img
                            src={prod.image_url}
                            alt={prod.name_ar}
                            className="w-16 h-16 rounded-xl object-cover bg-white border border-[#E8DFC8] shrink-0 cursor-pointer hover:opacity-90"
                            onClick={() => onSelectProduct(prod)}
                          />
                          <div className="min-w-0 flex-1">
                            {brand && (
                              <span className="text-[10px] font-bold text-[#9E3D52] block">
                                {brand.name_ar}
                              </span>
                            )}
                            <h4
                              onClick={() => onSelectProduct(prod)}
                              className="text-xs font-bold text-[#2D2A29] line-clamp-1 cursor-pointer hover:text-[#9E3D52]"
                            >
                              {prod.name_ar}
                            </h4>
                            <p className="text-[10px] text-[#8C7A75] font-latin truncate">
                              {prod.name_en}
                            </p>
                          </div>
                        </div>

                        {item.personal_note && (
                          <div className="bg-white p-2.5 rounded-xl border border-[#E8DFC8]/60 text-[11px] text-[#5A524E]">
                            <p className="italic leading-relaxed">
                              "{item.personal_note}"
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 mt-3 border-t border-[#E8DFC8]/60 flex items-center justify-between gap-2">
                        {lowest ? (
                          <span className="text-xs font-bold text-[#7A283C] font-latin">
                            يبدأ من {lowest.toFixed(2)} ج.م
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#8C7A75]">الأسعار غير متوفرة</span>
                        )}

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onOpenAddToShelf(prod)}
                            className="p-1.5 bg-white hover:bg-[#9E3D52] hover:text-white text-[#7A283C] rounded-lg border border-[#E8DFC8] text-xs font-bold transition-colors"
                            title="أضيفي إلى مكتبتي"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onSelectProduct(prod)}
                            className="px-2.5 py-1 bg-white hover:bg-[#FAF8F5] text-[#2D2A29] rounded-lg border border-[#E8DFC8] text-[11px] font-medium"
                          >
                            التفاصيل
                          </button>
                        </div>
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
