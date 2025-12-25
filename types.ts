
export type PrayerTime = {
  name: string;
  time: string;
  id: string;
};

export type PrayerData = {
  timings: Record<string, string>;
  date: {
    readable: string;
    hijri: {
      day: string;
      month: { en: string; ar: string };
      year: string;
      designation: { abbreviated: string };
    };
  };
  meta: {
    timezone: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };
};

export type Dua = {
  id: string;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  category: string;
};

export type DzikirLog = {
  id: string;
  name: string;
  count: number;
  date: string;
};

export type ThemeType = 'emerald' | 'indigo' | 'slate';

export type UserSettings = {
  city: string;
  country: string;
  theme: ThemeType;
  notificationsEnabled: boolean;
};
