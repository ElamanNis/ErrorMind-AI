
import React, { useState } from 'react';
import { Task, Step, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Target, Layers, ArrowDownUp, AlertCircle } from 'lucide-react';

interface Props {
  task: Task;
  lang: Language;
  onInteraction: (step: Step) => void;
}

const VisualTaskRenderer: React.FC<Props> = ({ task, lang, onInteraction }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [sequence, setSequence] = useState<string[]>([]);
  const t = TRANSLATIONS[lang];

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (task.interactionType !== 'SpotTheError') return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const hit = task.visualMetadata?.hotspots?.find(h => {
      const distance = Math.sqrt(Math.pow(x - h.x, 2) + Math.pow(y - h.y, 2));
      return distance < h.radius;
    });

    if (hit) {
      setSelectedHotspot(hit.id);
      onInteraction({
        content: `Selected Hotspot: ${hit.label} at coordinates (${x.toFixed(1)}%, ${y.toFixed(1)}%)`,
        timestamp: Date.now(),
        duration: 0,
        metadata: { x, y, hotspotId: hit.id }
      });
    } else {
      onInteraction({
        content: `Clicked outside hotspot at (${x.toFixed(1)}%, ${y.toFixed(1)}%)`,
        timestamp: Date.now(),
        duration: 0,
        metadata: { x, y }
      });
    }
  };

  const handleSequenceMove = (id: string) => {
    if (sequence.includes(id)) {
      setSequence(sequence.filter(item => item !== id));
    } else {
      const newSeq = [...sequence, id];
      setSequence(newSeq);
      if (newSeq.length === (task.visualMetadata?.sequenceItems?.length || 0)) {
        onInteraction({
          content: `Finalized Sequence: ${newSeq.join(' -> ')}`,
          timestamp: Date.now(),
          duration: 0,
          metadata: { sequence: newSeq }
        });
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
        {task.interactionType === 'SpotTheError' && <Target className="text-indigo-400" />}
        {task.interactionType === 'Sequence' && <ArrowDownUp className="text-indigo-400" />}
        <span className="text-sm font-bold uppercase tracking-widest text-indigo-400">
          {task.interactionType === 'SpotTheError' ? t.spotTheError : t.sequenceTask}
        </span>
      </div>

      {/* Interactive Visual Area */}
      {task.interactionType === 'SpotTheError' && (
        <div 
          onClick={handleCanvasClick}
          className="relative w-full aspect-video bg-zinc-900 rounded-[2rem] border-4 border-zinc-800 overflow-hidden cursor-crosshair group shadow-2xl"
        >
          {/* Detailed Placeholder for Visual Asset */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <Layers className="text-zinc-700 mb-6" size={80} />
            <h4 className="text-xl font-black text-zinc-500 mb-4">SYSTEM VISUALIZATION</h4>
            <p className="text-zinc-600 text-sm font-medium leading-relaxed max-w-md italic">
              {task.visualMetadata?.assetDescription}
            </p>
          </div>

          {/* Hotspot Indicators (Visible only when found or for debugging in sandbox) */}
          {selectedHotspot && task.visualMetadata?.hotspots?.map(h => (
            h.id === selectedHotspot && (
              <div 
                key={h.id}
                style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.radius * 2}%`, height: `${h.radius * 2 * (16/9)}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 border-4 border-emerald-500/50 bg-emerald-500/10 rounded-full animate-pulse"
              />
            )
          ))}
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Interactive Surface Ready
          </div>
        </div>
      )}

      {/* Sequence Builder UI */}
      {task.interactionType === 'Sequence' && (
        <div className="grid gap-4">
          <div className="flex flex-wrap gap-3">
            {task.visualMetadata?.sequenceItems?.map(item => (
              <button
                key={item.id}
                onClick={() => handleSequenceMove(item.id)}
                className={`p-6 rounded-3xl border-2 transition-all text-left flex-1 min-w-[200px] ${sequence.includes(item.id) ? 'bg-indigo-600 border-indigo-400 scale-95 opacity-50' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-500'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black opacity-30">ACTION ITEM</span>
                  {sequence.indexOf(item.id) !== -1 && (
                    <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold">
                      {sequence.indexOf(item.id) + 1}
                    </span>
                  )}
                </div>
                <p className="font-bold text-sm leading-snug">{item.content}</p>
              </button>
            ))}
          </div>
          
          {sequence.length > 0 && (
            <div className="p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4">
              <h5 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active Logic Pipeline</h5>
              <div className="flex items-center flex-wrap gap-2">
                {sequence.map((id, idx) => (
                  <React.Fragment key={id}>
                    <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-xs font-bold text-indigo-400">
                      {task.visualMetadata?.sequenceItems?.find(i => i.id === id)?.content}
                    </div>
                    {idx < sequence.length - 1 && <span className="text-zinc-700">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VisualTaskRenderer;
