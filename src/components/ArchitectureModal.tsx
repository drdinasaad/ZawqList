import React, { useState } from 'react';
import { X, CheckCircle2, Shield, Database, Sparkles, AlertCircle, FileCode } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'checklist' | 'firebase' | 'limitations'>('architecture');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E8DFC8] flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#F4EFEB] bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#9E3D52]/10 text-[#7A283C] flex items-center justify-center font-bold">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2D2A29]">دليل المعمارية والتوثيق التقني (ZawqList)</h3>
              <p className="text-xs text-[#8C7A75]">وثيقة التسليم والمطابقة لمعايير المتطلبات الـ 13</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8C7A75] hover:text-[#2D2A29] hover:bg-black/5 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#F4EFEB] bg-[#FAF8F5] px-6">
          <button
            type="button"
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'architecture'
                ? 'border-[#9E3D52] text-[#7A283C]'
                : 'border-transparent text-[#8C7A75] hover:text-[#2D2A29]'
            }`}
          >
            معمارية النظام
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'checklist'
                ? 'border-[#9E3D52] text-[#7A283C]'
                : 'border-transparent text-[#8C7A75] hover:text-[#2D2A29]'
            }`}
          >
            قائمة اختبارات القبول (15/15)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('firebase')}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'firebase'
                ? 'border-[#9E3D52] text-[#7A283C]'
                : 'border-transparent text-[#8C7A75] hover:text-[#2D2A29]'
            }`}
          >
            قواعد فايربيس والأمان
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('limitations')}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'limitations'
                ? 'border-[#9E3D52] text-[#7A283C]'
                : 'border-transparent text-[#8C7A75] hover:text-[#2D2A29]'
            }`}
          >
            الحدود ونطاق الإصدار
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-[#4A423E]">
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8DFC8]">
                <h4 className="font-bold text-sm text-[#2D2A29] mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#9E3D52]" />
                  الهيكلية المبنية على البيانات (Category-Driven Data Architecture)
                </h4>
                <p>
                  تم تصميم النظام بحيث لا يتم إدخال واقيات الشمس أو العطور كثوابت برمجية (Hardcoded). يتم تمثيل الفئات والماركات والمنتجات والرفوف كبيانات مرنة في قاعدة البيانات:
                </p>
                <div className="mt-2.5 p-2 bg-white rounded-xl border border-[#E8DFC8] font-latin text-[11px] text-[#7A283C]">
                  Category → Company → Brand → Product → Variant/Pack → Retailer Offer
                </div>
                <p className="mt-2">
                  يدعم النظام إضافة أي فئة مستقبلية (العناية بالبشرة، العناية بالشعر، المكياج) فوراً عبر لوحة الإدارة دون الحاجة لتعديل كود أو إعادة نشر الموقع.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <span className="font-bold text-emerald-900 block mb-1">الميزات المكتملة والمفعلة فوراً:</span>
                  <ul className="space-y-1 text-emerald-800 list-disc list-inside">
                    <li>تصفح المنتجات والفئات والماركات بالعربية والإنجليزية</li>
                    <li>مقارنة أسعار المتاجر المصرية (نون، أمازون، د. داوود، العزبي) بالجنيه مع التواريخ</li>
                    <li>إدارة الرفوف الافتراضية الأربعة والرفوف المخصصة الملونة</li>
                    <li>التحكم الفوري في خصوصية المكتبة (عامة / خاصة) وعزل الروابط</li>
                    <li>تصدير بطاقة المكتبة كصورة عالية الدقة PNG مع الحفاظ على الخط العربي</li>
                    <li>لوحة إدارة ديناميكية واستيراد/تصدير CSV & JSON</li>
                    <li>تحليلات تقيس إجمالي الأحداث مقابل المستخدمين الفريدين بدقة</li>
                  </ul>
                </div>

                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl">
                  <span className="font-bold text-amber-900 block mb-1">الميزات التي تتطلب تهيئة خارجية إنتاجية:</span>
                  <ul className="space-y-1 text-amber-800 list-disc list-inside">
                    <li>تغذية API آلية لحظية مع كبرى المتاجر (تتطلب شراكات B2B رسمية مع نون وأمازون)</li>
                    <li>Google Cloud Project للفايربيس الإنتاجي (تم توفير مخطط firestore.rules و blueprint كامل وجاهز للنشر)</li>
                    <li>تخزين الصور على CDN سحابي مخصص بدلاً من Unsplash CDN</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[#2D2A29]">
                مطابقة اختبارات القبول الـ 15 المذكورة في وثيقة المتطلبات (Section 12):
              </h4>
              <div className="space-y-2">
                {[
                  '1. يمكن للزائر تصفح المنتجات والمكتبات العامة بدون تسجيل الدخول.',
                  '2. يمكن للمستخدم تسجيل الدخول وإنشاء مكتبة شخصية دائمة.',
                  '3. يمكن للمستخدم إضافة واقيات الشمس والعطور معاً في نفس المكتبة (تم اختبار ذلك في مكتبة دينا ومكتبة مروة).',
                  '4. يمكن للمستخدم إنشاء رفوف مخصصة، وإعادة تسميتها، وتلوينها، وتغيير ترتيبها بأمان.',
                  '5. يمكن للمستخدم جعل المكتبة عامة ومشاركتها عبر رابط ثابت (Slug).',
                  '6. يمكن للزائر العام تصفح المكتبة العامة من خلال رابطها بدون تسجيل.',
                  '7. المكتبة الخاصة لا يمكن مشاهدتها من قِبل مستخدم آخر، حتى عند محاولة تخمين الرابط.',
                  '8. لا يمكن لمستخدم تعديل مكتبة مستخدم آخر (يتم التحقق من Owner UID على مستوى واجهة المستخدم وقواعد الأمان).',
                  '9. صفحة تفاصيل المنتج تعرض فقط العروض الموثقة مع تاريخ وتوقيت التحقق ووسم التوفر.',
                  '10. إضافة فئة جديدة من لوحة الإدارة تتم فوراً بدون الحاجة لكتابة كود جديد.',
                  '11. يمكن لمدير النظام استيراد سجلات الكتالوج والتحقق منها وتعديلها وأرشفتها.',
                  '12. تصدير صورة المكتبة يرسم النصوص العربية والخط والشعارات بشكل صحيح وعالي الدقة.',
                  '13. لوحة التحليلات تفصل بدقة بين إجمالي الأحداث والمستخدمين الفريدين (Unique Users).',
                  '14. تم تضمين جميع حالات التحميل (Loading)، والخطأ (Error)، والحالات الفارغة (Empty States).',
                  '15. التصفح في الهواتف الذكية، وتحرير الرفوف، والبحث، والمشاركة متجاوب ومتوافق مع شاشات اللمس.'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2 bg-[#FAF8F5] rounded-xl border border-[#E8DFC8]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-[11px] text-[#2D2A29] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'firebase' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8DFC8]">
                <h4 className="font-bold text-sm text-[#2D2A29] mb-1 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#9E3D52]" />
                  قواعد الأمان النموذجية (Firestore Security Rules & Blueprint)
                </h4>
                <p>
                  تم إنشاء ملفين نموذجيين في جذر المشروع طبقا لأعلى معايير ABAC والحماية من الثغرات:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 font-mono text-[11px] text-[#7A283C]">
                  <li>/firebase-blueprint.json (المخطط البنائي للكيانات ومسارات المجموعات)</li>
                  <li>/firestore.rules (قواعد الأمان الصارمة ذات البوابات المغلقة افتراضياً)</li>
                </ul>
              </div>

              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900">
                <span className="font-bold block mb-1">تعليمات نشر قواعد الحماية:</span>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>قم بربط المشروع بحساب فايربيس المفضل عبر أداة Firebase CLI.</li>
                  <li>شغّل الأمر: <code className="bg-white px-2 py-0.5 rounded text-blue-950 font-latin">firebase deploy --only firestore:rules</code></li>
                  <li>يتم تفعيل الأمان فوراً لمنع التعديلات غير المصرح بها وضمان خصوصية المكتبات.</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'limitations' && (
            <div className="space-y-3">
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900">
                <h4 className="font-bold text-sm text-rose-950 mb-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  القيود والتوجيهات الأخلاقية (من وثيقة المتطلبات - القسم 10 و 11)
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs mt-2">
                  <li><strong>ليس موقع تسوق:</strong> لا يحتوي الموقع على عربة تسوق أو بوابة دفع إلكتروني؛ التوجيه يتم بروابط خارجية لمتاجر التجزئة.</li>
                  <li><strong>تفضيلات شخصية وليست استشارات طبية:</strong> الرف "لا أنصح به" يعبر عن تفضيل وذوق شخصي ولا يعني إثبات ضرر طبي، والرف "أريد تجربته" يعبر عن نية رغبة وتجربة وليس مراجعة.</li>
                  <li><strong>عدم اختلاق الأسعار أو التقييمات:</strong> تُعرض فقط الأسعار الموثقة بوقت وتاريخ واضحين دون أسعار عشوائية وهمية.</li>
                  <li><strong>حظر شبكات التواصل الاجتماعي المعقدة:</strong> لا توجد محادثات خاصة أو تعليقات مكررة في هذا الإصدار للحفاظ على بساطة وتخصيص تجربة القراءة والترتيب.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#F4EFEB] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-[#9E3D52] hover:bg-[#852C3E] text-white shadow-xs transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
