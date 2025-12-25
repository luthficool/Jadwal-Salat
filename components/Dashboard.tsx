
import React, { useState, useEffect } from 'react';
import { PrayerData, Dua } from '../types';
import { getNextPrayer } from '../services/prayerService';
import { getAIPrayerRecommendation } from '../services/geminiService';
import { PRAYER_NAMES } from '../constants';
import { Clock, Moon, Sun, Heart, Sparkles, ChevronRight } from 'lucide-react';

interface DashboardProps {
  prayerData: PrayerData | null;
  dzikirCount: number;
  onNavigate: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ prayerData, dzikirCount, onNavigate }) => {
  const [nextPrayer, setNextPrayer] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [aiDua, setAiDua] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (prayerData) {
      setNextPrayer(getNextPrayer(prayerData.timings));
    }
  }, [prayerData]);

  const fetchNewRecommendation = async () => {
    setLoadingAi(true);
    const rec = await getAIPrayerRecommendation();
    if (rec) setAiDua(rec);
    setLoadingAi(false);
  };

  useEffect(() => {
    fetchNewRecommendation();
  }, []);

  const timeString = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-emerald-100 font-medium mb-2">{prayerData?.date.hijri.day} {prayerData?.date.hijri.month.en} {prayerData?.date.hijri.year}H</p>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">{timeString}</h1>
          
          {nextPrayer && (
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md w-fit px-4 py-2 rounded-2xl">
              <Clock className="w-5 h-5 text-emerald-200" />
              <span className="text-sm font-medium">
                {PRAYER_NAMES[nextPrayer.name]} pukul {nextPrayer.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )}
        </div>
        
        {/* Decorations */}
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <Moon className="w-32 h-32" />
        </div>
      </section>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="bg-indigo-50 w-10 h-10 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">Total Dzikir</p>
            <p className="text-2xl font-bold text-slate-800">{dzikirCount}</p>
          </div>
          <button 
            onClick={() => onNavigate('dzikir')}
            className="text-indigo-600 text-xs font-bold flex items-center group"
          >
            Lanjut Dzikir <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="bg-rose-50 w-10 h-10 rounded-2xl flex items-center justify-center">
            <Heart className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">Doa Hari Ini</p>
            <p className="text-lg font-bold text-slate-800 truncate">Selesai Berdoa?</p>
          </div>
          <button 
             onClick={() => onNavigate('doa')}
             className="text-rose-600 text-xs font-bold flex items-center group"
          >
            Lihat Koleksi <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* AI Recommendation Card */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <h2 className="font-bold text-slate-800">Saran Doa Spesial</h2>
          </div>
          <button onClick={fetchNewRecommendation} disabled={loadingAi} className="text-xs text-slate-400 hover:text-slate-600">
            {loadingAi ? 'Mencari...' : 'Ganti'}
          </button>
        </div>
        
        {aiDua ? (
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-700">{aiDua.title}</h3>
            <p className="font-arabic text-2xl text-right leading-loose py-2 text-slate-800">
              {aiDua.arabic}
            </p>
            <p className="text-sm text-slate-500 italic leading-relaxed">
              "{aiDua.translation}"
            </p>
          </div>
        ) : (
          <div className="animate-pulse flex flex-col space-y-3">
            <div className="h-4 bg-slate-100 rounded w-1/4"></div>
            <div className="h-20 bg-slate-50 rounded"></div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
