
import React, { useState } from 'react';
import { MATERIALS_DATA, TRANSLATIONS } from '../constants';
import { Language, Subject } from '../types';
import { Book, ChevronRight, FileText, Search, Atom, Calculator, Zap, Microscope, Stethoscope, Copy, Cpu } from 'lucide-react';
import LatexRenderer from './LatexRenderer';
import FormulaCalculator from './FormulaCalculator';

interface Props {
  lang: Language;
}

const MaterialsLibrary: React.FC<Props> = ({ lang }) => {
  const [filter, setFilter] = useState<Subject | 'All'>('All');
  const [search, setSearch] = useState('');
  const t = TRANSLATIONS[lang];

  const filtered = MATERIALS_DATA.filter(m => {
    const matchesFilter = filter === 'All' || m.subject === filter;
    const matchesSearch = m.title[lang].toLowerCase().includes(search.toLowerCase()) || 
                          m.content[lang].toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const subjects: Subject[] = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Medicine', 'Engineering', 'Computer Science'];

  const getSubjectIcon = (s: Subject) => {
    switch (s) {
      case 'Physics': return <Atom size={18} />;
      case 'Mathematics': return <Calculator size={18} />;
      case 'Engineering': return <Zap size={18} />;
      case 'Medicine': return <Stethoscope size={18} />;
      case 'Chemistry': return <Microscope size={18} />;
      default: return <FileText size={18} />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="flex flex-col gap-10 pb-12 border-b border-zinc-900">
        <div className="space-y-4">
          <h2 className="text-7xl font-black tracking-tighter flex items-center gap-6">
            <Book className="text-indigo-500" size={56} /> {t.materials}
          </h2>
          <p className="text-zinc-500 text-xl font-medium max-w-2xl leading-relaxed">The high-density knowledge core containing expert formulas, protocols, and derivations across 8 academic fields.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl pl-16 pr-8 py-6 text-sm focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-700 font-bold"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilter('All')}
              className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'All' ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:border-zinc-500'}`}
            >
              All Data
            </button>
            {subjects.map(s => (
              <button 
                key={s}
                onClick={() => setFilter(s)}
                className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${filter === s ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:border-zinc-500'}`}
              >
                {getSubjectIcon(s)}
                {s}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filtered.length > 0 ? filtered.map(mat => (
          <div key={mat.id} className="group p-10 bg-zinc-900/30 rounded-[3rem] border border-zinc-800/50 hover:border-indigo-500/50 transition-all backdrop-blur-md flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] -z-10 group-hover:bg-indigo-500/10 transition-colors" />
            
            <div className="flex justify-between items-start">
              <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400">
                {getSubjectIcon(mat.subject)}
              </div>
              <div className="flex gap-2">
                {mat.calculator && (
                  <span className="text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-full text-emerald-400 border border-emerald-500/20 flex items-center gap-2">
                    <Cpu size={12} /> Live Solver
                  </span>
                )}
                <span className="text-[9px] font-black uppercase tracking-widest bg-zinc-800/80 px-3 py-1.5 rounded-full text-zinc-400 border border-white/5">
                  {mat.level}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black group-hover:text-white transition-colors leading-tight">{mat.title[lang]}</h3>
              <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.2em]">{mat.subject} Protocol • {mat.category}</p>
            </div>

            <div className="flex-1 p-8 bg-black/60 rounded-3xl border border-white/5 font-mono text-sm text-indigo-100 leading-relaxed overflow-hidden whitespace-pre-wrap select-all shadow-inner">
              {mat.content[lang].split('\n').map((line, i) => {
                if (line.includes('\\') || line.includes('^') || line.includes('_')) {
                  return <div key={i} className="my-2"><LatexRenderer formula={line} block /></div>;
                }
                return <div key={i}>{line}</div>;
              })}
            </div>

            {mat.calculator && (
              <FormulaCalculator config={mat.calculator} title={mat.title[lang]} />
            )}

            <button 
              onClick={() => copyToClipboard(mat.content[lang])}
              className="w-full py-4 bg-zinc-800/40 hover:bg-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 group-hover:text-white"
            >
              <Copy size={14} /> Copy Reference Module <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )) : (
          <div className="col-span-full py-40 text-center space-y-4">
             <div className="w-20 h-20 bg-zinc-900 rounded-3xl mx-auto flex items-center justify-center border border-zinc-800 text-zinc-700">
               <Search size={32} />
             </div>
             <p className="text-zinc-600 font-black uppercase tracking-widest text-xs">No records matching your neural query.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialsLibrary;
