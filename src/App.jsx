import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Moon, Brain, Heart, PlaneTakeoff, Map, 
  Camera, Play, Phone, Mail, MessageCircle, 
  MapPin, Globe, Award, Star, Compass, UserCircle2,
  Flame, Activity, Building2, Key, TrendingUp, Diamond, Wallet, Crown,
  QrCode, Share2, Copy, X, Check, MousePointerClick, RefreshCw, Droplets,
  UserPlus, Download
} from 'lucide-react';

// Кастомная иконка Instagram (т.к. из lucide-react бренды удалили)
const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

// ==========================================
// ⚙️ НАСТРОЙКИ КОНТЕНТА (МЕНЯТЬ ТЕКСТ, ФОТО И ССЫЛКИ ТОЛЬКО ЗДЕСЬ!)
// ==========================================
const CONTENT = {
  esoteric: {
    bgImage: '/bg-esoteric.jpg', // Название файла в папке public
    avatar: '/avatar-esoteric.jpg', // Индивидуальное фото для эзотерика
    badge: 'Таро & Астрология',
    name1: 'Алена',              // Первая строка имени
    name2: 'Светлая',                // Вторая строка имени
    role: 'Элитный Астролог',
    status: 'Запись открыта',
    username: '@elena_myth',
    subUsername: 'Премиум Доступ',
    quote1: 'Открой двери в свое',
    quote2: 'истинное предназначение',
    tgLink: 'https://t.me/твой_юзернейм',
    instLink: 'https://instagram.com/твой_юзернейм',
    actionText: 'Личный Расклад',
    actionLink: 'https://t.me/твой_юзернейм?text=Привет!%20Хочу%20расклад'
  },
  psychologist: {
    bgImage: '/bg-psychologist.jpg',
    avatar: '/avatar-psychologist.jpg', // Индивидуальное фото для психолога
    badge: 'Терапия',
    name1: 'Алена',
    name2: 'СВЕТЛАЯ',
    role: 'Клинический Психолог',
    status: 'Онлайн',
    username: '@psy_svetplaya',
    subUsername: 'Бережный подход',
    stat1Title: 'Практика',
    stat1Value: '12 лет',
    stat2Title: 'Прием',
    stat2Value: 'МСК / Web',
    quote1: 'Здесь безопасно быть собой.',
    quote2: 'Начнем путь к гармонии вместе.',
    actionText: 'Записаться на сессию',
    actionLink: 'https://t.me/твой_юзернейм?text=Здравствуйте!%20Хочу%20на%20сессию'
  },
  travel: {
    bgImage: '/bg-travel.jpg',
    avatar: '/avatar-travel.jpg', // Индивидуальное фото для турагента
    badge: 'VIP Tours',
    name1: 'МАКСИМ',
    name2: 'ВОЯЖ',
    role: 'Премиум Отдых',
    statusBack: 'Первый Класс',
    agentName: 'Max Voyage',
    destination: 'Весь Мир',
    tgText: 'Telegram Консьерж',
    tgLink: 'https://t.me/твой_юзернейм',
    tourText: 'Подобрать тур',
    tourLink: 'https://t.me/твой_юзернейм',
    marquee: ['✈️ СЕЙШЕЛЫ', '⭐ МАЛЬДИВЫ', '🌴 БАЛИ', '🍍 ТАЙЛАНД', '🧿 ТУРЦИЯ'] // Текст бегущей строки
  },
  blogger: {
    bgImage: '/bg-blogger.jpg',
    avatar: '/avatar-blogger.jpg', // Индивидуальное фото для блогера
    badge: 'В эфире',
    name1: 'ALEX',
    name2: 'NEO',
    role: 'Лайфстайл Креатор',
    username: '@alexneo_real',
    subUsername: 'Контент Креатор',
    stat1Title: 'YouTube',
    stat1Value: '850K',
    stat2Title: 'Instagram',
    stat2Value: '1.2M',
    quote1: 'Открыт для сотрудничества',
    quote2: 'и медиа',
    actionText: 'Написать',
    actionLink: 'https://t.me/твой_юзернейм?text=Привет!%20По%20поводу%20рекламы'
  },
  fitness: {
    bgImage: '/bg-fitness.jpg',
    avatar: '/avatar-fitness.jpg', // Индивидуальное фото для тренера
    badge: 'Трансформация',
    name1: 'Алена',
    name2: 'Светлая',
    role: 'Элитный Тренер',
    username: '@alena_sila',
    subUsername: 'Без Отговорок',
    stat1Title: 'Лет Опыта',
    stat1Value: '8',
    stat2Title: 'Трансформаций',
    stat2Value: '500+',
    link1Text: 'Программа Питания',
    link1Url: 'https://t.me/твой_юзернейм',
    link2Text: 'Онлайн Ведение',
    link2Url: 'https://t.me/твой_юзернейм',
    actionText: 'Начать работу',
    actionLink: 'https://t.me/твой_юзернейм?text=Хочу%20тело%20мечты!'
  },
  broker: {
    bgImage: '/bg-broker.jpg',
    bgBack: '/bg-broker.jpg',
    avatar: '/avatar-broker.jpg', // Индивидуальное фото для брокера
    badge: 'Приватные ключи',
    name1: 'АРТУР',
    name2: 'ГРАНД',
    role: 'Элитная Недвижимость',
    username: '@artur_grand',
    subUsername: 'Премиум Брокер',
    stat1Title: 'Вилл в базе',
    stat1Value: '120+',
    stat2Title: 'Объем сделок',
    stat2Value: '$50M+',
    quote: 'Доступ к закрытым объектам off-market',
    actionText: 'Связаться в Telegram',
    actionLink: 'https://t.me/твой_юзернейм'
  },
  starter: {
    bgImage: '/bg-starter.jpg', // Загрузи сюда текстуру черного шелка или абстрактного золота
    badge: 'Digital Визитка',
    title1: 'НОВЫЙ УРОВЕНЬ',
    title2: 'ТВОЕГО БРЕНДА',
    role: 'WOW-эффект обеспечен',
    instruction1: 'Выбери шаблон в меню выше',
    instruction2: 'Нажми, чтобы перевернуть',
    backTitle: 'Что ты получаешь?',
    benefit1Title: 'WOW-Эффект',
    benefit1Text: 'Запоминаешься сразу',
    benefit2Title: 'Разовая оплата',
    benefit2Text: 'Без абонентской платы',
    benefit3Title: 'Личный домен',
    benefit3Text: 'имя.appsea.ru',
    benefit4Title: 'Без VPN',
    benefit4Text: 'Работает всегда',
    benefit5Title: 'Удобство',
    benefit5Text: 'Контакты в 1 клик',
    benefit6Title: 'Статус',
    benefit6Text: 'Премиальный имидж',
    actionText: 'Заказать визитку',
    actionLink: 'https://t.me/elenlime?text=Привет!%20Хочу%20такую%20же%20визитку!'
  },
  nail: {
    bgImage: '/bg-nail.jpg',
    avatar: '/avatar-nail.jpg',
    badge: 'Nail Artist',
    name1: 'АЛИНА',
    name2: 'РОУЗ',
    role: 'Premium Aesthetics',
    status: 'Есть окошки',
    username: '@alina_nails',
    subUsername: 'Идеальные блики',
    service1: 'Аппаратный маникюр',
    service2: 'Наращивание',
    service3: 'Smart-педикюр',
    actionText: 'Записаться на ноготочки',
    actionLink: 'https://t.me/твой_юзернейм'
  },
  realtor: {
    bgImage: '/bg-realtor.jpg',
    avatar: '/avatar-realtor.jpg',
    badge: 'Cascade Realty',
    name1: 'ТИГРАН',
    name2: 'САРОЯН',
    role: 'Elite Real Estate',
    username: '@saroyan_estate',
    subUsername: 'Prime Properties',
    stat1Title: 'Объекты в базе',
    stat1Value: '80+',
    stat2Title: 'Объем сделок',
    stat2Value: 'от $1M',
    quote: 'Ваш статус достоин лучшего адреса.',
    actionText: 'Закрытый каталог',
    actionLink: 'https://t.me/твой_юзернейм'
  },
};

// --- Глобальные стили для сложных анимаций (вставляем прямо в компонент) ---
const globalStyles = `
  :root {
    --card-h: calc(min(22rem, 50vh) * 1.6);
  }
  @media (min-width: 640px) {
    :root {
      --card-h: calc(min(22rem, 50vh) * 1.5);
    }
  }
  body {
    background-color: #0a0a0a;
    overscroll-behavior: none;
    overflow-x: hidden;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  @keyframes float {
    0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
    50% { transform: translateY(-15px) rotateX(2deg) rotateY(-2deg); }
    100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .glass-panel {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .card-preserve-3d {
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
  }
  .card-backface-hidden {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }
  .bg-noise {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.05;
    mix-blend-mode: overlay;
  }
  @keyframes scroll-left {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .animate-scroll {
    animation: scroll-left 15s linear infinite;
  }
  @keyframes spark-explode {
    0% { transform: translate(0, 0) scale(0.5); opacity: 0.8; }
    100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
  }
  @keyframes spark-wander {
    0% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
    33% { transform: translate(calc(var(--tx) * 1.5 + var(--wx1)), calc(var(--ty) * 1.5 + var(--wy1))) scale(1.5); opacity: 0.8; }
    66% { transform: translate(calc(var(--tx) * 2.5 + var(--wx2)), calc(var(--ty) * 2.5 + var(--wy2))) scale(1.2); opacity: 0.5; }
    100% { transform: translate(calc(var(--tx) * 4 + var(--wx3)), calc(var(--ty) * 4 + var(--wy3))) scale(0.8); opacity: 0; }
  }
  .spark-particle {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4);
    pointer-events: none;
    animation: 
      spark-explode 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards,
      spark-wander var(--wt) linear 0.8s forwards;
  }
  
  /* === АНИМАЦИИ ДЛЯ ЭФФЕКТА СГОРАЮЩЕЙ БУМАГИ (ОПТИМИЗИРОВАНО ДЛЯ GPU) === */
  @keyframes burn-mask-reveal {
    0% { -webkit-mask-position: 100% 0%; mask-position: 100% 0%; }
    100% { -webkit-mask-position: 0% 100%; mask-position: 0% 100%; }
  }
  
  @keyframes burn-fire-scan {
    0% { background-position: 100% 0%; opacity: 0; }
    5% { opacity: 1; }
    95% { opacity: 1; }
    100% { background-position: 0% 100%; opacity: 0; }
  }
  
  .smooth-mask-wipe {
    -webkit-mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%);
    mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%);
    -webkit-mask-size: 300% 300%;
    mask-size: 300% 300%;
    -webkit-mask-position: 100% 0%;
    mask-position: 100% 0%;
    animation: burn-mask-reveal 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    will-change: mask-position, -webkit-mask-position;
  }
  
  .burn-fire-edge {
    background: 
      linear-gradient(224deg, 
        transparent 48.5%, 
        rgba(20, 5, 0, 0.95) 49%, 
        var(--burn-c1, rgba(220, 38, 38, 0.9)) 49.5%, 
        var(--burn-c2, rgba(250, 150, 0, 1)) 50%, 
        var(--burn-c3, rgba(255, 220, 50, 0.8)) 50.2%,
        transparent 51%
      ),
      linear-gradient(226deg, 
        transparent 48.5%, 
        rgba(20, 5, 0, 0.95) 49%, 
        var(--burn-c1, rgba(220, 38, 38, 0.9)) 49.5%, 
        var(--burn-c2, rgba(250, 150, 0, 1)) 50%, 
        var(--burn-c3, rgba(255, 220, 50, 0.8)) 50.2%,
        transparent 51%
      );
    background-size: 300% 300%;
    background-position: 100% 0%;
    mix-blend-mode: normal;
    filter: drop-shadow(0 0 8px var(--burn-c2, rgba(250, 100, 0, 0.8))) blur(0.5px);
    animation: burn-fire-scan 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    will-change: background-position, opacity;
  }
  
  /* === АНИМАЦИИ ЭЗОТЕРИКА (Медленное, однонаправленное движение) === */
  @keyframes esoteric-slow-drift-1 {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes esoteric-slow-drift-2 {
    0%   { transform: rotate(360deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes esoteric-slow-expand {
    0%   { transform: scale(1); opacity: 0.8; }
    50%  { transform: scale(2.2); opacity: 0; }
    100% { transform: scale(1); opacity: 0.8; }
  }
  
  /* === АНИМАЦИИ ТРЕНЕРА (Спокойная пульсация прогресс-баров) === */
  @keyframes fitness-bar-1 {
    0%, 100% { width: 85%; }
    50% { width: 95%; }
  }
  @keyframes fitness-bar-2 {
    0%, 100% { width: 75%; }
    50% { width: 90%; }
  }
  
  /* === АНИМАЦИИ ДЛЯ МАНИКЮРА (Жемчужный перелив и Блик) === */
  @keyframes pearl-shimmer {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-pearl {
    background-size: 200% 200%;
    animation: pearl-shimmer 8s ease infinite;
  }
  @keyframes shine {
    100% { left: 200%; }
  }
  
  /* === АНИМАЦИИ ДЛЯ АЛЬФА ПАРТНЕРА (Красный Монолит) === */
  @keyframes alfa-chart-draw {
    0% { stroke-dashoffset: 1000; opacity: 0; }
    20% { opacity: 0.3; }
    100% { stroke-dashoffset: 0; opacity: 0.3; }
  }
  .animate-alfa-chart {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: alfa-chart-draw 4s ease-out forwards infinite;
  }
  
  /* === АНИМАЦИИ ДЛЯ СВЕТОВОГО ШАРА (DOCK ПАНЕЛИ) === */
  @keyframes scan-vertical {
    0%, 10% { top: 5%; opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    90%, 100% { top: 95%; opacity: 0; }
  }
  @keyframes scan-horizontal {
    0%, 10% { left: 5%; opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    90%, 100% { left: 95%; opacity: 0; }
  }

  /* === ПРЕМИУМ-БЛИК ДЛЯ СТАРТОВОЙ КАРТОЧКИ === */
  @keyframes premium-sweep {
    0% { transform: translateX(-100%) skewX(-20deg); }
    50%, 100% { transform: translateX(150%) skewX(-20deg); }
  }
`;

