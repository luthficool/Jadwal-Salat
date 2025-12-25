
import React, { useState, useEffect } from 'react';
import { RefreshCw, History, Target, ChevronLeft, ChevronRight } from 'lucide-react';

interface DzikirCounterProps {
  totalDzikir: number;
  onUpdateTotal: (newCount: number) => void;
}

const DzikirCounter: React.FC<DzikirCounterProps> = ({ totalDzikir, onUpdateTotal }) => {
  const [sessionCount, setSessionCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [history, setHistory] = useState<{name: string, count: number, date: string}[]>([]);

  const handleIncrement = () => {
    setSessionCount(prev => prev + 1);
    onUpdateTotal(totalDzikir + 1);
    
    // Simulate haptic/feedback
    if (window.navigator.vibrate) window.navigator.vibrate(10);
  };

  const resetSession = () => {
    if (sessionCount > 0) {
      setHistory(prev => [{
        name: 'Dzikir Sesi',
        count: sessionCount,
        date: new Date().toLocaleTimeString()
      }, ...prev].slice(0, 5));
    }
    setSessionCount(0);
  };

  const progress = (sessionCount / target) * 100;

  return (
    <div className="flex flex-col h-full space-y-8 pb-24">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Tasbih Digital</h1>
        <button onClick={resetSession} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
          <RefreshCw className="w-5 h-5" />
        </button>
      </header>

      {/* Target Selector */}
      <div className="flex items-center justify-center space-x-6">
        <button 
          onClick={() => setTarget(prev => Math.max(7, prev - 1))}
          className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Target</p>
          <div className="text-2xl font-bold text-emerald-600">{target}</div>
        </div>
        <button 
          onClick={() => setTarget(prev => prev + 1)}
          className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Main Counter UI */}
      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Progress Ring */}
          <svg className="absolute w-full h-full -rotate-90">
            <circle 
              cx="128" cy="128" r="110" 
              className="stroke-slate-100 fill-none" 
              strokeWidth="12" 
            />
            <circle 
              cx="128" cy="128" r="110" 
              className="stroke-emerald-500 fill-none transition-all duration-300" 
              strokeWidth="12" 
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 110}
              strokeDashoffset={2 * Math.PI * 110 * (1 - Math.min(progress, 100) / 100)}
            />
          </svg>

          {/* Hit Area */}
          <button 
            onClick={handleIncrement}
            className="w-48 h-48 rounded-full bg-white shadow-2xl flex flex-col items-center justify-center border-4 border-slate-50 active:scale-95 transition-all group z-10"
          >
            <span className="text-6xl font-black text-slate-800 tabular-nums">{sessionCount}</span>
            <span className="text-slate-300 font-bold mt-2 uppercase text-xs tracking-tighter">Ketuk</span>
          </button>
        </div>
      </div>

      {/* History Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center space-x-2 mb-4">
          <History className="w-4 h-4 text-indigo-500" />
          <h3 className="font-bold text-slate-700">Riwayat Terakhir</h3>
        </div>
        {history.length > 0 ? (
          <div className="space-y-3">
            {history.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-slate-50 last:border-0">
                <span className="text-slate-500">{item.date}</span>
                <span className="font-bold text-slate-800">{item.count} Kali</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">Mulai berdzikir untuk melihat riwayat.</p>
        )}
      </div>
    </div>
  );
};

export default DzikirCounter;
