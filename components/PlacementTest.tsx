
import React, { useState } from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, Level } from '../types';
import { ChevronRight, BrainCircuit, Target, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';

interface Props {
  lang: Language;
  onComplete: (level: Level, grade: number) => void;
}

const PlacementTest: React.FC<Props> = ({ lang, onComplete }) => {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<any>({});
  const t = TRANSLATIONS[lang];

  const questions = [
    {
      id: 'current_status',
      title: lang === 'ru' ? 'Ваш текущий статус?' : 'Current status?',
      options: [
        { label: lang === 'ru' ? 'Школьник (5-11 класс)' : 'School Student', value: 'School', grade: 9 },
        { label: lang === 'ru' ? 'Студент (Бакалавриат)' : 'Undergraduate', value: 'Bachelor', grade: 13 },
        { label: lang === 'ru' ? 'Магистр / Специалист' : 'Master / Specialist', value: 'Master', grade: 16 },
        { label: lang === 'ru' ? 'PhD / Исследователь' : 'Expert / Researcher', value: 'Expert', grade: 20 }
      ]
    },
    {
      id: 'focus_area',
      title: lang === 'ru' ? 'Основная область интересов?' : 'Primary area of focus?',
      options: [
        { label: 'STEM (Физика, Мат)', value: 'STEM' },
        { label: 'Medicine & Bio', value: 'Medicine' },
        { label: 'Computer Science', value: 'CS' },
        { label: 'Economics & Law', value: 'Econ' }
      ]
    },
    {
      id: 'error_habit',
      title: lang === 'ru' ? 'Типичная причина ошибок?' : 'Typical error cause?',
      options: [
        { label: lang === 'ru' ? 'Невнимательность' : 'Carelessness', value: 'attention' },
        { label: lang === 'ru' ? 'Недостаток теории' : 'Theory Gap', value: 'logical' },
        { label: lang === 'ru' ? 'Неверная стратегия' : 'Strategy Failure', value: 'strategy' }
      ]
    }
  ];

  const handleNext = (val: any) => {
    const updated = { ...selections, [questions[step].id]: val };
    setSelections(updated);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const level = updated.current_status.value as Level;
      const grade = updated.current_status.grade;
      onComplete(level, grade);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-8 mb-16">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
          <BrainCircuit size={16} /> Cognitive Calibration
        </div>
        <h2 className="text-6xl font-black tracking-tighter uppercase">{lang === 'ru' ? 'Калибровка Системы' : 'System Calibration'}</h2>
        <div className="flex justify-center gap-2">
          {questions.map((_, i) => (
            <div key={i} className={`h-1.5 w-12 rounded-full transition-all ${i <= step ? 'bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'bg-zinc-800'}`} />
          ))}
        </div>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800 p-12 rounded-[3.5rem] shadow-3xl space-y-10">
        <h3 className="text-2xl font-black uppercase tracking-tight text-white">{questions[step].title}</h3>
        <div className="grid gap-4">
          {questions[step].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleNext(opt)}
              className="group flex items-center justify-between p-8 bg-black/40 border border-zinc-800 rounded-3xl hover:border-indigo-500 transition-all text-left"
            >
              <span className="text-lg font-bold group-hover:text-indigo-400 transition-colors">{opt.label}</span>
              <ChevronRight className="text-zinc-700 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacementTest;
