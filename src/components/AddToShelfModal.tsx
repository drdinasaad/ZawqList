import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { DEFAULT_SHELVES } from '../data/seedData';
import {
  X,
  BookmarkCheck,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  FolderPlus,
  AlertCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface AddToShelfModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenAuth: () => void;
}

export const AddToShelfModal: React.FC<AddToShelfModalProps> = ({
  product,
  onClose,
  onOpenAuth
}) => {
  const {
    currentUser,
    libraries,
    customShelves,
    addProductToShelf,
    getBrandById
  } = useStore();

  const [selectedShelf, setSelectedShelf] = useState<string>('favorites');
  const [personalNote, setPersonalNote] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!product) return null;

  const brand = getBrandById(product.brand_id);
  const userLibraries = currentUser ? libraries.filter(l => l.owner_uid === currentUser.uid) : [];
  const activeLibrary = userLibraries[0];
  const userCustomShelves = activeLibrary ? customShelves.filter(s => s.library_id === activeLibrary.library_id) : [];

  const handleSave = () => {
    if (!currentUser || !activeLibrary) {
      onOpenAuth();
      return;
    }

    const res = addProductToShelf(
      activeLibrary.library_id,
      product.product_id,
      selectedShelf,
      personalNote
    );

    if (res.success) {
      setStatusMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      setStatusMessage({ type: 'error', text: res.message });
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
        return <FolderPlus className="w-4 h-4 text-[#9E3D52]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8DFC8] flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#F4EFEB] bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#9E3D52]/10 text-[#7A283C] flex items-center justify-center">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2D2A29]">إضافة المنتج إلى مكتبتي</h3>
              <p className="text-xs text-[#8C7A75]">حددي الرف المناسب وسجلي انطباعكِ الشخصي</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8C7A75] hover:text-[#2D2A29] hover:bg-black/5 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Product Mini Preview */}
          <div className="flex items-center gap-4 p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#E8DFC8]/60">
            <img
              src={product.image_url}
              alt={product.name_ar}
              className="w-16 h-16 rounded-xl object-cover bg-white border border-[#E8DFC8]/50 shrink-0"
            />
            <div className="min-w-0 flex-1">
              {brand && <span className="text-[11px] font-semibold text-[#9E3D52] block">{brand.name_ar}</span>}
              <h4 className="text-sm font-bold text-[#2D2A29] truncate">{product.name_ar}</h4>
              <p className="text-xs text-[#8C7A75] font-latin truncate">{product.name_en}</p>
            </div>
          </div>

          {!currentUser ? (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 space-y-3">
              <div className="flex items-start gap-2.5">
                <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold">تسجيل الدخول مطلوب لحفظ المكتبة الدائمة</p>
                  <p className="text-xs text-amber-800 mt-0.5">
                    بناءً على معايير المنصة، يمكن للزائر تصفح المنتجات ولكن يجب تسجيل الدخول لإنشاء مكتبتكِ الشخصية وحفظ الرفوف.
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenAuth}
                className="w-full py-2.5 bg-[#9E3D52] hover:bg-[#852C3E] text-white rounded-xl text-xs font-bold transition-colors"
              >
                تسجيل الدخول / إنشاء حساب مجاني
              </button>
            </div>
          ) : (
            <>
              {/* Shelf Selector */}
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-2.5">
                  اختاري الرف:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DEFAULT_SHELVES.map(shelf => {
                    const isSelected = selectedShelf === shelf.key;
                    return (
                      <button
                        key={shelf.key}
                        type="button"
                        onClick={() => setSelectedShelf(shelf.key)}
                        className={`text-right p-3 rounded-2xl border text-xs flex items-start gap-2.5 transition-all ${
                          isSelected
                            ? 'border-[#9E3D52] bg-[#9E3D52]/10 ring-1 ring-[#9E3D52]'
                            : 'border-[#E8DFC8] hover:border-[#9E3D52]/40 bg-white'
                        }`}
                      >
                        <div className="mt-0.5">{getShelfIcon(shelf.key)}</div>
                        <div className="flex-1">
                          <span className="font-bold text-[#2D2A29] block">{shelf.name_ar}</span>
                          <span className="text-[10px] text-[#8C7A75] line-clamp-1">
                            {shelf.description_ar}
                          </span>
                        </div>
                      </button>
                    );
                  })}

                  {/* Custom Shelves */}
                  {userCustomShelves.map(cs => {
                    const isSelected = selectedShelf === cs.shelf_id;
                    return (
                      <button
                        key={cs.shelf_id}
                        type="button"
                        onClick={() => setSelectedShelf(cs.shelf_id)}
                        className={`text-right p-3 rounded-2xl border text-xs flex items-start gap-2.5 transition-all ${
                          isSelected
                            ? 'border-[#9E3D52] bg-[#9E3D52]/10 ring-1 ring-[#9E3D52]'
                            : 'border-[#E8DFC8] hover:border-[#9E3D52]/40 bg-white'
                        }`}
                      >
                        <div
                          className="w-3.5 h-3.5 rounded-full mt-1 shrink-0"
                          style={{ backgroundColor: cs.color }}
                        />
                        <div className="flex-1">
                          <span className="font-bold text-[#2D2A29] block">{cs.name}</span>
                          <span className="text-[10px] text-[#8C7A75]">رف مخصص</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Important Trust Notice on Shelves */}
                <p className="text-[11px] text-[#8C7A75] mt-2 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E8DFC8]/50">
                  💡 تذكري: تصنيف المنتج في الرفوف يمثل انطباعكِ وتفضيلكِ الشخصي ولا يعتبر تقييماً طبياً أو إدعاءً صيدلانياً.
                </p>
              </div>

              {/* Personal Note */}
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1.5">
                  ملاحظة شخصية (اختياري):
                </label>
                <textarea
                  value={personalNote}
                  onChange={e => setPersonalNote(e.target.value)}
                  rows={3}
                  maxLength={500}
                  placeholder="مثال: استخدمته لشهرين مع فيتامين سي، خفيف جداً ولا يترك خطوطاً بيضاء..."
                  className="w-full text-xs p-3 rounded-2xl border border-[#E8DFC8] focus:border-[#9E3D52] focus:ring-1 focus:ring-[#9E3D52] outline-none transition-all placeholder:text-[#A89F91]"
                />
                <span className="text-[10px] text-[#8C7A75] block text-left">
                  {personalNote.length} / 500 حرف
                </span>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div
                  className={`p-3 rounded-2xl text-xs flex items-center gap-2 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Actions */}
        {currentUser && (
          <div className="p-4 bg-[#FAF8F5] border-t border-[#F4EFEB] flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#5A524E] hover:bg-black/5"
            >
              إلغاء
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#9E3D52] hover:bg-[#852C3E] text-white shadow-xs transition-colors"
            >
              حفظ في الرف
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
