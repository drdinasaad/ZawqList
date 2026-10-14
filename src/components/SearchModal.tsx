import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Search, X, ArrowLeft, Tag, ShieldCheck } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const { products, brands, categories, offers, logEvent } = useStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Keyboard shortcut Ctrl+K or Cmd+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search logic across Arabic name, English name, Brand name, Category name, description & attributes
  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? products.filter(product => {
        const brand = brands.find(b => b.brand_id === product.brand_id);
        const cat = categories.find(c => c.category_id === product.primary_category_id);

        const matchNameAr = product.name_ar.toLowerCase().includes(trimmed);
        const matchNameEn = product.name_en.toLowerCase().includes(trimmed);
        const matchBrand = brand && (brand.name_ar.toLowerCase().includes(trimmed) || brand.name_en.toLowerCase().includes(trimmed));
        const matchCat = cat && (cat.name_ar.toLowerCase().includes(trimmed) || cat.name_en.toLowerCase().includes(trimmed));
        const matchDesc = product.description.toLowerCase().includes(trimmed);

        const matchAttr = Object.values(product.attributes).some(val => {
          if (typeof val === 'string') return val.toLowerCase().includes(trimmed);
          return false;
        });

        return matchNameAr || matchNameEn || matchBrand || matchCat || matchDesc || matchAttr;
      })
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trimmed) {
      logEvent('search_submitted', {
        search_query: trimmed,
        result_count: results.length
      });
    }
  };

  const getLowestPrice = (productId: string) => {
    const productOffers = offers.filter(o => o.product_id === productId);
    if (!productOffers.length) return null;
    return Math.min(...productOffers.map(o => o.price_amount));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8DFC8] flex flex-col max-h-[80vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b border-[#F4EFEB] p-4 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-[#8C7A75] absolute right-6 pointer-events-none" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="ابحثي عن واقي شمس، عطر، أو ماركة (بوباي، لاروش، شانيل)..."
            className="w-full pr-10 pl-12 py-3 bg-white border border-[#E8DFC8] rounded-2xl text-sm focus:border-[#9E3D52] focus:ring-1 focus:ring-[#9E3D52] outline-none transition-all placeholder:text-[#A89F91]"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute left-6 p-1 text-[#8C7A75] hover:text-[#2D2A29] rounded-full hover:bg-black/5"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="absolute left-6 p-1 text-[#8C7A75] hover:text-[#2D2A29] rounded-full hover:bg-black/5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-2">
          {!trimmed ? (
            <div className="p-6 text-center space-y-3">
              <p className="text-xs text-[#8C7A75]">عمليات بحث شائعة مقترحة:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'واقي شمس للبشرة الدهنية',
                  'بوباي هيدروكير',
                  'لاروش بوزيه',
                  'شوكو مسك',
                  'لطافة خمرة',
                  'عطر رجالي فخم'
                ].map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      setQuery(tag);
                      logEvent('search_submitted', { search_query: tag, result_count: 3 });
                    }}
                    className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F4EFEB] text-[#7A283C] text-xs font-medium rounded-xl border border-[#E8DFC8] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <p className="text-sm font-bold text-[#2D2A29]">لم نجد منتجات تطابق "{query}"</p>
              <p className="text-xs text-[#8C7A75]">
                تأكدي من صحة الكلمات أو جربي البحث بالاسم الإنجليزي أو اسم الماركة فقط.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-[#8C7A75] block px-2">
                نتائج البحث ({results.length}):
              </span>
              {results.map(product => {
                const brand = brands.find(b => b.brand_id === product.brand_id);
                const lowest = getLowestPrice(product.product_id);
                return (
                  <button
                    key={product.product_id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-[#FAF8F5] border border-transparent hover:border-[#E8DFC8] flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image_url}
                        alt={product.name_ar}
                        className="w-12 h-12 rounded-xl object-cover bg-white border border-[#E8DFC8]/60 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-[#9E3D52]">
                            {brand?.name_ar || ''}
                          </span>
                          {product.verification_status === 'verified' && (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-[#2D2A29] group-hover:text-[#9E3D52] transition-colors">
                          {product.name_ar}
                        </h4>
                        <p className="text-[11px] text-[#8C7A75] font-latin">
                          {product.name_en}
                        </p>
                      </div>
                    </div>

                    <div className="text-left shrink-0">
                      {lowest ? (
                        <div>
                          <span className="text-[10px] text-[#8C7A75] block">يبدأ من</span>
                          <span className="text-xs font-bold text-[#7A283C] font-latin">
                            {lowest.toFixed(2)} ج.م
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-[#8C7A75]">الأسعار غير متوفرة</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
