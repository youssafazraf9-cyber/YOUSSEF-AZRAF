import { MenuItem, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'coffee', label: 'القهوة', icon: 'Espresso' },
  { id: 'tea', label: 'الشاي', icon: 'Leaf' },
  { id: 'food', label: 'الطعام', icon: 'Croissant' },
  { id: 'drinks', label: 'المشروبات', icon: 'CupSoda' },
];

export const MENU_ITEMS: MenuItem[] = [
  // Coffee
  { 
    id: 'c1', 
    name: 'Normal', 
    nameAr: 'نورمال', 
    price: '10 درهم', 
    priceNum: 10, 
    category: 'coffee',
    description: 'قهوة سوداء كلاسيكية مركزة وغنية بالنكهة.',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348'
  },
  { 
    id: 'c2', 
    name: 'Léger', 
    nameAr: 'ليجي', 
    price: '10 درهم', 
    priceNum: 10, 
    category: 'coffee',
    description: 'قهوة خفيفة تناسب الصباح الهادئ.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'
  },
  { 
    id: 'c3', 
    name: 'Italien', 
    nameAr: 'طاليان', 
    price: '12 درهم', 
    priceNum: 12, 
    category: 'coffee',
    description: 'إسبريسو على الطريقة الإيطالية الأصيلة.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04'
  },
  { 
    id: 'c4', 
    name: 'Mousse Blanche', 
    nameAr: 'موس بلونش', 
    price: '14 درهم', 
    priceNum: 14, 
    category: 'coffee',
    description: 'قهوة غنية برغوة الحليب الكثيفة والبيضاء.',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f'
  },
  { 
    id: 'c8', 
    name: 'Cappuccino', 
    nameAr: 'كبوتشينو', 
    price: '16 درهم', 
    priceNum: 16, 
    category: 'coffee',
    description: 'كابتشينو متوازن مع رغوة حليب ناعمة ورشة كاكاو.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'
  },
  { 
    id: 'c6', 
    name: 'Café Crème', 
    nameAr: 'كفي كرم', 
    price: '15 درهم', 
    priceNum: 15, 
    category: 'coffee',
    description: 'قهوة مع لمسة من الكريمة لمذاق أكثر نعومة.',
    image: 'https://images.unsplash.com/photo-1523942839745-7848d2a4b8c0'
  },
  // Tea
  { 
    id: 't1', 
    name: 'Mint Tea', 
    nameAr: 'اتاي نعناع', 
    price: '8 درهم', 
    priceNum: 8, 
    category: 'tea',
    description: 'أتاي مغربي منعش بالنعناع الطازج.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3'
  },
  { 
    id: 't2', 
    name: 'Chiba Tea', 
    nameAr: 'اتاي شيبا', 
    price: '8 درهم', 
    priceNum: 8, 
    category: 'tea',
    description: 'أتاي مغربي بالشيبة، الخيار الأمثل في الشتاء.',
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5'
  },
  // Food
  { 
    id: 'f1', 
    name: 'Full Breakfast', 
    nameAr: 'فطور صباحي متكامل', 
    price: '20 درهم', 
    priceNum: 20, 
    category: 'food',
    description: 'وجبة إفطار مغربية متكاملة تشمل الزيتون، الجبن، العسل، والخبز الطازج.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666'
  },
  // Drinks
  { 
    id: 'd1', 
    name: 'Coca Cola', 
    nameAr: 'كوكاكولا', 
    price: '8 درهم', 
    priceNum: 8, 
    category: 'drinks',
    description: 'مشروب غازي منعش ومبرد.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97'
  },
];

export const GALLERY_ITEMS = [
  { image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800', label: 'Perfect Espresso', labelAr: 'إسبريسو مثالي', wide: false, tall: true },
  { image: '/src/assets/images/regenerated_image_1777777346496.jpg', label: 'Moroccan Tea', labelAr: 'أتاي مغربي', wide: false, tall: false },
  { image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800', label: 'Morning Breakfast', labelAr: 'فطور الصباح', wide: false, tall: false },
  { image: '/src/assets/images/regenerated_image_1777773629846.jpg', label: 'Café Atmosphere', labelAr: 'أجواء المقهى', wide: false, tall: false },
  { image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800', label: 'Luxury Interior', labelAr: 'الديكور الفاخر', wide: true, tall: false },
  { image: '/src/assets/images/regenerated_image_1777777347287.jpg', label: 'Cold Drinks', labelAr: 'مشروبات باردة', wide: false, tall: false },
  { image: '/src/assets/images/regenerated_image_1777777347963.jpg', label: 'Games Corner', labelAr: 'ركن الألعاب', wide: false, tall: false },
  { image: '/src/assets/images/regenerated_image_1777777348588.jpg', label: 'Night Vibes', labelAr: 'أجواء ليلية', wide: false, tall: true },
];

export const FEATURE_DETAILS: Record<string, string> = {
  service: `خدمة سريعة:
للحصول على قهوة بسرعة:

1. قهوة سريعة:
- نسكافيه: ماء ساخن + ملعقة قهوة
- 3 في 1: جاهزة
- قهوة تركية سريعة
- قهوة عربية جاهزة

2. أدوات:
- Nespresso / Dolce Gusto
- French Press (4 دقائق)

3. وصفات:
- قهوة مثلجة: ماء بارد + قهوة + ثلج + حليب
- قهوة تركية بالرغوة`,
  coffee: `أجود أنواع البن:

- Arabica: الأفضل عالمياً (نكهة غنية)
- Robusta: قوية وكافيين أكثر

أفضل الأنواع:
- Panama Geisha
- Blue Mountain
- Yirgacheffe
- Kona

أنواع يومية:
- Colombian
- Brazilian
- Yemeni
- Kenyan

أغلى الأنواع:
- Kopi Luwak
- Black Ivory`,
  place: `بيئة مريحة:

1. الإضاءة:
- إضاءة دافئة
- ألوان هادئة
- نباتات

2. ركن القهوة:
- تنظيم الأدوات
- رائحة البن

3. الراحة:
- كرسي مريح
- موسيقى هادئة`,
  booking: `حجز مريح:

يمكنك الحجز بسهولة:
- عبر الهاتف
- عبر الموقع
- اختيار الوقت المناسب
- تأكيد الحجز بسرعة`,
};
