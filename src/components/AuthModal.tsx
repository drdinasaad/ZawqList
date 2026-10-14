import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Sparkles, UserPlus, LogIn, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { users, currentUser, setCurrentUser, registerUser } = useStore();
  const [tab, setTab] = useState<'demo' | 'new'>('demo');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('يرجى كتابة الاسم');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }

    registerUser(name.trim(), email.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#E8DFC8] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#F4EFEB] bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9E3D52] to-[#7A283C] text-white flex items-center justify-center font-bold">
              Z
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2D2A29]">تسجيل الدخول في ZawqList</h3>
              <p className="text-xs text-[#8C7A75]">لحفظ مكتبتكِ الشخصية وإدارة الرفوف</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8C7A75] hover:text-[#2D2A29] hover:bg-black/5 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-[#F4EFEB] bg-[#FAF8F5] px-6 pt-2">
          <button
            type="button"
            onClick={() => setTab('demo')}
            className={`pb-2.5 text-xs font-bold border-b-2 flex-1 text-center transition-all ${
              tab === 'demo'
                ? 'border-[#9E3D52] text-[#7A283C]'
                : 'border-transparent text-[#8C7A75] hover:text-[#2D2A29]'
            }`}
          >
            حسابات تجريبية جاهزة
          </button>
          <button
            type="button"
            onClick={() => setTab('new')}
            className={`pb-2.5 text-xs font-bold border-b-2 flex-1 text-center transition-all ${
              tab === 'new'
                ? 'border-[#9E3D52] text-[#7A283C]'
                : 'border-transparent text-[#8C7A75] hover:text-[#2D2A29]'
            }`}
          >
            إنشاء حساب شخصي جديد
          </button>
        </div>

        <div className="p-6">
          {tab === 'demo' ? (
            <div className="space-y-3">
              <p className="text-xs text-[#5A524E] leading-relaxed">
                اختاري أي حساب للتجربة السريعة واختبار ميزات الرفوف ومكتبات المستخدمين:
              </p>

              <div className="space-y-2 mt-3">
                {users.map(u => {
                  const isCurrent = currentUser?.uid === u.uid;
                  return (
                    <button
                      key={u.uid}
                      type="button"
                      onClick={() => {
                        setCurrentUser(u);
                        onClose();
                      }}
                      className={`w-full p-3 rounded-2xl border text-right flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'border-[#9E3D52] bg-[#9E3D52]/10 ring-1 ring-[#9E3D52]'
                          : 'border-[#E8DFC8] hover:border-[#9E3D52]/40 bg-white hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar_url}
                          alt={u.name}
                          className="w-10 h-10 rounded-full object-cover ring-1 ring-[#9E3D52]/20"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#2D2A29]">{u.name}</span>
                            {u.role === 'admin' && (
                              <span className="text-[10px] bg-[#9E3D52]/15 text-[#7A283C] px-1.5 py-0.5 rounded-full font-semibold">
                                أدمن
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#8C7A75] font-latin block">{u.email}</span>
                          {u.bio && (
                            <span className="text-[10px] text-[#5A524E] line-clamp-1 mt-0.5">{u.bio}</span>
                          )}
                        </div>
                      </div>

                      {isCurrent ? (
                        <Check className="w-5 h-5 text-[#9E3D52]" />
                      ) : (
                        <LogIn className="w-4 h-4 text-[#8C7A75]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">الاسم الكامل:</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="مثال: ياسمين أحمد"
                  className="w-full text-xs p-3 rounded-2xl border border-[#E8DFC8] focus:border-[#9E3D52] focus:ring-1 focus:ring-[#9E3D52] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2A29] mb-1">البريد الإلكتروني:</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="yasmin@example.com"
                  className="w-full text-xs p-3 rounded-2xl border border-[#E8DFC8] focus:border-[#9E3D52] focus:ring-1 focus:ring-[#9E3D52] outline-none font-latin"
                />
              </div>

              {error && <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-[#9E3D52] hover:bg-[#852C3E] text-white text-xs font-bold rounded-2xl shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>إنشاء الحساب وبدء مكتبتي</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
