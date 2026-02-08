
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { UserStats } from '../types';

interface Props {
  stats?: UserStats;
}

const MistakeMap: React.FC<Props> = ({ stats }) => {
  const data = [
    { subject: 'Logical', A: stats?.logical || 0, fullMark: 20 },
    { subject: 'Computational', A: stats?.computational || 0, fullMark: 20 },
    { subject: 'Carelessness', A: stats?.carelessness || 0, fullMark: 20 },
    { subject: 'Strategy', A: stats?.strategy || 0, fullMark: 20 },
    { subject: 'Attention', A: stats?.attention || 0, fullMark: 20 },
  ];

  return (
    <div className="w-full h-[300px] bg-zinc-900/50 rounded-[2rem] border border-zinc-800 p-8 shadow-2xl backdrop-blur-sm">
      <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-zinc-500">Cognitive Bias Map</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }} />
          <Radar
            name="Errors"
            dataKey="A"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MistakeMap;
