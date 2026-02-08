
import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';
import { BookOpen, Target, Brain, Activity, MousePointer2, Pencil, ShieldCheck, X, FileText, Cpu, Zap } from 'lucide-react';

interface Props {
  lang: Language;
  onClose: () => void;
}

const UserGuide: React.FC<Props> = ({ lang, onClose }) => {
  const t = TRANSLATIONS[lang];

  const guideData = {
    en: {
      title: "ErrorMind Protocol Guide",
      subtitle: "Navigating the failure-to-mastery cognitive cycle.",
      sections: [
        {
          icon: <Target className="text-indigo-400" />,
          title: "The Diagnostic Arena",
          content: "Enter the testing environment to solve high-density academic and professional tasks. Unlike simple tests, you must input every step of your derivation. Our AI monitors the time between steps to map your 'Cognitive Latency' — identifying exactly where you hesitate or struggle."
        },
        {
          icon: <Brain className="text-rose-400" />,
          title: "AI Failure Analysis",
          content: "Every incorrect answer triggers a deep logic diagnostic. The system categorizes your error into 5 vectors: Logical, Computational, Carelessness, Strategy, or Attention. You will receive a 'Logic Break Point' report pinpointing the exact failure node in your thought process."
        },
        {
          icon: <Pencil className="text-emerald-400" />,
          title: "The Scratchpad & Mouse Drawing",
          content: "Enable the floating Pencil icon at any time. Use the Scratchpad to derive formulas, draw circuit diagrams, or visualize anatomical structures by hand. This workspace is essential for complex derivations before final input."
        },
        {
          icon: <FileText className="text-amber-400" />,
          title: "Knowledge Vault & Note Taking",
          content: "Access the raw technical repository for laws, formulas, and ISO protocols. You can highlight any text within the platform to instantly save it to your 'Knowledge Folders' for later neural reinforcement."
        },
        {
          icon: <Activity className="text-blue-400" />,
          title: "The Error Lab (Gym)",
          content: "Persistent failures are moved here. The Lab allows you to 'Replay' your logic for failed tasks until the cognitive gap is fully remediated and a successful logic flow is achieved."
        }
      ]
    },
    ru: {
      title: "Гид по Системе ErrorMind",
      subtitle: "Навигация по когнитивному циклу от ошибки к мастерству.",
      sections: [
        {
          icon: <Target className="text-indigo-400" />,
          title: "Диагностическая Арена",
          content: "Входите в среду тестирования для решения академических и проф. задач. В отличие от простых тестов, здесь нужно вводить каждый шаг вывода. ИИ отслеживает время между шагами для построения карты 'Когнитивной Латентности'."
        },
        {
          icon: <Brain className="text-rose-400" />,
          title: "ИИ Анализ Ошибок",
          content: "Каждый неверный ответ запускает глубокую диагностику логики. Система классифицирует ошибку по 5 векторам: Логика, Вычисления, Невнимательность, Стратегия или Внимание."
        },
        {
          icon: <Pencil className="text-emerald-400" />,
          title: "Скретчпад и Рисование",
          content: "Активируйте плавающую иконку карандаша. Используйте Скретчпад для вывода формул, рисования схем или визуализации структур от руки."
        },
        {
          icon: <FileText className="text-amber-400" />,
          title: "Хранилище Знаний и Заметки",
          content: "Доступ к базе законов, формул и ISO протоколов. Вы можете выделить любой текст на платформе, чтобы мгновенно сохранить его в 'Папку Знаний'."
        },
        {
          icon: <Activity className="text-blue-400" />,
          title: "Лаборатория Ошибок (Error Lab)",
          content: "Сюда попадают нерешенные задачи. Лаборатория позволяет 'переиграть' логику проваленных заданий до полного устранения пробелов в знаниях."
        }
      ]
    },
    kk: {
      title: "ErrorMind Жүйелік Нұсқаулығы",
      subtitle: "Қателіктен шеберлікке дейінгі когнитивті цикл.",
      sections: [
        {
          icon: <Target className="text-indigo-400" />,
          title: "Диагностикалық Арена",
          content: "Академиялық және кәсіби есептерді шешуге арналған орта. Кәдімгі тесттерден айырмашылығы, мұнда әрбір қадамды енгізу керек. ИИ әр қадам арасындағы уақытты есептеп, 'Когнитивті кідіріс' картасын жасайды."
        },
        {
          icon: <Brain className="text-rose-400" />,
          title: "ИИ Қателер Талдауы",
          content: "Әрбір қате жауап логикалық диагностиканы іске қосады. Жүйе қатеңізді 5 вектор бойынша жіктейді: Логикалық, Есептеу, Невнимательность, Стратегия немесе Назар аудару."
        }
      ]
    }
  };

  const currentGuide = guideData[lang] || guideData.en;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl p-10 overflow-y-auto animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto space-y-20 relative py-20">
        <button onClick={onClose} className="fixed top-12 right-12 p-4 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 transition-all z-[110]">
          <X size={32} />
        </button>

        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">
            <ShieldCheck size={16} /> Technical Documentation
          </div>
          <h1 className="text-[6rem] font-black tracking-tightest leading-[0.8] text-white uppercase">{currentGuide.title}</h1>
          <p className="text-2xl text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed">{currentGuide.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {currentGuide.sections.map((section, idx) => (
            <div key={idx} className="group p-12 bg-zinc-900/40 border border-zinc-800 rounded-[3.5rem] hover:border-zinc-500 transition-all space-y-8">
              <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                {/* Fixed the type mismatch by casting the element to a generic ReactElement with any props */}
                {React.cloneElement(section.icon as React.ReactElement<any>, { size: 36 })}
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black tracking-tighter uppercase">{section.title}</h3>
                <p className="text-zinc-500 text-lg font-medium leading-relaxed">{section.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-16 bg-indigo-600 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-12 shadow-[0_50px_100px_-20px_rgba(79,70,229,0.4)]">
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight uppercase">Ready to calibrate?</h2>
            <p className="text-indigo-100/70 text-lg font-medium">Failure is the highest data source. Start the diagnostic arena now.</p>
          </div>
          <button onClick={onClose} className="px-16 py-8 bg-white text-black rounded-3xl font-black uppercase tracking-widest hover:bg-zinc-100 transition-all active:scale-95 text-lg">
            Initialize Arena
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10 opacity-30">
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest"><Cpu size={20}/> Neural Analysis v4.2</div>
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest"><Zap size={20}/> CODATA Standardized</div>
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest"><Target size={20}/> Precision Diagnostic</div>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