// ==========================================
// 🪄 КОМПОНЕНТ ЭФФЕКТА СГОРАНИЯ (УМНАЯ ЦВЕТОВАЯ ПОДСТРОЙКА)
// ==========================================
const BurnRevealImage = ({ src, className, style, imgClassName = "", burnColor = "default" }) => {
  // Цветовые темы огня (c1 - пепел/край, c2 - основной огонь, c3 - яркая вспышка)
  const themes = {
    default: { c1: 'rgba(220, 38, 38, 0.9)', c2: 'rgba(250, 150, 0, 1)', c3: 'rgba(255, 220, 50, 0.8)' },
    teal: { c1: 'rgba(13, 148, 136, 0.9)', c2: 'rgba(45, 212, 191, 1)', c3: 'rgba(153, 246, 228, 0.8)' }, // Психолог
    rose: { c1: 'rgba(159, 18, 57, 0.9)', c2: 'rgba(244, 63, 94, 1)', c3: 'rgba(253, 164, 175, 0.8)' }, // Маникюр
    orange: { c1: 'rgba(194, 65, 12, 0.9)', c2: 'rgba(249, 115, 22, 1)', c3: 'rgba(253, 186, 116, 0.8)' }, // Турагент
    purple: { c1: 'rgba(88, 28, 135, 0.9)', c2: 'rgba(168, 85, 247, 1)', c3: 'rgba(216, 180, 254, 0.8)' }, // Эзотерик
    emerald: { c1: 'rgba(6, 78, 59, 0.9)', c2: 'rgba(16, 185, 129, 1)', c3: 'rgba(110, 231, 183, 0.8)' }, // Деньги
    gold: { c1: 'rgba(146, 64, 14, 0.9)', c2: 'rgba(217, 119, 6, 1)', c3: 'rgba(252, 211, 77, 0.8)' }, // Старт / Брокер
    pink: { c1: 'rgba(190, 24, 93, 0.9)', c2: 'rgba(236, 72, 153, 1)', c3: 'rgba(249, 168, 212, 0.8)' }, // Блогер
    red: { c1: 'rgba(153, 27, 27, 0.9)', c2: 'rgba(220, 38, 38, 1)', c3: 'rgba(248, 113, 113, 0.8)' }, // Тренер / Альфа
    silver: { c1: 'rgba(148, 163, 184, 0.9)', c2: 'rgba(226, 232, 240, 1)', c3: 'rgba(255, 255, 255, 0.8)' }, // Риэлтор
  };
  
  const t = themes[burnColor] || themes.default;

  return (
    <div className={`absolute inset-0 pointer-events-none rounded-[2.5rem] ${className}`} style={{ ...style, clipPath: 'inset(0 round 2.5rem)', WebkitClipPath: 'inset(0 round 2.5rem)' }}>
      {/* 1. Слой самого фото (плавное проявление) */}
      <div 
        className={`absolute inset-0 bg-cover bg-center smooth-mask-wipe rounded-[2.5rem] ${imgClassName}`}
        style={{ backgroundImage: `url(${src})` }}
      />
      {/* 2. Эффект линии огня и тлеющего края с кастомными цветами */}
      <div 
        className="absolute inset-0 burn-fire-edge rounded-[2.5rem]" 
        style={{
          '--burn-c1': t.c1,
          '--burn-c2': t.c2,
          '--burn-c3': t.c3,
        }}
      />
    </div>
  );
};


// ==========================================
// ШАБЛОНЫ ВИЗИТОК (4 направления)
// ==========================================

