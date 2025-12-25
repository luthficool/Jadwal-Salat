
import { PrayerData } from '../types';

export const fetchPrayerTimes = async (lat: number, lng: number): Promise<PrayerData | null> => {
  try {
    const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`);
    const data = await response.json();
    if (data.code === 200) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return null;
  }
};

export const getNextPrayer = (timings: Record<string, string>) => {
  const now = new Date();
  const prayerTimes = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map(name => {
    const [hours, minutes] = timings[name].split(':');
    const prayerDate = new Date();
    prayerDate.setHours(parseInt(hours), parseInt(minutes), 0);
    return { name, time: prayerDate };
  });

  const next = prayerTimes.find(p => p.time > now);
  if (!next) {
    // If all prayers passed today, next is tomorrow's Fajr
    return { ...prayerTimes[0], isTomorrow: true };
  }
  return { ...next, isTomorrow: false };
};
