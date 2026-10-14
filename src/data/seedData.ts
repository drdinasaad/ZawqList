import {
  Category,
  Company,
  Brand,
  Product,
  ProductVariant,
  Retailer,
  PriceOffer,
  UserLibrary,
  LibraryItem,
  CustomShelf,
  DefaultShelfInfo,
  AnalyticsEvent,
  AppUser
} from '../types';

export const DEFAULT_SHELVES: DefaultShelfInfo[] = [
  {
    key: 'favorites',
    name_ar: 'المفضلة',
    name_en: 'Favorites',
    description_ar: 'المنتجات المميزة التي تكررين شراءها دائماً وتعتبر الأقرب لذوقك الشخصي.',
    color: '#9E3D52',
    badge_color: 'bg-rose-50 text-rose-800 border-rose-200',
    icon_name: 'Heart'
  },
  {
    key: 'recommended',
    name_ar: 'أنصح به',
    name_en: 'Recommended',
    description_ar: 'منتجات أعجبتك وتلبي الاحتياج وتوصين بتجربتها بناءً على تجربتك الشخصية.',
    color: '#059669',
    badge_color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    icon_name: 'ThumbsUp'
  },
  {
    key: 'not_recommended',
    name_ar: 'لا أنصح به',
    name_en: 'Not Recommended',
    description_ar: 'تفضيل شخصي: منتجات لم تناسب نوع بشرتك أو تفضيلك، ولا تعني ضرراً طبياً.',
    color: '#64748B',
    badge_color: 'bg-slate-100 text-slate-800 border-slate-300',
    icon_name: 'ThumbsDown'
  },
  {
    key: 'want_to_try',
    name_ar: 'أريد تجربته',
    name_en: 'Want to Try',
    description_ar: 'نية تجربة وقائمة أمنيات مستقبلية وليست تقييماً للمنتج.',
    color: '#7C3AED',
    badge_color: 'bg-violet-50 text-violet-800 border-violet-200',
    icon_name: 'Bookmark'
  }
];

export const INITIAL_USERS: AppUser[] = [
  {
    uid: 'user_dina',
    name: 'دينا سعد',
    email: 'dinasaad808@gmail.com',
    role: 'admin',
    bio: 'مهتمة بالعناية بالبشرة والروتين اليومي في المناخ المصري ومقارنة البدائل المحلية.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
  },
  {
    uid: 'user_nourhan',
    name: 'د. نورهان الشريف',
    email: 'nourhan.pharma@example.com',
    role: 'user',
    bio: 'صيدلانية، أشارك مفضلاتي الشخصية من واقيات الشمس والتركيبات الخفيفة في مصر.',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
  },
  {
    uid: 'user_marwa',
    name: 'مروة كمال',
    email: 'marwa.k@example.com',
    role: 'user',
    bio: 'عاشقة للعطور الشرقية والنيش، أجمع أفضل العطور ثباتاً في الصيف والشتاء.',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    category_id: 'sunscreens',
    name_ar: 'واقيات الشمس',
    name_en: 'Sunscreens',
    slug: 'sunscreens',
    parent_category_id: null,
    status: 'active',
    sort_order: 1,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-14T00:00:00Z',
    icon_name: 'Sun',
    description_ar: 'كريمات وجل وسوائل الحماية من أشعة الشمس UVA/UVB في المناخ المصري.'
  },
  {
    category_id: 'fragrances',
    name_ar: 'العطور',
    name_en: 'Fragrances',
    slug: 'fragrances',
    parent_category_id: null,
    status: 'active',
    sort_order: 2,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-14T00:00:00Z',
    icon_name: 'Sparkles',
    description_ar: 'عطور شرقية وغربية ومنعشة بتركيزات ومقاسات مختلفة.'
  },
  {
    category_id: 'skincare',
    name_ar: 'العناية بالبشرة',
    name_en: 'Skincare',
    slug: 'skincare',
    parent_category_id: null,
    status: 'planned',
    sort_order: 3,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-14T00:00:00Z',
    icon_name: 'Droplets',
    description_ar: 'مرطبات، وسيرومات، وغسولات للوجه (فئة جاهزة ومخططة للتفعيل).'
  },
  {
    category_id: 'haircare',
    name_ar: 'العناية بالشعر',
    name_en: 'Haircare',
    slug: 'haircare',
    parent_category_id: null,
    status: 'planned',
    sort_order: 4,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-14T00:00:00Z',
    icon_name: 'Scissors',
    description_ar: 'شامبو وبلسم وحمامات كريم للشعر الكيرلي والناعم.'
  },
  {
    category_id: 'makeup',
    name_ar: 'المكياج',
    name_en: 'Makeup',
    slug: 'makeup',
    parent_category_id: null,
    status: 'planned',
    sort_order: 5,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-14T00:00:00Z',
    icon_name: 'Palette',
    description_ar: 'مستحضرات التجميل وأحمر الشفاه وكريمات الأساس.'
  }
];

