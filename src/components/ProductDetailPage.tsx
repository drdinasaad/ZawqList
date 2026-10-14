import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import {
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Plus,
  Clock,
  Store,
  Heart,
  ThumbsUp,
  Bookmark,
  Share2,
  Sparkles,
  Info
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onOpenAddToShelf: (product: Product) => void;
  onSelectCategory: (catId: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onOpenAddToShelf,
  onSelectCategory
}) => {
  const {
    getBrandById,
    getCompanyById,
    getCategoryById,
    getOffersForProduct,
    retailers,
    variants,
    getProductLibraryPlacements,
    logEvent
  } = useStore();

  useEffect(() => {
    // Log product view event
    logEvent('product_view', { product_id: product.product_id });
  }, [product.product_id]);

  const brand = getBrandById(product.brand_id);
  const company = brand ? getCompanyById(brand.company_id) : undefined;
  const category = getCategoryById(product.primary_category_id);
  const offers = getOffersForProduct(product.product_id);
  const productVariants = variants.filter(v => v.product_id === product.product_id);
  const placements = getProductLibraryPlacements(product.product_id);

  const lowestPrice = offers.length ? Math.min(...offers.map(o => o.price_amount)) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Breadcrumbs & Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A283C] hover:text-[#9E3D52] bg-white px-3.5 py-2 rounded-xl border border-[#E8DFC8] shadow-xs transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للمنتجات</span>
        </button>

        <div className="text-xs text-[#8C7A75] flex items-center gap-1.5">
          <span>الرئيسية</span>
          <span>/</span>
          <button
            onClick={() => category && onSelectCategory(category.category_id)}
            className="hover:text-[#9E3D52] font-semibold"
          >
            {category?.name_ar || 'الفئة'}
          </button>
          <span>/</span>
          <span className="text-[#2D2A29] font-medium truncate max-w-[150px]">
            {product.name_ar}
          </span>
        </div>
      </div>

      {/* Main Product Showcase Card */}
      <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Product Image Column */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#E8DFC8]/70 shadow-inner group">
              <img
                src={product.image_url}
                alt={product.name_ar}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.verification_status === 'verified' && (
                <div className="absolute top-3 right-3 bg-emerald-600/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>بيانات موثقة رسمياً</span>
                </div>
              )}
            </div>

            {/* Pack sizes / variants pill tags */}
            {productVariants.length > 0 && (
              <div className="w-full mt-4 p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFC8]/60">
                <span className="text-[11px] font-bold text-[#8C7A75] block mb-2">
                  الأحجام والعبوات المتاحة:
                </span>
                <div className="flex flex-wrap gap-2">
                  {productVariants.map(v => (
                    <span
                      key={v.variant_id}
                      className="px-2.5 py-1 bg-white text-xs font-semibold text-[#2D2A29] rounded-lg border border-[#E8DFC8] shadow-2xs font-latin"
                    >
                      {v.variant_name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Details Column */}
          <div className="md:col-span-7 space-y-6">
            <div>
              {/* Brand & Category row */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {brand && (
                  <span className="text-xs font-bold text-[#9E3D52] bg-[#9E3D52]/10 px-3 py-1 rounded-full">
                    {brand.name_ar} ({brand.name_en})
                  </span>
                )}
                {category && (
                  <span className="text-xs font-medium text-[#5A524E] bg-[#F4EFEB] px-2.5 py-1 rounded-full">
                    {category.name_ar}
                  </span>
                )}
                {company && (
                  <span className="text-[11px] text-[#8C7A75]">
                    الشركة المصنعة / الموزع: {company.name_ar}
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-[#2D2A29] leading-tight">
                {product.name_ar}
              </h1>
              <p className="text-sm text-[#8C7A75] font-latin mt-1">
                {product.name_en}
              </p>

              {product.description && (
                <p className="text-xs text-[#5A524E] leading-relaxed mt-4 bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E8DFC8]/50">
                  {product.description}
                </p>
              )}
            </div>

            {/* Verified Category-Specific Attributes Table */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-[#2D2A29] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#9E3D52]" />
                <span>المواصفات والخصائص الموثقة:</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {Object.entries(product.attributes).map(([key, val]) => {
                  if (!val || typeof val === 'object') return null;
                  let label = key;
                  if (key === 'spf') label = 'عامل الحماية (SPF)';
                  if (key === 'pa_rating') label = 'تصنيف الحماية (PA)';
                  if (key === 'formulation') label = 'القوام والتركيبة';
                  if (key === 'skin_type') label = 'نوع البشرة الأنسب';
                  if (key === 'water_resistance') label = 'مقاومة الماء';
                  if (key === 'finish') label = 'المظهر النهائي';
                  if (key === 'concentration') label = 'التركيز العطري';
                  if (key === 'volume') label = 'الحجم';
                  if (key === 'fragrance_family') label = 'العائلة العطرية';
                  if (key === 'gender_positioning') label = 'التصنيف الاستخدامي';

                  return (
                    <div key={key} className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8DFC8]/60">
                      <span className="text-[10px] text-[#8C7A75] block mb-0.5">{label}</span>
                      <span className="text-xs font-bold text-[#2D2A29] block">{String(val)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Scent notes for fragrances */}
              {product.attributes.scent_notes && (
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFC8]/60 space-y-1.5 mt-2">
                  <span className="text-[11px] font-bold text-[#7A283C] block">الهرم العطري والمكونات:</span>
                  {product.attributes.scent_notes.top && (
                    <p className="text-xs">
                      <strong className="text-[#8C7A75]">الافتتاحية: </strong>
                      <span>{product.attributes.scent_notes.top}</span>
                    </p>
                  )}
                  {product.attributes.scent_notes.heart && (
                    <p className="text-xs">
                      <strong className="text-[#8C7A75]">قلب العطر: </strong>
                      <span>{product.attributes.scent_notes.heart}</span>
                    </p>
                  )}
                  {product.attributes.scent_notes.base && (
                    <p className="text-xs">
                      <strong className="text-[#8C7A75]">القاعدة العطرية: </strong>
                      <span>{product.attributes.scent_notes.base}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenAddToShelf(product)}
                className="flex-1 py-3 px-5 bg-[#9E3D52] hover:bg-[#852C3E] text-white rounded-2xl text-xs font-bold shadow-xs hover:shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>أضيفي إلى مكتبتكِ الشخصية</span>
              </button>

              {product.official_product_url && (
                <a
                  href={product.official_product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-white hover:bg-[#FAF8F5] text-[#5A524E] border border-[#E8DFC8] rounded-2xl text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C7A75]" />
                  <span>الموقع الرسمي</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Egyptian Retailer Offers & Price Comparison */}
      <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F4EFEB] pb-4">
          <div>
            <h2 className="text-base font-bold text-[#2D2A29] flex items-center gap-2">
              <Store className="w-4 h-4 text-[#9E3D52]" />
              <span>مقارنة الأسعار عبر المتاجر المصرية المعتمدة</span>
            </h2>
            <p className="text-xs text-[#8C7A75] mt-0.5">
              أسعار محدثة وموثقة بالجنيه المصري (EGP) مع روابط مباشرة للمتاجر
            </p>
          </div>

          {lowestPrice && (
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold">
              أفضل سعر حالياً: {lowestPrice.toFixed(2)} ج.م
            </div>
          )}
        </div>

        {offers.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF8F5] rounded-2xl border border-dashed border-[#E8DFC8]">
            <Info className="w-6 h-6 text-[#8C7A75] mx-auto mb-2" />
            <p className="text-sm font-bold text-[#2D2A29]">الأسعار غير متوفرة حالياً</p>
            <p className="text-xs text-[#8C7A75] mt-1">
              نحن لا نخترع أسعاراً وهمية؛ يجري التحقق من العروض الرسمية مع الصيدليات والمتاجر المعتمدة.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#F4EFEB]">
            {offers.map(offer => {
              const retailer = retailers.find(r => r.retailer_id === offer.retailer_id);
              const isBest = offer.price_amount === lowestPrice;

              return (
                <div
                  key={offer.offer_id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={retailer?.logo_url || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100'}
                      alt={retailer?.name_ar || ''}
                      className="w-10 h-10 rounded-xl object-cover border border-[#E8DFC8]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#2D2A29]">
                          {retailer?.name_ar || 'متجر مصري'}
                        </span>
                        {isBest && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                            أقل سعر
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#8C7A75] mt-0.5">
                        {offer.seller_name && <span>البائع: {offer.seller_name}</span>}
                        <span>•</span>
                        <span className={offer.availability === 'in_stock' ? 'text-emerald-700' : 'text-amber-700'}>
                          {offer.availability === 'in_stock' ? 'متوفر بالمخزون' : 'كمية محدودة'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-[#A89F91] mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>آخر تحديث: {new Date(offer.captured_at).toLocaleDateString('ar-EG')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right sm:text-left">
                      <span className="text-base font-bold text-[#7A283C] font-latin">
                        {offer.price_amount.toFixed(2)} ج.م
                      </span>
                    </div>

                    <a
                      href={offer.product_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        logEvent('price_offer_viewed', {
                          product_id: product.product_id,
                          retailer_id: offer.retailer_id
                        })
                      }
                      className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#9E3D52] hover:text-white text-[#7A283C] border border-[#E8DFC8] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <span>عرض في المتجر</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Community Library Placements (Transparent User Preferences) */}
      <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-base font-bold text-[#2D2A29] flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#9E3D52]" />
          <span>تفضيلات مجتمع ZawqList حول هذا المنتج</span>
        </h2>
        <p className="text-xs text-[#8C7A75]">
          توزيع إضافات الأعضاء الحقيقية للمنتج في مكتباتهم العامة (تفضيل وتجربة شخصية وليست إدعاءات طبية).
        </p>

        {placements.totalPlacements === 0 ? (
          <p className="text-xs text-[#8C7A75] bg-[#FAF8F5] p-4 rounded-xl text-center">
            كوني أول من يضيف هذا المنتج إلى مكتبته الشخصية ويشارك رأيه!
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {Object.entries(placements.byShelf).map(([key, data]) => (
              <div key={key} className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8DFC8]/60 text-center space-y-1">
                <span className="text-lg font-bold text-[#7A283C] block font-latin">
                  {data.count}
                </span>
                <span className="text-xs font-medium text-[#5A524E] block">
                  في رف "{data.shelf_name_ar}"
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
