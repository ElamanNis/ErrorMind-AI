
import React, { useState } from 'react';
import { FormulaCalculatorConfig } from '../types';
import { Calculator, Play } from 'lucide-react';

interface Props {
  config: FormulaCalculatorConfig;
  title: string;
}

const FormulaCalculator: React.FC<Props> = ({ config, title }) => {
  const [values, setValues] = useState<Record<string, number>>(
    config.variables.reduce((acc, v) => ({ ...acc, [v.id]: 0 }), {})
  );
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    try {
      const res = config.calculate(values);
      setResult(res);
    } catch (e) {
      console.error("Calculation error:", e);
    }
  };

  return (
    <div className="p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Calculator className="text-indigo-400" size={18} />
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Interactive Solver: {title}</h4>
      </div>

      <div className="grid gap-4">
        {config.variables.map(v => (
          <div key={v.id} className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-zinc-500 flex justify-between">
              {v.label} <span>[{v.unit}]</span>
            </label>
            <input 
              type="number" 
              value={values[v.id]}
              onChange={(e) => setValues({ ...values, [v.id]: parseFloat(e.target.value) || 0 })}
              className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none transition-all font-mono"
            />
          </div>
        ))}
      </div>

      <button 
        onClick={handleCalculate}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-indigo-600/20"
      >
        <Play size={14} fill="currentColor" /> Compute Result
      </button>

      {result !== null && (
        <div className="pt-4 border-t border-indigo-500/20 animate-in fade-in slide-in-from-top-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Computed Output</p>
          <div className="text-2xl font-black text-white font-mono">{result.toLocaleString()} <span className="text-sm font-medium opacity-50">result units</span></div>
        </div>
      )}
    </div>
  );
};

export default FormulaCalculator;
