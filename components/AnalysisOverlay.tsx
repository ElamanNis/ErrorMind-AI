
import React, { useState } from 'react';
import { X, Sparkles, BrainCircuit, Timer, MessageSquareText, TrendingUp, History, Play, Pause } from 'lucide-react';
import { Language, Step } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  analysis: any;
  steps: Step[];
  lang: Language;
  onClose: () => void;
}

const AnalysisOverlay: React.FC<Props> = ({ analysis, steps, lang, onClose }) => {
  const [replayIdx, setReplayIdx] = useState<number | null>(null);
  const t = TRANSLATIONS[lang];
  
  const avgReflection = steps.length > 0 ? steps.reduce((acc, s) => acc + s.duration, 0) / steps.length : 0;
  const slowestStep = [...steps].sort((a, b) => b.duration - a.duration)[0];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-zinc-900 border border-zinc-800 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row my-10">
        
        {/* Left Side: Mistake Replay & Metrics */}
        <div className="w-full lg:w-2/5 bg-indigo-600/5 p-10 border-r border-zinc-800 flex flex-col gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <History className="text-indigo-400" />
              <h3 className="text-xl font-black uppercase tracking-tighter">Mistake Replay</h3>
            </div>
            
            <div className="space-y-4">
              {steps.map((s, i) => (
                <div 
                  key={i} 
                  onMouseEnter={() => setReplayIdx(i)}
                  onMouseLeave={() => setReplayIdx(null)}
                  className={`p-5 rounded-2xl border transition-all cursor-help ${replayIdx === i ? 'bg-indigo-500/20 border-indigo-500 shadow-lg' : 'bg-black/40 border-zinc-800 opacity-60'}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Step {i+1}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${s.duration > avgReflection * 1.5 ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                      {(s.duration / 1000).toFixed(1)}s
                    </span>
                  </div>
                  <p className="text-sm font-medium line-clamp-2">{s.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-zinc-900/80 rounded-[2rem] border border-zinc-800 space-y-6">
             <div className="flex items-center gap-3 text-indigo-400">
               <TrendingUp size={20} />
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Diagnostic Metric</h4>
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <p className="text-[9px] font-black uppercase text-zinc-600">Avg Latency</p>
                 <p className="text-2xl font-black">{(avgReflection / 1000).toFixed(1)}s</p>
               </div>
               <div>
                 <p className="text-[9px] font-black uppercase text-zinc-600">Step Density</p>
                 <p className="text-2xl font-black">{steps.length}</p>
               </div>
             </div>
          </div>
        </div>

        {/* Right Side: Deep Logic Analysis */}
        <div className="w-full lg:w-3/5 p-12 flex flex-col gap-12 relative overflow-y-auto max-h-[85vh]">
          <button onClick={onClose} className="absolute top-10 right-10 p-3 hover:bg-zinc-800 rounded-full transition-colors z-10">
            <X size={24} />
          </button>

          <div className="space-y-4">
            <div className="inline-flex px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-widest border border-rose-500/20 animate-pulse">
              Detected Error: {analysis.errorType}
            </div>
            <h2 className="text-6xl font-black tracking-tightest uppercase leading-none">Logic Diagnostic</h2>
          </div>

          <div className="space-y-8">
            <section className="p-10 bg-zinc-800/20 rounded-[2.5rem] border border-zinc-800 group hover:border-indigo-500/50 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
                  <BrainCircuit size={24} />
                </div>
                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500">Break-point Node Analysis</h4>
              </div>
              <p className="text-xl text-indigo-100 font-medium leading-relaxed">{analysis.logicBreakPoint}</p>
            </section>

            <section className="p-10 bg-zinc-800/20 rounded-[2.5rem] border border-zinc-800 group hover:border-emerald-500/50 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                  <MessageSquareText size={24} />
                </div>
                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500">Expert Guidance</h4>
              </div>
              <p className="text-xl text-emerald-100 font-medium leading-relaxed italic">"{analysis.advice}"</p>
            </section>

            <div className="grid grid-cols-2 gap-6">
               <div className="p-6 bg-black/40 rounded-3xl border border-zinc-800">
                 <p className="text-[9px] font-black uppercase text-zinc-600 mb-2">Primary Failure Topic</p>
                 <p className="text-sm font-bold text-white">{analysis.trapTask}</p>
               </div>
               <div className="p-6 bg-black/40 rounded-3xl border border-zinc-800">
                 <p className="text-[9px] font-black uppercase text-zinc-600 mb-2">AI Confidence</p>
                 <p className="text-sm font-bold text-white uppercase tracking-widest">High (94%)</p>
               </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-8 bg-white text-black font-black uppercase tracking-[0.3em] rounded-[2rem] hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-2xl"
          >
            Acknowledge & Sync Knowledge
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisOverlay;
