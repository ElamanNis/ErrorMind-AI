
import { Task, Language, Material } from './types';

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    heroTitle: "Precision through Logic.",
    heroSubtitle: "The Global Knowledge Core. Diagnostic engine for School, Bachelor, Master, and PhD tiers.",
    getStarted: "Initialize Arena",
    errorGym: "Error Lab",
    dashboard: "Mission Control",
    materials: "Technical Vault",
    login: "Auth Node",
    signup: "Register Identity",
    logout: "Disconnect",
    knowledgeFolders: "Insight Logs",
    analysis: "AI Logic Diagnostic",
    errorType: "Vector Analysis",
    logicBreakPoint: "Failure Node",
    advice: "Corrective Protocol",
    hint: "Request Data",
    subjects: "Fields",
    levels: "Certifications",
    stepsPlaceholder: "Input derivation step (LaTeX supported)...",
    submit: "Run Analysis",
    reflectionTitle: "Cognitive Latency",
    reflectionDesc: "Tracking processing delays in logical nodes.",
    spotTheError: "Diagnostic Scan",
    sequenceTask: "Process Ordering",
    simulationTask: "Parameter Logic",
    authWelcome: "Access Required",
    authSubtitle: "Secure connection standby.",
    email: "Node Email",
    password: "Secure Key",
    name: "User Identity",
    trainingTile: "Knowledge Arena",
    trainingDesc: "Tests across K-12, Bachelor, Master, and Expert levels.",
    gymTile: "Cognitive Remediation",
    gymDesc: "Persistent focus on past failure vectors.",
    libTile: "Knowledge Vault",
    libDesc: "Raw formulas, constants, and ISO protocols.",
    statsTile: "Neuro-Matrix",
    statsDesc: "Live performance analytics.",
    searchPlaceholder: "Search (Ohm, Lorentz, Planck, Schrodinger)...",
    guide: "System Manual",
    back: "Go Back"
  },
  ru: {
    heroTitle: "Точность через Логику.",
    heroSubtitle: "Глобальное ядро знаний. Диагностика для уровней Школа, Бакалавриат, Магистратура и PhD.",
    getStarted: "Запуск Арены",
    errorGym: "Лаборатория Ошибок",
    dashboard: "Центр Управления",
    materials: "Технический Свод",
    login: "Вход",
    signup: "Регистрация",
    logout: "Отключение",
    knowledgeFolders: "Логи Инсайтов",
    analysis: "ИИ Диагностика Логики",
    errorType: "Вектор Ошибки",
    logicBreakPoint: "Узел Сбоя",
    advice: "Протокол Коррекции",
    hint: "Запрос Данных",
    subjects: "Области",
    levels: "Сертификация",
    stepsPlaceholder: "Введите шаг вывода (LaTeX поддерживается)...",
    submit: "Анализ",
    reflectionTitle: "Когнитивная Латентность",
    reflectionDesc: "Отслеживание задержек в узлах логики.",
    spotTheError: "Диагностический Скан",
    sequenceTask: "Порядок Процессов",
    simulationTask: "Логика Параметров",
    authWelcome: "Требуется Доступ",
    authSubtitle: "Ожидание защищенного соединения.",
    email: "Email Узла",
    password: "Ключ Доступа",
    name: "Идентификатор",
    trainingTile: "Арена Знаний",
    trainingDesc: "Тесты уровней Школа, Бакалавр, Магистр и Эксперт.",
    gymTile: "Когнитивное Исправление",
    gymDesc: "Фокус на прошлых векторах сбоев.",
    libTile: "Хранилище Знаний",
    libDesc: "Сырые формулы, константы и протоколы ISO.",
    statsTile: "Нейро-Матрица",
    statsDesc: "Живая аналитика производительности.",
    searchPlaceholder: "Поиск (Ом, Лоренц, Планк, Шредингер)...",
    guide: "Руководство",
    back: "Назад"
  },
  kk: {
    heroTitle: "Логика арқылы дәлдік.",
    heroSubtitle: "Жалпы білім орталығы. Мектеп, Бакалавриат, Магистратура және PhD деңгейлері.",
    getStarted: "Аренаны іске қосу",
    errorGym: "Қателер зертханасы",
    dashboard: "Басқару Орталығы",
    materials: "Техникалық қор",
    login: "Кіру",
    signup: "Тіркелу",
    logout: "Шығу",
    knowledgeFolders: "Инсайттар логы",
    analysis: "ИИ Логикалық диагностика",
    errorType: "Қате векторы",
    logicBreakPoint: "Сәтсіздік түйіні",
    advice: "Түзету хаттамасы",
    hint: "Деректерді сұрау",
    subjects: "Салалар",
    levels: "Сертификаттау",
    stepsPlaceholder: "Шығару қадамын енгізіңіз...",
    submit: "Талдау",
    reflectionTitle: "Когнитивті латенттілік",
    reflectionDesc: "Логикалық түйіндердегі кідірістерді бақылау.",
    spotTheError: "Диагностикалық скан",
    sequenceTask: "Процестер реті",
    simulationTask: "Параметрлер логикасы",
    authWelcome: "Рұқсат қажет",
    authSubtitle: "Байланыс орнатылуда.",
    email: "Email",
    password: "Құпия кілт",
    name: "Сәйкестендіру",
    trainingTile: "Білім Аренасы",
    trainingDesc: "Мектеп, Бакалавр, Магистр және Эксперт деңгейлері.",
    gymTile: "Когнитивті түзету",
    gymDesc: "Өткен қателерге назар аудару.",
    libTile: "Білім Қоры",
    libDesc: "Формулалар, тұрақтылар және ISO хаттамалары.",
    statsTile: "Нейро-Matrix",
    statsDesc: "Өнімділік аналитикасы.",
    searchPlaceholder: "Іздеу...",
    guide: "Нұсқаулық",
    back: "Артқа"
  }
};

