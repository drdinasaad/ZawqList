import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Category, Product, PriceOffer, Brand, Company, Retailer } from '../types';
import {
  ShieldCheck,
  BarChart3,
  Layers,
  Package,
  Store,
  UploadCloud,
  DownloadCloud,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Search,
  Eye,
  TrendingUp,
  Bookmark,
  Share2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    categories,
    createCategory,
    updateCategory,
    products,
    createProduct,
    updateProduct,
    archiveProduct,
    brands,
    createBrand,
    companies,
    retailers,
    offers,
    createOffer,
    deleteOffer,
    getAnalyticsSummary,
    importCatalogData,
    exportCatalogData,
    resetToDefaultData
  } = useStore();

  const [activeTab, setActiveTab] = useState<'analytics' | 'categories' | 'products' | 'offers' | 'import_export'>('analytics');

  // Analytics summary
  const summary = getAnalyticsSummary();

  // Add Category Modal
  const [isAddCatModalOpen, setIsAddCatModalOpen] = useState(false);
  const [newCatId, setNewCatId] = useState('');
  const [newCatNameAr, setNewCatNameAr] = useState('');
  const [newCatNameEn, setNewCatNameEn] = useState('');
  const [newCatStatus, setNewCatStatus] = useState<'active' | 'planned' | 'archived'>('active');

  // Add Product Modal
  const [isAddProdModalOpen, setIsAddProdModalOpen] = useState(false);
  const [newProdId, setNewProdId] = useState('');
  const [newProdNameAr, setNewProdNameAr] = useState('');
  const [newProdNameEn, setNewProdNameEn] = useState('');
  const [newProdCatId, setNewProdCatId] = useState(categories[0]?.category_id || 'sunscreens');
  const [newProdBrandId, setNewProdBrandId] = useState(brands[0]?.brand_id || 'brand_bobai');
  const [newProdImageUrl, setNewProdImageUrl] = useState('');
  const [newProdVariant, setNewProdVariant] = useState('50ml');
  const [newProdDescription, setNewProdDescription] = useState('');

  // Add Offer Modal
  const [isAddOfferModalOpen, setIsAddOfferModalOpen] = useState(false);
  const [offerProdId, setOfferProdId] = useState(products[0]?.product_id || '');
  const [offerRetailerId, setOfferRetailerId] = useState(retailers[0]?.retailer_id || '');
  const [offerPrice, setOfferPrice] = useState<number>(250);
  const [offerSeller, setOfferSeller] = useState('');
  const [offerUrl, setOfferUrl] = useState('');

  // Import JSON input
  const [importJsonText, setImportJsonText] = useState('');
  const [importMessage, setImportMessage] = useState<{ success: boolean; text: string } | null>(null);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatId && newCatNameAr) {
      createCategory({
        category_id: newCatId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_'),
        name_ar: newCatNameAr.trim(),
        name_en: newCatNameEn.trim() || newCatNameAr.trim(),
        slug: newCatId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
        parent_category_id: null,
        status: newCatStatus,
        sort_order: categories.length + 1
      });
      setNewCatId('');
      setNewCatNameAr('');
      setNewCatNameEn('');
      setIsAddCatModalOpen(false);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProdId && newProdNameAr) {
      createProduct({
        product_id: newProdId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_'),
        primary_category_id: newProdCatId,
        brand_id: newProdBrandId,
        name_ar: newProdNameAr.trim(),
        name_en: newProdNameEn.trim() || newProdNameAr.trim(),
        slug: newProdId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
        description: newProdDescription.trim(),
        variant_name: newProdVariant.trim(),
        image_url: newProdImageUrl.trim() || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
        official_product_url: '',
        status: 'published',
        verification_status: 'verified',
        source_url: 'https://zawqlist.eg',
        last_verified_at: new Date().toISOString(),
        attributes: {}
      });
      setNewProdId('');
      setNewProdNameAr('');
      setNewProdNameEn('');
      setNewProdImageUrl('');
      setNewProdDescription('');
      setIsAddProdModalOpen(false);
    }
  };

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (offerProdId && offerRetailerId && offerPrice > 0) {
      createOffer({
        offer_id: `offer_${Date.now()}`,
        product_id: offerProdId,
        retailer_id: offerRetailerId,
        seller_name: offerSeller.trim() || 'المتجر المعتمد',
        price_amount: Number(offerPrice),
        currency: 'EGP',
        product_url: offerUrl.trim() || 'https://www.noon.com',
        availability: 'in_stock',
        captured_at: new Date().toISOString(),
        source_type: 'manual_admin_entry',
        verification_status: 'verified'
      });
      setIsAddOfferModalOpen(false);
    }
  };

  const handleRunImport = () => {
    if (!importJsonText.trim()) return;
    const res = importCatalogData(importJsonText);
    setImportMessage({ success: res.success, text: res.message });
  };

  const handleDownloadExport = () => {
    const data = exportCatalogData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zawqlist-catalog-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFC8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#9E3D52]">
            <ShieldCheck className="w-4 h-4" />
            <span>لوحة التحكم الإدارية (Admin Controls)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#2D2A29]">
            إدارة الكتالوج، الفئات، الأسعار والتحليلات
          </h1>
          <p className="text-xs text-[#8C7A75]">
            تتيح لكِ إضافة فئات جديدة وتحديث أسعار المتاجر وإدارة سجلات المنتجات والاطلاع على سلوك المستخدمين.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (confirm('هل أنتِ متأكدة من رغبتكِ في استعادة البيانات الافتراضية؟')) {
                resetToDefaultData();
              }
            }}
            className="px-3.5 py-2 text-xs text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-1.5 font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>استعادة البيانات الافتراضية</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8DFC8] bg-white rounded-2xl px-4 overflow-x-auto">
        {[
          { id: 'analytics', label: 'التحليلات والمقاييس', icon: BarChart3 },
          { id: 'categories', label: 'الفئات الديناميكية', icon: Layers },
          { id: 'products', label: 'المنتجات والماركات', icon: Package },
          { id: 'offers', label: 'عروض وأسعار المتاجر', icon: Store },
          { id: 'import_export', label: 'استيراد وتصدير الكتالوج', icon: UploadCloud }
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-3 text-xs font-bold border-b-2 flex items-center gap-2 shrink-0 transition-all ${
                isActive
                  ? 'border-[#9E3D52] text-[#7A283C]'
                  : 'border-transparent text-[#8C7A75] hover:text-[#2D2A29]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Analytics Dashboard */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-[#E8DFC8] space-y-1">
              <span className="text-xs text-[#8C7A75] font-semibold">المستخدمون المسجلون:</span>
              <span className="text-2xl font-bold text-[#7A283C] block font-latin">
                {summary.registeredUsersCount}
              </span>
              <span className="text-[10px] text-emerald-700">حسابات نشطة في النظام</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E8DFC8] space-y-1">
              <span className="text-xs text-[#8C7A75] font-semibold">المكتبات المنشأة:</span>
              <span className="text-2xl font-bold text-[#7A283C] block font-latin">
                {summary.totalLibrariesCount}
              </span>
              <span className="text-[10px] text-[#8C7A75]">
                منها {summary.publicLibrariesCount} عامة
              </span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E8DFC8] space-y-1">
              <span className="text-xs text-[#8C7A75] font-semibold">مشاهدات المنتجات:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#7A283C] font-latin">
                  {summary.totalProductViews}
                </span>
                <span className="text-xs text-[#8C7A75] font-latin">
                  ({summary.uniqueUserProductViews} فريد)
                </span>
              </div>
              <span className="text-[10px] text-[#8C7A75]">فصل دقيق للمستخدمين الفريدين</span>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-[#E8DFC8] space-y-1">
              <span className="text-xs text-[#8C7A75] font-semibold">إضافات الرفوف:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#7A283C] font-latin">
                  {summary.totalProductsAddedToLibraries}
                </span>
                <span className="text-xs text-[#8C7A75] font-latin">
                  ({summary.uniqueUsersAddingProducts} فريد)
                </span>
              </div>
              <span className="text-[10px] text-[#8C7A75]">إجمالي المنتجات في المكتبات</span>
            </div>
          </div>

          {/* Shelves Breakdown & Search Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shelf distribution */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8DFC8] space-y-3">
              <h3 className="text-sm font-bold text-[#2D2A29]">
                توزيع المنتجات عبر الرفوف (Placements by Shelf):
              </h3>
              <div className="space-y-2">
                {Object.entries(summary.placementsByShelf).map(([key, data]) => (
                  <div key={key} className="flex items-center justify-between p-2.5 bg-[#FAF8F5] rounded-xl text-xs">
                    <span className="font-semibold text-[#2D2A29]">{data.name_ar}</span>
                    <span className="font-bold text-[#7A283C] font-latin">{data.count} منتج</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Searches Breakdown */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8DFC8] space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#2D2A29] mb-2">
                  أكثر الكلمات بحثاً في المنصة:
                </h3>
                {summary.popularSearches.length === 0 ? (
                  <p className="text-xs text-[#8C7A75]">لا توجد عمليات بحث مسجلة حتى الآن</p>
                ) : (
                  <div className="space-y-1.5">
                    {summary.popularSearches.map(item => (
                      <div key={item.query} className="flex items-center justify-between text-xs p-2 bg-[#FAF8F5] rounded-lg">
                        <span>"{item.query}"</span>
                        <span className="font-bold text-[#7A283C] font-latin">{item.count} مرة</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-amber-900 mb-2">
                  عمليات بحث بدون نتائج (Zero-Results):
                </h3>
                {summary.zeroResultSearches.length === 0 ? (
                  <p className="text-xs text-[#8C7A75]">لا توجد عمليات بحث صفرية مسجلة</p>
                ) : (
                  <div className="space-y-1.5">
                    {summary.zeroResultSearches.map(item => (
                      <div key={item.query} className="flex items-center justify-between text-xs p-2 bg-amber-50 rounded-lg text-amber-950">
                        <span>"{item.query}"</span>
                        <span className="font-bold font-latin">{item.count} مرة</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Categories Management */}
      {activeTab === 'categories' && (
        <div className="bg-white p-6 rounded-3xl border border-[#E8DFC8] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F4EFEB] pb-4">
            <div>
              <h3 className="text-sm font-bold text-[#2D2A29]">
                إدارة فئات المنتجات (Category Architecture)
              </h3>
              <p className="text-xs text-[#8C7A75]">
                إضافة فئة جديدة فوراً بدون الحاجة لكتابة كود جديد (Requirement Section 3 & 10)
              </p>
            </div>
            <button
              onClick={() => setIsAddCatModalOpen(true)}
              className="px-4 py-2 bg-[#9E3D52] hover:bg-[#852C3E] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة فئة جديدة</span>
            </button>
          </div>

          <div className="divide-y divide-[#F4EFEB]">
            {categories.map(cat => (
              <div key={cat.category_id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#2D2A29]">{cat.name_ar}</span>
                    <span className="text-xs text-[#8C7A75] font-latin">({cat.name_en})</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        cat.status === 'active'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : cat.status === 'planned'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {cat.status === 'active' ? 'نشطة' : cat.status === 'planned' ? 'مخطط تفعيلها' : 'مؤرشفة'}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8C7A75] font-mono mt-0.5 block">
                    ID: {cat.category_id} | Slug: {cat.slug}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const nextStatus = cat.status === 'active' ? 'planned' : 'active';
                      updateCategory(cat.category_id, { status: nextStatus });
                    }}
                    className="text-xs text-[#7A283C] hover:bg-[#9E3D52]/10 px-2.5 py-1 rounded-lg border border-[#E8DFC8] font-semibold"
                  >
                    {cat.status === 'active' ? 'تعطيل الفئة' : 'تفعيل الفئة'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Products Management */}
      {activeTab === 'products' && (
        <div className="bg-white p-6 rounded-3xl border border-[#E8DFC8] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F4EFEB] pb-4">
            <div>
              <h3 className="text-sm font-bold text-[#2D2A29]">
                كتالوج المنتجات ({products.length} منتج)
              </h3>
              <p className="text-xs text-[#8C7A75]">
                إدارة سجلات المنتجات والتوثيق والربط بالماركات
              </p>
            </div>
            <button
              onClick={() => setIsAddProdModalOpen(true)}
              className="px-4 py-2 bg-[#9E3D52] hover:bg-[#852C3E] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة منتج جديد</span>
            </button>
          </div>

          <div className="divide-y divide-[#F4EFEB]">
            {products.map(p => {
              const brand = brands.find(b => b.brand_id === p.brand_id);
              const cat = categories.find(c => c.category_id === p.primary_category_id);

              return (
                <div key={p.product_id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image_url}
                      alt={p.name_ar}
                      className="w-12 h-12 rounded-xl object-cover border border-[#E8DFC8]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#2D2A29]">{p.name_ar}</span>
                        {p.verification_status === 'verified' && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                        <span className="text-[10px] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8DFC8]">
                          {cat?.name_ar}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8C7A75] font-latin">
                        {brand?.name_en} - {p.name_en}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const nextVer = p.verification_status === 'verified' ? 'unverified' : 'verified';
                        updateProduct(p.product_id, { verification_status: nextVer });
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg border border-[#E8DFC8] text-[#5A524E] hover:bg-black/5"
                    >
                      {p.verification_status === 'verified' ? 'إلغاء التوثيق' : 'توثيق المنتج'}
                    </button>
                    <button
                      onClick={() => archiveProduct(p.product_id)}
                      className="text-xs text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-lg"
                      title="أرشفة المنتج"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Offers Management */}
      {activeTab === 'offers' && (
        <div className="bg-white p-6 rounded-3xl border border-[#E8DFC8] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F4EFEB] pb-4">
            <div>
              <h3 className="text-sm font-bold text-[#2D2A29]">
                عروض أسعار المتاجر المصرية ({offers.length} عرض موثق)
              </h3>
              <p className="text-xs text-[#8C7A75]">
                رصد وتحديث أسعار نون وأمازون ود. داوود والعزبي مع تواريخ التحقق
              </p>
            </div>
            <button
              onClick={() => setIsAddOfferModalOpen(true)}
              className="px-4 py-2 bg-[#9E3D52] hover:bg-[#852C3E] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة عرض سعر</span>
            </button>
          </div>

          <div className="divide-y divide-[#F4EFEB]">
            {offers.map(o => {
              const prod = products.find(p => p.product_id === o.product_id);
              const ret = retailers.find(r => r.retailer_id === o.retailer_id);

              return (
                <div key={o.offer_id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-[#2D2A29] block">{prod?.name_ar || o.product_id}</span>
                    <span className="text-[#8C7A75] font-semibold">{ret?.name_ar || o.retailer_id} - البائع: {o.seller_name || 'رسمي'}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[#7A283C] font-latin">
                      {o.price_amount.toFixed(2)} ج.م
                    </span>
                    <button
                      onClick={() => deleteOffer(o.offer_id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 5: Import & Export */}
      {activeTab === 'import_export' && (
        <div className="bg-white p-6 rounded-3xl border border-[#E8DFC8] space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#2D2A29]">
              استيراد وتصدير بيانات الكتالوج (JSON / CSV Importer)
            </h3>
            <p className="text-xs text-[#8C7A75]">
              يتيح التحقق من معرفات الـ IDs الثابتة والربط بالماركات وقبول تحديثات المنتجات دفعة واحدة.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownloadExport}
              className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#F4EFEB] text-[#7A283C] border border-[#E8DFC8] rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs"
            >
              <DownloadCloud className="w-4 h-4" />
              <span>تحميل الكتالوج الحالي بصيغة JSON</span>
            </button>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#F4EFEB]">
            <label className="block text-xs font-bold text-[#2D2A29]">
              لصق كود JSON لاستيراد وتحديث المنتجات:
            </label>
            <textarea
              rows={6}
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
              placeholder='{"products": [{"product_id": "prod_new", "primary_category_id": "sunscreens", "brand_id": "brand_bobai", "name_ar": "اسم المنتج", "name_en": "Product Name"}]}'
              className="w-full text-xs font-mono p-3 rounded-2xl border border-[#E8DFC8] focus:border-[#9E3D52] outline-none"
            />

            <button
              onClick={handleRunImport}
              className="px-5 py-2.5 bg-[#9E3D52] hover:bg-[#852C3E] text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <UploadCloud className="w-4 h-4" />
              <span>بدء التحقق والاستيراد</span>
            </button>

            {importMessage && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  importMessage.success
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {importMessage.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{importMessage.text}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isAddCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-[#E8DFC8]">
            <h3 className="text-sm font-bold text-[#2D2A29]">إضافة فئة جديدة في الكتالوج</h3>
            <form onSubmit={handleCreateCategory} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">معرف الفئة (ID بالإنجليزية):</label>
                <input
                  type="text"
                  required
                  value={newCatId}
                  onChange={e => setNewCatId(e.target.value)}
                  placeholder="مثال: skincare أو makeup"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8] font-latin"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">الاسم بالعربية:</label>
                <input
                  type="text"
                  required
                  value={newCatNameAr}
                  onChange={e => setNewCatNameAr(e.target.value)}
                  placeholder="مثال: العناية بالبشرة"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">الاسم بالإنجليزية:</label>
                <input
                  type="text"
                  value={newCatNameEn}
                  onChange={e => setNewCatNameEn(e.target.value)}
                  placeholder="مثال: Skincare"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8] font-latin"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">الحالة:</label>
                <select
                  value={newCatStatus}
                  onChange={e => setNewCatStatus(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8]"
                >
                  <option value="active">نشطة (مفعلة فوراً في المتجر)</option>
                  <option value="planned">مخطط لها (تظهر لاحقاً)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddCatModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#8C7A75]"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#9E3D52] text-white text-xs font-bold rounded-xl"
                >
                  حفظ الفئة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddProdModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#E8DFC8] max-h-[90vh] overflow-y-auto">
            <h3 className="text-sm font-bold text-[#2D2A29]">إضافة منتج موثق جديد</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">معرف المنتج (Product ID):</label>
                <input
                  type="text"
                  required
                  value={newProdId}
                  onChange={e => setNewProdId(e.target.value)}
                  placeholder="prod_example_50ml"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8] font-latin"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">الاسم بالعربية:</label>
                <input
                  type="text"
                  required
                  value={newProdNameAr}
                  onChange={e => setNewProdNameAr(e.target.value)}
                  placeholder="اسم المنتج بالعربية"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">الاسم بالإنجليزية:</label>
                <input
                  type="text"
                  value={newProdNameEn}
                  onChange={e => setNewProdNameEn(e.target.value)}
                  placeholder="Product English Name"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8] font-latin"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#2D2A29] mb-1">الفئة:</label>
                  <select
                    value={newProdCatId}
                    onChange={e => setNewProdCatId(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8]"
                  >
                    {categories.map(c => (
                      <option key={c.category_id} value={c.category_id}>{c.name_ar}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D2A29] mb-1">الماركة:</label>
                  <select
                    value={newProdBrandId}
                    onChange={e => setNewProdBrandId(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8]"
                  >
                    {brands.map(b => (
                      <option key={b.brand_id} value={b.brand_id}>{b.name_ar}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">رابط الصورة (URL):</label>
                <input
                  type="url"
                  value={newProdImageUrl}
                  onChange={e => setNewProdImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8] font-latin"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">الوصف:</label>
                <textarea
                  rows={2}
                  value={newProdDescription}
                  onChange={e => setNewProdDescription(e.target.value)}
                  placeholder="وصف مختصر للمنتج..."
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProdModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#8C7A75]"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#9E3D52] text-white text-xs font-bold rounded-xl"
                >
                  إضافة المنتج
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Offer Modal */}
      {isAddOfferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-[#E8DFC8]">
            <h3 className="text-sm font-bold text-[#2D2A29]">إضافة عرض سعر لمتجر</h3>
            <form onSubmit={handleCreateOffer} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">المنتج:</label>
                <select
                  value={offerProdId}
                  onChange={e => setOfferProdId(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8]"
                >
                  {products.map(p => (
                    <option key={p.product_id} value={p.product_id}>{p.name_ar}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">المتجر المصري:</label>
                <select
                  value={offerRetailerId}
                  onChange={e => setOfferRetailerId(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8]"
                >
                  {retailers.map(r => (
                    <option key={r.retailer_id} value={r.retailer_id}>{r.name_ar}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">السعر بالجنيه (EGP):</label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={offerPrice}
                  onChange={e => setOfferPrice(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8] font-latin"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">اسم البائع:</label>
                <input
                  type="text"
                  value={offerSeller}
                  onChange={e => setOfferSeller(e.target.value)}
                  placeholder="مثال: نون إكسبريس أو المتجر الرسمي"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOfferModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#8C7A75]"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#9E3D52] text-white text-xs font-bold rounded-xl"
                >
                  حفظ العرض
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
