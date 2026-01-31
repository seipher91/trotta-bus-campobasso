export enum Season {
  WINTER = 'Invernale',
  SUMMER = 'Estivo'
}

export interface ScheduleData {
  stopName: string;
  times: string[];
}

export interface LineData {
  id: string;
  name: string;
  description: string;
  schedules: ScheduleData[];
}