export const INITIAL_COMPANIES: Company[] = [
  {
    company_id: 'comp_parkville',
    name_ar: 'باركفيل للرعاية الصحية والصيدلانية',
    name_en: 'Parkville Pharmaceuticals Egypt',
    website: 'https://parkville-healthcare.com',
    country: 'EG',
    verification_status: 'verified',
    source_url: 'https://parkville-healthcare.com',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-14T00:00:00Z'
  },
  {
    company_id: 'comp_loreal',
    name_ar: 'مجموعة لوريال العالمية',
    name_en: "L'Oréal Group",
    website: 'https://www.loreal.com',
    country: 'FR',
    verification_status: 'verified',
    source_url: 'https://www.loreal.com',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-14T00:00:00Z'
  },
  {
    company_id: 'comp_eva',
    name_ar: 'إيفا لمستحضرات التجميل والصناعات الدوائية',
    name_en: 'Eva Cosmetics Egypt',
    website: 'https://eva-cosmetics.com',
    country: 'EG',
    verification_status: 'verified',
    source_url: 'https://eva-cosmetics.com',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-14T00:00:00Z'
  },
  {
    company_id: 'comp_kolagra',
    name_ar: 'كولاجرا إيجيبت',
    name_en: 'Kolagra Skin Solutions',
    website: 'https://kolagra.com',
    country: 'EG',
    verification_status: 'verified',
    source_url: 'https://kolagra.com',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-14T00:00:00Z'
  },
  {
    company_id: 'comp_infinity',
    name_ar: 'إنفينيتي فارما للرعاية الجلدية',
    name_en: 'Infinity Clinic Pharma',
    website: 'https://infinityclinicpharma.com',
    country: 'EG',
    verification_status: 'verified',
    source_url: 'https://infinityclinicpharma.com',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-14T00:00:00Z'
  },
  {
    company_id: 'comp_chanel',
    name_ar: 'شانيل إس إيه',
    name_en: 'Chanel S.A.',
    website: 'https://www.chanel.com',
    country: 'FR',
    verification_status: 'verified',
    source_url: 'https://www.chanel.com',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-14T00:00:00Z'
  },
  {
    company_id: 'comp_alrehab',
    name_ar: 'شركة عطور الرحاب',
    name_en: 'Al-Rehab Perfumes',
    website: 'https://alrehabperfumes.com',
    country: 'SA',
    verification_status: 'verified',
    source_url: 'https://alrehabperfumes.com',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-14T00:00:00Z'
  },
  {
    company_id: 'comp_lattafa',
    name_ar: 'لطافة للعطور والصناعات العطرية',
    name_en: 'Lattafa Perfumes Industries',
    website: 'https://lattafa.com',
    country: 'AE',
    verification_status: 'verified',
    source_url: 'https://lattafa.com',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-10-14T00:00:00Z'
  }
];

export const INITIAL_BRANDS: Brand[] = [
  {
    brand_id: 'brand_bobai',
    company_id: 'comp_parkville',
    name_ar: 'بوباي',
    name_en: 'Bobai',
    logo_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=120&auto=format&fit=crop&q=80',
    website: 'https://parkville-healthcare.com/brands/bobai',
    verification_status: 'verified',
    source_url: 'https://parkville-healthcare.com',
    status: 'active'
  },
  {
    brand_id: 'brand_la_roche_posay',
    company_id: 'comp_loreal',
    name_ar: 'لاروش بوزيه',
    name_en: 'La Roche-Posay',
    logo_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=120&auto=format&fit=crop&q=80',
    website: 'https://www.laroche-posay.me',
    verification_status: 'verified',
    source_url: 'https://www.laroche-posay.me',
    status: 'active'
  },
  {
    brand_id: 'brand_kolagra',
    company_id: 'comp_kolagra',
    name_ar: 'كولاجرا',
    name_en: 'Kolagra',
    logo_url: 'https://images.unsplash.com/photo-1608248597359-007f594580bf?w=120&auto=format&fit=crop&q=80',
    website: 'https://kolagra.com',
    verification_status: 'verified',
    source_url: 'https://kolagra.com',
    status: 'active'
  },
  {
    brand_id: 'brand_infinity',
    company_id: 'comp_infinity',
    name_ar: 'إنفينيتي كير',
    name_en: 'Infinity Care',
    logo_url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=120&auto=format&fit=crop&q=80',
    website: 'https://infinityclinicpharma.com',
    verification_status: 'verified',
    source_url: 'https://infinityclinicpharma.com',
    status: 'active'
  },
  {
    brand_id: 'brand_eva',
    company_id: 'comp_eva',
    name_ar: 'إيفا صن آند سي',
    name_en: 'Eva Sun & Sea',
    logo_url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=120&auto=format&fit=crop&q=80',
    website: 'https://eva-cosmetics.com',
    verification_status: 'verified',
    source_url: 'https://eva-cosmetics.com',
    status: 'active'
  },
  {
    brand_id: 'brand_chanel',
    company_id: 'comp_chanel',
    name_ar: 'شانيل',
    name_en: 'Chanel',
    logo_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=120&auto=format&fit=crop&q=80',
    website: 'https://www.chanel.com',
    verification_status: 'verified',
    source_url: 'https://www.chanel.com',
    status: 'active'
  },
  {
    brand_id: 'brand_alrehab',
    company_id: 'comp_alrehab',
    name_ar: 'الرحاب',
    name_en: 'Al-Rehab',
    logo_url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=120&auto=format&fit=crop&q=80',
    website: 'https://alrehabperfumes.com',
    verification_status: 'verified',
    source_url: 'https://alrehabperfumes.com',
    status: 'active'
  },
  {
    brand_id: 'brand_lattafa',
    company_id: 'comp_lattafa',
    name_ar: 'لطافة',
    name_en: 'Lattafa',
    logo_url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=120&auto=format&fit=crop&q=80',
    website: 'https://lattafa.com',
    verification_status: 'verified',
    source_url: 'https://lattafa.com',
    status: 'active'
  }
];

