import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Bus, ChevronDown, Clock } from 'lucide-react';
import { LINE_7_DATA } from './constants';
import { Season } from './types';
import { getInitialSeason, getClosestTimeIndex } from './utils/season';
import Timeline from './components/Timeline';
import SeasonToggle from './components/SeasonToggle';

// Define the available views
type View = 'home' | 'detail';

function App() {
  const [view, setView] = useState<View>('home');
  const [season, setSeason] = useState<Season>(Season.WINTER);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(0);

  // Initialize season and find closest bus on mount
  useEffect(() => {
    const initialSeason = getInitialSeason();
    setSeason(initialSeason);
    
    // Find closest upcoming departure
    const departureTimes = LINE_7_DATA.schedules[0].times;
    const closestIndex = getClosestTimeIndex(departureTimes);
    setSelectedTimeIndex(closestIndex);
  }, []);

  const handleSeasonToggle = () => {
    setSeason(prev => prev === Season.SUMMER ? Season.WINTER : Season.SUMMER);
  };

  const currentDepartureTime = LINE_7_DATA.schedules[0].times[selectedTimeIndex];

  // Render Home View
  if (view === 'home') {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-bus-50">
        <header className="mb-12 text-center">
          <div className="w-20 h-20 bg-bus-500 rounded-3xl shadow-xl shadow-bus-200 flex items-center justify-center mx-auto mb-6 rotate-3">
            <Bus size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Trotta Bus</h1>
          <p className="text-slate-500 font-medium">Campobasso</p>
        </header>

        <div 
          onClick={() => setView('detail')}
          className="w-full max-w-sm glass-panel p-6 rounded-3xl shadow-lg border-2 border-white/50 cursor-pointer active:scale-95 transition-all duration-200 group relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-bus-200/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="bg-bus-100 text-bus-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Circolare
            </span>
            <ArrowLeft className="rotate-180 text-bus-400 group-hover:translate-x-1 transition-transform" size={20} />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-1">{LINE_7_DATA.name}</h2>
          <p className="text-slate-500 text-sm mb-6">{LINE_7_DATA.description}</p>
          
          <div className="flex items-center gap-3 text-sm font-medium text-slate-600 bg-white/50 p-3 rounded-xl">
             <Clock size={16} className="text-bus-500" />
             <span>Prossima partenza: </span>
             <span className="text-bus-700 font-bold ml-auto">{currentDepartureTime}</span>
          </div>
        </div>

        <footer className="mt-auto pt-10 text-slate-400 text-xs text-center">
          <p>© {new Date().getFullYear()} Trotta Bus Assistant</p>
        </footer>
      </div>
    );
  }

  // Render Detail View
  return (
    <div className="min-h-screen bg-slate-50 pb-safe">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 glass-panel border-b border-white/20 shadow-sm px-4 pt-safe-top pb-2">
        <div className="flex items-center justify-between h-14">
          <button 
            onClick={() => setView('home')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm active:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="text-center">
            <h2 className="font-bold text-slate-800 text-lg leading-none">{LINE_7_DATA.name}</h2>
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">
              {LINE_7_DATA.description}
            </span>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Controls Area */}
        <div className="mt-2 mb-2 space-y-3">
          <SeasonToggle season={season} onToggle={handleSeasonToggle} />
          
          <div className="relative max-w-[240px] mx-auto">
            <select
              value={selectedTimeIndex}
              onChange={(e) => setSelectedTimeIndex(Number(e.target.value))}
              className="appearance-none w-full bg-white border border-slate-200 text-slate-800 text-center font-bold text-lg py-3 pl-4 pr-10 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-bus-500 focus:border-transparent transition-shadow"
            >
              {LINE_7_DATA.schedules[0].times.map((time, idx) => (
                <option key={time} value={idx}>
                  Partenza {time}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <ChevronDown size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-lg mx-auto pb-10">
        <div className="text-center mb-6 mt-2">
          <p className="text-slate-400 text-xs">
            Orari calcolati per la stagione <span className="font-medium text-slate-600">{season}</span>
          </p>
        </div>

        <Timeline 
          lineData={LINE_7_DATA} 
          selectedIndex={selectedTimeIndex} 
        />
      </main>
    </div>
  );
}

export default App;