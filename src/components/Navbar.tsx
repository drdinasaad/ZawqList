import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  BookOpen,
  Compass,
  Tag,
  ShieldCheck,
  Search,
  Menu,
  X,
  User as UserIcon,
  LogIn,
  LogOut,
  Info,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenArchitecture: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenSearch,
  onOpenArchitecture,
  onOpenAuthModal
}) => {
  const { currentUser, setCurrentUser, users } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'الرئيسية', icon: Sparkles },
    { id: 'catalog', label: 'اكتشفي المنتجات', icon: Compass },
    { id: 'discover', label: 'مكتبات المستخدمين', icon: BookOpen },
    { id: 'my-library', label: 'مكتبتي', icon: UserIcon },
    { id: 'prices', label: 'مقارنة الأسعار', icon: Tag },
    { id: 'admin', label: 'لوحة الإدارة', icon: ShieldCheck, badge: 'أدمن' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFC8]/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentTab('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 text-right group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9E3D52] to-[#7A283C] text-white flex items-center justify-center font-bold text-xl shadow-sm shadow-[#9E3D52]/20 group-hover:scale-105 transition-transform">
                Z
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-[#2D2A29] font-latin">
                  ZawqList
                </span>
                <span className="block text-[11px] font-medium text-[#8C7A75] -mt-1">
                  مكتبة المنتجات ومقارنة الأسعار
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setCurrentTab(link.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'text-[#7A283C] bg-[#9E3D52]/10 font-semibold shadow-xs'
                      : 'text-[#5A524E] hover:text-[#2D2A29] hover:bg-black/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#9E3D52]' : 'text-[#8C7A75]'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] bg-[#9E3D52]/15 text-[#7A283C] px-1.5 py-0.5 rounded-full font-semibold">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & User Switcher */}
          <div className="flex items-center gap-2">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-2 text-[#5A524E] hover:text-[#2D2A29] bg-[#F4EFEB] hover:bg-[#EDE5DD] rounded-xl text-sm flex items-center gap-2 border border-[#E8DFC8]/50 transition-colors"
              title="بحث سريع"
            >
              <Search className="w-4 h-4 text-[#8C7A75]" />
              <span className="hidden lg:inline text-xs text-[#8C7A75]">ابحثي عن منتج أو ماركة...</span>
              <kbd className="hidden lg:inline text-[10px] bg-white text-[#8C7A75] px-1.5 py-0.5 rounded border border-[#E8DFC8]">
                Ctrl K
              </kbd>
            </button>

            {/* Architecture Guide Modal Trigger */}
            <button
              onClick={onOpenArchitecture}
              className="p-2 text-[#7A283C] hover:bg-[#9E3D52]/10 rounded-xl text-xs font-medium flex items-center gap-1.5 border border-[#9E3D52]/20 transition-colors"
              title="دليل المعمارية والتوثيق"
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">دليل النظام</span>
            </button>

            {/* User Account / Switcher */}
            <div className="relative">
              {currentUser ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 bg-white hover:bg-[#F9F7F4] border border-[#E8DFC8] rounded-full shadow-xs transition-colors"
                >
                  <img
                    src={currentUser.avatar_url}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-[#9E3D52]/30"
                  />
                  <div className="hidden sm:block text-right">
                    <span className="text-xs font-semibold text-[#2D2A29] block leading-none">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-[#9E3D52] font-medium leading-none">
                      {currentUser.role === 'admin' ? 'مدير المنصة' : 'مستخدم'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#8C7A75]" />
                </button>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#9E3D52] hover:bg-[#852C3E] text-white text-xs font-medium rounded-xl shadow-xs transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>تسجيل الدخول</span>
                </button>
              )}

              {/* User Dropdown */}
              {userDropdownOpen && currentUser && (
                <div
                  className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#E8DFC8] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-[#F4EFEB]">
                    <p className="text-xs text-[#8C7A75]">مسجل الدخول حالياً:</p>
                    <p className="text-sm font-bold text-[#2D2A29]">{currentUser.name}</p>
                    <p className="text-[11px] text-[#8C7A75] font-latin">{currentUser.email}</p>
                  </div>

                  <div className="px-2 py-1">
                    <p className="text-[11px] font-semibold text-[#8C7A75] px-2 py-1">تبديل الحساب للتجربة:</p>
                    {users.map(u => (
                      <button
                        key={u.uid}
                        onClick={() => setCurrentUser(u)}
                        className={`w-full text-right px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          currentUser.uid === u.uid
                            ? 'bg-[#9E3D52]/10 text-[#7A283C] font-semibold'
                            : 'hover:bg-[#F9F7F4] text-[#5A524E]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img src={u.avatar_url} alt={u.name} className="w-5 h-5 rounded-full object-cover" />
                          <span>{u.name}</span>
                        </div>
                        {u.role === 'admin' && (
                          <span className="text-[9px] bg-[#9E3D52]/15 text-[#7A283C] px-1 py-0.5 rounded">أدمن</span>
                        )}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentUser(null)}
                      className="w-full text-right px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 hover:bg-[#F9F7F4] text-[#5A524E] transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-[#8C7A75]" />
                      <span>تصفح كزائر (بدون تسجيل)</span>
                    </button>
                  </div>

                  <div className="border-t border-[#F4EFEB] px-2 pt-1">
                    <button
                      onClick={() => setCurrentUser(null)}
                      className="w-full text-right px-3 py-1.5 rounded-xl text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#5A524E] hover:text-[#2D2A29] rounded-xl hover:bg-black/5"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DFC8] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-1">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-right px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between ${
                  isActive
                    ? 'text-[#7A283C] bg-[#9E3D52]/10 font-bold'
                    : 'text-[#5A524E] hover:bg-black/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#9E3D52]' : 'text-[#8C7A75]'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] bg-[#9E3D52]/20 text-[#7A283C] px-2 py-0.5 rounded-full font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
