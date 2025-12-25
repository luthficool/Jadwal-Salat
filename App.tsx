
import React, { useState, useEffect } from 'react';
import { LayoutGrid, Calendar, Book, Heart, Settings as SettingsIcon } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PrayerSchedule from './components/PrayerSchedule';
import DuaCollection from './components/DuaCollection';
import DzikirCounter from './components/DzikirCounter';
import Settings from './components/Settings';
import { fetchPrayerTimes } from './services/prayerService';
import { PrayerData } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
  const [totalDzikir, setTotalDzikir] = useState(() => {
    const saved = localStorage.getItem('totalDzikir');
    return saved ? parseInt(saved) : 0;
  });
  const [notifEnabled, setNotifEnabled] = useState(true);

  useEffect(() => {
    localStorage.setItem('totalDzikir', totalDzikir.toString());
  }, [totalDzikir]);

  useEffect(() => {
    // Attempt to get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const data = await fetchPrayerTimes(pos.coords.latitude, pos.coords.longitude);
          setPrayerData(data);
        },
        async () => {
          // Fallback to Jakarta
          const data = await fetchPrayerTimes(-6.2088, 106.8456);
          setPrayerData(data);
        }
      );
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard prayerData={prayerData} dzikirCount={totalDzikir} onNavigate={setActiveTab} />;
      case 'jadwal':
        return <PrayerSchedule prayerData={prayerData} notificationsEnabled={notifEnabled} toggleNotifications={() => setNotifEnabled(!notifEnabled)} />;
      case 'doa':
        return <DuaCollection />;
      case 'dzikir':
        return <DzikirCounter totalDzikir={totalDzikir} onUpdateTotal={setTotalDzikir} />;
      case 'settings':
        return <Settings notifications={notifEnabled} onToggleNotifications={() => setNotifEnabled(!notifEnabled)} />;
      default:
        return <Dashboard prayerData={prayerData} dzikirCount={totalDzikir} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative flex flex-col font-sans">
      <main className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </main>

      {/* Persistent Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-xl border-t border-slate-100 flex justify-around py-4 px-2 rounded-t-[2.5rem] shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)] z-50">
        <NavButton 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
          icon={<LayoutGrid className="w-6 h-6" />} 
          label="Home" 
        />
        <NavButton 
          active={activeTab === 'jadwal'} 
          onClick={() => setActiveTab('jadwal')} 
          icon={<Calendar className="w-6 h-6" />} 
          label="Jadwal" 
        />
        <NavButton 
          active={activeTab === 'doa'} 
          onClick={() => setActiveTab('doa')} 
          icon={<Book className="w-6 h-6" />} 
          label="Doa" 
        />
        <NavButton 
          active={activeTab === 'dzikir'} 
          onClick={() => setActiveTab('dzikir')} 
          icon={<Heart className="w-6 h-6" />} 
          label="Dzikir" 
        />
        <NavButton 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')} 
          icon={<SettingsIcon className="w-6 h-6" />} 
          label="Menu" 
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center space-y-1 transition-all duration-300 ${active ? 'text-emerald-600 scale-110' : 'text-slate-400 hover:text-slate-600'}`}
  >
    <div className={`p-1 rounded-xl transition-colors ${active ? 'bg-emerald-50' : ''}`}>
      {icon}
    </div>
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </button>
);

export default App;
