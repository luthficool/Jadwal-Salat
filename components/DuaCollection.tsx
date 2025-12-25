
import React, { useState } from 'react';
import { Search, BookOpen, Filter } from 'lucide-react';
import { INITIAL_DUAS } from '../constants';
import { Dua } from '../types';

const DuaCollection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = ['Semua', ...new Set(INITIAL_DUAS.map(d => d.category))];

  const filteredDuas = INITIAL_DUAS.filter(dua => {
    const matchesSearch = dua.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dua.translation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Semua' || dua.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold text-slate-800">Kumpulan Doa</h1>

      {/* Search & Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Cari doa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
          />
        </div>

        <div className="flex overflow-x-auto space-x-2 no-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-emerald-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredDuas.map(dua => (
          <div key={dua.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg">
                {dua.category}
              </span>
              <BookOpen className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-4">{dua.title}</h3>
            <p className="font-arabic text-2xl text-right leading-loose text-slate-800 mb-4">
              {dua.arabic}
            </p>
            <p className="text-slate-400 text-sm italic mb-3">
              {dua.latin}
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <p className="text-slate-600 text-sm leading-relaxed">
                {dua.translation}
              </p>
            </div>
          </div>
        ))}
        {filteredDuas.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            Tidak ditemukan doa yang sesuai.
          </div>
        )}
      </div>
    </div>
  );
};

export default DuaCollection;