export const MOCK_TASKS: Task[] = [
  // --- K-12: SCHOOL LEVEL (20 TASKS) ---
  {
    id: 'k12-math-01', level: 'School', subject: 'Mathematics', topic: 'Algebra', interactionType: 'TextStep', grade: 9,
    content: {
      en: { question: "Solve for x: 2x^2 - 8 = 0", solution: "x = 2, x = -2", hint: "Divide by 2 first, then use x^2 = k." },
      ru: { question: "Решите уравнение: 2x^2 - 8 = 0", solution: "x = 2, x = -2", hint: "Сначала разделите на 2, затем извлеките корень." },
      kk: { question: "Теңдеуді шешіңіз: 2x^2 - 8 = 0", solution: "x = 2, x = -2", hint: "Алдымен 2-ге бөліп, сосын түбірді табыңыз." }
    },
    difficulty: 'Easy'
  },
  {
    id: 'k12-phys-01', level: 'School', subject: 'Physics', topic: 'Mechanics', interactionType: 'TextStep', grade: 10,
    content: {
      en: { question: "A ball is dropped from 20m. Calculate the impact velocity (g=10m/s^2).", solution: "20 m/s", hint: "v = sqrt(2gh)" },
      ru: { question: "Мяч падает с 20м. Вычислите скорость удара (g=10м/с^2).", solution: "20 м/с", hint: "v = sqrt(2gh)" },
      // Added missing solution and hint properties for kk translation
      kk: { question: "Доп 20м биіктіктен құлайды. Соғу жылдамдығын есептеңіз (g=10м/с^2).", solution: "20 м/с", hint: "v = sqrt(2gh) формуласын қолданыңыз." }
    },
    difficulty: 'Medium'
  },

  // --- BACHELOR LEVEL (40 TASKS) ---
  {
    id: 'bac-med-01', level: 'Bachelor', subject: 'Medicine', topic: 'Anatomy', interactionType: 'SpotTheError',
    content: {
      en: { question: "Identify the incorrectly labeled Cranial Nerve in this brainstem model.", solution: "CN III (Oculomotor)", hint: "Exits between the cerebral peduncles." },
      ru: { question: "Найдите неправильно помеченный черепной нерв на модели ствола мозга.", solution: "III пара (Глазодвигательный)", hint: "Выходит между ножками мозга." },
      // Added missing solution and hint properties for kk translation
      kk: { question: "Ми діңі моделіндегі қате белгіленген жүйкені табыңыз.", solution: "III жұп (Көз қозғалтқыш жүйкесі)", hint: "Ми аяқшаларының арасынан шығады." }
    },
    visualMetadata: { assetDescription: "Brainstem lateral view. Labels: CN I, II, III, IV.", hotspots: [{ x: 40, y: 30, radius: 10, id: 'cn3', label: 'CN III Label' }] },
    difficulty: 'Hard'
  },
  {
    id: 'bac-eng-01', level: 'Bachelor', subject: 'Engineering', topic: 'Structural Analysis', interactionType: 'TextStep',
    content: {
      en: { question: "Calculate the maximum bending moment for a 5m simply supported beam with 10kN/m load.", solution: "31.25 kNm", hint: "M_max = (wL^2) / 8" },
      ru: { question: "Вычислите макс. изгибающий момент для балки 5м с нагрузкой 10кН/м.", solution: "31.25 кНм", hint: "M_max = (wL^2) / 8" },
      // Added missing solution and hint properties for kk translation
      kk: { question: "5м арқалықтың (10кН/м жүктеме) макс. иілу моментін есептеңіз.", solution: "31.25 кНм", hint: "M_max = (wL^2) / 8 формуласын қолданыңыз." }
    },
    difficulty: 'Hard'
  },

  // --- MASTER LEVEL (30 TASKS) ---
  {
    id: 'mast-ai-01', level: 'Master', subject: 'Computer Science', topic: 'Deep Learning', interactionType: 'TextStep',
    content: {
      en: { question: "Define the formula for Scaled Dot-Product Attention in a Transformer.", solution: "softmax(QK^T / sqrt(dk))V", hint: "Involves Query, Key, and Value matrices." },
      ru: { question: "Напишите формулу Scaled Dot-Product Attention для Трансформера.", solution: "softmax(QK^T / sqrt(dk))V", hint: "Используйте матрицы Q, K, V и размерность dk." },
      // Added missing solution and hint properties for kk translation
      kk: { question: "Трансформердегі Scaled Dot-Product Attention формуласын жазыңыз.", solution: "softmax(QK^T / sqrt(dk))V", hint: "Q, K, V матрицаларын қолданыңыз." }
    },
    difficulty: 'Hard'
  },
  {
    id: 'mast-fin-01', level: 'Master', subject: 'Engineering', topic: 'Financial Engineering', interactionType: 'TextStep',
    content: {
      en: { question: "Calculate the value of a call option using Black-Scholes if S=100, K=100, T=1, r=0.05, sigma=0.2.", solution: "10.45", hint: "Use d1 and d2 calculations." },
      ru: { question: "Рассчитайте стоимость колл-опциона по Блэку-Шоулзу: S=100, K=100, T=1, r=0.05, sigma=0.2.", solution: "10.45", hint: "Рассчитайте d1 и d2 через логарифмы." },
      // Added missing solution and hint properties for kk translation
      kk: { question: "Блэк-Шоулз бойынша колл-опцион құнын есептеңіз: S=100, K=100, T=1, r=0.05, sigma=0.2.", solution: "10.45", hint: "d1 және d2 есептеңіз." }
    },
    difficulty: 'Hard'
  },

  // --- EXPERT/PhD LEVEL (10 TASKS) ---
  {
    id: 'phd-phys-01', level: 'Expert', subject: 'Physics', topic: 'Quantum Mechanics', interactionType: 'TextStep',
    content: {
      en: { question: "Derive the time-independent Schrodinger equation for a particle in a 1D potential well.", solution: "- (hbar^2 / 2m) d^2psi/dx^2 + Vpsi = Epsi", hint: "Start with the Hamiltonian H = T + V." },
      ru: { question: "Выведите стационарное уравнение Шредингера для частицы в 1D потенциальной яме.", solution: "-(hbar^2/2m)psi'' + Vpsi = Epsi", hint: "Используйте Гамильтониан H = T + V." },
      // Added missing solution and hint properties for kk translation
      kk: { question: "1D потенциалды шұңқырдағы бөлшек үшін Шредингер теңдеуін шығарыңыз.", solution: "-(hbar^2/2m)psi'' + Vpsi = Epsi", hint: "H = T + V Гамильтонианын қолданыңыз." }
    },
    difficulty: 'Hard'
  }
];

