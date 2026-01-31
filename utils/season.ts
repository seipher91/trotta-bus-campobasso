import { Season } from '../types';

export const getInitialSeason = (): Season => {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed (0 = Jan, 5 = Jun, 8 = Sept)
  const day = now.getDate();

  // Summer range: June 15th to September 15th
  const isSummer = 
    (month > 5 && month < 8) || // July (6), August (7)
    (month === 5 && day >= 15) || // June 15+
    (month === 8 && day <= 15);   // Sept 15-

  return isSummer ? Season.SUMMER : Season.WINTER;
};

export const getClosestTimeIndex = (times: string[]): number => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (let i = 0; i < times.length; i++) {
    const [hours, minutes] = times[i].split(':').map(Number);
    const stopMinutes = hours * 60 + minutes;
    
    if (stopMinutes >= currentMinutes) {
      return i;
    }
  }
  // If all times passed, return 0 (next day morning) or last index
  return 0;
};