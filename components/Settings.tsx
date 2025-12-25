
import React from 'react';
import { User, Bell, Palette, Map, Info, ChevronRight, LogOut } from 'lucide-react';

interface SettingsProps {
  notifications: boolean;
  onToggleNotifications: () => void;
}

const Settings: React.FC<SettingsProps> = ({ notifications, onToggleNotifications }) => {
  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold text-slate-800">Pengaturan</h1>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center space-x-4">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-xl">
            A
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Hamba Allah</h3>
            <p className="text-slate-400 text-sm">Lokasi: Jakarta, Indonesia</p>
          </div>
        </div>

        <div className="p-4 space-y-1">
          <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <User className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-700">Profil Saya</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </button>

          <button 
            onClick={onToggleNotifications}
            className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                <Bell className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-700">Notifikasi Sholat</span>
            </div>
            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications ? 'bg-emerald-500' : 'bg-slate-200'}`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifications ? 'translate-x-6' : ''}`}></div>
            </div>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <Palette className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-700">Tema Aplikasi</span>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Modern Teal</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Map className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-700">Atur Lokasi</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 space-y-1">
        <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-slate-50 text-slate-500 rounded-xl">
              <Info className="w-5 h-5" />
            </div>
            <span className="font-semibold text-slate-700">Tentang Aplikasi</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </button>
        
        <button className="w-full flex items-center space-x-4 p-4 rounded-2xl text-rose-500 hover:bg-rose-50 transition-colors mt-4">
          <LogOut className="w-5 h-5" />
          <span className="font-bold">Keluar</span>
        </button>
      </div>

      <div className="text-center py-4">
        <p className="text-slate-300 text-xs font-medium uppercase tracking-widest">Nurul Iman v1.0.0</p>
      </div>
    </div>
  );
};

export default Settings;
