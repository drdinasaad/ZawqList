import React from 'react';
import { useStore } from '../context/StoreContext';
import { Product, UserLibrary } from '../types';
import {
  Sparkles,
  Sun,
  Flame,
  Search,
  BookOpen,
  ArrowLeft,
  ShieldCheck,
  Tag,
  Heart,
  TrendingUp,
  Compass,
  CheckCircle2,
  Users,
  Layers,
  Store
} from 'lucide-react';

interface HomePageProps {
  onSelectCategory: (categoryId: string) => void;
  onSelectProduct: (product: Product) => void;
  onSelectLibrary: (library: UserLibrary) => void;
  onOpenAddToShelf: (product: Product) => void;
  onOpenSearch: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectCategory,
  onSelectProduct,
  onSelectLibrary,
  onOpenAddToShelf,
  onOpenSearch,
  onNavigateToTab
}) => {
  const {
    categories,
    activeCategories,
    products,
    brands,
    libraries,
    libraryItems,
    offers
  } = useStore();

  const publicLibraries = libraries.filter(l => l.visibility === 'public');

  // Popular products based on measured library additions
  const placementCounts: Record<string, number> = {};
  publicLibraries.forEach(lib => {
    const items = libraryItems.filter(i => i.library_id === lib.library_id);
    items.forEach(it => {
      placementCounts[it.product_id] = (placementCounts[it.product_id] || 0) + 1;
    });
  });

  const popularProducts = Object.entries(placementCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([id, count]) => ({
      product: products.find(p => p.product_id === id),
      count
    }))
    .filter(item => item.product !== undefined);

  // Recently verified products
  const recentProducts = products
    .filter(p => p.status === 'published')
    .slice(0, 4);

  const getLowestPrice = (productId: string) => {
    const prodOffers = offers.filter(o => o.product_id === productId);
    if (!prodOffers.length) return null;
    return Math.min(...prodOffers.map(o => o.price_amount));
  };

  return (
    <div className="space-y-12 pb-16 animate-in fade-in duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F4EFEB] via-[#FAF8F5] to-[#FAF8F5] border-b border-[#E8DFC8]/60 pt-10 pb-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#9E3D52]/10 text-[#7A283C] px-4 py-1.5 rounded-full text-xs font-bold border border-[#9E3D52]/20 shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#9E3D52]" />
            <span>منصة التوثيق والمكتبات الشخصية الأولى في مصر</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2D2A29] tracking-tight leading-[1.25]">
            ذوقكِ في الجمال والعطور،
            <br />
            <span className="text-[#9E3D52]">موثق في مكتبتكِ الخاصة</span>
          </h1>

          <p className="text-sm sm:text-base text-[#5A524E] max-w-2xl mx-auto leading-relaxed">
            مستوحاة من تجربة Goodreads ولكن لمستحضراتكِ: نظّمي واقيات الشمس والعطور على رفوف مفضلتكِ، واستكشفي ترشيحات مستخدمين حقيقيين، وقارني الأسعار بالجنيه عبر المتاجر المصرية.
          </p>

          {/* Quick Search CTA Box */}
          <div className="max-w-xl mx-auto pt-2">
            <button
              onClick={onOpenSearch}
              className="w-full p-3 sm:p-4 bg-white hover:bg-[#FAF8F5] rounded-2xl border border-[#E8DFC8] shadow-sm flex items-center justify-between text-right text-xs sm:text-sm text-[#8C7A75] transition-all group"
            >
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-[#9E3D52] group-hover:scale-110 transition-transform" />
                <span>ابحثي عن واقي شمس للبشرة الدهنية، أو عطر مفضل، أو ماركة...</span>
              </div>
              <span className="hidden sm:inline bg-[#FAF8F5] text-[#7A283C] px-3 py-1 rounded-xl text-xs font-bold border border-[#E8DFC8]">
                بحث سريع
              </span>
            </button>
          </div>

          {/* Value Props Pills */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-[#5A524E]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>واجهة عربية أصيلة (RTL)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>رفوف تفضيلية ونيات تجربة</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>مقارنة نون وأمازون ود. داوود</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>تصدير صور أنيقة للمشاركة</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Launch Categories Cards (Requirement Section 1 & 5) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-[#9E3D52] block mb-1">فئات الإطلاق الرسمية</span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#2D2A29]">
                استكشفي الفئات النشطة في ZawqList
              </h2>
            </div>
            <p className="text-xs text-[#8C7A75]">
              معمارية مرنة تدعم إضافة أقسام العناية والمكياج لاحقاً
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sunscreens Card */}
            <div
              onClick={() => onSelectCategory('sunscreens')}
              className="relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-white rounded-3xl border border-amber-200/80 p-6 sm:p-8 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                    <Sun className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                    فئة نشطة • موثقة
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#2D2A29] group-hover:text-amber-800 transition-colors">
                    واقيات الشمس (Sunscreens)
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A524E] mt-1.5 leading-relaxed">
                    تركيبات الجل والكريم الخفيفة الملائمة لدرجات الحرارة والرطوبة في مصر، مع تصنيف دقيق لـ SPF وعوامل الحماية ومقاومة الماء.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-medium text-amber-900">
                  <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200">جل مائي</span>
                  <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200">SPF 50+</span>
                  <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200">بشرة دهنية ومختلطة</span>
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between text-xs font-bold text-amber-900">
                <span>تصفحي واقيات الشمس ومقارنة الأسعار</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
              </div>
            </div>

            {/* Fragrances Card */}
            <div
              onClick={() => onSelectCategory('fragrances')}
              className="relative overflow-hidden bg-gradient-to-br from-[#9E3D52]/10 via-rose-50/50 to-white rounded-3xl border border-[#9E3D52]/30 p-6 sm:p-8 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#9E3D52] text-white flex items-center justify-center shadow-md shadow-[#9E3D52]/20">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold bg-[#9E3D52]/15 text-[#7A283C] px-3 py-1 rounded-full">
                    فئة نشطة • موثقة
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#2D2A29] group-hover:text-[#9E3D52] transition-colors">
                    العطور (Fragrances)
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A524E] mt-1.5 leading-relaxed">
                    عطور شرقية وفواحة ومسك وفاخرة بتركيزات EDP ومقاسات متعددة، مع رصد دقيق للهرم العطري والتفضيلات اليومية والمناسبات.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-medium text-[#7A283C]">
                  <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-[#9E3D52]/20">أو دو بارفان (EDP)</span>
                  <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-[#9E3D52]/20">مسك وفانيليا</span>
                  <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-[#9E3D52]/20">عطور نيش وشرقية</span>
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between text-xs font-bold text-[#7A283C]">
                <span>تصفحي العطور ومقارنة الأسعار</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Planned categories banner */}
          <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8DFC8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5A524E]">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8C7A75]" />
              <span>فئات مخططة ومجهزة في معمارية قاعدة البيانات لتفعيلها لاحقاً:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.filter(c => c.status === 'planned').map(c => (
                <span key={c.category_id} className="bg-white px-2.5 py-1 rounded-lg border border-[#E8DFC8] text-[#8C7A75] font-medium">
                  {c.name_ar} (قريباً)
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Products based on measured platform library activity */}
        {popularProducts.length > 0 && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-[#9E3D52] block mb-1">تفضيلات حقيقية</span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#2D2A29] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#9E3D52]" />
                  <span>المنتجات الأكثر إضافة إلى مكتبات الأعضاء</span>
                </h2>
              </div>
              <p className="text-xs text-[#8C7A75]">
                مقاسة من نشاط المستخدمين الحقيقي دون تزييف للأرقام أو تقييمات مضللة
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularProducts.map(({ product, count }) => {
                if (!product) return null;
                const brand = brands.find(b => b.brand_id === product.brand_id);
                const lowest = getLowestPrice(product.product_id);

                return (
                  <div
                    key={product.product_id}
                    className="bg-white rounded-3xl border border-[#E8DFC8] overflow-hidden hover:shadow-lg transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div
                        onClick={() => onSelectProduct(product)}
                        className="relative aspect-square overflow-hidden bg-[#FAF8F5] cursor-pointer"
                      >
                        <img
                          src={product.image_url}
                          alt={product.name_ar}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute bottom-2.5 right-2.5 bg-[#2D2A29]/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                          <span className="font-latin font-bold">{count}</span>
                          <span>مكتبة</span>
                        </div>
                      </div>

                      <div className="p-4 space-y-1.5">
                        {brand && (
                          <span className="text-[10px] font-bold text-[#9E3D52] block">
                            {brand.name_ar}
                          </span>
                        )}
                        <h3
                          onClick={() => onSelectProduct(product)}
                          className="text-xs font-bold text-[#2D2A29] group-hover:text-[#9E3D52] transition-colors line-clamp-1 cursor-pointer"
                        >
                          {product.name_ar}
                        </h3>
                        <p className="text-[10px] text-[#8C7A75] font-latin truncate">
                          {product.name_en}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-[#FAF8F5] border-t border-[#F4EFEB] flex items-center justify-between">
                      {lowest ? (
                        <div>
                          <span className="text-[9px] text-[#8C7A75] block leading-none">أفضل سعر</span>
                          <span className="text-xs font-bold text-[#7A283C] font-latin">
                            {lowest.toFixed(2)} ج.م
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-[#8C7A75]">الأسعار غير متوفرة</span>
                      )}

                      <button
                        onClick={() => onOpenAddToShelf(product)}
                        className="px-3 py-1.5 bg-[#9E3D52] hover:bg-[#852C3E] text-white text-xs font-bold rounded-xl shadow-2xs transition-colors"
                      >
                        أضيفي للرف
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Featured Public Libraries Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-[#9E3D52] block mb-1">مشاركة وتجربة مجتمعية</span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#2D2A29] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#9E3D52]" />
                <span>مكتبات مميزة من أعضاء مجتمع ZawqList</span>
              </h2>
            </div>
            <button
              onClick={() => onNavigateToTab('discover')}
              className="text-xs font-bold text-[#7A283C] hover:text-[#9E3D52] flex items-center gap-1"
            >
              <span>استكشاف كل المكتبات العامة</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publicLibraries.slice(0, 3).map(library => {
              const items = libraryItems.filter(i => i.library_id === library.library_id);
              const previewProds = items.slice(0, 3).map(it => products.find(p => p.product_id === it.product_id));

              return (
                <div
                  key={library.library_id}
                  onClick={() => onSelectLibrary(library)}
                  className="bg-white rounded-3xl border border-[#E8DFC8] p-6 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#9E3D52]">
                        بواسطة: {library.owner_name}
                      </span>
                      <span className="text-xs text-[#8C7A75] font-latin font-semibold">
                        {items.length} منتجات
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#2D2A29] group-hover:text-[#9E3D52] transition-colors leading-snug">
                      {library.title}
                    </h3>

                    {library.description && (
                      <p className="text-xs text-[#5A524E] line-clamp-2 leading-relaxed">
                        {library.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 pt-2">
                      {previewProds.map((prod, idx) => {
                        if (!prod) return null;
                        return (
                          <img
                            key={idx}
                            src={prod.image_url}
                            alt={prod.name_ar}
                            className="w-10 h-10 rounded-xl object-cover border border-[#E8DFC8]"
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#F4EFEB] flex items-center justify-between text-xs font-bold text-[#7A283C]">
                    <span>تصفح المكتبة</span>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Ethical Promise & Trust Section (Requirement Section 10) */}
        <section className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-10 space-y-4">
          <div className="flex items-center gap-2.5 text-[#9E3D52]">
            <ShieldCheck className="w-6 h-6" />
            <h2 className="text-base sm:text-lg font-bold text-[#2D2A29]">
              ميثاق الثقة والشفافية في ZawqList
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8DFC8]/60 space-y-1.5">
              <span className="font-bold text-xs text-[#2D2A29] block">
                تفضيلات شخصية وليست استشارات طبية
              </span>
              <p className="text-[11px] text-[#5A524E] leading-relaxed">
                تصنيف "لا أنصح به" يعبر عن انطباع وتجربة فردية ولا يعني وجود ضرر طبي، و"أريد تجربته" تعبر عن نية رغبة وتجربة وليست مراجعة.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8DFC8]/60 space-y-1.5">
              <span className="font-bold text-xs text-[#2D2A29] block">
                أسعار حقيقية موثقة بالوقت
              </span>
              <p className="text-[11px] text-[#5A524E] leading-relaxed">
                لا نختلق أسعاراً وهمية؛ تعرض المنصة عروض الصيدليات والمتاجر المصرية المعتمدة مع بيان تاريخ التحقق وروابط مباشرة.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8DFC8]/60 space-y-1.5">
              <span className="font-bold text-xs text-[#2D2A29] block">
                حماية تامة للمكتبات الخاصة
              </span>
              <p className="text-[11px] text-[#5A524E] leading-relaxed">
                المكتبة الخاصة بكِ لا يمكن الوصول إليها من أي زائر أو عبر الروابط العشوائية، ويمكنكِ تحويلها لعامة في أي لحظة بنقرة زر.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