// 1. ЭЗОТЕРИК
const EsotericCard = () => {
  const [view, setView] = useState('tarot');

  return (
    <>
      {/* ЛИЦЕВАЯ СТОРОНА */}
      <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(147,51,234,0.4)] overflow-hidden bg-black text-white flex flex-col p-6 group-hover:shadow-[0_20px_80px_rgba(168,85,247,0.6)] transition-shadow duration-700">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 opacity-70 mix-blend-screen"></div>
        
        {/* ЗАМЕНА СТАТИЧНОГО ФОНА НА СГОРАЮЩИЙ (Фиолетовый огонь) */}
        <BurnRevealImage src={CONTENT.esoteric.bgImage} className="opacity-60 mix-blend-luminosity" burnColor="purple" />
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/30 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-bold tracking-wider uppercase text-purple-100">{CONTENT.esoteric.badge}</span>
            </div>
            <Moon className="w-8 h-8 text-amber-200/80 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl leading-tight font-serif font-black mb-1 uppercase tracking-wide text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              {CONTENT.esoteric.name1}
              <br />
              {CONTENT.esoteric.name2}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <p className="text-amber-300 font-bold text-xs uppercase tracking-[0.2em] border-l-2 border-purple-500 pl-3">
                {CONTENT.esoteric.role}
              </p>
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-purple-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>
                <span className="text-[8px] font-bold uppercase tracking-wider text-amber-100">{CONTENT.esoteric.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ОБРАТНАЯ СТОРОНА (GlassOS / Vertical Left Dock) */}
      <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(147,51,234,0.4)] overflow-hidden bg-[#050505] flex flex-row p-4 gap-4 text-white border border-purple-900/30" style={{ transform: 'rotateY(180deg)' }}>
        
        {/* ФОН МАНДАЛЫ (Медленные орбиты и Аура) */}
        <div className="absolute -top-[20%] -left-[20%] w-[160%] aspect-square rounded-full border border-purple-500/30 border-dashed pointer-events-none" style={{ animation: 'esoteric-slow-drift-1 90s linear infinite', transformOrigin: '45% 55%' }}></div>
        <div className="absolute -bottom-[30%] -right-[30%] w-[140%] aspect-square rounded-full border-[1.5px] border-amber-500/30 pointer-events-none" style={{ animation: 'esoteric-slow-drift-2 100s linear infinite', transformOrigin: '55% 45%' }}></div>
        <div className="absolute top-[20%] left-[10%] w-[80%] aspect-square rounded-full border-2 border-purple-500/40 pointer-events-none" style={{ animation: 'esoteric-slow-expand 30s ease-in-out infinite' }}></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full bg-purple-900/40 blur-[50px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] aspect-square rounded-full bg-amber-600/20 blur-[40px] animate-pulse pointer-events-none"></div>

        {/* === ЛЕВАЯ ПАНЕЛЬ (DOCK) === */}
        <div 
          className="relative z-50 flex flex-col items-center justify-between bg-[#050505]/60 backdrop-blur-xl py-4 px-2 rounded-[2rem] border border-purple-500/30 shadow-[0_10px_40px_rgba(147,51,234,0.4)] w-[3.5rem] shrink-0 no-tilt cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Световой шар (Мягкий светящийся блик, бегающий сверху вниз) */}
          <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-amber-400/40 rounded-full blur-[6px] shadow-[0_0_15px_rgba(251,191,36,0.6)] pointer-events-none z-0" style={{ animation: 'scan-vertical 3s ease-in-out infinite' }}></div>

          <div className="flex flex-col gap-2.5 w-full items-center relative z-10">
            {[
              { id: 'tarot', icon: Diamond },
              { id: 'astro', icon: Moon },
              { id: 'numero', icon: TrendingUp },
              { id: 'personal', icon: UserCircle2 },
              { id: 'group', icon: Globe },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setView(item.id)}
                className={`relative p-2.5 rounded-full transition-all duration-300 flex items-center justify-center w-full ${view === item.id ? 'bg-gradient-to-br from-purple-500 to-amber-500 text-black shadow-[0_0_15px_rgba(251,191,36,0.6)] scale-110' : 'text-purple-400/70 hover:text-amber-300 hover:bg-purple-900/40'}`}
              >
                <item.icon className="w-4 h-4" />
              </button>
            ))}
          </div>
          
          <div className="w-full flex flex-col items-center gap-2 relative z-10 mt-1">
            <div className="w-5 h-[1px] bg-purple-500/40"></div>
            <button 
              onClick={() => setView('reviews')}
              className={`p-2.5 w-full rounded-full transition-all duration-300 flex items-center justify-center ${view === 'reviews' ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(251,191,36,0.8)] scale-110' : 'text-amber-400/70 hover:text-amber-300 hover:bg-amber-900/30'}`}
            >
              <Star className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* === ПРАВАЯ ЧАСТЬ (КОНТЕНТ) === */}
        <div className="relative z-10 flex-1 flex flex-col h-full overflow-hidden">
          
          <div className="relative flex-1 w-full overflow-hidden">
            
            {/* 1. ТАРО */}
            <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${view === 'tarot' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <div className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                <Diamond className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-100 italic tracking-wide mb-2">Карты Таро</h3>
              <p className="font-serif text-[12px] text-purple-100/90 leading-relaxed bg-black/40 backdrop-blur-sm p-3.5 rounded-2xl border border-purple-500/20 shadow-inner">
                Глубокие расклады на любовь, карьеру и судьбу. Карты подсвечивают скрытые мотивы, показывают последствия выбора и помогают найти самый верный путь к цели.
              </p>
            </div>

            {/* 2. АСТРОЛОГИЯ */}
            <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${view === 'astro' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <div className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                <Moon className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-100 italic tracking-wide mb-2">Астрология</h3>
              <p className="font-serif text-[12px] text-purple-100/90 leading-relaxed bg-black/40 backdrop-blur-sm p-3.5 rounded-2xl border border-purple-500/20 shadow-inner">
                Детальный разбор натальной карты. Узнай свои сильные стороны, скрытые таланты, кармические задачи и самые удачные периоды для важных жизненных шагов.
              </p>
            </div>

            {/* 3. НУМЕРОЛОГИЯ */}
            <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${view === 'numero' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <div className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                <TrendingUp className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-100 italic tracking-wide mb-2">Нумерология</h3>
              <p className="font-serif text-[12px] text-purple-100/90 leading-relaxed bg-black/40 backdrop-blur-sm p-3.5 rounded-2xl border border-purple-500/20 shadow-inner">
                Анализ Матрицы Судьбы. Расшифровка твоего уникального финансового кода и выявление энергетических блоков, которые мешают росту и изобилию.
              </p>
            </div>

            {/* 4. ЛИЧНЫЕ ПРИЕМЫ */}
            <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${view === 'personal' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <div className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                <UserCircle2 className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-100 italic tracking-wide mb-2">Личный Прием</h3>
              <p className="font-serif text-[12px] text-purple-100/90 leading-relaxed bg-black/40 backdrop-blur-sm p-3.5 rounded-2xl border border-purple-500/20 shadow-inner">
                Индивидуальная сессия тет-а-тет. Полное погружение в твой запрос, бережная энергетическая чистка и постановка мощной защиты от негатива.
              </p>
            </div>

            {/* 5. ГРУППОВЫЕ ПРИЕМЫ */}
            <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${view === 'group' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <div className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                <Globe className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-100 italic tracking-wide mb-2">Женские Круги</h3>
              <p className="font-serif text-[12px] text-purple-100/90 leading-relaxed bg-black/40 backdrop-blur-sm p-3.5 rounded-2xl border border-purple-500/20 shadow-inner">
                Групповые энергопрактики и медитации в поле единомышленников. Мощная синергия, взаимная поддержка и глубокое раскрытие внутренней женской силы.
              </p>
            </div>

            {/* 6. ОТЗЫВЫ */}
            <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${view === 'reviews' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <div className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(147,51,234,0.2)]">
                <Star className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="text-xl font-serif font-bold text-amber-100 italic tracking-wide mb-2">Отзывы</h3>
              <div className="bg-black/40 backdrop-blur-sm p-3.5 rounded-2xl border border-purple-500/20 shadow-inner relative mt-1">
                 <span className="absolute -top-3 left-2 text-4xl text-purple-500/40 font-serif">"</span>
                 <p className="font-serif text-[11px] text-purple-100/90 leading-relaxed italic relative z-10 px-1 pt-1">
                   Алена — настоящий проводник! После сессии жизнь изменилась на 180 градусов, ушли страхи и тревога. Благодарю за свет!
                 </p>
                 <p className="text-[9px] text-amber-400/80 uppercase tracking-widest font-bold text-right mt-3">— Марина, Москва</p>
              </div>
            </div>

          </div>

          {/* Кнопка записи (Заблокирована от наклона) */}
          <div 
            className="mt-3 w-full no-tilt cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <a href={CONTENT.esoteric.actionLink} className="w-full bg-gradient-to-r from-purple-900/80 to-[#1a1025] backdrop-blur-md text-amber-100 font-serif italic text-xs py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:from-purple-800 hover:to-[#2a1a3a] transition-all shadow-[0_0_25px_rgba(147,51,234,0.4)] border border-purple-500/50 group active:scale-95">
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:animate-pulse" />
              {CONTENT.esoteric.actionText}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

// 2. ПСИХОЛОГ
const PsychologistCard = () => {
  // Состояние для микро-навигации внутри карточки (GlassOS)
  const [view, setView] = useState('profile'); // 'profile', 'services', 'reviews'

  return (
    <>
      {/* ЛИЦЕВАЯ СТОРОНА */}
      <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(13,148,136,0.4)] overflow-hidden bg-black text-white flex flex-col p-6 group-hover:shadow-[0_20px_80px_rgba(20,184,166,0.6)] transition-shadow duration-700">
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 via-cyan-500 to-emerald-400 opacity-70 mix-blend-screen"></div>
        
        {/* Темный градиент перенесен ПОД фото, чтобы не перекрывать лазер */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-teal-950/50 to-transparent"></div>
        
        {/* ЗАМЕНА СТАТИЧНОГО ФОНА НА СГОРАЮЩИЙ (Изумрудный/Бирюзовый огонь) */}
        <BurnRevealImage src={CONTENT.psychologist.bgImage} className="opacity-50" burnColor="teal" />
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-teal-500/30 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold tracking-wider uppercase text-teal-100">{CONTENT.psychologist.badge}</span>
            </div>
            <Brain className="w-8 h-8 text-teal-200/80 drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl leading-tight font-serif font-medium mb-1 uppercase tracking-wide text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              {CONTENT.psychologist.name1}
              <br />
              {CONTENT.psychologist.name2}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <p className="text-teal-300 font-bold text-xs uppercase tracking-[0.2em] border-l-2 border-emerald-500 pl-3">
                {CONTENT.psychologist.role}
              </p>
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-teal-500/30">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-100">{CONTENT.psychologist.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ОБРАТНАЯ СТОРОНА (GlassOS / Interactive Micro-App) */}
      <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(13,148,136,0.4)] overflow-hidden bg-[#020806] flex flex-col p-5 text-white" style={{ transform: 'rotateY(180deg)' }}>
        
        {/* Мягкие перекрывающие формы (Blur эффекты) */}
        <div className="absolute -top-10 -left-20 w-72 h-72 bg-teal-600/20 blur-[90px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-emerald-700/15 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>
        <div className="absolute -bottom-20 left-10 w-64 h-64 bg-cyan-900/30 blur-[80px] rounded-full pointer-events-none mix-blend-screen"></div>

        {/* === КОНТЕЙНЕР ДЛЯ ЭКРАНОВ === */}
        {/* ИСПРАВЛЕНО: Убрана блокировка переворота и остановка 3D-наклона с основной области чтения */}
        <div className="relative flex-1 w-full mb-14 overflow-hidden">
          
          {/* VIEW 1: ПРОФИЛЬ */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${view === 'profile' ? 'opacity-100 translate-x-0' : view === 'services' || view === 'reviews' ? 'opacity-0 -translate-x-8 pointer-events-none' : 'opacity-0 translate-x-8 pointer-events-none'}`}>
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-b from-teal-400/40 to-emerald-600/10 mb-3 shadow-[0_0_25px_rgba(20,184,166,0.15)]">
              <img src={CONTENT.psychologist.avatar} alt={CONTENT.psychologist.name1} className="w-full h-full object-cover rounded-full border-2 border-[#020806]" />
            </div>
            <h3 className="text-lg font-serif font-bold text-teal-50 tracking-wide">{CONTENT.psychologist.username}</h3>
            <p className="text-teal-500/80 text-[9px] mt-1.5 uppercase tracking-[0.25em] font-medium mb-6">{CONTENT.psychologist.subUsername}</p>
            
            <p className="font-serif text-teal-50/90 text-[13px] text-center leading-relaxed italic px-4 mb-8">
              "{CONTENT.psychologist.quote1} {CONTENT.psychologist.quote2}"
            </p>

            <div className="flex justify-center items-center gap-4 w-full px-2">
              <div className="bg-teal-900/20 border border-teal-500/20 rounded-2xl p-3.5 flex-1 text-center shadow-inner">
                <p className="text-teal-100 font-bold text-lg">{CONTENT.psychologist.stat1Value}</p>
                <p className="text-[8px] text-teal-500/70 uppercase tracking-widest mt-1 font-bold">{CONTENT.psychologist.stat1Title}</p>
              </div>
              <div className="bg-teal-900/20 border border-teal-500/20 rounded-2xl p-3.5 flex-1 text-center shadow-inner">
                <p className="text-teal-100 font-bold text-lg">{CONTENT.psychologist.stat2Value}</p>
                <p className="text-[8px] text-teal-500/70 uppercase tracking-widest mt-1 font-bold">{CONTENT.psychologist.stat2Title}</p>
              </div>
            </div>
          </div>

          {/* VIEW 2: УСЛУГИ */}
          <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out px-1 ${view === 'services' ? 'opacity-100 translate-x-0' : view === 'profile' ? 'opacity-0 translate-x-8 pointer-events-none' : 'opacity-0 -translate-x-8 pointer-events-none'}`}>
             <h4 className="text-teal-400 text-[10px] uppercase tracking-[0.2em] font-bold text-center mb-5">Форматы работы</h4>
             <div className="flex flex-col gap-3">
               <div className="bg-teal-900/20 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-4 shadow-inner">
                 <div className="flex justify-between items-center mb-2">
                   <span className="font-serif text-teal-50 font-medium tracking-wide">Личная сессия</span>
                   <span className="text-teal-300 font-bold text-sm bg-teal-950/50 px-2 py-0.5 rounded-md border border-teal-500/20">5 000 ₽</span>
                 </div>
                 <p className="text-[10px] text-teal-100/60 leading-relaxed font-light">60 минут глубокой индивидуальной работы онлайн или в безопасном пространстве кабинета.</p>
               </div>
               <div className="bg-teal-900/20 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-4 shadow-inner">
                 <div className="flex justify-between items-center mb-2">
                   <span className="font-serif text-teal-50 font-medium tracking-wide">Парная терапия</span>
                   <span className="text-teal-300 font-bold text-sm bg-teal-950/50 px-2 py-0.5 rounded-md border border-teal-500/20">8 000 ₽</span>
                 </div>
                 <p className="text-[10px] text-teal-100/60 leading-relaxed font-light">90 минут для пар. Учимся слышать друг друга, находить компромиссы и решать конфликты экологично.</p>
               </div>
             </div>
          </div>

          {/* VIEW 3: ОТЗЫВЫ */}
          <div className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out px-1 ${view === 'reviews' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}>
             <h4 className="text-teal-400 text-[10px] uppercase tracking-[0.2em] font-bold text-center mb-5">Отзывы клиентов</h4>
             <div className="flex flex-col gap-3">
               <div className="bg-teal-900/20 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-4 relative shadow-inner">
                 <span className="absolute -top-1 left-2 text-3xl text-teal-500/30 font-serif">"</span>
                 <p className="text-[11px] text-teal-50/90 leading-relaxed font-light italic relative z-10 px-2 pt-1">Алена помогла мне выбраться из глубокого выгорания. Всего за пару месяцев я снова начал спать и радоваться простым вещам.</p>
                 <p className="text-[8px] text-teal-400/80 uppercase tracking-widest font-bold text-right mt-3">— Михаил</p>
               </div>
               <div className="bg-teal-900/20 backdrop-blur-sm border border-teal-500/20 rounded-2xl p-4 relative shadow-inner">
                 <span className="absolute -top-1 left-2 text-3xl text-teal-500/30 font-serif">"</span>
                 <p className="text-[11px] text-teal-50/90 leading-relaxed font-light italic relative z-10 px-2 pt-1">Очень бережный специалист. На сессиях всегда чувствую себя в безопасности. Спасибо за то, что научили меня отстаивать свои границы.</p>
                 <p className="text-[8px] text-teal-400/80 uppercase tracking-widest font-bold text-right mt-3">— Анна</p>
               </div>
             </div>
          </div>

        </div>

        {/* === ПЛАВАЮЩИЙ DOCK (GlassOS Navigation) === */}
        <div 
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#020806]/60 backdrop-blur-xl p-1.5 rounded-full border border-teal-500/30 shadow-[0_10px_40px_rgba(20,184,166,0.3)] z-50 no-tilt cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Световой шар (Мягкий светящийся блик, бегающий слева направо) */}
          <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-teal-400/40 rounded-full blur-[6px] shadow-[0_0_15px_rgba(45,212,191,0.6)] pointer-events-none z-0" style={{ animation: 'scan-horizontal 3s ease-in-out infinite' }}></div>

           {/* Кнопка Профиль */}
           <button 
             onClick={(e) => { e.stopPropagation(); setView('profile'); }} 
             className={`relative z-10 p-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${view === 'profile' ? 'bg-teal-500 text-black shadow-[0_0_15px_rgba(20,184,166,0.5)] scale-105' : 'text-teal-400/70 hover:text-teal-300 hover:bg-teal-900/50'}`}
           >
             <UserCircle2 className="w-4 h-4" />
           </button>
           
           {/* Кнопка Услуги */}
           <button 
             onClick={(e) => { e.stopPropagation(); setView('services'); }} 
             className={`relative z-10 p-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${view === 'services' ? 'bg-teal-500 text-black shadow-[0_0_15px_rgba(20,184,166,0.5)] scale-105' : 'text-teal-400/70 hover:text-teal-300 hover:bg-teal-900/50'}`}
           >
             <Brain className="w-4 h-4" />
           </button>
           
           {/* Кнопка Отзывы */}
           <button 
             onClick={(e) => { e.stopPropagation(); setView('reviews'); }} 
             className={`relative z-10 p-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${view === 'reviews' ? 'bg-teal-500 text-black shadow-[0_0_15px_rgba(20,184,166,0.5)] scale-105' : 'text-teal-400/70 hover:text-teal-300 hover:bg-teal-900/50'}`}
           >
             <Star className="w-4 h-4" />
           </button>
           
           {/* Разделитель */}
           <div className="w-[1px] h-6 bg-teal-500/30 mx-1 relative z-10"></div>
           
           {/* Кнопка Действия (Всегда на виду) */}
           <a 
             href={CONTENT.psychologist.actionLink} 
             onClick={e => e.stopPropagation()} 
             className="relative z-10 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-400 text-black font-bold uppercase tracking-widest text-[9px] rounded-full flex items-center gap-1.5 hover:scale-105 hover:shadow-[0_0_20px_rgba(20,184,166,0.6)] transition-all active:scale-95"
           >
             <Heart className="w-3 h-3 text-rose-600" /> Запись
           </a>
        </div>

      </div>
    </>
  );
};

// 3. ТУРАГЕНТ
const TravelCard = () => (
  <>
    {/* ЛИЦЕВАЯ СТОРОНА */}
    <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(249,115,22,0.4)] overflow-hidden bg-black text-white flex flex-col p-6 group-hover:shadow-[0_20px_80px_rgba(244,63,94,0.6)] transition-shadow duration-700">
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 via-rose-500 to-indigo-600 opacity-70 mix-blend-screen"></div>
      
      {/* ЗАМЕНА СТАТИЧНОГО ФОНА НА СГОРАЮЩИЙ (Оранжевый/Красный огонь) */}
      <BurnRevealImage src={CONTENT.travel.bgImage} className="opacity-50" burnColor="orange" />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-orange-500/30 flex items-center gap-2">
            <Compass className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-bold tracking-wider uppercase text-rose-100">{CONTENT.travel.badge}</span>
          </div>
          <PlaneTakeoff className="w-8 h-8 text-rose-200/80 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
        </div>

        <div className="pb-6">
          <h2 className="text-3xl sm:text-4xl leading-tight font-black mb-1 uppercase tracking-wide text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            {CONTENT.travel.name1}
            <br />
            {CONTENT.travel.name2}
          </h2>
          <p className="text-orange-300 font-bold text-xs uppercase tracking-[0.2em] mt-2 border-l-2 border-rose-500 pl-3">
            {CONTENT.travel.role}
          </p>
        </div>
      </div>
      
      {/* Бегущая строка */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-black/40 backdrop-blur-md border-t border-rose-500/30 py-1.5 z-20">
        <div className="flex w-max animate-scroll text-[9px] font-bold uppercase tracking-[0.2em] text-rose-100">
          <span className="flex gap-8 pr-8 items-center whitespace-nowrap">
            {CONTENT.travel.marquee.map((item, i) => <span key={i}>{item}</span>)}
          </span>
          <span className="flex gap-8 pr-8 items-center whitespace-nowrap">
            {CONTENT.travel.marquee.map((item, i) => <span key={`clone-${i}`}>{item}</span>)}
          </span>
        </div>
      </div>
    </div>

    {/* ОБРАТНАЯ СТОРОНА (Boarding Pass Style) */}
    <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(249,115,22,0.4)] overflow-hidden bg-[#f4f1ea] flex flex-col text-zinc-900 border border-zinc-200" style={{ transform: 'rotateY(180deg)' }}>
      
      {/* Текстура бумаги / Водяные знаки */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none"></div>

      {/* Штампы таможни */}
      <div className="absolute top-20 right-[-10px] w-28 h-28 border-[3px] border-rose-600/30 rounded-full flex flex-col items-center justify-center rotate-12 pointer-events-none z-0">
         <span className="text-rose-600/40 font-black tracking-widest uppercase text-lg border-b-2 border-rose-600/30 px-2 mb-1">DEPARTED</span>
         <span className="text-rose-600/40 font-bold tracking-widest text-[8px]">VIP CUSTOMS</span>
      </div>
      <div className="absolute bottom-32 left-[-15px] w-24 h-24 border-[2px] border-orange-500/30 rounded-full flex flex-col items-center justify-center -rotate-12 pointer-events-none z-0">
         <span className="text-orange-500/40 font-bold tracking-widest text-[8px] mb-1">APPROVED</span>
         <span className="text-orange-500/40 font-black tracking-widest uppercase text-xl border-t-2 border-orange-500/30 px-2">FIRST</span>
      </div>

      {/* Верхняя часть (Шапка билета) */}
      <div className="bg-zinc-900 text-white p-5 pb-6 relative z-10 border-b-4 border-orange-500 shadow-md">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">Boarding Pass</h3>
          <PlaneTakeoff className="w-5 h-5 text-orange-400" />
        </div>
        <p className="text-2xl font-black tracking-widest uppercase text-white drop-shadow-md">{CONTENT.travel.statusBack}</p>
      </div>

      {/* Основная часть с данными */}
      <div className="flex-1 px-5 pt-5 pb-4 relative z-10 flex flex-col gap-3">
        
        <div className="flex justify-between items-start">
           <div>
             <p className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest mb-0.5">Passenger</p>
             <p className="font-mono font-bold text-sm text-zinc-900 uppercase">{CONTENT.travel.agentName}</p>
           </div>
           <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-md shrink-0 rotate-3 bg-zinc-200">
             <img src={CONTENT.travel.avatar} alt={CONTENT.travel.name1} className="w-full h-full object-cover grayscale opacity-90" />
           </div>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-1">
          <div>
            <p className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest mb-0.5">Destination</p>
            <p className="font-mono font-black text-lg text-orange-600 uppercase leading-none">{CONTENT.travel.destination}</p>
          </div>
          <div>
            <p className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest mb-0.5">Flight</p>
            <p className="font-mono font-black text-lg text-zinc-900 leading-none">VIP-01</p>
          </div>
          <div>
            <p className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest mb-0.5">Date</p>
            <p className="font-mono font-bold text-base text-zinc-900 leading-none">OPEN</p>
          </div>
          <div>
             <p className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest mb-0.5">Seat</p>
             <p className="font-mono font-bold text-base text-zinc-900 leading-none">1A</p>
          </div>
        </div>

        {/* Отрывная линия (Имитация отрывного корешка) */}
        <div className="relative w-full flex items-center my-3">
          {/* Левый круглый вырез, цвет совпадает с фоном сайта */}
          <div className="absolute -left-5 -translate-x-1/2 w-6 h-6 bg-[#0a0a0a] rounded-full z-20 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.15)]"></div>
          <div className="w-full border-t-[2.5px] border-dashed border-zinc-400"></div>
          {/* Правый круглый вырез */}
          <div className="absolute -right-5 translate-x-1/2 w-6 h-6 bg-[#0a0a0a] rounded-full z-20 shadow-[inset_2px_0_4px_rgba(0,0,0,0.15)]"></div>
        </div>

        {/* Нижняя отрывная часть (Штрихкод + Кнопки) */}
        <div className="flex items-center justify-between h-full pt-1">
           <div className="flex flex-col gap-2.5 flex-1 pr-6">
              <a href={CONTENT.travel.tgLink} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shadow-md group">
                <MessageCircle className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider">{CONTENT.travel.tgText}</span>
              </a>
              <a href={CONTENT.travel.tourLink} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-600 text-white hover:bg-orange-500 transition-colors shadow-md group">
                <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider">{CONTENT.travel.tourText}</span>
              </a>
           </div>
           
           {/* Векторный штрихкод */}
           <svg className="h-[90%] w-8 text-zinc-800 mix-blend-multiply opacity-80" preserveAspectRatio="none" viewBox="0 0 24 100">
             <rect x="0" y="0" width="2" height="100" fill="currentColor"/>
             <rect x="3" y="0" width="1" height="100" fill="currentColor"/>
             <rect x="5" y="0" width="3" height="100" fill="currentColor"/>
             <rect x="9" y="0" width="1" height="100" fill="currentColor"/>
             <rect x="11" y="0" width="2" height="100" fill="currentColor"/>
             <rect x="14" y="0" width="1" height="100" fill="currentColor"/>
             <rect x="16" y="0" width="4" height="100" fill="currentColor"/>
             <rect x="21" y="0" width="1" height="100" fill="currentColor"/>
             <rect x="23" y="0" width="1" height="100" fill="currentColor"/>
           </svg>
        </div>

      </div>
    </div>
  </>
);

// 4. БЛОГЕР
const BloggerCard = () => (
  <>
    {/* ЛИЦЕВАЯ СТОРОНА */}
    <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(236,72,153,0.4)] overflow-hidden bg-black text-white flex flex-col p-6 group-hover:shadow-[0_20px_80px_rgba(6,182,212,0.6)] transition-shadow duration-700">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 opacity-80 mix-blend-screen"></div>
      
      {/* ЗАМЕНА СТАТИЧНОГО ФОНА НА СГОРАЮЩИЙ (Розовый/Неоновый огонь) */}
      <BurnRevealImage src={CONTENT.blogger.bgImage} className="opacity-60 mix-blend-luminosity" burnColor="pink" />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-wider uppercase">{CONTENT.blogger.badge}</span>
          </div>
          <Camera className="w-8 h-8 text-white/80" />
        </div>

        <div>
          <h2 className="text-3xl sm:text-4xl leading-tight font-black mb-1 uppercase tracking-tighter mix-blend-overlay text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            {CONTENT.blogger.name1}
            <br />
            {CONTENT.blogger.name2}
          </h2>
          <p className="text-cyan-300 font-bold text-xs uppercase tracking-[0.2em] mt-2 border-l-2 border-pink-500 pl-3">
            {CONTENT.blogger.role}
          </p>
        </div>
      </div>
    </div>

    {/* ОБРАТНАЯ СТОРОНА (Neo-Brutalism / Glossy Style) */}
    <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(6,182,212,0.4)] overflow-hidden bg-zinc-950 flex flex-col text-white border-2 border-zinc-800" style={{ transform: 'rotateY(180deg)' }}>
      
      {/* Глянцевые неоновые засветы */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/30 blur-[80px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/30 blur-[80px] rounded-full pointer-events-none mix-blend-screen"></div>
      
      {/* Огромная вертикальная типографика */}
      <div className="absolute left-0 top-0 bottom-0 w-[4.5rem] bg-zinc-900/80 backdrop-blur-md border-r border-zinc-800 flex items-center justify-center z-0 overflow-hidden">
        <h3 className="text-[5rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-pink-500 -rotate-90 whitespace-nowrap tracking-tighter mix-blend-screen opacity-50">
          {CONTENT.blogger.name1}
        </h3>
      </div>

      {/* Основной контент (смещен вправо из-за вертикального текста) */}
      <div className="relative z-10 flex flex-col h-full w-full pl-[4.5rem] p-5">
        
        {/* Шапка: Юзернейм и Аватар */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col mt-2">
            <span className="bg-cyan-400 text-black text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 self-start mb-1 transform -skew-x-12 shadow-[2px_2px_0px_#ec4899]">
              {CONTENT.blogger.subUsername}
            </span>
            <h3 className="text-xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-[2px_2px_0px_#ec4899]">{CONTENT.blogger.username}</h3>
          </div>
          {/* Брутальный квадратный аватар в стиле глянца */}
          <div className="w-14 h-14 shrink-0 border-2 border-white shadow-[4px_4px_0px_#ec4899] transform rotate-3 bg-zinc-800 overflow-hidden">
            <img src={CONTENT.blogger.avatar} alt={CONTENT.blogger.name1} className="w-full h-full object-cover grayscale contrast-125" />
          </div>
        </div>
        
        {/* Асимметричная статистика (Лесенкой) */}
        <div className="flex flex-col gap-3 mt-2 mb-auto">
          {/* Блок 1 */}
          <div className="bg-zinc-900 border-2 border-zinc-800 p-3 flex justify-between items-center shadow-[4px_4px_0px_#22d3ee] transform -rotate-2 hover:rotate-0 transition-transform">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-cyan-400 fill-cyan-400" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{CONTENT.blogger.stat1Title}</span>
            </div>
            <span className="text-2xl font-black text-white">{CONTENT.blogger.stat1Value}</span>
          </div>
          {/* Блок 2 (Смещенный вправо) */}
          <div className="bg-zinc-900 border-2 border-zinc-800 p-3 flex justify-between items-center shadow-[4px_4px_0px_#ec4899] transform rotate-1 hover:rotate-0 transition-transform ml-4">
            <div className="flex items-center gap-2">
              <InstagramIcon className="w-5 h-5 text-pink-500" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{CONTENT.blogger.stat2Title}</span>
            </div>
            <span className="text-2xl font-black text-white">{CONTENT.blogger.stat2Value}</span>
          </div>
        </div>

        {/* Дерзкая цитата (Эффект текстовыделителя) */}
        <div className="mb-6 relative z-20">
           <p className="font-black text-[13px] uppercase tracking-tighter leading-relaxed">
             <span className="bg-white text-black px-1.5 py-0.5 box-decoration-clone">{CONTENT.blogger.quote1}</span>
             <br/>
             <span className="bg-pink-500 text-white px-1.5 py-0.5 box-decoration-clone inline-block mt-0.5 shadow-[2px_2px_0px_#22d3ee]">{CONTENT.blogger.quote2}</span>
           </p>
        </div>

        {/* Интерактивная брутальная кнопка */}
        <a href={CONTENT.blogger.actionLink} className="w-full bg-cyan-400 text-black font-black uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 transition-all duration-200 shadow-[5px_5px_0px_#ec4899] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none border-2 border-transparent hover:border-black group relative overflow-hidden z-20">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
          <Mail className="w-5 h-5 relative z-10" />
          <span className="relative z-10">{CONTENT.blogger.actionText}</span>
        </a>
      </div>
    </div>
  </>
);

// 5. ФИТНЕС-ТРЕНЕР
const FitnessCard = () => (
  <>
    {/* ЛИЦЕВАЯ СТОРОНА */}
    <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(225,29,72,0.4)] overflow-hidden bg-black text-white flex flex-col p-6 group-hover:shadow-[0_20px_80px_rgba(244,63,94,0.6)] transition-shadow duration-700">
      <div className="absolute inset-0 bg-gradient-to-tr from-red-600 via-rose-500 to-orange-500 opacity-70 mix-blend-screen"></div>
      
      {/* Темный градиент перенесен ПОД картинку, чтобы не перекрывать лазер */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-red-950/50 to-transparent"></div>
      
      {/* ЗАМЕНА СТАТИЧНОГО ФОНА НА СГОРАЮЩИЙ (Ярко-красный огонь) */}
      <BurnRevealImage src={CONTENT.fitness.bgImage} className="opacity-50" burnColor="red" />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-red-500/50 flex items-center gap-2 transform -skew-x-6 shadow-[4px_4px_0_rgba(225,29,72,0.5)]">
            <Flame className="w-4 h-4 text-orange-400 transform skew-x-6" />
            <span className="text-xs font-black italic tracking-widest uppercase text-rose-100 transform skew-x-6">{CONTENT.fitness.badge}</span>
          </div>
          <Activity className="w-8 h-8 text-rose-200/80 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
        </div>

        <div>
          <h2 className="text-3xl sm:text-4xl leading-tight font-black italic mb-1 uppercase tracking-tighter text-white drop-shadow-[4px_4px_0px_rgba(220,38,38,0.8)]">
            {CONTENT.fitness.name1}
            <br />
            {CONTENT.fitness.name2}
          </h2>
          <p className="text-rose-300 font-black italic text-xs uppercase tracking-[0.2em] mt-2 border-l-4 border-orange-500 pl-3">
            {CONTENT.fitness.role}
          </p>
        </div>
      </div>
    </div>

    {/* ОБРАТНАЯ СТОРОНА (Dynamics & Power Style) */}
    <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(225,29,72,0.4)] overflow-hidden bg-[#0a0a0a] flex flex-col p-5 text-white border-2 border-red-600/30" style={{ transform: 'rotateY(180deg)' }}>
      
      {/* Агрессивный фон: диагональные гоночные полосы (Карбон/Трек) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #000 0, #000 3px, #dc2626 3px, #dc2626 6px)', backgroundSize: '16px 16px' }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none"></div>

      <div className="relative z-10 flex flex-col h-full gap-4">
        
        {/* Хедер: Аватар и Имя со скосом */}
        <div className="flex items-center gap-4 mt-1">
          <div className="relative w-16 h-16 shrink-0 transform -skew-x-6 overflow-hidden border-b-4 border-r-4 border-red-600 bg-zinc-800 shadow-[4px_4px_15px_rgba(220,38,38,0.3)]">
            <img src={CONTENT.fitness.avatar} alt={CONTENT.fitness.name1} className="w-full h-full object-cover transform skew-x-6 scale-125 grayscale contrast-125" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-black uppercase italic tracking-tighter text-white leading-none drop-shadow-[2px_2px_0px_#dc2626]">{CONTENT.fitness.username}</h3>
            <p className="text-white text-[10px] uppercase tracking-[0.2em] font-black bg-red-600 w-fit px-2 py-0.5 mt-1.5 transform -skew-x-6 shadow-[2px_2px_0px_#7f1d1d]">{CONTENT.fitness.subUsername}</p>
          </div>
        </div>
        
        {/* Кольца активности (Smartwatch UI) */}
        <div className="flex justify-around items-center bg-zinc-900/80 backdrop-blur-md py-4 px-2 border-y-2 border-red-600/50 transform -skew-x-3 shadow-[0_0_20px_rgba(220,38,38,0.15)]">
          {/* Кольцо 1 */}
          <div className="flex flex-col items-center transform skew-x-3">
            <div className="relative w-16 h-16 mb-2">
              <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-zinc-800" />
                {/* strokeDasharray для радиуса 26 = ~163. Заполняем на 80% (offset 32) */}
                <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray="163" strokeDashoffset="32" className="text-red-500 transition-all duration-1000 ease-out" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-black italic text-lg text-white drop-shadow-md">{CONTENT.fitness.stat1Value}</span>
              </div>
            </div>
            <p className="text-[9px] text-zinc-400 uppercase font-black tracking-widest leading-none">{CONTENT.fitness.stat1Title}</p>
          </div>
          
          {/* Вертикальный разделитель */}
          <div className="w-0.5 h-12 bg-zinc-800 transform skew-x-3"></div>

          {/* Кольцо 2 */}
          <div className="flex flex-col items-center transform skew-x-3">
            <div className="relative w-16 h-16 mb-2">
              <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-zinc-800" />
                {/* Заполняем на 95% (offset 8) */}
                <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray="163" strokeDashoffset="8" className="text-orange-500 transition-all duration-1000 ease-out" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Уменьшили размер шрифта с text-lg на text-sm, чтобы длинные числа (500+) не касались краев */}
                <span className="font-black italic text-sm text-orange-400 drop-shadow-md">{CONTENT.fitness.stat2Value}</span>
              </div>
            </div>
            <p className="text-[9px] text-zinc-400 uppercase font-black tracking-widest leading-none">{CONTENT.fitness.stat2Title}</p>
          </div>
        </div>

        {/* Ссылки-прогрессбары */}
        <div className="flex-1 flex flex-col justify-center gap-3">
           <a href={CONTENT.fitness.link1Url} className="relative w-full h-[3.25rem] bg-zinc-900 border border-zinc-800 transform -skew-x-6 overflow-hidden group shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
             <div className="absolute top-0 left-0 h-full bg-red-600 transition-all duration-500 ease-out" style={{ animation: 'fitness-bar-1 6s ease-in-out infinite' }}></div>
             <div className="absolute inset-0 flex items-center justify-between px-5 transform skew-x-6">
                <span className="font-black italic uppercase text-xs tracking-widest text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]">{CONTENT.fitness.link1Text}</span>
                <Activity className="w-5 h-5 text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform animate-pulse" />
             </div>
           </a>
           <a href={CONTENT.fitness.link2Url} className="relative w-full h-[3.25rem] bg-zinc-900 border border-zinc-800 transform -skew-x-6 overflow-hidden group shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
             <div className="absolute top-0 left-0 h-full bg-orange-600 transition-all duration-500 ease-out" style={{ animation: 'fitness-bar-2 7s ease-in-out infinite 1s' }}></div>
             <div className="absolute inset-0 flex items-center justify-between px-5 transform skew-x-6">
                <span className="font-black italic uppercase text-xs tracking-widest text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]">{CONTENT.fitness.link2Text}</span>
                <Flame className="w-5 h-5 text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform animate-pulse" />
             </div>
           </a>
        </div>

        {/* Главная кнопка (Педаль газа) */}
        <a href={CONTENT.fitness.actionLink} className="w-full bg-red-600 text-white font-black italic uppercase tracking-widest py-4 flex items-center justify-center gap-2 hover:bg-red-500 transition-all shadow-[0_0_25px_rgba(220,38,38,0.5)] transform -skew-x-6 border-b-[6px] border-r-[4px] border-red-900 active:border-b-0 active:border-r-0 active:translate-y-[6px] active:translate-x-[4px] mt-1">
          <span className="transform skew-x-6 flex items-center gap-2 text-sm">
            {CONTENT.fitness.actionText} <Flame className="w-5 h-5" />
          </span>
        </a>
      </div>
    </div>
  </>
);

// 6. БРОКЕР / НЕДВИЖИМОСТЬ
const RealEstateCard = () => (
  <>
    {/* ЛИЦЕВАЯ СТОРОНА */}
    <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(217,119,6,0.3)] overflow-hidden bg-black text-white flex flex-col p-6 group-hover:shadow-[0_20px_80px_rgba(217,119,6,0.5)] transition-shadow duration-700">
      <div className="absolute inset-0 bg-gradient-to-bl from-zinc-800 via-black to-amber-900/50 opacity-80 mix-blend-screen"></div>
      
      {/* ЗАМЕНА СТАТИЧНОГО ФОНА НА СГОРАЮЩИЙ (Золотой/Бронзовый огонь) */}
      <BurnRevealImage src={CONTENT.broker.bgImage} className="opacity-50 mix-blend-luminosity" burnColor="gold" />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-amber-600/30 flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-serif tracking-widest uppercase text-amber-100/80">{CONTENT.broker.badge}</span>
          </div>
          <Building2 className="w-8 h-8 text-amber-200/50 drop-shadow-[0_0_10px_rgba(217,119,6,0.2)]" />
        </div>

        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl leading-tight font-serif font-light mb-1 uppercase tracking-widest text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {CONTENT.broker.name1}
            <br />
            {CONTENT.broker.name2}
          </h2>
          <p className="text-amber-300 font-serif font-medium text-[11px] uppercase tracking-[0.3em] mt-3 drop-shadow-md bg-black/20 w-fit mx-auto px-3 py-1 rounded-full border border-amber-600/20">
            {CONTENT.broker.role}
          </p>
        </div>
      </div>
    </div>

    {/* ОБРАТНАЯ СТОРОНА (Quiet Luxury) */}
    <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden bg-[#050505] flex flex-col p-6 text-white" style={{ transform: 'rotateY(180deg)' }}>
      {/* Minimalist borders */}
      <div className="absolute inset-4 border-[0.5px] border-amber-600/30 rounded-[2rem] pointer-events-none"></div>
      <div className="absolute inset-5 border-[0.5px] border-amber-600/10 rounded-[1.75rem] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-5 text-center px-2">
        
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full p-[1px] bg-gradient-to-b from-amber-500/50 to-transparent mt-2">
          <img src={CONTENT.broker.avatar} alt={CONTENT.broker.name1} className="w-full h-full object-cover rounded-full grayscale opacity-90" />
        </div>

        {/* Name */}
        <div>
          <h3 className="text-[1.15rem] font-serif font-light tracking-[0.25em] text-amber-50/90 uppercase">{CONTENT.broker.username}</h3>
          <p className="text-amber-600/60 text-[8px] mt-1.5 uppercase tracking-[0.3em] font-light">{CONTENT.broker.subUsername}</p>
        </div>

        {/* Thin elegant divider */}
        <div className="w-8 h-[0.5px] bg-amber-600/40 my-1"></div>

        {/* Stats - Выделили в явные карточки с обводкой */}
        <div className="flex w-full justify-center gap-4 px-2">
          <div className="flex-1 flex flex-col items-center bg-zinc-900/40 border border-amber-600/40 rounded-xl py-3 shadow-lg">
            <p className="font-serif font-light text-xl text-white/90">{CONTENT.broker.stat1Value}</p>
            <p className="text-[7px] text-amber-600/70 uppercase tracking-[0.3em] mt-1 text-center">{CONTENT.broker.stat1Title}</p>
          </div>
          <div className="flex-1 flex flex-col items-center bg-zinc-900/40 border border-amber-600/40 rounded-xl py-3 shadow-lg">
            <p className="font-serif font-light text-xl text-amber-500/90">{CONTENT.broker.stat2Value}</p>
            <p className="text-[7px] text-amber-600/70 uppercase tracking-[0.3em] mt-1 text-center">{CONTENT.broker.stat2Title}</p>
          </div>
        </div>

        {/* Quote */}
        <div className="flex-1 flex items-center justify-center w-full">
          <p className="font-serif font-light text-[11px] text-zinc-400/80 tracking-widest leading-relaxed italic px-2">
            {CONTENT.broker.quote}
          </p>
        </div>

        {/* Button */}
        <a href={CONTENT.broker.actionLink} className="w-full bg-transparent border-[0.5px] border-amber-600/40 text-amber-500/90 font-serif font-light text-[10px] uppercase tracking-[0.25em] py-4 rounded-full flex items-center justify-center gap-3 hover:bg-amber-900/20 transition-colors mt-auto group">
          <MessageCircle className="w-4 h-4 font-light opacity-70 group-hover:opacity-100 transition-opacity" />
          {CONTENT.broker.actionText}
        </a>
      </div>
    </div>
  </>
);

// 7. РИЭЛТОР (Элитная недвижимость Еревана)
const RealtorCard = () => (
  <>
    {/* ЛИЦЕВАЯ СТОРОНА (Obsidian & Platinum) */}
    <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(148,163,184,0.2)] overflow-hidden bg-[#050505] text-white flex flex-col p-6 group-hover:shadow-[0_20px_80px_rgba(203,213,225,0.4)] transition-shadow duration-700 border border-slate-700/30">
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-black to-slate-800 opacity-60 mix-blend-screen"></div>

      {/* Архитектурные линии на фоне */}
      <div className="absolute top-0 right-0 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-slate-500/30 to-transparent transform rotate-45 translate-x-1/4 translate-y-20"></div>
      <div className="absolute bottom-0 left-0 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-slate-500/30 to-transparent transform rotate-45 -translate-x-1/4 -translate-y-20"></div>

      {/* Выжигающийся фон цвета платины/серебра */}
      <BurnRevealImage src={CONTENT.realtor.bgImage} className="opacity-40 mix-blend-luminosity grayscale" burnColor="silver" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-sm border-l-2 border-slate-400 flex items-center gap-2 shadow-[4px_4px_15px_rgba(0,0,0,0.5)]">
            <MapPin className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-slate-100">{CONTENT.realtor.badge}</span>
          </div>
          <Building2 className="w-8 h-8 text-slate-300/50" />
        </div>

        <div className="mb-4">
          <h2 className="text-3xl sm:text-4xl leading-tight font-light mb-1 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {CONTENT.realtor.name1}
            <br />
            <span className="font-bold text-white drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">{CONTENT.realtor.name2}</span>
          </h2>
          <div className="flex items-center gap-3 mt-3">
            <div className="h-[1px] w-8 bg-slate-500 shadow-[0_0_8px_rgba(148,163,184,0.8)]"></div>
            <p className="text-slate-400 font-medium text-[10px] uppercase tracking-[0.3em]">
              {CONTENT.realtor.role}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* ОБРАТНАЯ СТОРОНА (Smart Keycard Aesthetic) */}
    <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(148,163,184,0.2)] overflow-hidden bg-[#0a0a0a] flex flex-col text-white border border-slate-700/50" style={{ transform: 'rotateY(180deg)' }}>
      
      {/* Текстура шлифованного металла */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)' }}></div>

      {/* Имитация чипа смарт-карты (NFC) */}
      <div className="absolute top-8 right-8 w-10 h-12 rounded-md border border-slate-600/50 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-wrap p-1 gap-0.5 opacity-80 shadow-inner z-0">
         <div className="w-[45%] h-[45%] border-b border-r border-slate-600/50 rounded-tl-sm"></div>
         <div className="w-[45%] h-[45%] border-b border-l border-slate-600/50 rounded-tr-sm"></div>
         <div className="w-[45%] h-[45%] border-t border-r border-slate-600/50 rounded-bl-sm"></div>
         <div className="w-[45%] h-[45%] border-t border-l border-slate-600/50 rounded-br-sm"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full p-7">
        {/* Шапка: Лого и Аватар */}
        <div className="flex items-end gap-4 mb-8 mt-2">
          <div className="w-16 h-16 shrink-0 bg-slate-900 border border-slate-600 shadow-[0_0_20px_rgba(148,163,184,0.15)] rounded-sm overflow-hidden">
            <img src={CONTENT.realtor.avatar} alt={CONTENT.realtor.name1} className="w-full h-full object-cover grayscale opacity-90" />
          </div>
          <div className="flex flex-col pb-1">
            <h3 className="text-lg font-light tracking-[0.2em] text-white uppercase leading-none mb-1.5">{CONTENT.realtor.username}</h3>
            <p className="text-slate-400 text-[9px] uppercase tracking-[0.25em] font-bold">{CONTENT.realtor.subUsername}</p>
          </div>
        </div>

        {/* Статистика / Детали */}
        <div className="flex flex-col gap-4 mt-auto mb-8">
          <div className="bg-slate-900/50 border border-slate-700/50 p-4 rounded-sm flex justify-between items-center backdrop-blur-sm shadow-inner">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">{CONTENT.realtor.stat1Title}</span>
            <span className="text-lg font-medium tracking-wider text-slate-100">{CONTENT.realtor.stat1Value}</span>
          </div>
          <div className="bg-slate-900/50 border border-slate-700/50 p-4 rounded-sm flex justify-between items-center backdrop-blur-sm shadow-inner">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">{CONTENT.realtor.stat2Title}</span>
            <span className="text-lg font-medium tracking-wider text-slate-100">{CONTENT.realtor.stat2Value}</span>
          </div>
        </div>

        {/* Цитата */}
        <p className="text-[11px] text-slate-500 uppercase tracking-widest font-light text-center mb-6">
          {CONTENT.realtor.quote}
        </p>

        {/* Кнопка с эффектом сканера */}
        <a href={CONTENT.realtor.actionLink} className="w-full bg-slate-100 text-black font-medium uppercase tracking-[0.2em] text-[10px] py-4 rounded-sm flex items-center justify-center gap-3 transition-all hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)] group relative overflow-hidden active:scale-95">
          <div className="absolute left-0 top-0 w-full h-[1px] bg-slate-400 opacity-50 -translate-y-full group-hover:animate-[scan-vertical_2s_ease-in-out_infinite]"></div>
          <Key className="w-4 h-4 opacity-80" />
          {CONTENT.realtor.actionText}
        </a>
      </div>
    </div>
  </>
);

// 8. СТАРТОВАЯ КАРТОЧКА (Черный шелк и золото)
const StarterCard = () => (
  <>
    {/* ЛИЦЕВАЯ СТОРОНА */}
    <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(234,179,8,0.2)] overflow-hidden bg-black text-white flex flex-col p-6 group-hover:shadow-[0_20px_80px_rgba(234,179,8,0.4)] transition-shadow duration-700 border border-yellow-500/20">
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-zinc-900 to-yellow-900/30 opacity-90 mix-blend-screen rounded-[2.5rem]"></div>
      
      {/* Имитация золотых нитей */}
      <div className="absolute top-0 right-10 w-px h-full bg-gradient-to-b from-transparent via-yellow-500/50 to-transparent transform rotate-12"></div>
      <div className="absolute top-0 left-20 w-px h-full bg-gradient-to-b from-transparent via-yellow-500/30 to-transparent transform -rotate-12"></div>
      
      {/* ТЕМНЫЙ ПОЛУПРОЗРАЧНЫЙ ФОН ПОВЕРХ ФОТО (Снизу темнее, сверху прозрачный) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/80 to-transparent pointer-events-none z-0 rounded-[2.5rem]"></div>

      {/* ЗАМЕНА СТАТИЧНОГО ФОНА НА СГОРАЮЩИЙ (Золотой огонь) ПЕРЕМЕЩЕНО НА ВЕРХНИЙ СЛОЙ */}
      <BurnRevealImage src={CONTENT.starter.bgImage} className="opacity-60 mix-blend-luminosity sepia-[.5] hue-rotate-[-10deg] rounded-[2.5rem]" burnColor="gold" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-yellow-500/30 flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-bold tracking-wider uppercase text-yellow-100">{CONTENT.starter.badge}</span>
          </div>
          <Sparkles className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)] animate-pulse" />
        </div>

        {/* Пустое пространство, чтобы сдвинуть текст вниз под фото */}
        <div className="flex-1"></div>

        <div className="flex flex-col items-center justify-center text-center mb-5">
          <h2 className="text-2xl sm:text-3xl leading-tight font-black mb-2 uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-yellow-100 to-yellow-500 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {CONTENT.starter.title1}
            <br />
            {CONTENT.starter.title2}
          </h2>
          <p className="text-yellow-400 font-bold text-xs uppercase tracking-[0.2em] bg-black/50 px-3 py-1 rounded-full border border-yellow-500/30">
            {CONTENT.starter.role}
          </p>
        </div>
        
        <div className="flex flex-col gap-3 w-full">
          <div className="bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-yellow-500/30 flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(234,179,8,0.2)] mb-1">
             <MousePointerClick className="w-5 h-5 text-yellow-500 animate-pulse" />
             <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-100">{CONTENT.starter.instruction1}</span>
          </div>
          <div className="bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-yellow-500/30 flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
             <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-100">{CONTENT.starter.instruction2}</span>
             <RefreshCw className="w-5 h-5 text-yellow-500 opacity-80" />
          </div>
        </div>
      </div>
    </div>

    {/* ОБРАТНАЯ СТОРОНА */}
    <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(234,179,8,0.2)] overflow-hidden bg-zinc-950 flex flex-col p-5 text-white border border-yellow-500/20" style={{ transform: 'rotateY(180deg)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-500/10 blur-[80px] rounded-full pointer-events-none"></div>
      
      {/* ВАУ-ЭФФЕКТ: Вращающиеся огромные золотые орбиты на фоне */}
      <div className="absolute -top-[50%] -left-[50%] w-[200%] aspect-square rounded-full border border-yellow-500/10 border-dashed pointer-events-none" style={{ animation: 'esoteric-slow-drift-1 60s linear infinite', transformOrigin: '50% 50%' }}></div>
      <div className="absolute -top-[30%] -right-[30%] w-[160%] aspect-square rounded-full border-[1px] border-yellow-500/20 pointer-events-none" style={{ animation: 'esoteric-slow-drift-2 40s linear infinite', transformOrigin: '40% 60%' }}></div>
      
      {/* ВАУ-ЭФФЕКТ: Пробегающий премиальный световой блик через всю карточку */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[2.5rem] z-0">
         <div className="absolute top-0 bottom-0 w-[200%] bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent pointer-events-none" style={{ animation: 'premium-sweep 5s ease-in-out infinite' }}></div>
      </div>

      <div className="relative z-10 flex flex-col h-full gap-4">
        <div className="text-center pt-2">
          <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 text-transparent bg-clip-text tracking-wide uppercase">{CONTENT.starter.backTitle}</h3>
          <div className="w-16 h-0.5 bg-yellow-500/50 mx-auto mt-2 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-2.5 flex-1 content-center">
          {/* Блок 1 */}
          <div className="bg-zinc-900/60 backdrop-blur-xl p-3 rounded-2xl border border-yellow-500/20 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <Crown className="w-5 h-5 mb-1.5 text-yellow-400" />
            <p className="font-bold text-[11px] text-yellow-100">{CONTENT.starter.benefit1Title}</p>
            <p className="text-[8px] text-zinc-400 uppercase tracking-widest mt-0.5">{CONTENT.starter.benefit1Text}</p>
          </div>
          {/* Блок 2 */}
          <div className="bg-zinc-900/60 backdrop-blur-xl p-3 rounded-2xl border border-yellow-500/20 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <Wallet className="w-5 h-5 mb-1.5 text-yellow-400" />
            <p className="font-bold text-[11px] text-yellow-100">{CONTENT.starter.benefit2Title}</p>
            <p className="text-[8px] text-zinc-400 uppercase tracking-widest mt-0.5">{CONTENT.starter.benefit2Text}</p>
          </div>
          {/* Блок 3 */}
          <div className="bg-zinc-900/60 backdrop-blur-xl p-3 rounded-2xl border border-yellow-500/20 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <Globe className="w-5 h-5 mb-1.5 text-yellow-400" />
            <p className="font-bold text-[11px] text-yellow-100">{CONTENT.starter.benefit3Title}</p>
            <p className="text-[8px] text-zinc-400 uppercase tracking-widest mt-0.5">{CONTENT.starter.benefit3Text}</p>
          </div>
          {/* Блок 4 */}
          <div className="bg-zinc-900/60 backdrop-blur-xl p-3 rounded-2xl border border-yellow-500/20 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <Key className="w-5 h-5 mb-1.5 text-yellow-400" />
            <p className="font-bold text-[11px] text-yellow-100">{CONTENT.starter.benefit4Title}</p>
            <p className="text-[8px] text-zinc-400 uppercase tracking-widest mt-0.5">{CONTENT.starter.benefit4Text}</p>
          </div>
          {/* Блок 5 */}
          <div className="bg-zinc-900/60 backdrop-blur-xl p-3 rounded-2xl border border-yellow-500/20 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <Sparkles className="w-5 h-5 mb-1.5 text-yellow-400" />
            <p className="font-bold text-[11px] text-yellow-100">{CONTENT.starter.benefit5Title}</p>
            <p className="text-[8px] text-zinc-400 uppercase tracking-widest mt-0.5">{CONTENT.starter.benefit5Text}</p>
          </div>
          {/* Блок 6 */}
          <div className="bg-zinc-900/60 backdrop-blur-xl p-3 rounded-2xl border border-yellow-500/20 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <Diamond className="w-5 h-5 mb-1.5 text-yellow-400" />
            <p className="font-bold text-[11px] text-yellow-100">{CONTENT.starter.benefit6Title}</p>
            <p className="text-[8px] text-zinc-400 uppercase tracking-widest mt-0.5">{CONTENT.starter.benefit6Text}</p>
          </div>
        </div>

        <a href={CONTENT.starter.actionLink} className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-500 hover:to-yellow-300 text-zinc-950 font-black uppercase tracking-widest py-4 rounded-[2rem] flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] relative z-20">
          {CONTENT.starter.actionText}
        </a>
      </div>
    </div>
  </>
);

// 9. МАСТЕР МАНИКЮРА (Nail Artist)
const NailArtistCard = () => (
  <>
    {/* ЛИЦЕВАЯ СТОРОНА */}
    <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(244,114,182,0.3)] overflow-hidden bg-black text-white flex flex-col p-6 group-hover:shadow-[0_20px_80px_rgba(244,114,182,0.5)] transition-shadow duration-700">
      <div className="absolute inset-0 bg-gradient-to-tr from-rose-900 via-pink-800 to-amber-700/50 opacity-80 mix-blend-screen"></div>
      
      {/* Темный градиент для контраста лазера (чтобы он был тонким, как на других) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-rose-950/50 to-transparent"></div>
      
      {/* ЗАМЕНА СТАТИЧНОГО ФОНА НА СГОРАЮЩИЙ (Розовый огонь) */}
      <BurnRevealImage src={CONTENT.nail.bgImage} className="opacity-40 grayscale" burnColor="rose" />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-pink-300/30 flex items-center gap-2 shadow-[0_0_15px_rgba(244,114,182,0.2)]">
            <Sparkles className="w-4 h-4 text-pink-300" />
            <span className="text-xs font-medium tracking-widest uppercase text-pink-50">{CONTENT.nail.badge}</span>
          </div>
          <Droplets className="w-8 h-8 text-pink-200/80 drop-shadow-[0_0_15px_rgba(244,114,182,0.6)]" />
        </div>

        <div className="text-center pb-2">
          <h2 className="text-3xl sm:text-4xl leading-tight font-serif font-light mb-1 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-white to-rose-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            {CONTENT.nail.name1}
            <br />
            {CONTENT.nail.name2}
          </h2>
          <div className="flex flex-col items-center gap-2 mt-3">
            <p className="text-pink-200 font-serif font-medium text-[10px] uppercase tracking-[0.3em] bg-black/40 px-4 py-1.5 rounded-full border border-pink-300/30">
              {CONTENT.nail.role}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse shadow-[0_0_8px_rgba(251,113,133,0.8)]"></span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-rose-200">{CONTENT.nail.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ОБРАТНАЯ СТОРОНА (Dark Liquid Glass / Приглушенный Глянец) */}
    <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(244,114,182,0.3)] overflow-hidden flex flex-col p-6 text-white border border-rose-500/20 bg-gradient-to-br from-[#1c0f14] via-[#2a131d] to-[#120a0d]" style={{ transform: 'rotateY(180deg)' }}>
      
      {/* Блики глянца */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-rose-500/30 blur-[40px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 -right-12 w-40 h-40 bg-pink-600/30 blur-[50px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-56 h-56 bg-rose-400/20 blur-[40px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col h-full gap-4">
        
        {/* Header */}
        <div className="flex flex-col items-center mt-2">
          <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-rose-500 to-pink-300 shadow-[0_8px_20px_rgba(244,114,182,0.15)] mb-3">
            <img src={CONTENT.nail.avatar} alt={CONTENT.nail.name1} className="w-full h-full object-cover rounded-full border-2 border-[#1c0f14]" />
          </div>
          <h3 className="text-lg font-serif font-medium tracking-[0.15em] text-rose-50 uppercase">{CONTENT.nail.username}</h3>
          <p className="text-rose-400 text-[9px] mt-1 uppercase tracking-[0.2em] font-medium">{CONTENT.nail.subUsername}</p>
        </div>

        {/* Изящный разделитель */}
        <div className="flex justify-center items-center gap-2 my-1">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-rose-500/50"></div>
          <Star className="w-3 h-3 text-rose-400" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-rose-500/50"></div>
        </div>

        {/* Услуги (Glassmorphism list, Dark Theme) */}
        <div className="flex-1 flex flex-col gap-2.5 justify-center w-full">
          {[CONTENT.nail.service1, CONTENT.nail.service2, CONTENT.nail.service3].map((service, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex items-center justify-between shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
              <span className="font-serif font-light text-[13px] tracking-wide text-rose-50">{service}</span>
              <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center shadow-inner border border-rose-500/30">
                <Check className="w-3 h-3 text-rose-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Глянцевая манящая кнопка */}
        <a href={CONTENT.nail.actionLink} className="w-full bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white font-serif font-medium uppercase tracking-[0.15em] text-[11px] py-4 rounded-3xl flex items-center justify-center gap-2 transition-all shadow-[0_10px_25px_rgba(225,29,72,0.3)] border border-rose-500/30 relative overflow-hidden group mt-auto">
          {/* Эффект пробегающего блика */}
          <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-[shine_1s_ease-in-out]"></div>
          <Sparkles className="w-4 h-4 relative z-10" />
          <span className="relative z-10">{CONTENT.nail.actionText}</span>
        </a>
      </div>
    </div>
  </>
);

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [sparks, setSparks] = useState([]);
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  const [showShare, setShowShare] = useState(false); // Состояние для модального окна
  const [copied, setCopied] = useState(false);       // Состояние для копирования ссылки
  const [lang, setLang] = useState('RU');            // Состояние для языка
  const [showContactModal, setShowContactModal] = useState(false); // Состояние для окна контактов
  const cardRef = useRef(null);
  const audioCtxRef = useRef(null); // Реф для аудио контекста (чтобы звук не пропадал)
  const isFlippingRef = useRef(false); // Реф для блокировки наклона во время переворота

  // Глобальный параллакс фона (Живые сферы)
  useEffect(() => {
    const handleGlobalMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      // Вычисляем смещение от центра экрана (максимум 80px)
      const x = (clientX / window.innerWidth - 0.5) * 80;
      const y = (clientY / window.innerHeight - 0.5) * 80;
      
      // Инвертируем (-x, -y), чтобы фон плыл в противоположную от курсора сторону
      setBgOffset({ x: -x, y: -y });
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('touchmove', handleGlobalMove);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('touchmove', handleGlobalMove);
    };
  }, []);

  // Сброс переворота при смене вкладки
  useEffect(() => {
    setIsFlipped(false);
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  }, [activeTab]);

  // Магнитный 3D наклон за курсором/пальцем
  const handlePointerMove = (e) => {
    // Блокируем наклон, если карточка прямо сейчас переворачивается
    if (isFlippingRef.current || !cardRef.current) return;
    
    // Отключаем 3D наклон, если карточка повернута обратной стороной
    if (isFlipped) return;
    
    // Исключение для интерактивных зон (чтобы удобно было читать и нажимать)
    if (e.target.closest('.no-tilt')) {
      setRotate({ x: 0, y: 0 });
      setGlare(prev => ({ ...prev, opacity: 0 }));
      return;
    }
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Поддержка как мыши, так и тач-событий
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Максимальный угол наклона увеличен с 15 до 25 градусов для большей подвижности
    const rotateX = ((y - centerY) / centerY) * -25;
    const rotateY = ((x - centerX) / centerX) * 25;
    
    // Вычисляем позицию блика (в процентах)
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 1 });
  };

  // Сброс наклона, когда курсор уходит
  const handlePointerLeave = () => {
    if (isFlippingRef.current) return;
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  const playFlipSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      // Создаем контекст только один раз, чтобы браузер его не блокировал со временем
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume(); // Возобновляем, если браузер усыпил контекст
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Создаем мягкий звук "взмаха" или "карточки"
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Игнорируем ошибки (если автоплей заблокирован браузером)
    }
  };

  const handleFlip = () => {
    // Звук переворота (саунд-дизайн)
    playFlipSound();
    
    // Блокируем магнитный наклон и выравниваем карточку ровно при перевороте
    isFlippingRef.current = true;
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
    
    // Разблокируем наклон после завершения анимации переворота
    setTimeout(() => { isFlippingRef.current = false; }, 700);

    if (!isFlipped) {
      // Взрыв более яркой и крупной белой пыльцы
      const newSparks = Array.from({ length: 35 }).map((_, i) => {
        // Распределяем искры по кругу
        const angle = (Math.PI * 2 * i) / 35 + (Math.random() * 0.5);
        const distance = 80 + Math.random() * 100; // Мягкий стартовый разлет
        return {
          id: Date.now() + i,
          tx: Math.cos(angle) * distance + 'px',
          ty: Math.sin(angle) * distance + 'px',
          wx1: (Math.random() - 0.5) * 100 + 'px',
          wy1: (Math.random() - 0.5) * 100 + 'px',
          wx2: (Math.random() - 0.5) * 200 + 'px',
          wy2: (Math.random() - 0.5) * 200 + 'px',
          wx3: (Math.random() - 0.5) * 300 + 'px',
          wy3: (Math.random() - 0.5) * 300 + 'px',
          wt: (20 + Math.random() * 20) + 's', // Время полета от 20 до 40 секунд!
          size: Math.random() * 2.5 + 1.5 + 'px', // Сделали крупнее (от 1.5px до 4px)
        };
      });
      setSparks(newSparks);
    } else {
      // Очищаем искры при возврате на лицевую сторону
      setSparks([]);
    }

    // Вибрация (Haptic feedback) при поддержке устройством для премиум-ощущений
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      // Двойной мягкий импульс при перевороте карточки
      navigator.vibrate([30, 30, 40]); 
    }
    setIsFlipped(!isFlipped);
  };

  // Функция для получения цвета мобильного свечения в зависимости от шаблона
  const getGlowColor = () => {
    const colors = [
      'rgba(234,179,8,0.6)',  // 0: Старт (Золото)
      'rgba(147,51,234,0.6)', // 1: Эзотерик
      'rgba(13,148,136,0.5)', // 2: Психолог
      'rgba(249,115,22,0.6)', // 3: Турагент
      'rgba(236,72,153,0.6)', // 4: Блогер
      'rgba(225,29,72,0.6)',  // 5: Тренер
      'rgba(244,114,182,0.6)', // 6: Маникюр
      'rgba(148,163,184,0.6)', // 7: Риэлтор (Платина/Хром)
      'rgba(217,119,6,0.6)',  // 8: Брокер
      'rgba(16,185,129,0.6)'  // 9: Заработок
    ];
    return colors[activeTab] || colors[0];
  };

  // Получение индивидуальной темы для воздушного модального окна
  const getModalTheme = () => {
    const themes = [
      { bg: 'rgba(234,179,8,0.15)', border: 'rgba(234,179,8,0.3)', icon: 'text-yellow-400' }, // 0: Старт
      { bg: 'rgba(147,51,234,0.15)', border: 'rgba(147,51,234,0.3)', icon: 'text-purple-400' }, // 1: Эзотерик
      { bg: 'rgba(20,184,166,0.15)', border: 'rgba(20,184,166,0.3)', icon: 'text-teal-400' }, // 2: Психолог
      { bg: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.3)', icon: 'text-orange-400' }, // 3: Турагент
      { bg: 'rgba(236,72,153,0.15)', border: 'rgba(236,72,153,0.3)', icon: 'text-pink-400' }, // 4: Блогер
      { bg: 'rgba(225,29,72,0.15)', border: 'rgba(225,29,72,0.3)', icon: 'text-rose-400' }, // 5: Тренер
      { bg: 'rgba(244,114,182,0.15)', border: 'rgba(244,114,182,0.3)', icon: 'text-pink-400' }, // 6: Маникюр
      { bg: 'rgba(148,163,184,0.15)', border: 'rgba(148,163,184,0.3)', icon: 'text-slate-400' }, // 7: Риэлтор
      { bg: 'rgba(217,119,6,0.15)', border: 'rgba(217,119,6,0.3)', icon: 'text-amber-400' }, // 8: Брокер
      { bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.3)', icon: 'text-emerald-400' } // 9: Заработок
    ];
    return themes[activeTab] || themes[0];
  };

  // Функции для шаринга
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Моя цифровая визитка',
          text: 'Привет! Вот моя визитка с контактами:',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Шаринг отменен');
      }
    } else {
      handleCopy(); // Фолбек для десктопов без поддержки Web Share API
    }
  };

  // Вспомогательная функция для получения текущих данных контакта
  const getActiveContactInfo = () => {
    const c = CONTENT;
    switch(activeTab) {
      case 0: return { name: `${c.starter.title1} ${c.starter.title2}`, role: c.starter.role };
      case 1: return { name: `${c.esoteric.name1} ${c.esoteric.name2}`, role: c.esoteric.role };
      case 2: return { name: `${c.psychologist.name1} ${c.psychologist.name2}`, role: c.psychologist.role };
      case 3: return { name: `${c.travel.name1} ${c.travel.name2}`, role: c.travel.role };
      case 4: return { name: `${c.blogger.name1} ${c.blogger.name2}`, role: c.blogger.role };
      case 5: return { name: `${c.fitness.name1} ${c.fitness.name2}`, role: c.fitness.role };
      case 6: return { name: `${c.nail.name1} ${c.nail.name2}`, role: c.nail.role };
      case 7: return { name: `${c.realtor.name1} ${c.realtor.name2}`, role: c.realtor.role };
      case 8: return { name: `${c.broker.name1} ${c.broker.name2}`, role: c.broker.role };
      default: return { name: 'Контакт', role: 'Визитка' };
    }
  };

  // Генерация и скачивание vCard (универсально для iOS и Android)
  const downloadVCard = () => {
    const info = getActiveContactInfo();
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${info.name}`,
      `TITLE:${info.role}`,
      `URL:${typeof window !== 'undefined' ? window.location.href : ''}`,
      'END:VCARD'
    ].join('\n');
    
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 0, name: 'Старт', icon: <Crown className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { id: 1, name: 'Эзотерик', icon: <Moon className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { id: 2, name: 'Психолог', icon: <Brain className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { id: 3, name: 'Турагент', icon: <PlaneTakeoff className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { id: 4, name: 'Блогер', icon: <Camera className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { id: 5, name: 'Тренер', icon: <Activity className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { id: 6, name: 'Маникюр', icon: <Droplets className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { id: 7, name: 'Риэлтор', icon: <MapPin className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { id: 8, name: 'Брокер', icon: <Building2 className="w-3 h-3 sm:w-4 sm:h-4" /> },
  ];

  // Выбор активной карточки
  const renderActiveCard = () => {
    switch (activeTab) {
      case 0: return <StarterCard />;
      case 1: return <EsotericCard />;
      case 2: return <PsychologistCard />;
      case 3: return <TravelCard />;
      case 4: return <BloggerCard />;
      case 5: return <FitnessCard />;
      case 6: return <NailArtistCard />;
      case 7: return <RealtorCard />;
      case 8: return <RealEstateCard />;
      default: return <StarterCard />;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-neutral-950 flex flex-col font-sans select-none transition-all duration-500 relative overflow-hidden justify-center items-center p-4 sm:p-8">
      {/* Вставляем глобальные стили */}
      <style>{globalStyles}</style>

      {/* Фоновое свечение приложения (Живые сферы) */}
      <div 
        className="fixed top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${bgOffset.x}px, ${bgOffset.y}px)` }}
      ></div>
      <div 
        className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${bgOffset.x * 1.5}px, ${bgOffset.y * 1.5}px)` }}
      ></div>

      {/* ПЕРЕКЛЮЧАТЕЛЬ ШАБЛОНОВ (Парит под адресной строкой) */}
      <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 sm:px-0">
        <div className="flex p-1 bg-neutral-900/80 backdrop-blur-xl rounded-full border border-neutral-800 shadow-2xl overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                // Легкий одинарный импульс при переключении вкладок
                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                  navigator.vibrate(15);
                }
                setActiveTab(tab.id);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-[11px] sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-black shadow-md scale-[1.02]'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* КОНТЕЙНЕР ВИЗИТКИ И ЭЛЕМЕНТОВ УПРАВЛЕНИЯ */}
      <div className="w-full flex flex-col items-center relative z-40 mt-12 sm:mt-16">
        
        {/* Сама визитка */}
        <div 
          ref={cardRef}
          className="relative z-10 w-full aspect-[1/1.6] sm:aspect-[1/1.5] cursor-pointer group animate-float touch-none"
          style={{ perspective: '1500px', maxWidth: 'min(22rem, 85vw, 55vh)' }}
          onClick={handleFlip}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerLeave}
        >
          {/* Искры (Magic Dust) */}
          {sparks.map(spark => (
            <div
              key={spark.id}
              className="spark-particle"
              style={{
                '--tx': spark.tx,
                '--ty': spark.ty,
                '--wx1': spark.wx1,
                '--wy1': spark.wy1,
                '--wx2': spark.wx2,
                '--wy2': spark.wy2,
                '--wx3': spark.wx3,
                '--wy3': spark.wy3,
                '--wt': spark.wt,
                width: spark.size,
                height: spark.size,
                left: '50%',
                top: '50%',
                marginTop: '-' + (parseFloat(spark.size) / 2) + 'px',
                marginLeft: '-' + (parseFloat(spark.size) / 2) + 'px'
              }}
            />
          ))}

          {/* Обертка для магнитного 3D наклона (следит за мышью/пальцем) */}
          <div
            className="w-full h-full card-preserve-3d transition-transform duration-100 ease-out z-10 relative"
            style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
          >
            {/* Сама визитка с анимацией вращения (переворот на 180) */}
            <div 
              className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0.2,0.2,1)] card-preserve-3d"
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              {/* Дополнительное мощное свечение для мобилок */}
              <div 
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none sm:hidden card-backface-hidden" 
                style={{ boxShadow: `0 0 60px ${getGlowColor()}` }} 
              />
              <div 
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none sm:hidden card-backface-hidden" 
                style={{ transform: 'rotateY(180deg)', boxShadow: `0 0 60px ${getGlowColor()}` }} 
              />

              {renderActiveCard()}

              {/* Бегающий блик (Лицевая сторона) */}
              <div 
                className="absolute inset-0 w-full h-full rounded-[2.5rem] pointer-events-none transition-opacity duration-300 card-backface-hidden"
                style={{
                  background: `radial-gradient(farthest-corner circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 80%)`,
                  opacity: glare.opacity,
                  mixBlendMode: 'overlay',
                  zIndex: 50,
                }}
              />

              {/* Бегающий блик (Обратная сторона) */}
              <div 
                className="absolute inset-0 w-full h-full rounded-[2.5rem] pointer-events-none transition-opacity duration-300 card-backface-hidden"
                style={{
                  transform: 'rotateY(180deg) translateZ(0)',
                  background: `radial-gradient(farthest-corner circle at ${100 - glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 80%)`,
                  opacity: glare.opacity,
                  mixBlendMode: 'overlay',
                  zIndex: 50,
                }}
              />
            </div>
          </div>
        </div>

        {/* ПАНЕЛЬ КНОПОК ПОД ВИЗИТКОЙ (Языки, QR, Контакт) */}
        <div className="mt-8 sm:mt-10 flex items-center gap-3 sm:gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 relative">
          
          {/* Переключатель языков */}
          <div className="flex bg-black/40 rounded-full p-1">
            {['RU', 'AM', 'EN'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all duration-300 ${lang === l ? 'bg-white text-black shadow-md' : 'text-white/50 hover:text-white'}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Разделитель */}
          <div className="w-px h-6 bg-white/20 mx-1"></div>

          {/* Кнопка QR */}
          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
              setShowShare(true);
            }}
            className="p-2.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            aria-label="Поделиться"
          >
            <QrCode className="w-5 h-5" />
          </button>

          {/* Кнопка Контактов */}
          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
              setShowContactModal(true);
            }}
            className="p-2.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            aria-label="Сохранить контакт"
          >
            <UserPlus className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* МОДАЛЬНОЕ ОКНО ПОДЕЛИТЬСЯ (Индивидуальное, Воздушное) */}
      {showShare && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
          onClick={() => setShowShare(false)}
        >
          <div 
            className="backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-8 w-full max-w-sm flex flex-col items-center relative shadow-2xl animate-in zoom-in-95 duration-200 border" 
            style={{ backgroundColor: getModalTheme().bg, borderColor: getModalTheme().border }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowShare(false)} 
              className="absolute top-5 right-5 text-white/40 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors border border-white/5"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className={`w-12 h-12 rounded-full bg-black/20 flex items-center justify-center mb-4 border ${getModalTheme().icon.replace('text', 'border').replace('400', '500/30')}`}>
              <QrCode className={`w-6 h-6 ${getModalTheme().icon}`} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 tracking-wide">Поделиться визиткой</h3>
            <p className="text-sm text-white/60 text-center mb-6 leading-relaxed">Дайте отсканировать QR-код или отправьте ссылку напрямую.</p>
            
            {/* Динамический QR код (Белый непрозрачный фон для сканера) */}
            <div className="bg-white p-4 rounded-3xl mb-6 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=0&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://nice-app.ru')}`} 
                alt="QR Code" 
                className="w-[180px] h-[180px] object-contain rounded-lg"
              />
            </div>

            <div className="flex gap-3 w-full">
              <button 
                onClick={handleCopy}
                className="flex-1 bg-black/20 hover:bg-black/40 border border-white/10 text-white font-medium py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Скопировано!' : 'Копировать'}
              </button>
              <button 
                onClick={handleShare}
                className={`flex-1 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm`}
              >
                <Share2 className="w-4 h-4" />
                Отправить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО СОХРАНЕНИЯ КОНТАКТОВ (Снизу для мобилок) */}
      {showContactModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
          onClick={() => setShowContactModal(false)}
        >
          <div 
            className="bg-[#121212] sm:bg-zinc-900 rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 pb-12 sm:pb-8 w-full max-w-sm flex flex-col items-center relative shadow-2xl animate-in slide-in-from-bottom duration-300 sm:zoom-in-95 sm:border border-white/10" 
            onClick={e => e.stopPropagation()}
          >
            {/* Индикатор свайпа для мобилок */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mb-6 sm:hidden"></div>
            
            <button 
              onClick={() => setShowContactModal(false)} 
              className="absolute top-6 right-6 text-white/40 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors border border-white/5 hidden sm:block"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-14 h-14 rounded-full bg-black/40 flex items-center justify-center mb-4 border border-white/10 shadow-inner">
              <UserPlus className="w-7 h-7 text-white/80" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-6 tracking-wide text-center">Сохранить контакт</h3>
            
            <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 mb-6 shadow-inner flex flex-col items-center text-center">
              <p className="text-white font-black text-lg uppercase tracking-wider mb-1">{getActiveContactInfo().name}</p>
              <p className="text-white/50 text-xs font-medium tracking-[0.2em] uppercase mb-4">{getActiveContactInfo().role}</p>
              <div className="w-full h-px bg-white/10 mb-4"></div>
              <p className="text-blue-400 text-xs truncate max-w-full font-mono">{typeof window !== 'undefined' ? window.location.href : 'vcard_link'}</p>
            </div>

            <button 
              onClick={downloadVCard}
              className="w-full bg-white hover:bg-neutral-200 text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Download className="w-4 h-4" />
              Добавить в контакты
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;