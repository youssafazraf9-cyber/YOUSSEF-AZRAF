/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Coffee, 
  Leaf, 
  Croissant, 
  CupSoda, 
  MapPin, 
  Clock, 
  Mail, 
  ArrowUp, 
  Instagram, 
  Facebook, 
  Phone, 
  MessageCircle,
  Menu as MenuIcon,
  X,
  Dices,
  ShieldAlert,
  CheckCircle2,
  Send,
  Heart,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { CATEGORIES, MENU_ITEMS, GALLERY_ITEMS, FEATURE_DETAILS } from './constants';
import { MenuItem, Category, CartItem } from './types';

// --- Components ---

const FeatureModal = ({ 
  featureId, 
  onClose 
}: { 
  featureId: string | null, 
  onClose: () => void 
}) => {
  if (!featureId) return null;
  const content = FEATURE_DETAILS[featureId];

  return (
    <AnimatePresence>
      {featureId && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4 md:p-10"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:w-full md:max-w-2xl md:max-h-[80vh] bg-dark-card border border-gold/20 rounded-[2rem] shadow-2xl z-[201] flex flex-col overflow-hidden"
            dir="rtl"
          >
            <div className="p-6 border-b border-gold/10 flex items-center justify-between sticky top-0 bg-dark-card/90 backdrop-blur-md">
              <h3 className="text-2xl font-arabic font-bold text-gold">التفاصيل</h3>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-gold transition-colors"
                id="close-feature-modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 font-arabic text-cream whitespace-pre-wrap leading-relaxed space-y-4">
              {content}
            </div>

            <div className="p-6 border-t border-gold/10 flex justify-end">
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-gold/10 border border-gold/30 text-gold rounded-full font-bold hover:bg-gold hover:text-black transition-all"
                id="close-feature-modal-btn"
              >
                إغلاق
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Cart = ({ 
  cart, 
  onRemove, 
  isOpen, 
  onClose, 
  onClearCart 
}: { 
  cart: CartItem[], 
  onRemove: (id: string) => void, 
  isOpen: boolean, 
  onClose: () => void,
  onClearCart: () => void
}) => {
  const [formData, setFormData] = useState({ name: '', table: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const total = cart.reduce((acc, item) => acc + item.priceNum, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setStatus('submitting');
    
    const itemsList = cart.map(item => `• ${item.nameAr} (${item.price})`).join('\n');
    const submissionData = {
      name: formData.name,
      table: formData.table,
      items: itemsList,
      totalPrice: `${total} درهم`,
      _subject: `طلب جديد: طاولة ${formData.table} - ${formData.name}`
    };

    try {
      const response = await fetch('https://formspree.io/f/mrejeayy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', table: '' });
        setTimeout(() => {
          onClearCart();
          setStatus('idle');
          onClose();
        }, 4000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error(error);
      alert('عذراً، حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.');
      setStatus('idle');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-dark-card border-l border-gold/20 shadow-2xl z-[101] flex flex-col"
            dir="rtl"
          >
            <div className="p-6 border-b border-gold/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Coffee className="text-gold" />
                <h3 className="text-xl font-arabic font-bold text-cream">سلة الطلبات</h3>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-gold transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-6"
                >
                  <CheckCircle2 size={64} className="text-gold mb-6 animate-bounce" />
                  <h4 className="text-2xl font-arabic font-bold text-gold mb-2">تم استلام طلبك!</h4>
                  <p className="text-cream opacity-60">شكراً لك، سيتم تحضير طلبك فوراً.</p>
                </motion.div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <span className="text-6xl mb-4">🥐</span>
                  <p className="font-arabic text-cream">السلة فارغة حالياً</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div 
                      key={item.cartId} 
                      layout
                      className="flex items-center justify-between gap-4 p-4 bg-white/5 rounded-xl border border-gold/5 group"
                    >
                      <div>
                        <h4 className="font-arabic text-cream font-medium">{item.nameAr}</h4>
                        <p className="text-xs text-gold font-display">{item.price}</p>
                      </div>
                      <button 
                        onClick={() => onRemove(item.cartId)}
                        className="text-red-500/50 hover:text-red-500 transition-colors p-2"
                      >
                        <X size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && status !== 'success' && (
              <div className="p-6 border-t border-gold/10 bg-black/40 backdrop-blur-md">
                <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gold uppercase tracking-widest font-bold mr-1 text-right block">الاسم الكامل</label>
                    <input 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-cream text-sm focus:border-gold outline-none transition-colors" 
                      placeholder="اكتب اسمك..." 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gold uppercase tracking-widest font-bold mr-1 text-right block">رقم الطاولة</label>
                    <input 
                      type="number" 
                      required 
                      value={formData.table}
                      onChange={(e) => setFormData({...formData, table: e.target.value})}
                      className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-3 text-cream text-sm focus:border-gold outline-none transition-colors" 
                      placeholder="رقم طاولتك..." 
                    />
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-white/5 mt-4">
                    <span className="text-text-muted font-arabic text-sm">المجموع النهائي</span>
                    <span className="text-xl font-display text-gold font-bold">{total} درهم</span>
                  </div>
                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-gradient-to-r from-gold to-brown-light text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-gold/20 disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <span className="animate-pulse">جاري الإرسال...</span>
                    ) : (
                      <>
                        <Coffee size={18} />
                        <span>تأكيد الطلب الآن</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ cartCount, onOpenCart }: { cartCount: number, onOpenCart: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'من نحن' },
    { href: '#menu', label: 'القائمة' },
    { href: '#games', label: 'الألعاب' },
    { href: '#gallery', label: 'المعرض' },
    { href: '#location', label: 'الموقع' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-[4%]",
      scrolled ? "bg-black/95 backdrop-blur-md border-b border-gold/10 py-3 shadow-2xl" : "bg-transparent"
    )} dir="rtl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#home" className="text-2xl font-display font-bold text-gold tracking-[0.2em] transform transition-transform hover:scale-105">
          ORIEN<sup className="text-xs">^</sup>S
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href}
              className="text-sm text-cream hover:text-gold transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 right-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-gold group"
          >
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all">
              <Coffee size={20} />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <a href="#contact" className="px-6 py-2 border border-gold text-gold rounded-full text-sm hover:bg-gold hover:text-black transition-all duration-300 shadow-gold/20 hover:shadow-gold/40 shadow-lg">
            تواصل معنا
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-gold"
          >
            <Coffee size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="text-gold p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 bg-black/98 flex flex-col items-center justify-center gap-8 z-[60] md:hidden"
          >
            <button className="absolute top-6 right-6 text-gold" onClick={() => setMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="text-2xl font-arabic text-cream hover:text-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contact" 
              className="px-8 py-3 w-64 bg-gold text-black rounded-full font-bold text-lg text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              تواصل معنا
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden" dir="rtl">
    {/* Background Overlay */}
    <div className="absolute inset-0 z-0 bg-dark-card">
      <img
        src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=1920"
        alt="Cafe Oriens Luxury Bar"
        className="w-full h-full object-cover opacity-50 mix-blend-luminosity brightness-[0.4] scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-dark-card/95 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,7,5,0.8)_100%)]" />
    </div>

    {/* Glow Orbs */}
    <div className="absolute top-1/4 right-[10%] w-96 h-96 bg-brown/20 blur-[120px] rounded-full animate-pulse" />
    <div className="absolute bottom-1/4 left-[10%] w-64 h-64 bg-gold/15 blur-[100px] rounded-full animate-pulse delay-700" />

    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center justify-center gap-4 mb-8"
      >
        <div className="h-px w-12 bg-gold/50" />
        <span className="text-xs md:text-sm tracking-[0.4em] text-gold uppercase font-arabic">مقهى فاخر — زايو، الناظور</span>
        <div className="h-px w-12 bg-gold/50" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-7xl md:text-9xl font-display font-extrabold text-cream-light mb-6 tracking-tighter drop-shadow-2xl"
      >
        ORIEN<span className="text-gold inline-block transform -translate-y-4 md:-translate-y-8 scale-75 md:scale-90 font-serif leading-none">^</span>S
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-xl md:text-2xl font-arabic text-gold/80 font-light mb-12 max-w-2xl mx-auto leading-relaxed"
      >
        أكثر من مجرد مقهى.. تجربة غنية بالنكهات واللحظات الراقية
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-6"
      >
        <a href="#menu" className="group flex items-center gap-3 bg-gradient-to-r from-gold to-brown-light px-8 py-4 rounded-full text-black font-bold shadow-xl shadow-gold/20 hover:shadow-gold/40 transition-all hover:-translate-y-1">
          <Coffee size={20} className="group-hover:rotate-12 transition-transform" />
          <span>عرض القائمة</span>
        </a>
        <a href="#about" className="flex items-center gap-3 border border-gold/40 px-8 py-4 rounded-full text-cream hover:border-gold hover:text-gold transition-all hover:-translate-y-1">
          <span>اكتشف المزيد</span>
        </a>
      </motion.div>
    </div>

    {/* Scroll Indicator */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
    >
      <div className="w-6 h-10 border-2 border-gold/30 rounded-full relative">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1 h-3 bg-gold rounded-full absolute top-2 left-1/2 -translate-x-1/2"
        />
      </div>
    </motion.div>
  </section>
);

const About = ({ onSelectFeature }: { onSelectFeature: (id: string) => void }) => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const featureInfo: Record<string, string> = {
    fast: "خدمة سريعة: نوفر لك قهوتك في وقت قياسي سواء في المنزل أو المكتب باستخدام أفضل طرق التحضير السريع.",
    coffee: "أجود أنواع البن: نختار بعناية أفضل حبوب القهوة من مصادر عالمية لضمان مذاق غني وفريد.",
    comfort: "بيئة مريحة: استمتع بجو هادئ ومريح مناسب للعمل أو الاسترخاء.",
    booking: "حجز مريح: يمكنك الحجز بسهولة عبر الهاتف أو التطبيق بدون تعقيدات.",
  };

  return (
    <section id="about" className="py-32 bg-black relative overflow-hidden" dir="rtl">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brown/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 blur-[130px] rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Intro Section: Image + Text */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-gold/10 group">
              <img 
                src="/src/assets/images/regenerated_image_1777773629846.jpg" 
                alt="ORIEN^S interior"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Overlay Info Card */}
              <div className="absolute bottom-10 right-10 left-10 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
                <p className="text-gold font-display text-sm tracking-widest uppercase mb-1">الوجهة المفضلة</p>
                <h4 className="text-xl font-arabic font-bold text-cream">في زايو منذ البداية</h4>
              </div>
            </div>
            
            {/* Floating Element */}
            <div className="absolute -bottom-6 -left-6 md:-left-10 w-32 h-32 md:w-40 md:h-40 bg-gold rounded-full flex flex-col items-center justify-center text-black shadow-2xl rotate-12 z-10">
              <span className="text-3xl md:text-4xl font-display font-bold">100%</span>
              <span className="text-[10px] md:text-xs font-arabic font-medium uppercase tracking-tighter text-center leading-tight">جودة<br/>مختارة</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold text-xs font-display tracking-widest uppercase mb-6">
              <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
              اكتشف عالمنا
            </div>
            
            <h2 className="text-4xl md:text-6xl font-arabic font-bold text-cream mb-8 leading-[1.1]">
              تجربة قهوة <br />
              <span className="text-gold italic font-serif">لا تؤرخ إلا باللحظة.</span>
            </h2>
            
            <p className="text-text-muted text-lg font-arabic font-light mb-10 leading-relaxed text-justify">
              في قلب زايو، يقف مقهى ORIEN^S شامخاً كوجهة راقية لعشاق القهوة وأجواء الراحة. نحن لا نصنع القهوة فحسب، بل نبني جسراً بين الذوق الرفيع واللحظات الاجتماعية الدافئة، لنقدم تجربة تحترم عقلية الزبون الباحث عن الجودة والهدوء في آن واحد.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { id: 'fast', icon: <Clock />, label: "خدمة سريعة" },
                { id: 'coffee', icon: <Coffee />, label: "أجود أنواع البن" },
                { id: 'comfort', icon: <CheckCircle2 />, label: "بيئة مريحة" },
                { id: 'booking', icon: <Phone />, label: "حجز مريح" },
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    setActiveFeature(item.id);
                    onSelectFeature(item.id);
                  }}
                  className={`flex items-center gap-3 p-4 border rounded-2xl transition-all text-right group ${
                    activeFeature === item.id 
                      ? 'bg-gold/20 border-gold shadow-[0_0_20px_rgba(197,157,95,0.2)]' 
                      : 'bg-white/5 border-gold/10 hover:border-gold/30 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    activeFeature === item.id ? 'bg-gold text-black scale-110' : 'bg-gold/10 text-gold group-hover:scale-110'
                  }`}>
                    {item.icon}
                  </div>
                  <span className={`text-sm font-arabic font-medium transition-colors ${
                    activeFeature === item.id ? 'text-gold' : 'text-cream'
                  }`}>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Info Box */}
            <AnimatePresence mode="wait">
              {activeFeature && (
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 bg-gold/5 border border-gold/20 rounded-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-1 h-full bg-gold" />
                  <p className="text-cream font-arabic leading-relaxed">
                    {featureInfo[activeFeature]}
                  </p>
                </motion.div>
              )}
              {!activeFeature && (
                <div className="p-6 bg-white/5 border border-dashed border-white/10 rounded-2xl text-center">
                  <p className="text-text-muted font-arabic text-sm italic">
                    اضغط على أي ميزة أعلاه لعرض المزيد من التفاصيل
                  </p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

const ItemModal = ({ 
  item, 
  onClose,
  onAddToCart
}: { 
  item: MenuItem | null, 
  onClose: () => void,
  onAddToCart: (item: MenuItem) => void
}) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:w-full md:max-w-lg bg-dark-card border border-gold/20 rounded-[2.5rem] shadow-2xl z-[201] overflow-hidden flex flex-col"
            dir="rtl"
          >
            <div className="relative h-64 overflow-hidden group">
              <img 
                src={item.image || "https://images.unsplash.com/photo-1509042239860-f550ce710b93"} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={item.nameAr}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
              <button 
                onClick={onClose}
                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-3xl font-arabic font-bold text-gold">{item.nameAr}</h3>
                  <span className="text-2xl font-display font-bold text-cream-light">{item.price}</span>
                </div>
                <p className="text-sm text-text-muted uppercase tracking-widest font-display">{item.name}</p>
              </div>

              <div className="p-6 bg-white/5 rounded-2xl border border-gold/10">
                <p className="text-cream font-arabic leading-relaxed text-lg">
                  {item.description || "استمتع بمذاقنا الخاص المحضر بعناية فائقة لضمان حصولك على تجربة استثنائية في كل رشفة."}
                </p>
              </div>

              <button 
                onClick={() => {
                  onAddToCart(item);
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-gold to-brown-light text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-gold/20"
              >
                <Coffee size={24} />
                <span className="text-lg">إضافة للسلة الآن</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Menu = ({ onAddToCart }: { onAddToCart: (item: MenuItem) => void }) => {
  const [activeTab, setActiveTab] = useState<MenuItem['category'] | 'all'>('coffee');
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchCategory = activeTab === 'all' || item.category === activeTab;
    const matchSearch = 
      item.nameAr.includes(search) || 
      item.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const icons: Record<string, typeof Coffee> = {
    Espresso: Coffee,
    Leaf: Leaf,
    Croissant: Croissant,
    CupSoda: CupSoda
  };

  return (
    <section id="menu" className="py-32 bg-black relative overflow-hidden" dir="rtl">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brown/5 blur-[120px] rounded-full translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs tracking-[0.6em] text-gold uppercase inline-block mb-4"
          >
            نكهات ORIEN^S
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-medium text-cream-light mb-6"
          >
            جرب <span className="text-gold italic">الاستثناء</span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        {/* Search & Actions Bar */}
        <div className="max-w-3xl mx-auto mb-16 space-y-8">
          <div className="relative group">
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gold/50 group-focus-within:text-gold transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="ابحث عن مشروبك أو مأكولاتك المفضلة..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-gold/20 rounded-[2rem] py-5 px-16 text-cream outline-none focus:border-gold/50 focus:bg-white/10 transition-all text-center font-arabic"
            />
            {search && (
              <button 
                onClick={() => setSearch("")}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted hover:text-gold transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { id: 'all', label: 'الكل', icon: 'Dices' },
              ...CATEGORIES
            ].map((cat) => {
              const IconComp = cat.id === 'all' ? Dices : icons[cat.icon];
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id as any)}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-500 font-arabic font-bold text-sm",
                    activeTab === cat.id 
                      ? "bg-gold text-black shadow-[0_0_25px_rgba(197,157,95,0.4)] scale-105" 
                      : "bg-white/5 border border-gold/10 text-cream/60 hover:border-gold/40 hover:text-gold"
                  )}
                >
                  <IconComp size={16} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Grid */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedItem(item)}
                  className="group relative bg-[#0d0d0d] border border-gold/10 rounded-[2.5rem] overflow-hidden cursor-pointer hover:border-gold/40 transition-all duration-300"
                >
                  {/* Item Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1509042239860-f550ce710b93"} 
                      alt={item.nameAr}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-80" />
                    
                    {/* Favorite Button */}
                    <button 
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className={cn(
                        "absolute top-5 left-5 w-10 h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-md border",
                        favorites.includes(item.id) 
                          ? "bg-red-500/80 border-red-500/50 text-white" 
                          : "bg-black/30 border-white/10 text-white hover:bg-gold/80 hover:text-black"
                      )}
                    >
                      <Heart size={18} fill={favorites.includes(item.id) ? "currentColor" : "none"} />
                    </button>

                    {/* Category Tag */}
                    <div className="absolute top-5 right-5 px-3 py-1 bg-gold text-black rounded-full text-[10px] uppercase font-bold tracking-widest shadow-lg">
                      {item.category}
                    </div>
                  </div>

                  {/* Item Content */}
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-arabic font-bold text-cream group-hover:text-gold transition-colors">{item.nameAr}</h3>
                      <span className="font-display text-gold text-lg font-bold">{item.price}</span>
                    </div>
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-6 font-display">{item.name}</p>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                      }}
                      className="w-full py-4 rounded-2xl bg-white/5 border border-gold/20 text-gold text-xs font-bold hover:bg-gold hover:text-black transition-all group/btn flex items-center justify-center gap-2"
                    >
                      <Coffee size={14} className="group-hover/btn:rotate-12 transition-transform" />
                      <span>إضافة للسلة</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <div className="text-6xl mb-6">☕</div>
              <h3 className="text-2xl font-arabic font-bold text-cream mb-2">لا توجد نتائج بحث</h3>
              <p className="text-text-muted">جرب البحث عن شيء آخر في قائمتنا المميزة</p>
            </motion.div>
          )}
        </AnimatePresence>

        <ItemModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onAddToCart={onAddToCart}
        />
      </div>
    </section>
  );
};

const Games = () => (
  <section id="games" className="py-24 bg-gradient-to-br from-dark-card to-black overflow-hidden" dir="rtl">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1">
        <span className="text-xs tracking-[0.4em] text-gold uppercase inline-block mb-4">وقت المتعة</span>
        <h2 className="text-4xl md:text-5xl font-display font-medium text-cream-light mb-8">ركن <span className="text-gold">الألعاب</span></h2>
        <p className="text-text-muted text-lg mb-12">
          عند ORIEN^S، لا تتوقف التجربة عند القهوة. استمتع بأجواء اجتماعية دافئة مع أصدقائك في ركن الألعاب الذي يجمعكم على الضحك والمنافسة.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-8 bg-white/5 border border-gold/10 rounded-2xl text-center group hover:bg-gold/10 transition-all">
            <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform">🎲</span>
            <h3 className="text-xl font-bold text-gold mb-2">بارتشي</h3>
            <p className="text-sm text-text-muted font-arabic">لعبة الطاولة الكلاسيكية</p>
          </div>
          <div className="p-8 bg-white/5 border border-gold/10 rounded-2xl text-center group hover:bg-gold/10 transition-all">
            <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform">🃏</span>
            <h3 className="text-xl font-bold text-gold mb-2">الكارطا</h3>
            <p className="text-sm text-text-muted font-arabic">لعبة ورق ممتعة للجميع</p>
          </div>
        </div>
      </div>
      <div className="flex-1 relative hidden lg:block">
        <div className="aspect-square bg-gradient-to-tr from-brown-deep to-brown rounded-[3rem] rotate-3 flex items-center justify-center p-12 shadow-2xl relative overflow-hidden">
           <Dices size={200} className="text-gold/20 absolute -bottom-10 -right-10 rotate-12" />
           <div className="relative text-9xl">🎲</div>
           <div className="absolute bottom-6 right-6 bg-dark-card/90 backdrop-blur-md p-6 rounded-2xl border border-gold/30 shadow-2xl -rotate-6">
              <p className="text-cream text-lg font-bold">أجواء اجتماعية راقية</p>
              <div className="flex gap-1 mt-2 text-gold">
                {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
              </div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const Rules = () => (
  <section className="py-12 px-6" dir="rtl">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto p-12 bg-gradient-to-r from-red-900/20 to-red-950/40 border-2 border-red-500/20 rounded-[2rem] text-center relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.1)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]" />
      <span className="bg-red-500/10 text-red-300 text-xs font-bold px-4 py-2 rounded-full mb-6 inline-block uppercase tracking-widest border border-red-500/20">📋 لوائح المقهى</span>
      <div className="flex justify-center mb-6">
        <ShieldAlert size={64} className="text-red-500" />
      </div>
      <h2 className="text-3xl md:text-4xl font-arabic font-bold text-red-100 mb-4">ممنوع التدخين والمخدرات داخل المقهى</h2>
      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-6" />
      <p className="text-red-200/60 max-w-lg mx-auto">نلتزم بتوفير بيئة صحية ونظيفة لجميع زوارنا الكرام. نشكركم على احترام هذه اللوائح للحفاظ على راحة الجميع.</p>
    </motion.div>
  </section>
);

const Gallery = () => (
  <section id="gallery" className="py-24 bg-dark" dir="rtl">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-xs tracking-[0.4em] text-gold uppercase inline-block mb-4">المعرض</span>
        <h2 className="text-4xl md:text-5xl font-display font-medium text-cream-light mb-4 text-shadow-goldHead">لحظات من <span className="text-gold">ORIEN^S</span></h2>
        <div className="w-20 h-0.5 bg-gold/30 mx-auto" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {GALLERY_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className={cn(
               "relative overflow-hidden group rounded-2xl cursor-pointer",
               item.wide && "md:col-span-2",
               item.tall && "row-span-2"
            )}
          >
            <img 
              src={item.image} 
              alt={item.labelAr}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
               <span className="text-gold text-xs font-bold uppercase tracking-widest mb-1">{item.label}</span>
               <h4 className="text-cream text-lg font-arabic font-bold">{item.labelAr}</h4>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Location = () => (
  <section id="location" className="py-24 bg-black" dir="rtl">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <span className="text-xs tracking-[0.4em] text-gold uppercase inline-block mb-4">الموقع</span>
        <h2 className="text-4xl md:text-5xl font-display font-medium text-cream-light mb-8">أين <span className="text-gold text-shadow-goldHead">نجدنا؟</span></h2>
        <div className="space-y-4">
          {[
            { icon: <MapPin />, label: "العنوان", val: "شارع سيدي عثمان قرب المحطة" },
            { icon: <MessageCircle />, label: "المدينة", val: "زايو، الناظور، المغرب" },
            { icon: <Mail />, label: "البريد", val: "azrafyoussaf11@gmail.com" },
            { icon: <Clock />, label: "أوقات العمل", val: "من الاثنين إلى الأحد" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-5 bg-white/5 border border-gold/10 rounded-xl hover:bg-gold/5 transition-colors">
              <span className="text-gold p-3 bg-gold/10 rounded-lg">{item.icon}</span>
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-widest">{item.label}</p>
                <p className="text-cream font-arabic font-medium">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative rounded-[2.5rem] overflow-hidden border border-gold/20 shadow-2xl h-[450px]">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12937.16!2d-2.748!3d34.927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7524a3b56a6841%3A0xa08b72e0f7b2e3c0!2sZaio%2C%20Morocco!5e0!3m2!1sar!2sma!4v1700000000000!5m2!1sar!2sma" 
          className="w-full h-full grayscale-[0.6] invert-[0.9] opacity-80"
          loading="lazy"
        />
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ email: '' });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'بريد إلكتروني غير صحيح' });
      return;
    }

    setStatus('submitting');
    
    try {
      const response = await fetch('https://formspree.io/f/mrejeayy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error(error);
      alert('عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.');
      setStatus('idle');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'email') setErrors({ email: '' });
  };

  return (
    <section id="contact" className="py-24 bg-dark-card" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <span className="text-xs tracking-[0.4em] text-gold uppercase inline-block mb-4">تواصل معنا</span>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-cream-light mb-8 leading-tight">نحن هنا <br/> <span className="text-gold">لأجل خدمتكم</span></h2>
          <p className="text-text-muted text-lg mb-12">هل لديك استفسار؟ أو تريد حجز طاولة؟ تواصل معنا وسنرد عليك في أقرب وقت ممكن.</p>
          
          <div className="flex gap-4">
            {[Instagram, Facebook, MessageCircle, Phone].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 bg-white/5 border border-gold/20 rounded-full flex items-center justify-center text-text-muted hover:text-gold hover:border-gold hover:bg-gold/10 hover:-translate-y-1 transition-all">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-gold/10 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-sm">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <CheckCircle2 size={80} className="text-gold mx-auto mb-6" />
              <h3 className="text-2xl font-arabic font-bold text-cream mb-2">تم الإرسال بنجاح!</h3>
              <p className="text-text-muted">سوف نتواصل معكم في أقرب وقت.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-8 text-gold underline font-bold"
              >
                إرسال رسالة أخرى
              </button>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-xs text-text-muted uppercase tracking-widest font-bold">الاسم الكامل</label>
                <input 
                  required 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-4 text-cream focus:border-gold outline-none transition-colors" 
                  placeholder="اكتب اسمك هنا..." 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-text-muted uppercase tracking-widest font-bold">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  required 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn(
                    "w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-4 text-cream focus:border-gold outline-none transition-colors",
                    errors.email && "border-red-500/50 focus:border-red-500"
                  )}
                  placeholder="example@email.com" 
                />
                {errors.email && <p className="text-[10px] text-red-500 font-bold">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-xs text-text-muted uppercase tracking-widest font-bold">الرسالة</label>
                <textarea 
                  required 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  className="w-full bg-white/5 border border-gold/20 rounded-xl px-4 py-4 text-cream focus:border-gold outline-none transition-colors resize-none" 
                  placeholder="اكتب رسالتك هنا..." 
                />
              </div>
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-gold to-brown-light text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {status === 'submitting' ? "جاري الإرسال..." : (
                  <>
                    <Send size={18} className="rotate-[-45deg]" />
                    <span>إرسال الرسالة</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const Footer = () => (
  <footer className="py-12 bg-black border-t border-gold/10" dir="rtl">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
      <a href="#home" className="text-4xl font-display font-bold text-gold tracking-[0.2em] mb-4">
        ORIEN<sup>^</sup>S
      </a>
      <p className="text-text-muted text-sm tracking-widest mb-12">زايو، الناظور، المغرب</p>
      
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {['من نحن', 'القائمة', 'الألعاب', 'المعرض', 'الموقع'].map((label, i) => (
          <a key={i} href={`#${['about', 'menu', 'games', 'gallery', 'location'][i]}`} className="text-sm text-text-muted hover:text-gold transition-colors">
            {label}
          </a>
        ))}
      </div>

      <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted/60">
        <p>© 2025 ORIEN^S — جميع الحقوق محفوظة</p>
        <div className="flex items-center gap-2">
          <span>صُنع بـ</span>
          <span className="text-red-500">❤️</span>
          <span>في زايو</span>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (item: MenuItem) => {
    const cartItem: CartItem = {
      ...item,
      cartId: Math.random().toString(36).substring(7),
    };
    setCart(prev => [...prev, cartItem]);
    setCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-black text-cream selection:bg-gold/30 selection:text-white overflow-x-hidden relative">
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl md:text-8xl font-display font-bold text-gold tracking-[0.2em] mb-8"
            >
              ORIEN<sup className="text-3xl md:text-4xl">^</sup>S
            </motion.div>
            <div className="flex gap-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={cn(
                  "w-1 bg-gradient-to-t from-gold to-transparent rounded-full animate-steam",
                  i === 0 ? "h-6" : i === 1 ? "h-10" : i === 2 ? "h-8" : i === 3 ? "h-12" : "h-7"
                )} style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Cart 
        cart={cart} 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        onRemove={removeFromCart}
        onClearCart={clearCart}
      />

      <Navbar cartCount={cart.length} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <About onSelectFeature={(id) => setSelectedFeature(id)} />
        <Menu onAddToCart={addToCart} />
        <Games />
        <Rules />
        <Gallery />
        <Location />
        <Contact />
      </main>
      <Footer />

      <FeatureModal 
        featureId={selectedFeature} 
        onClose={() => setSelectedFeature(null)} 
      />

      {/* Floating Action Tooltip/Button */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-6 z-40 flex flex-col gap-4 text-left"
      >
        <div className="relative group">
          <button 
            onClick={() => setCartOpen(true)}
            className="w-14 h-14 bg-gold/90 backdrop-blur-md rounded-full flex items-center justify-center text-black shadow-2xl hover:scale-110 active:scale-95 transition-all shadow-gold/20"
          >
            <div className="relative">
              <Coffee />
              {cart.length > 0 && (
                <span className="absolute -top-3 -right-3 w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-gold animate-pulse">
                  {cart.length}
                </span>
              )}
            </div>
          </button>
          <span className="absolute left-20 top-1/2 -translate-y-1/2 bg-dark-card border border-gold/30 text-cream text-[10px] py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">إتمام الطلب</span>
        </div>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-white/5 backdrop-blur-md border border-gold/20 rounded-full flex items-center justify-center text-gold shadow-2xl hover:bg-gold/10 active:scale-95 transition-all"
        >
          <ArrowUp />
        </button>
      </motion.div>
    </div>
  );
}
