import React, { useState, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, LibraryItem, CustomShelf, DefaultShelfKey } from '../types';
import { DEFAULT_SHELVES } from '../data/seedData';
import { exportElementAsPng } from '../utils/imageExport';
import {
  Heart,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Download,
  Lock,
  Globe,
  Plus,
  Trash2,
  Edit2,
  MoveRight,
  Search,
  Filter,
  Check,
  AlertCircle,
  Copy,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface PersonalLibraryPageProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToCatalog: () => void;
  onOpenAuth: () => void;
}

export const PersonalLibraryPage: React.FC<PersonalLibraryPageProps> = ({
  onSelectProduct,
  onNavigateToCatalog,
  onOpenAuth
}) => {
  const {
    currentUser,
    libraries,
    libraryItems,
    customShelves,
    products,
    categories,
    brands,
    updateLibrary,
    setLibraryVisibility,
    moveItemShelf,
    removeItemFromLibrary,
    updateItemNote,
    createCustomShelf,
    updateCustomShelf,
    deleteCustomShelf,
    logEvent
  } = useStore();

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isEditingLibraryMeta, setIsEditingLibraryMeta] = useState<boolean>(false);
  const [titleEdit, setTitleEdit] = useState<string>('');
  const [descEdit, setDescEdit] = useState<string>('');

  // Custom Shelf Modal state
  const [isAddShelfOpen, setIsAddShelfOpen] = useState<boolean>(false);
  const [newShelfName, setNewShelfName] = useState<string>('');
  const [newShelfColor, setNewShelfColor] = useState<string>('#9E3D52');

  // Share & Export states
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportError, setExportError] = useState<string | null>(null);

  // Edit Note Modal state
  const [editingItemNote, setEditingItemNote] = useState<LibraryItem | null>(null);
  const [itemNoteText, setItemNoteText] = useState<string>('');

  const libraryExportRef = useRef<HTMLDivElement>(null);

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-[#9E3D52]/10 text-[#7A283C] flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[#2D2A29]">
            سجلي الدخول للوصول إلى مكتبتكِ الشخصية
          </h2>
          <p className="text-xs sm:text-sm text-[#8C7A75] max-w-md mx-auto">
            تتيح لكِ مكتبتكِ في ZawqList ترتيب منتجاتكِ في رفوف تفضيلية، وحفظ ملاحظاتكِ، ومقارنة الأسعار، ومشاركة اختياراتكِ مع صديقاتكِ.
          </p>
        </div>
        <button
          onClick={onOpenAuth}
          className="px-6 py-3 bg-[#9E3D52] hover:bg-[#852C3E] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xs transition-colors"
        >
          تسجيل الدخول / إنشاء حساب
        </button>
      </div>
    );
  }

  // Find user's library
  const userLibraries = libraries.filter(l => l.owner_uid === currentUser.uid);
  const library = userLibraries[0];

  if (!library) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-sm font-bold text-[#2D2A29]">لم يتم العثور على مكتبة لهذا المستخدم</p>
        <button
          onClick={onNavigateToCatalog}
          className="px-5 py-2.5 bg-[#9E3D52] text-white rounded-xl text-xs font-bold"
        >
          ابدئي بتصفح المنتجات
        </button>
      </div>
    );
  }

  const items = libraryItems.filter(i => i.library_id === library.library_id);
  const userCustomShelves = customShelves.filter(s => s.library_id === library.library_id);

  // Filter items by category and query
  const filteredItems = items.filter(item => {
    const prod = products.find(p => p.product_id === item.product_id);
    if (!prod) return false;

    if (selectedCategoryFilter !== 'all' && prod.primary_category_id !== selectedCategoryFilter) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNameAr = prod.name_ar.toLowerCase().includes(q);
      const matchNameEn = prod.name_en.toLowerCase().includes(q);
      const matchNote = item.personal_note?.toLowerCase().includes(q) || false;
      return matchNameAr || matchNameEn || matchNote;
    }

    return true;
  });

  // Group items by shelf
  const allShelvesList = [
    ...DEFAULT_SHELVES.map(ds => ({
      id: ds.key,
      name: ds.name_ar,
      color: ds.color,
      isCustom: false,
      description: ds.description_ar
    })),
    ...userCustomShelves.map(cs => ({
      id: cs.shelf_id,
      name: cs.name,
      color: cs.color,
      isCustom: true,
      description: 'رف مخصص من إنشائكِ'
    }))
  ];

  const handleStartEditMeta = () => {
    setTitleEdit(library.title);
    setDescEdit(library.description);
    setIsEditingLibraryMeta(true);
  };

  const handleSaveMeta = () => {
    if (titleEdit.trim()) {
      updateLibrary(library.library_id, {
        title: titleEdit.trim(),
        description: descEdit.trim()
      });
      setIsEditingLibraryMeta(false);
    }
  };

  const handleToggleVisibility = () => {
    const nextVis = library.visibility === 'public' ? 'private' : 'public';
    setLibraryVisibility(library.library_id, nextVis);
  };

  const handleAddCustomShelf = (e: React.FormEvent) => {
    e.preventDefault();
    if (newShelfName.trim()) {
      createCustomShelf(library.library_id, newShelfName.trim(), newShelfColor);
      setNewShelfName('');
      setIsAddShelfOpen(false);
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}?lib=${library.slug}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShareToast('تم نسخ رابط المكتبة إلى الحافظة!');
      logEvent('library_shared', { library_id: library.library_id });
      setTimeout(() => setShareToast(null), 3000);
    });
  };

  const handleExportImage = async () => {
    if (!libraryExportRef.current) return;
    setIsExporting(true);
    setExportError(null);

    const res = await exportElementAsPng(
      libraryExportRef.current,
      `zawqlist-${library.slug}.png`
    );

    setIsExporting(false);
    if (!res.success) {
      setExportError(res.error || 'حدث خطأ أثناء إنشاء الصورة');
    }
  };

  const getShelfIcon = (key: string) => {
    switch (key) {
      case 'favorites':
        return <Heart className="w-4 h-4 text-rose-600 fill-rose-100" />;
      case 'recommended':
        return <ThumbsUp className="w-4 h-4 text-emerald-600" />;
      case 'not_recommended':
        return <ThumbsDown className="w-4 h-4 text-slate-600" />;
      case 'want_to_try':
        return <Bookmark className="w-4 h-4 text-violet-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#9E3D52]" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#2D2A29] text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{shareToast}</span>
        </div>
      )}

      {/* Library Header Card */}
      <div className="bg-white rounded-3xl border border-[#E8DFC8] p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#9E3D52] bg-[#9E3D52]/10 px-3 py-1 rounded-full">
                مكتبتي الشخصية
              </span>

              {/* Visibility pill toggle with immediate effect */}
              <button
                onClick={handleToggleVisibility}
                className={`text-xs font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5 transition-colors ${
                  library.visibility === 'public'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                }`}
                title="اضغطي لتغيير الخصوصية فوراً"
              >
                {library.visibility === 'public' ? (
                  <>
                    <Globe className="w-3.5 h-3.5 text-emerald-600" />
                    <span>مكتبة عامة (يمكن للجميع مشاهدتها)</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                    <span>مكتبة خاصة (محمية ومخفية عن العامة)</span>
                  </>
                )}
              </button>
            </div>

            {isEditingLibraryMeta ? (
              <div className="space-y-3 pt-2">
                <input
                  type="text"
                  value={titleEdit}
                  onChange={e => setTitleEdit(e.target.value)}
                  className="w-full text-lg font-bold p-2.5 rounded-xl border border-[#E8DFC8] focus:border-[#9E3D52] outline-none"
                />
                <textarea
                  value={descEdit}
                  onChange={e => setDescEdit(e.target.value)}
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#E8DFC8] focus:border-[#9E3D52] outline-none"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveMeta}
                    className="px-4 py-1.5 bg-[#9E3D52] text-white rounded-lg text-xs font-bold"
                  >
                    حفظ التعديلات
                  </button>
                  <button
                    onClick={() => setIsEditingLibraryMeta(false)}
                    className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#2D2A29]">
                    {library.title}
                  </h1>
                  <button
                    onClick={handleStartEditMeta}
                    className="p-1.5 text-[#8C7A75] hover:text-[#9E3D52] rounded-lg hover:bg-black/5"
                    title="تعديل العنوان والوصف"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                {library.description && (
                  <p className="text-xs sm:text-sm text-[#5A524E] mt-1 leading-relaxed">
                    {library.description}
                  </p>
                )}
                <div className="flex items-center gap-2 text-xs text-[#8C7A75] mt-2">
                  <span>المالك: {currentUser.name}</span>
                  <span>•</span>
                  <span>الرابط الدائم: {library.slug}</span>
                  <span>•</span>
                  <span>إجمالي المنتجات: {items.length}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons: Share, Export as Image, Add Shelf */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 bg-[#FAF8F5] hover:bg-[#F4EFEB] text-[#7A283C] border border-[#E8DFC8] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة الرابط</span>
            </button>

            <button
              onClick={handleExportImage}
              disabled={isExporting}
              className="px-3.5 py-2 bg-[#FAF8F5] hover:bg-[#F4EFEB] text-[#7A283C] border border-[#E8DFC8] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'جارِ التصدير...' : 'تصدير كصورة'}</span>
            </button>

            <button
              onClick={() => setIsAddShelfOpen(true)}
              className="px-4 py-2 bg-[#9E3D52] hover:bg-[#852C3E] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة رف مخصص</span>
            </button>
          </div>
        </div>

        {exportError && (
          <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl">
            {exportError}
          </p>
        )}

        {/* Filter and Search Bar inside Library */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#F4EFEB]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                selectedCategoryFilter === 'all'
                  ? 'bg-[#9E3D52] text-white'
                  : 'bg-[#FAF8F5] text-[#5A524E] hover:bg-[#F4EFEB]'
              }`}
            >
              جميع المنتجات ({items.length})
            </button>
            {categories.map(c => {
              const countInCat = items.filter(it => {
                const prod = products.find(p => p.product_id === it.product_id);
                return prod?.primary_category_id === c.category_id;
              }).length;
              if (countInCat === 0 && selectedCategoryFilter !== c.category_id) return null;

              return (
                <button
                  key={c.category_id}
                  onClick={() => setSelectedCategoryFilter(c.category_id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                    selectedCategoryFilter === c.category_id
                      ? 'bg-[#9E3D52] text-white'
                      : 'bg-[#FAF8F5] text-[#5A524E] hover:bg-[#F4EFEB]'
                  }`}
                >
                  {c.name_ar} ({countInCat})
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#8C7A75] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="بحث داخل مكتبتي..."
              className="w-full pr-8 pl-3 py-1.5 bg-[#FAF8F5] border border-[#E8DFC8] rounded-xl text-xs focus:border-[#9E3D52] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Shelves Layout (Also captured for Image Export) */}
      <div ref={libraryExportRef} className="space-y-8 p-1 sm:p-2 bg-[#FAF8F5] rounded-3xl">
        {allShelvesList.map(shelf => {
          const shelfItems = filteredItems.filter(i => i.shelf_id === shelf.id);

          return (
            <div
              key={shelf.id}
              className="bg-white rounded-3xl border border-[#E8DFC8] p-5 sm:p-7 shadow-2xs space-y-4"
            >
              {/* Shelf Title & Controls */}
              <div className="flex items-center justify-between border-b border-[#F4EFEB] pb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ backgroundColor: shelf.color }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-[#2D2A29]">
                        {shelf.name}
                      </h3>
                      <span className="text-xs text-[#8C7A75] bg-[#FAF8F5] px-2 py-0.5 rounded-full font-latin">
                        ({shelfItems.length})
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8C7A75] mt-0.5">{shelf.description}</p>
                  </div>
                </div>

                {shelf.isCustom && (
                  <button
                    onClick={() => deleteCustomShelf(shelf.id)}
                    className="text-xs text-rose-600 hover:text-rose-800 p-1.5 hover:bg-rose-50 rounded-lg flex items-center gap-1 transition-colors"
                    title="حذف هذا الرف المخصص ونقل المنتجات لرف المفضلة"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">حذف الرف</span>
                  </button>
                )}
              </div>

              {/* Shelf Product Cards */}
              {shelfItems.length === 0 ? (
                <div className="py-8 text-center bg-[#FAF8F5] rounded-2xl border border-dashed border-[#E8DFC8]/80 space-y-2">
                  <p className="text-xs font-semibold text-[#8C7A75]">
                    لا توجد منتجات على هذا الرف حالياً
                  </p>
                  <button
                    onClick={onNavigateToCatalog}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9E3D52] hover:text-[#7A283C]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>تصفحي الكتالوج لإضافة منتجاتكِ</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {shelfItems.map(item => {
                    const prod = products.find(p => p.product_id === item.product_id);
                    if (!prod) return null;
                    const brand = brands.find(b => b.brand_id === prod.brand_id);

                    return (
                      <div
                        key={item.item_id}
                        className="bg-[#FAF8F5] rounded-2xl border border-[#E8DFC8] p-4 flex flex-col justify-between hover:shadow-xs transition-shadow"
                      >
                        <div className="space-y-3">
                          {/* Image & Header */}
                          <div className="flex items-start gap-3">
                            <img
                              src={prod.image_url}
                              alt={prod.name_ar}
                              className="w-16 h-16 rounded-xl object-cover bg-white border border-[#E8DFC8] shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
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
                                className="text-xs font-bold text-[#2D2A29] line-clamp-1 cursor-pointer hover:text-[#9E3D52] transition-colors"
                              >
                                {prod.name_ar}
                              </h4>
                              <p className="text-[10px] text-[#8C7A75] font-latin truncate">
                                {prod.name_en}
                              </p>
                              {prod.variant_name && (
                                <span className="text-[10px] text-[#8C7A75] font-latin block mt-0.5">
                                  {prod.variant_name}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Personal Note */}
                          <div className="bg-white p-2.5 rounded-xl border border-[#E8DFC8]/60 text-[11px] text-[#5A524E] relative group/note">
                            <div className="flex items-start justify-between gap-1">
                              <p className="italic leading-relaxed flex-1">
                                {item.personal_note
                                  ? `"${item.personal_note}"`
                                  : 'لا توجد ملاحظة مسجلة بعد.'}
                              </p>
                              <button
                                onClick={() => {
                                  setEditingItemNote(item);
                                  setItemNoteText(item.personal_note || '');
                                }}
                                className="p-1 text-[#8C7A75] hover:text-[#9E3D52] rounded hover:bg-black/5 shrink-0"
                                title="تعديل الملاحظة"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Shelf Relocation Dropdown & Actions */}
                        <div className="pt-3 mt-3 border-t border-[#E8DFC8]/60 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 text-[11px] text-[#8C7A75]">
                            <span>نقل إلى:</span>
                            <select
                              value={item.shelf_id}
                              onChange={e => moveItemShelf(item.item_id, e.target.value)}
                              className="text-[11px] bg-white border border-[#E8DFC8] rounded-lg px-2 py-1 outline-none text-[#2D2A29] font-medium"
                            >
                              {allShelvesList.map(s => (
                                <option key={s.id} value={s.id}>
                                  {s.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <button
                            onClick={() => removeItemFromLibrary(item.item_id)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                            title="إزالة من المكتبة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Custom Shelf Modal */}
      {isAddShelfOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-[#E8DFC8]"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-[#2D2A29]">إضافة رف مخصص جديد</h3>
            <form onSubmit={handleAddCustomShelf} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">
                  اسم الرف:
                </label>
                <input
                  type="text"
                  required
                  value={newShelfName}
                  onChange={e => setNewShelfName(e.target.value)}
                  placeholder="مثال: لحقيبة السفر والمصيف 🏖️"
                  className="w-full text-xs p-3 rounded-2xl border border-[#E8DFC8] focus:border-[#9E3D52] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1.5">
                  لون الرف المميز:
                </label>
                <div className="flex items-center gap-2">
                  {['#9E3D52', '#2563EB', '#059669', '#D97706', '#7C3AED', '#DB2777'].map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewShelfColor(color)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        newShelfColor === color ? 'scale-110 border-[#2D2A29]' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddShelfOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#8C7A75]"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#9E3D52] text-white text-xs font-bold rounded-xl"
                >
                  إضافة الرف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Note Modal */}
      {editingItemNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-[#E8DFC8]"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-[#2D2A29]">تعديل ملاحظتكِ الخاصة</h3>
            <textarea
              value={itemNoteText}
              onChange={e => setItemNoteText(e.target.value)}
              rows={3}
              maxLength={500}
              placeholder="اكتبي ملاحظتكِ أو تجربتكِ الشخصية هنا..."
              className="w-full text-xs p-3 rounded-2xl border border-[#E8DFC8] focus:border-[#9E3D52] outline-none"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingItemNote(null)}
                className="px-4 py-2 text-xs font-semibold text-[#8C7A75]"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => {
                  updateItemNote(editingItemNote.item_id, itemNoteText);
                  setEditingItemNote(null);
                }}
                className="px-5 py-2 bg-[#9E3D52] text-white text-xs font-bold rounded-xl"
              >
                حفظ الملاحظة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
