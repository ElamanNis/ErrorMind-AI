
import React, { useState } from 'react';
import { User, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  lang: Language;
  onAuthSuccess: (user: User) => void;
}

const Auth: React.FC<Props> = ({ lang, onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const t = TRANSLATIONS[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const usersStr = localStorage.getItem('error_mind_users') || '[]';
    const users: User[] = JSON.parse(usersStr);

    if (mode === 'signup') {
      if (users.find(u => u.email === cleanEmail)) {
        setError(lang === 'ru' ? 'Пользователь уже существует' : 'User already exists');
        return;
      }
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: name.trim() || 'Operator',
        email: cleanEmail,
        password: cleanPassword,
        stats: { logical: 0, computational: 0, carelessness: 0, strategy: 0, attention: 0 },
        solvedTaskIds: [],
        failedTaskIds: [],
        placementCompleted: false,
        assignedGrade: 9,
        assignedLevel: 'School'
      };
      users.push(newUser);
      localStorage.setItem('error_mind_users', JSON.stringify(users));
      onAuthSuccess(newUser);
    } else {
      const user = users.find(u => u.email === cleanEmail && u.password === cleanPassword);
      if (user) {
        onAuthSuccess(user);
      } else {
        setError(lang === 'ru' ? 'Неверные данные доступа' : 'Invalid access credentials');
      }
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-6">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-black tracking-tighter uppercase">{t.authWelcome}</h2>
          <p className="text-zinc-500 font-medium text-sm">{t.authSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input
                type="text"
                placeholder={t.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-black border border-zinc-800 rounded-2xl px-12 py-4 text-sm focus:border-indigo-500 outline-none transition-colors"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <input
              type="email"
              placeholder={t.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black border border-zinc-800 rounded-2xl px-12 py-4 text-sm focus:border-indigo-500 outline-none transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <input
              type="password"
              placeholder={t.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black border border-zinc-800 rounded-2xl px-12 py-4 text-sm focus:border-indigo-500 outline-none transition-colors"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black text-center uppercase tracking-widest animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-white text-black font-black uppercase tracking-[0.2em] py-4 rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group"
          >
            {mode === 'login' ? t.login : t.signup}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-zinc-800">
          <button
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-indigo-400 transition-colors"
          >
            {mode === 'login' ? (lang === 'ru' ? "Нет аккаунта? Регистрация" : "Initialize Identity") : (lang === 'ru' ? "Уже есть аккаунт? Войти" : "Sync Identity")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
