
import React, { useState, useEffect, useRef } from 'react';
import { Task, Step, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { ChevronRight, Send, HelpCircle, Lightbulb, Activity, Timer } from 'lucide-react';
import { analyzeError } from '../services/geminiService';
import AnalysisOverlay from './AnalysisOverlay';
import VisualTaskRenderer from './VisualTaskRenderer';
import LatexRenderer from './LatexRenderer';

interface Props {
  task: Task;
  lang: Language;
  onComplete: (result: any) => void;
}

const StepByStepSolver: React.FC<Props> = ({ task, lang, onComplete }) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [startTime, setStartTime] = useState(Date.now());
  const [stepStartTime, setStepStartTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [showHint, setShowHint] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  
  const timerRef = useRef<any>(null);
  const t = TRANSLATIONS[lang];
  const content = task.content[lang];

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [startTime]);

  const handleAddStep = (manualContent?: string, metadata?: any) => {
    const textContent = manualContent || currentInput;
    if (!textContent.trim()) return;
    
    const now = Date.now();
    const duration = now - stepStartTime;
    const newStep: Step = {
      content: textContent,
      timestamp: now,
      duration: duration,
      metadata: metadata
    };
    setSteps([...steps, newStep]);
    setStepStartTime(now);
    setCurrentInput('');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const totalTime = Date.now() - startTime;
    let finalSteps = steps;
    if (currentInput.trim()) {
      const now = Date.now();
      finalSteps = [...steps, { content: currentInput, timestamp: now, duration: now - stepStartTime }];
    }
    
    const errorData = await analyzeError(task, finalSteps, totalTime);
    setAnalysis(errorData);
    setIsSubmitting(false);
    onComplete({ task, steps: finalSteps, totalTime, errorData });
  };

  const renderQuestion = (text: string) => {
    // Basic detection for formulas in questions
    if (text.includes('^') || text.includes('\\') || text.includes('[[') || text.includes('f(x)')) {
      return <LatexRenderer formula={text} block className="text-4xl" />;
    }
    return text;
  };

  return (
    <div className="relative w-full p-10 bg-zinc-900/60 rounded-[3rem] border border-zinc-800 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 flex justify-between items-start">
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-3">
             <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">{task.subject}</span>
             <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
               <Timer size={14} className="text-zinc-600" />
               <span>{elapsed}s Elapsed</span>
             </div>
          </div>
          <div className="text-4xl font-black mt-2 text-white leading-tight tracking-tight">
            {renderQuestion(content.question)}
          </div>
        </div>
        <button 
          onClick={() => setShowHint(!showHint)}
          className="p-4 hover:bg-zinc-800 rounded-3xl text-zinc-500 transition-all active:scale-90"
          title={t.hint}
        >
          <HelpCircle size={28} />
        </button>
      </div>

      {showHint && (
        <div className="mb-10 p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-[2.5rem] flex gap-6 animate-in zoom-in-95 duration-300">
          <Lightbulb className="text-indigo-400 shrink-0" size={32} />
          <p className="text-indigo-100 font-medium italic text-lg leading-relaxed">{content.hint}</p>
        </div>
      )}

      {task.interactionType !== 'TextStep' ? (
        <VisualTaskRenderer 
          task={task} 
          lang={lang} 
          onInteraction={(step) => {
            const now = Date.now();
            const duration = now - stepStartTime;
            setSteps([...steps, { ...step, duration }]);
            setStepStartTime(now);
          }} 
        />
      ) : (
        <div className="space-y-8 mb-12">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-8 group animate-in fade-in duration-500">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-black text-indigo-400 shrink-0 shadow-lg">
                {i + 1}
              </div>
              <div className="flex-1 p-8 bg-zinc-800/20 rounded-[2rem] border border-zinc-800 group-hover:border-zinc-500/50 transition-all">
                <p className="text-zinc-100 text-lg font-medium leading-relaxed">{s.content}</p>
                <div className="flex items-center gap-4 mt-6">
                  <Activity size={14} className="text-zinc-600" />
                  <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">{(s.duration / 1000).toFixed(1)}s Cognition Interval</span>
                </div>
              </div>
            </div>
          ))}

          <div className="flex gap-4">
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddStep()}
              placeholder={t.stepsPlaceholder}
              className="flex-1 bg-black/40 border border-zinc-800 rounded-3xl px-10 py-6 text-white focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-zinc-700 font-bold text-lg"
            />
            <button
              onClick={() => handleAddStep()}
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 rounded-3xl transition-all active:scale-95 border border-zinc-700 shadow-xl"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}

      {steps.length > 0 && (
        <div className="mt-12">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-white text-black font-black uppercase tracking-[0.3em] py-8 rounded-[2.5rem] hover:bg-zinc-200 transition-all flex items-center justify-center gap-6 shadow-2xl active:scale-[0.98] text-sm"
          >
            {isSubmitting ? <div className="animate-spin rounded-full h-8 w-8 border-4 border-black border-t-transparent" /> : <><Send size={24} /> {t.submit}</>}
          </button>
        </div>
      )}

      {analysis && (
        <AnalysisOverlay 
          analysis={analysis} 
          steps={steps} 
          lang={lang} 
          onClose={() => setAnalysis(null)} 
        />
      )}
    </div>
  );
};

export default StepByStepSolver;
