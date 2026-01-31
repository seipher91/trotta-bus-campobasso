import React from 'react';
import { LineData } from '../types';
import { MapPin, Clock } from 'lucide-react';

interface TimelineProps {
  lineData: LineData;
  selectedIndex: number;
}

const Timeline: React.FC<TimelineProps> = ({ lineData, selectedIndex }) => {
  return (
    <div className="relative py-4 px-2">
      {/* Vertical connecting line */}
      <div className="absolute left-[29px] top-6 bottom-6 w-1 bg-gradient-to-b from-bus-300 via-bus-200 to-transparent rounded-full z-0" />

      <div className="space-y-6 relative z-10">
        {lineData.schedules.map((stop, index) => {
          const isFirst = index === 0;
          const isLast = index === lineData.schedules.length - 1;
          const time = stop.times[selectedIndex];

          return (
            <div 
              key={stop.stopName} 
              className="group flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              {/* Icon Container */}
              <div className={`
                flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md border-2
                transition-all duration-300
                ${isFirst || isLast 
                  ? 'bg-bus-500 border-bus-400 text-white' 
                  : 'bg-white border-white text-bus-400'}
              `}>
                {isFirst || isLast ? <MapPin size={24} fill="currentColor" className="opacity-90" /> : <MapPin size={22} />}
              </div>

              {/* Info Card */}
              <div className="flex-grow glass-panel rounded-2xl p-4 shadow-sm border border-white/40 flex justify-between items-center">
                <div>
                  <h3 className={`text-sm font-semibold ${isFirst || isLast ? 'text-slate-800' : 'text-slate-600'}`}>
                    {stop.stopName}
                  </h3>
                  {isFirst && <p className="text-xs text-bus-500 font-medium mt-1">Partenza</p>}
                  {isLast && <p className="text-xs text-bus-500 font-medium mt-1">Capolinea</p>}
                </div>
                
                <div className="flex items-center gap-2 bg-bus-50 px-3 py-1.5 rounded-xl border border-bus-100">
                  <Clock size={14} className="text-bus-500" />
                  <span className="text-lg font-bold text-bus-700 tracking-tight font-mono">
                    {time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;