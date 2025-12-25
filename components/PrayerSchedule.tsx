
import React from 'react';
import { PrayerData } from '../types';
import { MapPin, Bell, BellOff } from 'lucide-react';
import { PRAYER_NAMES } from '../constants';

interface PrayerScheduleProps {
  prayerData: PrayerData | null;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
}

const PrayerSchedule: React.FC<PrayerScheduleProps> = ({ prayerData, notificationsEnabled, toggleNotifications }) => {
  if (!prayerData) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
    </div>
  );

  const prayers = Object.entries(prayerData.timings)
    .filter(([key]) => PRAYER_NAMES[key])
    .map(([key, time]) => ({
      name: PRAYER_NAMES[key],
      raw: key,
      time
    }));

  return (
    <div className="space-y-6 pb-20">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Jadwal Sholat</h1>
          <div className="flex items-center text-slate-400 text-sm mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            <span>Lokasi Anda Sekarang</span>
          </div>
        </div>
        <button 
          onClick={toggleNotifications}
          className={`p-3 rounded-2xl transition-all ${notificationsEnabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}
        >
          {notificationsEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
        </button>
      </header>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
        {prayers.map((prayer, idx) => {
          const isNext = false; // logic simplified for display
          return (
            <div 
              key={prayer.raw} 
              className={`flex items-center justify-between p-6 ${idx !== prayers.length - 1 ? 'border-b border-slate-50' : ''} ${isNext ? 'bg-emerald-50/50' : ''}`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${isNext ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {idx + 1}
                </div>
                <span className={`font-semibold ${isNext ? 'text-emerald-700' : 'text-slate-700'}`}>{prayer.name}</span>
              </div>
              <span className={`text-xl font-bold ${isNext ? 'text-emerald-600' : 'text-slate-900'}`}>{prayer.time}</span>
            </div>
          );
        })}
      </div>

      <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
        <h3 className="text-indigo-900 font-bold mb-1">Informasi Hisab</h3>
        <p className="text-indigo-700 text-sm leading-relaxed">
          Waktu sholat dihitung berdasarkan lokasi geografis perangkat Anda ({prayerData.meta.timezone}). Menggunakan metode standar Kemenag RI / Muslim World League.
        </p>
      </div>
    </div>
  );
};

export default PrayerSchedule;
