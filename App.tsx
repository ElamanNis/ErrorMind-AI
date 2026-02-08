
import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, LayoutDashboard, Dumbbell, 
  User as UserIcon, GraduationCap, Globe,
  Bookmark, MousePointer2, Pencil, Filter, ChevronDown,
  Sparkles, Briefcase, Award, Brain, LogOut, ArrowRight, Activity, Search,
  Target, Layers, Zap, Info, ChevronLeft, ShieldCheck
} from 'lucide-react';
import { Language, Level, Subject, User } from './types';
import { TRANSLATIONS, MOCK_TASKS } from './constants';
import { useSelection } from './hooks/useSelection';
import MistakeMap from './components/MistakeMap';
import Scratchpad from './components/Scratchpad';
import StepByStepSolver from './components/StepByStepSolver';
import MaterialsLibrary from './components/MaterialsLibrary';
import UserGuide from './components/UserGuide';
import Auth from './components/Auth';
import PlacementTest from './components/PlacementTest';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [page, setPage] = useState<'home' | 'dashboard' | 'training' | 'gym' | 'materials' | 'auth' | 'placement'>('home');
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<Level | 'All'>('All');
  const [showLevelMenu, setShowLevelMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTask, setActiveTask] = useState<any>(null);
  
  const { position, showPopup, saveNote, notes } = useSelection();
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const savedUser = localStorage.getItem('error_mind_current_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setCurrentUser(parsed);
      if (!parsed.placementCompleted && parsed.id) {
        setPage('placement');
      } else {
        setPage('dashboard');
      }
    }
  }, []);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('error_mind_current_user', JSON.stringify(user));
    if (!user.placementCompleted) {
      setPage('placement');
    } else {
      setPage('dashboard');
    }
  };

  const handlePlacementComplete = (level: Level, grade: number) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, placementCompleted: true, assignedLevel: level, assignedGrade: grade };
    setCurrentUser(updatedUser);
    localStorage.setItem('error_mind_current_user', JSON.stringify(updatedUser));
    
    // Sync with global users list
    const usersStr = localStorage.getItem('error_mind_users') || '[]';
    const users: User[] = JSON.parse(usersStr);
    const uIdx = users.findIndex(u => u.id === currentUser.id);
    if (uIdx !== -1) {
      users[uIdx] = updatedUser;
      localStorage.setItem('error_mind_users', JSON.stringify(users));
    }
    
    setPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('error_mind_current_user');
    setPage('home');
  };

  const filteredTasks = useMemo(() => {
    let result = MOCK_TASKS;
    if (selectedLevel !== 'All') result = result.filter(t => t.level === selectedLevel);
    else if (currentUser?.assignedLevel) result = result.filter(t => t.level === currentUser.assignedLevel);
    return result;
  }, [selectedLevel, currentUser]);

  const gymTasks = useMemo(() => {
    if (!currentUser) return [];
    return MOCK_TASKS.filter(t => currentUser.failedTaskIds.includes(t.id));
  }, [currentUser]);

  const goBack = () => {
    if (activeTask) {
      setActiveTask(null);
    } else if (page === 'training' || page === 'gym' || page === 'materials' || page === 'auth') {
      setPage('dashboard');
    } else if (page === 'dashboard') {
      setPage('home');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white font-inter">
      {showGuide && <UserGuide lang={lang} onClose={() => setShowGuide(false)} />}
      
      {/* Action Menu */}
      {showPopup && currentUser && (
        <div 
          style={{ left: position.x, top: position.y }}
          className="fixed z-[70] bg-zinc-900 border border-zinc-800 p-2 rounded-2xl shadow-3xl flex gap-1 transform -translate-x-1/2 mt-4 animate-in zoom-in-95 duration-200"
        >
          <button onClick={() => saveNote('Knowledge Vault', currentUser.id)} className="px-5 py-2.5 hover:bg-zinc-800 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-3 transition-colors">
            <Bookmark size={14} className="text-indigo-400" /> Capture Insight
          </button>
        </div>
      )}

      {/* Modern Static Nav */}
      <nav className="fixed top-0 w-full z-40 bg-black/70 backdrop-blur-3xl border-b border-zinc-900">
        <div className="max-w-screen-2xl mx-auto px-10 h-24 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setPage('home')}>
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black italic text-2xl shadow-[0_0_30px_rgba(79,70,229,0.4)] group-hover:scale-105 transition-all">E</div>
              <span className="font-black text-2xl tracking-tighter uppercase hidden sm:block">ErrorMind</span>
            </div>
            <button onClick={() => setShowGuide(true)} className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
              <Info size={14} /> {t.guide}
            </button>
          </div>

          <div className="flex items-center gap-8">
            {page !== 'home' && page !== 'placement' && (
               <button onClick={goBack} className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-all">
                  <ChevronLeft size={20} />
               </button>
            )}

            <div className="flex bg-zinc-900/50 border border-zinc-800 rounded-2xl p-1.5">
              {(['en', 'ru', 'kk'] as Language[]).map(l => (
                <button key={l} onClick={() => setLang(l)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${lang === l ? 'bg-zinc-800 text-white shadow-lg border border-white/5' : 'text-zinc-600 hover:text-zinc-300'}`}>
                  {l}
                </button>
              ))}
            </div>
            
            {currentUser ? (
              <div className="flex items-center gap-6 pl-8 border-l border-zinc-800">
                <button onClick={() => setPage('dashboard')} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700 group-hover:border-indigo-500 transition-colors">
                    <UserIcon size={20} className="text-zinc-400 group-hover:text-indigo-400" />
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Node Sync</p>
                    <p className="text-xs font-bold text-white">{currentUser.name}</p>
                  </div>
                </button>
                <button onClick={handleLogout} className="text-zinc-600 hover:text-red-500 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                 onClick={() => setPage('auth')}
                 className="bg-white text-black px-10 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5"
              >
                {t.login}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Experience */}
      <main className="pt-40 pb-32 px-10 max-w-screen-2xl mx-auto">
        {page === 'home' && (
          <div className="space-y-40">
            <section className="text-center space-y-16 py-20 relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-500/5 blur-[180px] rounded-full -z-10 animate-pulse" />
              <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
                <ShieldCheck size={16} /> Precision Education Systems
              </div>
              <h1 className="text-[5rem] md:text-[8rem] font-black tracking-tighter max-w-7xl mx-auto leading-[0.8] text-white uppercase">
                {t.heroTitle}
              </h1>
              <p className="text-2xl text-zinc-500 max-w-3xl mx-auto font-medium leading-relaxed">
                {t.heroSubtitle}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-10 pt-10">
                <button onClick={() => currentUser ? setPage('dashboard') : setPage('auth')} className="bg-indigo-600 hover:bg-indigo-500 text-white px-16 py-7 rounded-[2.5rem] font-black uppercase tracking-widest text-sm transition-all transform hover:scale-105 shadow-[0_25px_60px_-15px_rgba(79,70,229,0.5)] flex items-center gap-6 active:scale-95">
                   {t.getStarted} <ArrowRight size={24} />
                </button>
                <button onClick={() => setShowGuide(true)} className="px-16 py-7 rounded-[2.5rem] font-black uppercase tracking-widest text-sm transition-all text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10 flex items-center gap-6">
                   Technical Manual
                </button>
              </div>
            </section>
          </div>
        )}

        {page === 'auth' && <Auth lang={lang} onAuthSuccess={handleAuthSuccess} />}
        
        {page === 'placement' && <PlacementTest lang={lang} onComplete={handlePlacementComplete} />}

        {page === 'dashboard' && currentUser && (
          <div className="space-y-20 animate-in fade-in duration-700">
             <header className="flex justify-between items-end">
                <div className="space-y-4">
                  <h2 className="text-7xl font-black tracking-tightest uppercase">Systems Matrix</h2>
                  <div className="flex items-center gap-6">
                    <p className="text-zinc-500 text-2xl font-medium tracking-tight">Operator: {currentUser.name}</p>
                    <span className="px-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-400">
                      Level: {currentUser.assignedLevel} • Grade {currentUser.assignedGrade}
                    </span>
                  </div>
                </div>
             </header>

             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { id: 'training', icon: <Target />, color: 'bg-blue-600', title: t.trainingTile, desc: t.trainingDesc, action: () => setPage('training') },
                 { id: 'gym', icon: <Activity />, color: 'bg-rose-600', title: t.gymTile, desc: t.gymDesc, action: () => setPage('gym') },
                 { id: 'vault', icon: <Layers />, color: 'bg-emerald-600', title: t.libTile, desc: t.libDesc, action: () => setPage('materials') },
                 { id: 'analytics', icon: <Brain />, color: 'bg-amber-600', title: t.statsTile, desc: t.statsDesc, action: () => setPage('dashboard') }
               ].map(card => (
                 <div key={card.id} onClick={card.action} className="group p-10 bg-zinc-900/40 border border-zinc-800 rounded-[3rem] hover:border-zinc-600 transition-all cursor-pointer backdrop-blur-xl flex flex-col justify-between aspect-square relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -z-10 group-hover:bg-white/10 transition-colors" />
                    <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center text-white mb-10 shadow-2xl group-hover:scale-110 transition-transform`}>
                      {React.cloneElement(card.icon as React.ReactElement<any>, { size: 32 })}
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-black tracking-tighter uppercase">{card.title}</h3>
                      <p className="text-zinc-500 text-sm font-medium leading-relaxed">{card.desc}</p>
                    </div>
                 </div>
               ))}
             </div>

             <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <MistakeMap stats={currentUser.stats} />
                </div>
                <div className="bg-zinc-900/40 rounded-[3.5rem] border border-zinc-800 p-12 space-y-12 overflow-hidden flex flex-col">
                  <h3 className="text-2xl font-black uppercase tracking-widest text-zinc-500">Insight Repository</h3>
                  <div className="space-y-8 flex-1 overflow-y-auto pr-6 custom-scrollbar">
                    {notes.filter(n => n.userId === currentUser.id).length === 0 ? (
                      <div className="py-20 text-center opacity-20 text-xs font-black uppercase tracking-[0.4em]">Zero Insights Logged</div>
                    ) : (
                      notes.filter(n => n.userId === currentUser.id).map(n => (
                        <div key={n.id} className="p-8 bg-black/40 rounded-[2rem] border border-white/5 space-y-4 hover:border-indigo-500/30 transition-colors">
                           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                             <Bookmark size={12} /> Insight Captured
                           </div>
                           <p className="text-sm text-zinc-400 font-medium italic leading-relaxed">"{n.text}"</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
             </div>
          </div>
        )}

        {page === 'training' && (
          <div className="space-y-20 animate-in slide-in-from-bottom-12 duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-zinc-900">
              <div className="space-y-6">
                <button onClick={goBack} className="text-[10px] font-black uppercase text-zinc-600 hover:text-indigo-400 transition-colors tracking-[0.3em]">← {t.back}</button>
                <h2 className="text-[5rem] font-black tracking-tightest leading-none uppercase">Knowledge Arena</h2>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowLevelMenu(!showLevelMenu)}
                    className="flex items-center gap-4 px-8 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-zinc-500 transition-all shadow-xl"
                  >
                    <Filter size={16} /> Tier: {selectedLevel} <ChevronDown size={14} />
                  </button>
                  {showLevelMenu && (
                    <div className="absolute mt-16 w-64 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-3xl p-3 z-50 animate-in zoom-in-95 duration-200">
                      {['All', 'School', 'Bachelor', 'Master', 'Professor', 'Specialist', 'Expert'].map(lvl => (
                        <button key={lvl} onClick={() => { setSelectedLevel(lvl as any); setShowLevelMenu(false); }} className="w-full text-left px-6 py-4 hover:bg-zinc-800 rounded-2xl text-xs font-bold transition-colors">{lvl}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </header>

            {activeTask ? (
               <StepByStepSolver 
                task={activeTask} 
                lang={lang} 
                onComplete={(r) => {
                  const usersStr = localStorage.getItem('error_mind_users') || '[]';
                  const users: User[] = JSON.parse(usersStr);
                  const userIdx = users.findIndex(u => u.id === currentUser?.id);
                  if (userIdx !== -1 && currentUser) {
                    const eType = r.errorData.errorType.toLowerCase();
                    if (eType.includes('logical')) users[userIdx].stats.logical++;
                    if (eType.includes('computational')) users[userIdx].stats.computational++;
                    if (eType.includes('careless')) users[userIdx].stats.carelessness++;
                    if (eType.includes('strategy')) users[userIdx].stats.strategy++;
                    if (eType.includes('attention')) users[userIdx].stats.attention++;
                    
                    if (r.errorData.errorType !== 'Success' && r.errorData.errorType !== 'None') {
                      if (!users[userIdx].failedTaskIds.includes(activeTask.id)) {
                        users[userIdx].failedTaskIds.push(activeTask.id);
                      }
                    } else {
                      users[userIdx].solvedTaskIds.push(activeTask.id);
                    }
                    
                    localStorage.setItem('error_mind_users', JSON.stringify(users));
                    setCurrentUser(users[userIdx]);
                    localStorage.setItem('error_mind_current_user', JSON.stringify(users[userIdx]));
                  }
                  setActiveTask(null);
                }} 
              />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredTasks.map(task => (
                  <div key={task.id} onClick={() => setActiveTask(task)} className="group bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/50 transition-all cursor-pointer shadow-2xl relative">
                    <div className="aspect-video bg-zinc-800 flex items-center justify-center p-8 text-center relative overflow-hidden">
                       <Zap size={64} className="text-zinc-700 group-hover:text-indigo-500 transition-colors duration-500" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">{task.interactionType}</span>
                       </div>
                    </div>
                    <div className="p-10 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">{task.subject}</span>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${task.difficulty === 'Hard' ? 'text-rose-500' : 'text-emerald-500'}`}>{task.difficulty}</span>
                      </div>
                      <h3 className="text-2xl font-black leading-tight tracking-tight group-hover:text-indigo-100 transition-colors">{task.content[lang].question}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {page === 'gym' && (
          <div className="space-y-20 animate-in slide-in-from-bottom-12 duration-700">
             <header className="space-y-6 pb-12 border-b border-zinc-900">
                <button onClick={goBack} className="text-[10px] font-black uppercase text-zinc-600 hover:text-indigo-400 transition-colors tracking-[0.3em]">← {t.back}</button>
                <h2 className="text-[5rem] font-black tracking-tightest leading-none text-rose-500 uppercase">Error Lab</h2>
                <p className="text-zinc-500 text-2xl font-medium tracking-tight">Cognitive remediation for previously failed logical segments.</p>
             </header>

             {activeTask ? (
               <StepByStepSolver task={activeTask} lang={lang} onComplete={() => setActiveTask(null)} />
             ) : (
               gymTasks.length === 0 ? (
                 <div className="py-40 text-center space-y-10">
                   <div className="w-32 h-32 bg-zinc-900 rounded-full mx-auto flex items-center justify-center border border-zinc-800 shadow-3xl">
                      <Activity size={48} className="text-zinc-700" />
                   </div>
                   <h3 className="text-3xl font-black uppercase tracking-widest text-zinc-700">Cognitive Nodes Synchronized</h3>
                 </div>
               ) : (
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                   {gymTasks.map(task => (
                     <div key={task.id} onClick={() => setActiveTask(task)} className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-10 space-y-6 hover:border-rose-500/50 transition-all cursor-pointer shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-rose-600 opacity-50" />
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{task.subject}</span>
                          <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform"><Activity size={20} /></div>
                        </div>
                        <h3 className="text-2xl font-black tracking-tight group-hover:text-rose-100 transition-colors">{task.content[lang].question}</h3>
                        <button className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 group-hover:text-rose-400 transition-colors flex items-center gap-3">Replay Logic <ArrowRight size={14} /></button>
                     </div>
                   ))}
                 </div>
               )
             )}
          </div>
        )}

        {page === 'materials' && (
          <div className="space-y-10 animate-in fade-in duration-700">
             <button onClick={goBack} className="text-[10px] font-black uppercase text-zinc-600 hover:text-indigo-400 transition-colors tracking-[0.3em]">← {t.back}</button>
             <MaterialsLibrary lang={lang} />
          </div>
        )}
      </main>

      {/* Specialist Tool Overlay */}
      <button 
        onClick={() => setShowScratchpad(true)}
        className="fixed bottom-12 right-12 w-24 h-24 bg-indigo-600 rounded-[2.5rem] shadow-[0_25px_60px_-10px_rgba(79,70,229,0.5)] flex items-center justify-center hover:scale-110 hover:rotate-3 transition-all active:scale-95 z-50 group border-8 border-black"
      >
        <Pencil size={36} className="group-hover:scale-110 transition-transform" />
      </button>

      {showScratchpad && <Scratchpad onClose={() => setShowScratchpad(false)} />}
      
      <footer className="border-t border-zinc-900 pt-32 pb-20 mt-40">
        <div className="max-w-screen-2xl mx-auto px-10 grid md:grid-cols-4 gap-20">
          <div className="col-span-2 space-y-10">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center font-black italic text-xl">E</div>
                <span className="font-black tracking-tighter text-3xl text-white">ErrorMind</span>
             </div>
             <p className="text-zinc-500 text-xl font-medium leading-relaxed max-w-lg italic uppercase">Expert-level diagnostic infrastructure for engineering, medicine, and theoretical physics knowledge reinforcement.</p>
          </div>
          <div className="space-y-8">
             <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Cognitive Vault</h4>
             <div className="flex flex-col gap-5 text-sm text-zinc-400 font-bold uppercase tracking-widest">
                <button onClick={() => setPage('materials')} className="text-left hover:text-white transition-colors">Formulas</button>
                <button onClick={() => setPage('materials')} className="text-left hover:text-white transition-colors">Protocols</button>
                <button onClick={() => setShowGuide(true)} className="text-left hover:text-white transition-colors">Manual</button>
             </div>
          </div>
          <div className="space-y-8">
             <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Protocol</h4>
             <div className="flex flex-col gap-5 text-sm text-zinc-400 font-bold uppercase tracking-widest">
                <button className="text-left hover:text-white transition-colors">Neural Sync</button>
                <button className="text-left hover:text-white transition-colors">Encryption</button>
                <button className="text-left hover:text-white transition-colors">Logic Ethics</button>
             </div>
          </div>
        </div>
        <div className="max-w-screen-2xl mx-auto px-10 mt-32 pt-10 border-t border-zinc-900 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700">
           <p>© 2025 ERROR MIND. PRECISION CALIBRATED.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