export const MATERIALS_DATA: Material[] = [
  {
    id: 'phys-rel-e', subject: 'Physics', level: 'Specialist', category: 'Formulas',
    title: { en: "Mass-Energy Equivalence", ru: "Эквивалентность массы и энергии", kk: "Масса мен энергияның эквиваленттілігі" },
    content: {
      en: "E = m \\cdot c^2 \nEnergy = Mass \\times Speed of Light squared",
      ru: "E = m \\cdot c^2 \nЭнергия = Масса \\times Скорость света в квадрате",
      kk: "E = m \\cdot c^2"
    },
    calculator: {
      variables: [
        { id: 'mass', label: 'Mass (m)', unit: 'kg' },
        { id: 'c', label: 'Light Speed (c)', unit: 'm/s', min: 299792458, max: 299792458 }
      ],
      calculate: (vals) => vals.mass * Math.pow(299792458, 2)
    }
  },
  {
    id: 'eng-fluid-01', subject: 'Engineering', level: 'Bachelor', category: 'Formulas',
    title: { en: "Bernoulli's Equation", ru: "Уравнение Бернулли", kk: "Бернулли теңдеуі" },
    content: {
      en: "P + \\frac{1}{2} \\rho v^2 + \\rho g h = \\text{const}",
      ru: "P + \\frac{1}{2} \\rho v^2 + \\rho g h = \\text{const}",
      kk: "P + \\frac{1}{2} \\rho v^2 + \\rho g h = \\text{const}"
    },
    calculator: {
      variables: [
        { id: 'pressure', label: 'Static Pressure (P)', unit: 'Pa' },
        { id: 'rho', label: 'Density (ρ)', unit: 'kg/m³' },
        { id: 'velocity', label: 'Velocity (v)', unit: 'm/s' },
        { id: 'h', label: 'Height (h)', unit: 'm' }
      ],
      calculate: (vals) => vals.pressure + (0.5 * vals.rho * vals.velocity**2) + (vals.rho * 9.81 * vals.h)
    }
  },
  {
    id: 'med-dose-calc', subject: 'Medicine', level: 'Bachelor', category: 'Medical',
    title: { en: "Pediatric Dosage (Weight-based)", ru: "Расчет детской дозировки", kk: "Балаларға арналған мөлшерді есептеу" },
    content: {
      en: "Dose = Weight \\times Recommended Dose",
      ru: "Доза = Вес \\times Рекомендованная доза (мг/кг)",
      kk: "Dose = Weight \\times Recommended Dose"
    },
    calculator: {
      variables: [
        { id: 'weight', label: 'Child Weight', unit: 'kg' },
        { id: 'baseDose', label: 'Recommended Dose', unit: 'mg/kg' }
      ],
      calculate: (vals) => vals.weight * vals.baseDose
    }
  }
];