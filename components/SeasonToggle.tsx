import React from 'react';
import { Season } from '../types';
import { Sun, Snowflake } from 'lucide-react';

interface SeasonToggleProps {
  season: Season;
  onToggle: () => void;
}

const SeasonToggle: React.FC<SeasonToggleProps> = ({ season, onToggle }) => {
  const isSummer = season === Season.SUMMER;

  return (
    <div 
      onClick={onToggle}
      className="cursor-pointer bg-slate-200/50 p-1 rounded-full flex relative shadow-inner border border-white/50 h-10 w-full max-w-[240px] mx-auto select-none"
    >
      {/* Sliding background */}
      <div 
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-md transition-transform duration-300 ease-spring ${
          isSummer ? 'translate-x-[100%] translate-x-2' : 'translate-x-0'
        }`} 
      />

      {/* Winter Option */}
      <div className={`z-10 flex-1 flex items-center justify-center gap-2 text-xs font-bold transition-colors duration-300 rounded-full ${!isSummer ? 'text-bus-600' : 'text-slate-400'}`}>
        <Snowflake size={14} />
        {Season.WINTER}
      </div>

      {/* Summer Option */}
      <div className={`z-10 flex-1 flex items-center justify-center gap-2 text-xs font-bold transition-colors duration-300 rounded-full ${isSummer ? 'text-orange-500' : 'text-slate-400'}`}>
        <Sun size={14} />
        {Season.SUMMER}
      </div>
    </div>
  );
};

export default SeasonToggle;