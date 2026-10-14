import React from 'react';
import { Sparkles, Shield, Heart, FileText, Info } from 'lucide-react';

interface FooterProps {
  onNavigateToTab: (tab: string) => void;
  onOpenArchitecture: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToTab, onOpenArchitecture }) => {
  return (
    <footer className="bg-white border-t border-[#E8DFC8] pt-12 pb-16 text-[#5A524E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#9E3D52] to-[#7A283C] text-white flex items-center justify-center font-bold text-lg">
                Z
              </div>
              <span className="text-xl font-bold tracking-tight text-[#2D2A29] font-latin">
                ZawqList
              </span>
            </div>
            <p className="text-xs text-[#8C7A75] leading-relaxed max-w-sm">
              مكتبة المنتجات واكتشاف التوصيات ومقارنة الأسعار الأولى في مصر، مستوحاة من فكرة Goodreads لتنظيم مستحضرات الجمال والعناية والعطور بأسلوب هادئ ومريح.
            </p>
            <p className="text-[11px] text-[#A89F91]">
              ZawqList منصة توثيق ومقارنة وتفضيل شخصي وليست متجر تجزئة أو بوابة بيع مباشر.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold text-[#2D2A29]">أقسام المنصة:</h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigateToTab('home')}
                  className="hover:text-[#9E3D52] transition-colors"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('catalog')}
                  className="hover:text-[#9E3D52] transition-colors"
                >
                  اكتشفي المنتجات (واقيات الشمس والعطور)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('discover')}
                  className="hover:text-[#9E3D52] transition-colors"
                >
                  مكتبات وتجميعات المستخدمين
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('prices')}
                  className="hover:text-[#9E3D52] transition-colors"
                >
                  مقارنة الأسعار عبر المتاجر المصرية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('my-library')}
                  className="hover:text-[#9E3D52] transition-colors"
                >
                  مكتبتي وإدارة الرفوف
                </button>
              </li>
            </ul>
          </div>

          {/* Legal, Trust & Architecture */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-bold text-[#2D2A29]">الثقة والشفافية:</h4>
            <ul className="space-y-1.5 text-[#8C7A75]">
              <li>تصنيفات الرفوف تمثل آراء شخصية وليست إرشادات طبية</li>
              <li>لا توجد تقييمات مزيفة أو مدفوعة</li>
              <li>عزل كامل للمكتبات الخاصة</li>
              <li>
                <button
                  onClick={onOpenArchitecture}
                  className="text-[#9E3D52] font-bold hover:underline flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>دليل المعمارية وقائمة التحقق (15/15)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('admin')}
                  className="text-[#5A524E] hover:text-[#2D2A29]"
                >
                  لوحة الإدارة والتحليلات
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#F4EFEB] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7A75] gap-3">
          <p>© 2026 ZawqList. جميع الحقوق محفوظة لجمهورية مصر العربية.</p>
          <div className="flex items-center gap-4">
            <span>صُنع بشغف للعناية والجمال في مصر</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