export const INITIAL_RETAILERS: Retailer[] = [
  {
    retailer_id: 'retailer_noon',
    name_ar: 'نون مصر',
    name_en: 'Noon Egypt',
    website: 'https://www.noon.com/egypt-ar/',
    country: 'EG',
    logo_url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&auto=format&fit=crop&q=80',
    status: 'active',
    data_source_method: 'manual_verified',
    last_checked_at: '2026-10-14T06:00:00Z'
  },
  {
    retailer_id: 'retailer_amazon',
    name_ar: 'أمازون مصر',
    name_en: 'Amazon Egypt',
    website: 'https://www.amazon.eg',
    country: 'EG',
    logo_url: 'https://images.unsplash.com/photo-1523474253246-64e46d526a61?w=100&auto=format&fit=crop&q=80',
    status: 'active',
    data_source_method: 'manual_verified',
    last_checked_at: '2026-10-14T06:00:00Z'
  },
  {
    retailer_id: 'retailer_dr_daoud',
    name_ar: 'صيدليات د. داوود',
    name_en: 'Dr. Daoud Pharmacies',
    website: 'https://drdaoud.com',
    country: 'EG',
    logo_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&auto=format&fit=crop&q=80',
    status: 'active',
    data_source_method: 'manual_verified',
    last_checked_at: '2026-10-14T05:30:00Z'
  },
  {
    retailer_id: 'retailer_el_ezaby',
    name_ar: 'صيدليات العزبي',
    name_en: 'El Ezaby Pharmacies',
    website: 'https://elezabypharmacy.com',
    country: 'EG',
    logo_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&auto=format&fit=crop&q=80',
    status: 'active',
    data_source_method: 'manual_verified',
    last_checked_at: '2026-10-14T05:00:00Z'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // Sunscreens
  {
    product_id: 'prod_bobai_hydrocare_gel',
    primary_category_id: 'sunscreens',
    brand_id: 'brand_bobai',
    name_ar: 'بوباي هيدروكير جل واقي شمس SPF 50+',
    name_en: 'Bobai Hydrocare Sunscreen Gel SPF 50+',
    slug: 'bobai-hydrocare-gel-spf50',
    description: 'جل خفيف سريع الامتصاص للبشرة الدهنية والمختلطة يوفر حماية واسعة المدى من أشعة الشمس UVA/UVB ومناسب للطقس المصري الحار دون ترك طبقة دهنية أو علامات بيضاء.',
    variant_name: '50ml',
    image_url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80',
    barcode: '6223005841021',
    official_product_url: 'https://parkville-healthcare.com/bobai',
    status: 'published',
    verification_status: 'verified',
    source_url: 'https://parkville-healthcare.com',
    last_verified_at: '2026-10-12T10:00:00Z',
    created_at: '2026-01-10T12:00:00Z',
    updated_at: '2026-10-14T06:00:00Z',
    attributes: {
      spf: 'SPF 50+',
      pa_rating: 'PA++++',
      formulation: 'جل مائي خفيف (Water Gel)',
      skin_type: 'بشرة دهنية ومختلطة ومعرضة للحبوب',
      water_resistance: 'مقاوم للماء والعرق لمدة 40 دقيقة',
      finish: 'مات مطفأ طبيعي بدون لمعان'
    }
  },
  {
    product_id: 'prod_lrp_anthelios_oil_control',
    primary_category_id: 'sunscreens',
    brand_id: 'brand_la_roche_posay',
    name_ar: 'لاروش بوزيه أنثيليوس يوفي ميون 400 جل كريم SPF 50+',
    name_en: 'La Roche-Posay Anthelios UVMune 400 Oil Control Gel-Cream',
    slug: 'laroche-anthelios-uvmune-400-oil-control',
    description: 'واقي شمس متطور يحتوي على مرشح Mexoryl 400 الحصري للحماية من الأشعة فوق البنفسجية فائقة الطول مع مادة Airlicium للتحكم الفائق باللمعان لـ 12 ساعة.',
    variant_name: '50ml',
    image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    barcode: '3337875810784',
    official_product_url: 'https://www.laroche-posay.me/anthelios',
    status: 'published',
    verification_status: 'verified',
    source_url: 'https://www.laroche-posay.me',
    last_verified_at: '2026-10-13T14:30:00Z',
    created_at: '2026-01-15T09:00:00Z',
    updated_at: '2026-10-14T06:00:00Z',
    attributes: {
      spf: 'SPF 50+',
      pa_rating: 'PA++++',
      formulation: 'جل كريم غير زيتي (Dry Touch Gel-Cream)',
      skin_type: 'بشرة دهنية وحساسة',
      water_resistance: 'مقاوم فائق للماء والرمال',
      finish: 'لمسة جافة مخملية (Dry Touch)'
    }
  },
  {
    product_id: 'prod_kolagra_sunscreen_gel',
    primary_category_id: 'sunscreens',
    brand_id: 'brand_kolagra',
    name_ar: 'كولاجرا جل حماية من الشمس للبشرة المعرضة للحبوب SPF 50+',
    name_en: 'Kolagra Sunscreen Gel for Acne-Prone Skin SPF 50+',
    slug: 'kolagra-sunscreen-gel-spf50',
    description: 'تركيبة مصرية مميزة خالية من الزيوت ومضادة للأكسدة مع النياسيناميد وفيتامين E لتهدئة الاحمرار ومنع انسداد المسام أثناء التعرض للشمس.',
    variant_name: '50ml',
    image_url: 'https://images.unsplash.com/photo-1608248597359-007f594580bf?w=800&auto=format&fit=crop&q=80',
    barcode: '6224009210452',
    official_product_url: 'https://kolagra.com/products/sunscreen-gel',
    status: 'published',
    verification_status: 'verified',
    source_url: 'https://kolagra.com',
    last_verified_at: '2026-10-10T11:00:00Z',
    created_at: '2026-02-01T10:00:00Z',
    updated_at: '2026-10-14T06:00:00Z',
    attributes: {
      spf: 'SPF 50+',
      pa_rating: 'PA+++',
      formulation: 'جل سريع الامتصاص (Fast Absorption Gel)',
      skin_type: 'بشرة دهنية ومعرضة للحبوب',
      water_resistance: 'مقاوم خفيف للعرق',
      finish: 'طبيعي غير لامع'
    }
  },
  {
    product_id: 'prod_infinity_hydroboost_gel',
    primary_category_id: 'sunscreens',
    brand_id: 'brand_infinity',
    name_ar: 'إنفينيتي كير هيدروبوست جل واقي شمس SPF 50+',
    name_en: 'Infinity Care Hydroboost Gel Sunscreen SPF 50+',
    slug: 'infinity-care-hydroboost-gel-spf50',
    description: 'واقي شمس غني بحمض الهيالورونيك ومضادات الأكسدة يجمع بين الترطيب العميق والحماية الفعالة مع قوام منعش خفيف لا يترك خطوطاً بيضاء.',
    variant_name: '60ml',
    image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    barcode: '6224008123011',
    official_product_url: 'https://infinityclinicpharma.com/hydroboost',
    status: 'published',
    verification_status: 'verified',
    source_url: 'https://infinityclinicpharma.com',
    last_verified_at: '2026-10-11T16:00:00Z',
    created_at: '2026-02-12T08:00:00Z',
    updated_at: '2026-10-14T06:00:00Z',
    attributes: {
      spf: 'SPF 50+',
      pa_rating: 'PA++++',
      formulation: 'جل مرطب هيدرو (Hydro Gel)',
      skin_type: 'بشرة مختلطة وعادية وجافة',
      water_resistance: 'مقاوم للماء والعرق',
      finish: 'ندي خفيف مرطب'
    }
  },
  {
    product_id: 'prod_eva_sun_sea_gold_cream',
    primary_category_id: 'sunscreens',
    brand_id: 'brand_eva',
    name_ar: 'إيفا صن آند سي جولد كريم واقي شمس SPF 50+',
    name_en: 'Eva Sun & Sea Gold Sunscreen Cream SPF 50+',
    slug: 'eva-sun-and-sea-gold-spf50',
    description: 'كريم وقاية من الشمس من إيفا معزز بفيتامين هـ وزيوت مرطبة لحماية البشرة من الجفاف وحروق الشمس، مثالي للبشرة العادية إلى الجافة وللرحلات الشاطئية.',
    variant_name: '200ml',
    image_url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80',
    barcode: '6221054009812',
    official_product_url: 'https://eva-cosmetics.com/sun-sea',
    status: 'published',
    verification_status: 'verified',
    source_url: 'https://eva-cosmetics.com',
    last_verified_at: '2026-10-09T13:00:00Z',
    created_at: '2026-02-20T08:00:00Z',
    updated_at: '2026-10-14T06:00:00Z',
    attributes: {
      spf: 'SPF 50+',
      pa_rating: 'PA+++',
      formulation: 'كريم غني مرطب (Moisturizing Cream)',
      skin_type: 'بشرة جافة إلى عادية وللجسم والوجه',
      water_resistance: 'مقاوم للماء بدرجة عالية',
      finish: 'مرطب مغذي'
    }
  },

  // Fragrances
  {
    product_id: 'prod_chanel_bleu_edp',
    primary_category_id: 'fragrances',
    brand_id: 'brand_chanel',
    name_ar: 'شانيل بلو دي شانيل ماء عطر 100 مل',
    name_en: 'Chanel Bleu de Chanel Eau de Parfum 100ml',
    slug: 'chanel-bleu-de-chanel-edp-100ml',
    description: 'عطر أروماتك خشبي أيقوني يجمع بين انتعاش الحمضيات وجاذبية خشب الأرز والعنبر مع لمسة من البخور وخشب الصندل الكاليدوني.',
    variant_name: '100ml EDP',
    image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80',
    barcode: '3145891073607',
    official_product_url: 'https://www.chanel.com/bleu-de-chanel',
    status: 'published',
    verification_status: 'verified',
    source_url: 'https://www.chanel.com',
    last_verified_at: '2026-10-13T10:00:00Z',
    created_at: '2026-01-05T10:00:00Z',
    updated_at: '2026-10-14T06:00:00Z',
    attributes: {
      concentration: 'Eau de Parfum (EDP)',
      volume: '100 مل',
      fragrance_family: 'خشبي أروماتك (Woody Aromatic)',
      scent_notes: {
        top: 'الجريب فروت، الليمون، النعناع، الفلفل الوردي',
        heart: 'الزنجبيل، جوزة الطيب، الياسمين، آيزو إي سوبر',
        base: 'البخور، نجيل الهند، أخشاب الأرز، خشب الصندل، الباتشولي، العنبر'
      },
      gender_positioning: 'رجالي راقي (Men)'
    }
  },
  {
    product_id: 'prod_alrehab_choco_musk',
    primary_category_id: 'fragrances',
    brand_id: 'brand_alrehab',
    name_ar: 'عطر شوكو مسك من الرحاب مركز 50 مل',
    name_en: 'Al-Rehab Choco Musk Concentrated Eau de Parfum 50ml',
    slug: 'al-rehab-choco-musk-50ml',
    description: 'عطر جورماند شهير ومحبوب جداً في مصر بنفحات الشوكولاتة الدافئة والفانيليا والمسك الأبيض وحلوى المارشميلو بثبات وفوحان رائع بسعر اقتصادي.',
    variant_name: '50ml EDP',
    image_url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80',
    barcode: '6281110034123',
    official_product_url: 'https://alrehabperfumes.com/choco-musk',
    status: 'published',
    verification_status: 'verified',
    source_url: 'https://alrehabperfumes.com',
    last_verified_at: '2026-10-10T12:00:00Z',
    created_at: '2026-01-12T10:00:00Z',
    updated_at: '2026-10-14T06:00:00Z',
    attributes: {
      concentration: 'Eau de Parfum (EDP)',
      volume: '50 مل',
      fragrance_family: 'جورماند شرقي (Oriental Gourmand)',
      scent_notes: {
        top: 'شوكولاتة الحليب، السكر الدافئ',
        heart: 'الفانيليا، القرفة الخفيفة',
        base: 'المسك الأبيض، العنبر، خشب الصندل'
      },
      gender_positioning: 'للجنسين (Unisex)'
    }
  },
  {
    product_id: 'prod_lattafa_khamrah',
    primary_category_id: 'fragrances',
    brand_id: 'brand_lattafa',
    name_ar: 'لطافة خمرة أو دو بارفان 100 مل',
    name_en: 'Lattafa Khamrah Eau de Parfum 100ml',
    slug: 'lattafa-khamrah-edp-100ml',
    description: 'عطر فاخر دافئ وحار يتميز بعبير القرفة وجوزة الطيب مع التمر وحبوب التونكا والفانيليا والبرالين، يقدم في زجاجة كريستالية فخمة تحاكي الأكواب الفاخرة.',
    variant_name: '100ml EDP',
    image_url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80',
    barcode: '6291107458129',
    official_product_url: 'https://lattafa.com/khamrah',
    status: 'published',
    verification_status: 'verified',
    source_url: 'https://lattafa.com',
    last_verified_at: '2026-10-11T18:00:00Z',
    created_at: '2026-02-05T12:00:00Z',
    updated_at: '2026-10-14T06:00:00Z',
    attributes: {
      concentration: 'Eau de Parfum (EDP)',
      volume: '100 مل',
      fragrance_family: 'شرقي حار وفاخر (Spicy Oriental)',
      scent_notes: {
        top: 'القرفة، جوزة الطيب، البرغموت',
        heart: 'التمر، البرالين، مسك الروم، ماهونيال',
        base: 'الفانيليا، حبوب التونكا، أخشاب العنبر، المر، الجاوي'
      },
      gender_positioning: 'للجنسين (Unisex)'
    }
  }
];

export const INITIAL_VARIANTS: ProductVariant[] = [
  {
    variant_id: 'var_bobai_50ml',
    product_id: 'prod_bobai_hydrocare_gel',
    variant_name: '50 مل',
    size_value: 50,
    size_unit: 'ml',
    barcode: '6223005841021',
    status: 'active'
  },
  {
    variant_id: 'var_lrp_50ml',
    product_id: 'prod_lrp_anthelios_oil_control',
    variant_name: '50 مل',
    size_value: 50,
    size_unit: 'ml',
    barcode: '3337875810784',
    status: 'active'
  },
  {
    variant_id: 'var_kolagra_50ml',
    product_id: 'prod_kolagra_sunscreen_gel',
    variant_name: '50 مل',
    size_value: 50,
    size_unit: 'ml',
    barcode: '6224009210452',
    status: 'active'
  },
  {
    variant_id: 'var_infinity_60ml',
    product_id: 'prod_infinity_hydroboost_gel',
    variant_name: '60 مل',
    size_value: 60,
    size_unit: 'ml',
    barcode: '6224008123011',
    status: 'active'
  },
  {
    variant_id: 'var_chanel_100ml',
    product_id: 'prod_chanel_bleu_edp',
    variant_name: '100 مل',
    size_value: 100,
    size_unit: 'ml',
    barcode: '3145891073607',
    status: 'active'
  },
  {
    variant_id: 'var_alrehab_50ml',
    product_id: 'prod_alrehab_choco_musk',
    variant_name: '50 مل',
    size_value: 50,
    size_unit: 'ml',
    barcode: '6281110034123',
    status: 'active'
  },
  {
    variant_id: 'var_lattafa_100ml',
    product_id: 'prod_lattafa_khamrah',
    variant_name: '100 مل',
    size_value: 100,
    size_unit: 'ml',
    barcode: '6291107458129',
    status: 'active'
  }
];

export const INITIAL_OFFERS: PriceOffer[] = [
  // Bobai Hydrocare Gel offers across retailers
  {
    offer_id: 'offer_bobai_amazon',
    product_id: 'prod_bobai_hydrocare_gel',
    variant_id: 'var_bobai_50ml',
    retailer_id: 'retailer_amazon',
    seller_name: 'Amazon Egypt Direct / باركفيل أوفيشيال',
    price_amount: 245.00,
    currency: 'EGP',
    product_url: 'https://www.amazon.eg/dp/B09XYZBOBAI',
    availability: 'in_stock',
    captured_at: '2026-10-14T05:30:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  },
  {
    offer_id: 'offer_bobai_noon',
    product_id: 'prod_bobai_hydrocare_gel',
    variant_id: 'var_bobai_50ml',
    retailer_id: 'retailer_noon',
    seller_name: 'Noon Express Egypt',
    price_amount: 238.50,
    currency: 'EGP',
    product_url: 'https://www.noon.com/egypt-ar/p-bobai-hydrocare-50ml',
    availability: 'in_stock',
    captured_at: '2026-10-14T06:15:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  },
  {
    offer_id: 'offer_bobai_daoud',
    product_id: 'prod_bobai_hydrocare_gel',
    variant_id: 'var_bobai_50ml',
    retailer_id: 'retailer_dr_daoud',
    seller_name: 'صيدليات د. داوود',
    price_amount: 260.00,
    currency: 'EGP',
    product_url: 'https://drdaoud.com/product/bobai-hydrocare-gel-50ml',
    availability: 'in_stock',
    captured_at: '2026-10-14T04:00:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  },

  // La Roche-Posay Anthelios offers
  {
    offer_id: 'offer_lrp_amazon',
    product_id: 'prod_lrp_anthelios_oil_control',
    variant_id: 'var_lrp_50ml',
    retailer_id: 'retailer_amazon',
    seller_name: 'Amazon Egypt Prime / متجر لاروش بوزيه',
    price_amount: 885.00,
    currency: 'EGP',
    product_url: 'https://www.amazon.eg/dp/B08XYZLRP400',
    availability: 'in_stock',
    captured_at: '2026-10-14T05:00:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  },
  {
    offer_id: 'offer_lrp_daoud',
    product_id: 'prod_lrp_anthelios_oil_control',
    variant_id: 'var_lrp_50ml',
    retailer_id: 'retailer_dr_daoud',
    seller_name: 'صيدليات د. داوود',
    price_amount: 890.00,
    currency: 'EGP',
    product_url: 'https://drdaoud.com/product/la-roche-posay-anthelios-oil-control-50ml',
    availability: 'in_stock',
    captured_at: '2026-10-14T03:30:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  },
  {
    offer_id: 'offer_lrp_ezaby',
    product_id: 'prod_lrp_anthelios_oil_control',
    variant_id: 'var_lrp_50ml',
    retailer_id: 'retailer_el_ezaby',
    seller_name: 'صيدليات العزبي',
    price_amount: 920.00,
    currency: 'EGP',
    product_url: 'https://elezabypharmacy.com/products/lrp-anthelios-400',
    availability: 'low_stock',
    captured_at: '2026-10-13T22:00:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  },

  // Kolagra Sunscreen Gel offers
  {
    offer_id: 'offer_kolagra_noon',
    product_id: 'prod_kolagra_sunscreen_gel',
    variant_id: 'var_kolagra_50ml',
    retailer_id: 'retailer_noon',
    seller_name: 'Kolagra Official Store Egypt',
    price_amount: 195.00,
    currency: 'EGP',
    product_url: 'https://www.noon.com/egypt-ar/p-kolagra-sunscreen-gel',
    availability: 'in_stock',
    captured_at: '2026-10-14T05:45:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  },
  {
    offer_id: 'offer_kolagra_amazon',
    product_id: 'prod_kolagra_sunscreen_gel',
    variant_id: 'var_kolagra_50ml',
    retailer_id: 'retailer_amazon',
    seller_name: 'Amazon.eg',
    price_amount: 210.00,
    currency: 'EGP',
    product_url: 'https://www.amazon.eg/dp/B0CKOLAGRA50',
    availability: 'in_stock',
    captured_at: '2026-10-14T04:20:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  },

  // Infinity Care Hydroboost offers
  {
    offer_id: 'offer_infinity_daoud',
    product_id: 'prod_infinity_hydroboost_gel',
    variant_id: 'var_infinity_60ml',
    retailer_id: 'retailer_dr_daoud',
    seller_name: 'صيدليات د. داوود',
    price_amount: 235.00,
    currency: 'EGP',
    product_url: 'https://drdaoud.com/product/infinity-care-hydroboost-60ml',
    availability: 'in_stock',
    captured_at: '2026-10-14T04:10:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  },
  {
    offer_id: 'offer_infinity_noon',
    product_id: 'prod_infinity_hydroboost_gel',
    variant_id: 'var_infinity_60ml',
    retailer_id: 'retailer_noon',
    seller_name: 'Noon Express',
    price_amount: 220.00,
    currency: 'EGP',
    product_url: 'https://www.noon.com/egypt-ar/p-infinity-care-hydroboost',
    availability: 'in_stock',
    captured_at: '2026-10-14T06:00:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  },

  // Chanel Bleu de Chanel offers
  {
    offer_id: 'offer_chanel_noon',
    product_id: 'prod_chanel_bleu_edp',
    variant_id: 'var_chanel_100ml',
    retailer_id: 'retailer_noon',
    seller_name: 'Noon VIP Beauty / متجر معتمد',
    price_amount: 6750.00,
    currency: 'EGP',
    product_url: 'https://www.noon.com/egypt-ar/p-chanel-bleu-de-chanel-edp-100ml',
    availability: 'in_stock',
    captured_at: '2026-10-14T05:00:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  },
  {
    offer_id: 'offer_chanel_amazon',
    product_id: 'prod_chanel_bleu_edp',
    variant_id: 'var_chanel_100ml',
    retailer_id: 'retailer_amazon',
    seller_name: 'Amazon Egypt Luxury Perfumes',
    price_amount: 6990.00,
    currency: 'EGP',
    product_url: 'https://www.amazon.eg/dp/B0CHANELBLEU',
    availability: 'in_stock',
    captured_at: '2026-10-13T19:00:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  },

  // Al-Rehab Choco Musk offers
  {
    offer_id: 'offer_alrehab_amazon',
    product_id: 'prod_alrehab_choco_musk',
    variant_id: 'var_alrehab_50ml',
    retailer_id: 'retailer_amazon',
    seller_name: 'Amazon Egypt Direct',
    price_amount: 145.00,
    currency: 'EGP',
    product_url: 'https://www.amazon.eg/dp/B0CHOCOMUSK50',
    availability: 'in_stock',
    captured_at: '2026-10-14T06:10:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  },
  {
    offer_id: 'offer_alrehab_noon',
    product_id: 'prod_alrehab_choco_musk',
    variant_id: 'var_alrehab_50ml',
    retailer_id: 'retailer_noon',
    seller_name: 'عطور الرحاب مصر الرسمية',
    price_amount: 139.00,
    currency: 'EGP',
    product_url: 'https://www.noon.com/egypt-ar/p-alrehab-choco-musk-50ml',
    availability: 'in_stock',
    captured_at: '2026-10-14T05:20:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  },

  // Lattafa Khamrah offers
  {
    offer_id: 'offer_lattafa_noon',
    product_id: 'prod_lattafa_khamrah',
    variant_id: 'var_lattafa_100ml',
    retailer_id: 'retailer_noon',
    seller_name: 'Noon Express Perfumes',
    price_amount: 1550.00,
    currency: 'EGP',
    product_url: 'https://www.noon.com/egypt-ar/p-lattafa-khamrah-edp-100ml',
    availability: 'in_stock',
    captured_at: '2026-10-14T04:45:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  },
  {
    offer_id: 'offer_lattafa_amazon',
    product_id: 'prod_lattafa_khamrah',
    variant_id: 'var_lattafa_100ml',
    retailer_id: 'retailer_amazon',
    seller_name: 'Amazon Egypt',
    price_amount: 1590.00,
    currency: 'EGP',
    product_url: 'https://www.amazon.eg/dp/B0LATTAFAKHAM',
    availability: 'in_stock',
    captured_at: '2026-10-14T03:00:00Z',
    source_type: 'manual_admin_entry',
    verification_status: 'verified'
  }
];

export const INITIAL_USER_LIBRARIES: UserLibrary[] = [
  {
    library_id: 'lib_dina_summer',
    owner_uid: 'user_dina',
    owner_name: 'دينا سعد',
    title: 'مفضلاتي لصيف الساحل والإسكندرية ☀️',
    description: 'مجموعتي الشخصية لحماية البشرة من الشمس وعطور الصيف المنعشة والخفيفة التي أستخدمها يومياً وأوصي بها صديقاتي.',
    slug: 'dina-summer-essentials',
    visibility: 'public',
    cover_image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    created_at: '2026-06-01T10:00:00Z',
    updated_at: '2026-10-14T06:00:00Z'
  },
  {
    library_id: 'lib_nourhan_acne',
    owner_uid: 'user_nourhan',
    owner_name: 'د. نورهان الشريف',
    title: 'أفضل واقيات الشمس للبشرة المعرضة للحبوب في مصر',
    description: 'خيارات شخصية مجربة للبشرة المعرضة للحبوب والمختلطة مع الأخذ بالاعتبار درجات الحرارة والرطوبة العالية في مصر.',
    slug: 'nourhan-acne-sunscreen',
    visibility: 'public',
    cover_image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    created_at: '2026-07-15T12:00:00Z',
    updated_at: '2026-10-12T14:00:00Z'
  },
  {
    library_id: 'lib_marwa_fragrances',
    owner_uid: 'user_marwa',
    owner_name: 'مروة كمال',
    title: 'عطور الصباح والمساء الراقية',
    description: 'توليفة من العطور الشرقية المميزة والخيارات اليومية المناسبة للعمل والخروجات المسائية مع التركيز على الثبات والفوحان.',
    slug: 'marwa-signature-scents',
    visibility: 'public',
    cover_image_url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80',
    created_at: '2026-08-01T09:00:00Z',
    updated_at: '2026-10-10T16:00:00Z'
  }
];

export const INITIAL_CUSTOM_SHELVES: CustomShelf[] = [
  {
    shelf_id: 'cs_dina_beach',
    library_id: 'lib_dina_summer',
    name: 'لحقيبة الشاطئ والمسبح 🏖️',
    color: '#D97706',
    sort_order: 1,
    created_at: '2026-06-05T10:00:00Z',
    updated_at: '2026-06-05T10:00:00Z'
  },
  {
    shelf_id: 'cs_dina_work',
    library_id: 'lib_dina_summer',
    name: 'لأيام العمل والمشاوير الصباحية 💼',
    color: '#2563EB',
    sort_order: 2,
    created_at: '2026-06-05T10:00:00Z',
    updated_at: '2026-06-05T10:00:00Z'
  }
];

export const INITIAL_LIBRARY_ITEMS: LibraryItem[] = [
  // In Dina's Library: Sunscreens and Fragrances coexist (requirement #3 & #12)
  {
    item_id: 'item_dina_1',
    library_id: 'lib_dina_summer',
    product_id: 'prod_bobai_hydrocare_gel',
    shelf_id: 'favorites',
    personal_note: 'المفضل لدي للاستخدام اليومي قبل النزول للعمل، تمتصه البشرة بثوانٍ ولا يترك أي لمعان دهني.',
    sort_order: 1,
    created_at: '2026-06-02T10:00:00Z',
    updated_at: '2026-06-02T10:00:00Z'
  },
  {
    item_id: 'item_dina_2',
    library_id: 'lib_dina_summer',
    product_id: 'prod_lrp_anthelios_oil_control',
    shelf_id: 'cs_dina_beach',
    personal_note: 'حمايته لا تقارن في شمس الساحل الشمالي القوية، أجدده كل ساعتين ومقاومته للماء ممتازة.',
    sort_order: 2,
    created_at: '2026-06-06T10:00:00Z',
    updated_at: '2026-06-06T10:00:00Z'
  },
  {
    item_id: 'item_dina_3',
    library_id: 'lib_dina_summer',
    product_id: 'prod_alrehab_choco_musk',
    shelf_id: 'recommended',
    personal_note: 'عطر دافئ ومريح جداً، ممتاز للدمج (Layering) مع عطور الفانيليا والمسك ورائحته محبوبة.',
    sort_order: 3,
    created_at: '2026-06-10T12:00:00Z',
    updated_at: '2026-06-10T12:00:00Z'
  },
  {
    item_id: 'item_dina_4',
    library_id: 'lib_dina_summer',
    product_id: 'prod_lattafa_khamrah',
    shelf_id: 'want_to_try',
    personal_note: 'سمعت عنه مدحاً كبيراً لثباته في سهرات الصيف والمناسبات وأنوي تجربته قريباً.',
    sort_order: 4,
    created_at: '2026-07-01T15:00:00Z',
    updated_at: '2026-07-01T15:00:00Z'
  },

  // Nourhan's items
  {
    item_id: 'item_nourhan_1',
    library_id: 'lib_nourhan_acne',
    product_id: 'prod_kolagra_sunscreen_gel',
    shelf_id: 'favorites',
    personal_note: 'خيار اقتصادي ممتاز للبشرة المعرضة للحبوب مع النياسيناميد، خفيف وغير كوميدوجينيك.',
    sort_order: 1,
    created_at: '2026-07-16T12:00:00Z',
    updated_at: '2026-07-16T12:00:00Z'
  },
  {
    item_id: 'item_nourhan_2',
    library_id: 'lib_nourhan_acne',
    product_id: 'prod_bobai_hydrocare_gel',
    shelf_id: 'recommended',
    personal_note: 'أنصح به دائماً للمرضى والعملاء الذين يبحثون عن بديل محلي فعال بسعر مناسب.',
    sort_order: 2,
    created_at: '2026-07-17T14:00:00Z',
    updated_at: '2026-07-17T14:00:00Z'
  },
  {
    item_id: 'item_nourhan_3',
    library_id: 'lib_nourhan_acne',
    product_id: 'prod_eva_sun_sea_gold_cream',
    shelf_id: 'not_recommended',
    personal_note: 'تفضيل شخصي: تركيبته كريمية غنية جداً على بشرتي الدهنية وتسببت لي بلمعان، قد تناسب البشرة الجافة أكثر.',
    sort_order: 3,
    created_at: '2026-07-18T16:00:00Z',
    updated_at: '2026-07-18T16:00:00Z'
  },

  // Marwa's items
  {
    item_id: 'item_marwa_1',
    library_id: 'lib_marwa_fragrances',
    product_id: 'prod_chanel_bleu_edp',
    shelf_id: 'favorites',
    personal_note: 'عطر كلاسيكي فخم يناسب كل فصول السنة، فوحانه هادئ وأنيق جداً.',
    sort_order: 1,
    created_at: '2026-08-02T10:00:00Z',
    updated_at: '2026-08-02T10:00:00Z'
  },
  {
    item_id: 'item_marwa_2',
    library_id: 'lib_marwa_fragrances',
    product_id: 'prod_lattafa_khamrah',
    shelf_id: 'recommended',
    personal_note: 'رائحة القرفة والتمر الملكية تشبه أفخر العطور النيش بتكلفة معقولة جداً.',
    sort_order: 2,
    created_at: '2026-08-03T11:00:00Z',
    updated_at: '2026-08-03T11:00:00Z'
  }
];

export const INITIAL_ANALYTICS_EVENTS: AnalyticsEvent[] = [
  {
    event_id: 'evt_1',
    timestamp: '2026-10-14T06:12:00Z',
    event_type: 'product_view',
    user_id: 'user_dina',
    product_id: 'prod_bobai_hydrocare_gel'
  },
  {
    event_id: 'evt_2',
    timestamp: '2026-10-14T06:15:00Z',
    event_type: 'price_offer_viewed',
    user_id: 'user_dina',
    product_id: 'prod_bobai_hydrocare_gel',
    retailer_id: 'retailer_noon'
  },
  {
    event_id: 'evt_3',
    timestamp: '2026-10-14T06:20:00Z',
    event_type: 'product_added_to_library',
    user_id: 'user_dina',
    product_id: 'prod_bobai_hydrocare_gel',
    library_id: 'lib_dina_summer',
    shelf_id: 'favorites'
  },
  {
    event_id: 'evt_4',
    timestamp: '2026-10-14T06:22:00Z',
    event_type: 'product_view',
    user_id: 'user_nourhan',
    product_id: 'prod_lrp_anthelios_oil_control'
  },
  {
    event_id: 'evt_5',
    timestamp: '2026-10-14T06:25:00Z',
    event_type: 'product_added_to_library',
    user_id: 'user_nourhan',
    product_id: 'prod_kolagra_sunscreen_gel',
    library_id: 'lib_nourhan_acne',
    shelf_id: 'favorites'
  },
  {
    event_id: 'evt_6',
    timestamp: '2026-10-14T06:30:00Z',
    event_type: 'search_submitted',
    user_id: 'guest_101',
    search_query: 'واقي شمس للبشرة الدهنية',
    result_count: 4
  },
  {
    event_id: 'evt_7',
    timestamp: '2026-10-14T06:35:00Z',
    event_type: 'search_submitted',
    user_id: 'guest_102',
    search_query: 'عطور مسك وفانيليا',
    result_count: 2
  },
  {
    event_id: 'evt_8',
    timestamp: '2026-10-14T06:38:00Z',
    event_type: 'search_submitted',
    user_id: 'guest_103',
    search_query: 'سيروم ريتينول مصري',
    result_count: 0
  },
  {
    event_id: 'evt_9',
    timestamp: '2026-10-14T06:40:00Z',
    event_type: 'library_shared',
    user_id: 'user_dina',
    library_id: 'lib_dina_summer'
  }
];
