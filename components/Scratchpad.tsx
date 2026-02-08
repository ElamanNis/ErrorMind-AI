
import React, { useRef, useEffect, useState } from 'react';
import { Eraser, Pencil, Trash2, X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const Scratchpad: React.FC<Props> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#6366f1');
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2;
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
    setIsDrawing(false);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.strokeStyle = tool === 'eraser' ? '#000' : color;
    ctx.lineWidth = tool === 'eraser' ? 20 : 2;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-black border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50">
      <div className="flex items-center justify-between p-3 border-b border-zinc-800 bg-zinc-900/50">
        <span className="text-sm font-medium">Scratchpad</span>
        <div className="flex gap-2">
          <button onClick={() => setTool('pen')} className={`p-1.5 rounded ${tool === 'pen' ? 'bg-zinc-700' : ''}`}><Pencil size={14} /></button>
          <button onClick={() => setTool('eraser')} className={`p-1.5 rounded ${tool === 'eraser' ? 'bg-zinc-700' : ''}`}><Eraser size={14} /></button>
          <button onClick={clear} className="p-1.5 hover:bg-zinc-700 rounded"><Trash2 size={14} /></button>
          <button onClick={onClose} className="p-1.5 hover:bg-zinc-700 rounded"><X size={14} /></button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={384}
        height={400}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
        className="bg-black cursor-crosshair"
      />
    </div>
  );
};

export default Scratchpad;
