export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

export const translations = {
  ja: {
    // Landing Page
    title: '心のトイレ',
    subtitle: 'その言葉、そっと水に流しませんか？',
    start: 'はじめる',
    feature1Title: '流して清める',
    feature1Desc: '嫌な言葉や思い出を、トイレに流してスッキリ',
    feature2Title: '心の癒し',
    feature2Desc: '泉で漂う言葉を眺めながら、心を落ち着かせる',
    feature3Title: 'みんなで共有',
    feature3Desc: '世界中の人が流した言葉を、美しいアートで体感',
    tagline: 'あなたの心を軽やかに。今すぐ体験してみてください。',

    // Toilet Selection
    selectStall: '個室を選んでください',
    stallA: '個室A',
    stallB: '個室B',
    stallC: '個室C',
    stallD: '個室D',
    tiredPeople: '最近疲れている人',
    goodThings: 'いいことがあった人',
    badThings: '最近嫌なことがあった人',
    anythingFlush: 'なんでもいいから流したい人',
    occupied: '使用中',
    available: '空いています',
    instruction: '空いている個室を選んで、心の重荷を流しましょう',
    privacy: 'プライベートな空間で、安心してご利用いただけます',
    entering: '個室に入っています...',
    welcome: 'お入りください',

    // Toilet Stall
    stallTitle: '個室',
    tiredMessage: '疲れの原因やメールのメッセージを入力して、レバーを引いて水に流しましょう',
    badMemoryMessage: '嫌な思い出や言葉を入力して、レバーを引いて水に流しましょう',
    anythingMessage: '水に流したい思い出や言葉を入力して、レバーを引いて水に流しましょう',
    placeholder: '忘れたい言葉や思いを入力してください...',
    voiceStart: '音声入力',
    voiceStop: '録音停止',
    flushInstruction: '嫌な思い出や言葉を入力して、水に流しましょう',
    charactersEntered: '文字入力済み',
    flushing: '流しています...',
    flushingMessage: 'あなたの心の重荷が軽くなっていきます',

    // Complete Page
    flushed: '流れました！',
    flushSuccess: 'あなたの心の重荷が水と共に流れていきました',
    heartLight: '心が軽やかになりましたね',
    viewSpring: '泉を見に行く',
    backToStart: '最初に戻る',
    encouragement: 'あなたは一歩前進しました。心の平静を大切にしてください。',

    // Spring Page
    springTitle: '言葉の泉',
    currentWords: '現在漂っている言葉',
    totalWords: 'これまでの総数',
    springMessage: '誰かが流した言葉がこの泉で静かに眠ります。',
    springSubMessage: 'あなたの心の重荷も、時間と共に軽やかになっていくでしょう',
    flushAgain: 'もう一度流す',
    words: 'words',
  },

  en: {
    // Landing Page
    title: 'Toilet of the Heart',
    subtitle: 'Why not gently let those words flow away?',
    start: 'Get Started',
    feature1Title: 'Flush & Cleanse',
    feature1Desc: 'Flush away negative words and memories for a fresh start',
    feature2Title: 'Healing Waters',
    feature2Desc: 'Find peace watching words float in the healing spring',
    feature3Title: 'Shared Experience',
    feature3Desc: 'Experience beautiful art from words flushed worldwide',
    tagline: 'Lighten your heart. Try it now.',

    // Toilet Selection
    selectStall: 'Choose a Stall',
    stallA: 'Stall A',
    stallB: 'Stall B',
    stallC: 'Stall C',
    stallD: 'Stall D',
    tiredPeople: 'For those feeling tired lately',
    goodThings: 'For those who had good things happen',
    badThings: 'For those who had bad things happen lately',
    anythingFlush: 'For those who want to flush anything',
    occupied: 'Occupied',
    available: 'Available',
    instruction: 'Choose an available stall to flush away your burdens',
    privacy: 'Private space for your comfort and peace of mind',
    entering: 'Entering stall...',
    welcome: 'Please come in',

    // Toilet Stall
    stallTitle: 'Stall',
    tiredMessage: 'Enter the cause of your fatigue or email messages, then pull the lever to flush them away',
    badMemoryMessage: 'Enter bad memories or words, then pull the lever to flush them away',
    anythingMessage: 'Enter memories or words you want to flush away, then pull the lever to flush them away',
    placeholder: 'Enter words or thoughts you want to forget...',
    voiceStart: 'Voice Input',
    voiceStop: 'Stop Recording',
    flushInstruction: 'Enter negative thoughts or words and flush them away',
    charactersEntered: 'characters entered',
    flushing: 'Flushing...',
    flushingMessage: 'Your emotional burden is becoming lighter',

    // Complete Page
    flushed: 'Flushed Away!',
    flushSuccess: 'Your emotional burden has flowed away with the water',
    heartLight: 'Your heart feels lighter now',
    viewSpring: 'Visit the Spring',
    backToStart: 'Back to Start',
    encouragement: 'You have taken a step forward. Cherish your peace of mind.',

    // Spring Page
    springTitle: 'Word Spring',
    currentWords: 'Currently floating words',
    totalWords: 'Total words so far',
    springMessage: 'Words that someone has flushed now rest quietly in this spring.',
    springSubMessage: 'Your emotional burdens will also become lighter with time',
    flushAgain: 'Flush Again',
    words: 'words',
  },

  ko: {
    // Landing Page
    title: '마음의 화장실',
    subtitle: '그 말을 조용히 물에 흘려보내지 않으시겠어요?',
    start: '시작하기',
    feature1Title: '흘려보내고 정화하기',
    feature1Desc: '싫은 말이나 기억을 변기에 흘려보내고 시원하게',
    feature2Title: '마음의 치유',
    feature2Desc: '샘에서 떠다니는 말들을 바라보며 마음을 진정시키기',
    feature3Title: '모두와 공유',
    feature3Desc: '전 세계 사람들이 흘려보낸 말을 아름다운 아트로 체험',
    tagline: '당신의 마음을 가볍게. 지금 바로 체험해보세요.',

    // Toilet Selection
    selectStall: '개실을 선택해주세요',
    stallA: '개실A',
    stallB: '개실B',
    stallC: '개실C',
    stallD: '개실D',
    tiredPeople: '최근 피곤한 사람',
    goodThings: '좋은 일이 있었던 사람',
    badThings: '최근 싫은 일이 있었던 사람',
    anythingFlush: '뭐든지 흘려보내고 싶은 사람',
    occupied: '사용중',
    available: '비어있음',
    instruction: '비어있는 개실을 선택해서 마음의 짐을 흘려보내세요',
    privacy: '프라이빗한 공간에서 안심하고 이용하실 수 있습니다',
    entering: '개실에 들어가고 있습니다...',
    welcome: '들어오세요',

    // Toilet Stall
    stallTitle: '개실',
    tiredMessage: '피로의 원인이나 이메일 메시지를 입력하고 레버를 당겨 물에 흘려보내세요',
    badMemoryMessage: '싫은 기억이나 말을 입력하고 레버를 당겨 물에 흘려보내세요',
    anythingMessage: '물에 흘려보내고 싶은 기억이나 말을 입력하고 레버를 당겨 물에 흘려보내세요',
    placeholder: '잊고 싶은 말이나 생각을 입력해주세요...',
    voiceStart: '음성 입력',
    voiceStop: '녹음 중지',
    flushInstruction: '싫은 기억이나 말을 입력해서 물에 흘려보내세요',
    charactersEntered: '글자 입력됨',
    flushing: '흘려보내는 중...',
    flushingMessage: '당신의 마음의 짐이 가벼워지고 있습니다',

    // Complete Page
    flushed: '흘려보냈습니다!',
    flushSuccess: '당신의 마음의 짐이 물과 함께 흘러갔습니다',
    heartLight: '마음이 가벼워졌네요',
    viewSpring: '샘 보러가기',
    backToStart: '처음으로 돌아가기',
    encouragement: '당신은 한 걸음 전진했습니다. 마음의 평정을 소중히 하세요.',

    // Spring Page
    springTitle: '말의 샘',
    currentWords: '현재 떠다니는 말',
    totalWords: '지금까지의 총 개수',
    springMessage: '누군가가 흘려보낸 말이 이 샘에서 조용히 잠듭니다.',
    springSubMessage: '당신의 마음의 짐도 시간과 함께 가벼워질 것입니다',
    flushAgain: '다시 흘려보내기',
    words: 'words',
  },

  zh: {
    // Landing Page
    title: '心灵的厕所',
    subtitle: '要不要让那些话语悄悄随水流走呢？',
    start: '开始',
    feature1Title: '冲洗净化',
    feature1Desc: '将讨厌的话语和回忆冲进马桶，让心情舒畅',
    feature2Title: '心灵治愈',
    feature2Desc: '观看泉水中漂浮的话语，让心灵平静',
    feature3Title: '共同分享',
    feature3Desc: '通过美丽的艺术体验全世界人们冲走的话语',
    tagline: '让你的心灵轻松起来。现在就来体验吧。',

    // Toilet Selection
    selectStall: '请选择隔间',
    stallA: '隔间A',
    stallB: '隔间B',
    stallC: '隔间C',
    stallD: '隔间D',
    tiredPeople: '最近感到疲惫的人',
    goodThings: '有好事发生的人',
    badThings: '最近遇到不好事情的人',
    anythingFlush: '想要冲走任何东西的人',
    occupied: '使用中',
    available: '空闲',
    instruction: '选择空闲的隔间，冲走心中的负担',
    privacy: '私人空间，让您安心使用',
    entering: '正在进入隔间...',
    welcome: '请进',

    // Toilet Stall
    stallTitle: '隔间',
    tiredMessage: '输入疲劳的原因或邮件信息，然后拉动杠杆冲走它们',
    badMemoryMessage: '输入不好的回忆或话语，然后拉动杠杆冲走它们',
    anythingMessage: '输入想要冲走的回忆或话语，然后拉动杠杆冲走它们',
    placeholder: '请输入想要忘记的话语或想法...',
    voiceStart: '语音输入',
    voiceStop: '停止录音',
    flushInstruction: '输入讨厌的回忆或话语，将它们冲走',
    charactersEntered: '个字符已输入',
    flushing: '正在冲洗...',
    flushingMessage: '你心中的负担正在变轻',

    // Complete Page
    flushed: '冲走了！',
    flushSuccess: '你心中的负担已经随水流走了',
    heartLight: '心情变轻松了呢',
    viewSpring: '去看泉水',
    backToStart: '回到开始',
    encouragement: '你向前迈进了一步。请珍惜内心的平静。',

    // Spring Page
    springTitle: '话语之泉',
    currentWords: '目前漂浮的话语',
    totalWords: '至今为止的总数',
    springMessage: '有人冲走的话语在这个泉水中静静地沉睡。',
    springSubMessage: '你心中的负担也会随着时间变得轻松',
    flushAgain: '再次冲洗',
    words: '个词',
  },

  es: {
    // Landing Page
    title: 'El baño del corazón',
    subtitle: '¿Por qué no dejas que esas palabras se vayan suavemente?',
    start: 'Comenzar',
    feature1Title: 'Lavar y Purificar',
    feature1Desc: 'Tira palabras y recuerdos negativos al inodoro para sentirte mejor',
    feature2Title: 'Sanación del Corazón',
    feature2Desc: 'Encuentra paz observando palabras flotando en el manantial',
    feature3Title: 'Compartir con Todos',
    feature3Desc: 'Experimenta arte hermoso con palabras de todo el mundo',
    tagline: 'Alivia tu corazón. Pruébalo ahora.',

    // Toilet Selection
    selectStall: 'Elige un Cubículo',
    stallA: 'Cubículo A',
    stallB: 'Cubículo B',
    stallC: 'Cubículo C',
    stallD: 'Cubículo D',
    tiredPeople: 'Para quienes se sienten cansados últimamente',
    goodThings: 'Para quienes les pasaron cosas buenas',
    badThings: 'Para quienes les pasaron cosas malas últimamente',
    anythingFlush: 'Para quienes quieren lavar cualquier cosa',
    occupied: 'Ocupado',
    available: 'Disponible',
    instruction: 'Elige un cubículo disponible para lavar tus cargas',
    privacy: 'Espacio privado para tu comodidad y tranquilidad',
    entering: 'Entrando al cubículo...',
    welcome: 'Por favor, pasa',

    // Toilet Stall
    stallTitle: 'Cubículo',
    tiredMessage: 'Ingresa la causa de tu fatiga o mensajes de correo, luego tira de la palanca para lavarlos',
    badMemoryMessage: 'Ingresa malos recuerdos o palabras, luego tira de la palanca para lavarlos',
    anythingMessage: 'Ingresa recuerdos o palabras que quieras lavar, luego tira de la palanca para lavarlos',
    placeholder: 'Ingresa palabras o pensamientos que quieres olvidar...',
    voiceStart: 'Entrada de Voz',
    voiceStop: 'Detener Grabación',
    flushInstruction: 'Ingresa pensamientos o palabras negativas y lávalas',
    charactersEntered: 'caracteres ingresados',
    flushing: 'Lavando...',
    flushingMessage: 'Tu carga emocional se está aliviando',

    // Complete Page
    flushed: '¡Lavado!',
    flushSuccess: 'Tu carga emocional se ha ido con el agua',
    heartLight: 'Tu corazón se siente más ligero ahora',
    viewSpring: 'Visitar el Manantial',
    backToStart: 'Volver al Inicio',
    encouragement: 'Has dado un paso adelante. Valora tu paz mental.',

    // Spring Page
    springTitle: 'Manantial de Palabras',
    currentWords: 'Palabras flotando actualmente',
    totalWords: 'Total de palabras hasta ahora',
    springMessage: 'Las palabras que alguien ha lavado descansan tranquilamente en este manantial.',
    springSubMessage: 'Tus cargas emocionales también se volverán más ligeras con el tiempo',
    flushAgain: 'Lavar de Nuevo',
    words: 'palabras',
  },

  fr: {
    // Landing Page
    title: 'Toilettes du cœur',
    subtitle: 'Pourquoi ne pas laisser ces mots s\'écouler doucement ?',
    start: 'Commencer',
    feature1Title: 'Évacuer et Purifier',
    feature1Desc: 'Tirez la chasse sur les mots et souvenirs négatifs pour vous sentir mieux',
    feature2Title: 'Guérison du Cœur',
    feature2Desc: 'Trouvez la paix en regardant les mots flotter dans la source',
    feature3Title: 'Partage Universel',
    feature3Desc: 'Vivez un art magnifique avec les mots du monde entier',
    tagline: 'Allégez votre cœur. Essayez maintenant.',

    // Toilet Selection
    selectStall: 'Choisissez une Cabine',
    stallA: 'Cabine A',
    stallB: 'Cabine B',
    stallC: 'Cabine C',
    stallD: 'Cabine D',
    tiredPeople: 'Pour ceux qui se sentent fatigués dernièrement',
    goodThings: 'Pour ceux qui ont eu de bonnes choses',
    badThings: 'Pour ceux qui ont eu de mauvaises choses dernièrement',
    anythingFlush: "Pour ceux qui veulent évacuer n'importe quoi",
    occupied: 'Occupé',
    available: 'Disponible',
    instruction: 'Choisissez une cabine disponible pour évacuer vos fardeaux',
    privacy: 'Espace privé pour votre confort et tranquillité d\'esprit',
    entering: 'Entrée dans la cabine...',
    welcome: 'Veuillez entrer',

    // Toilet Stall
    stallTitle: 'Cabine',
    tiredMessage: 'Entrez la cause de votre fatigue ou les messages d\'email, puis tirez le levier pour les évacuer',
    badMemoryMessage: 'Entrez de mauvais souvenirs ou mots, puis tirez le levier pour les évacuer',
    anythingMessage: 'Entrez des souvenirs ou mots que vous voulez évacuer, puis tirez le levier pour les évacuer',
    placeholder: 'Entrez les mots ou pensées que vous voulez oublier...',
    voiceStart: 'Saisie Vocale',
    voiceStop: 'Arrêter l\'Enregistrement',
    flushInstruction: 'Entrez des pensées ou mots négatifs et évacuez-les',
    charactersEntered: 'caractères saisis',
    flushing: 'Évacuation...',
    flushingMessage: "Votre fardeau émotionnel s'allège",

    // Complete Page
    flushed: 'Évacué !',
    flushSuccess: "Votre fardeau émotionnel s'est écoulé avec l'eau",
    heartLight: 'Votre cœur se sent plus léger maintenant',
    viewSpring: 'Visiter la Source',
    backToStart: 'Retour au Début',
    encouragement: 'Vous avez fait un pas en avant. Chérissez votre paix intérieure.',

    // Spring Page
    springTitle: 'Source des Mots',
    currentWords: 'Mots flottant actuellement',
    totalWords: "Total des mots jusqu'à présent",
    springMessage: 'Les mots que quelqu\'un a évacués reposent tranquillement dans cette source.',
    springSubMessage: 'Vos fardeaux émotionnels deviendront aussi plus légers avec le temps',
    flushAgain: 'Évacuer à Nouveau',
    words: 'mots',
  },
}

export type TranslationKey = keyof typeof translations.ja

export const getTranslation = (key: TranslationKey, lang: string = 'ja'): string => {
  const langTranslations = translations[lang as keyof typeof translations] || translations.ja

  return langTranslations[key] || translations.ja[key]
}

export const getCurrentLanguage = (): string => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('language') || 'ja'
  }

  return 'ja'
}

export const setCurrentLanguage = (lang: string): void => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('language', lang)
  }
}