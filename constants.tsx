
import { Dua } from './types';

export const INITIAL_DUAS: Dua[] = [
  {
    id: '1',
    title: 'Doa Sebelum Makan',
    arabic: 'اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ',
    latin: 'Allahumma baarik lanaa fiimaa razaqtanaa wa qinaa ' + 'adzaaban naar.',
    translation: 'Ya Allah, berkahilah kami atas rezeki yang telah Engkau berikan kepada kami dan jagalah kami dari siksa api neraka.',
    category: 'Harian'
  },
  {
    id: '2',
    title: 'Doa Bangun Tidur',
    arabic: 'اَلْحَمْدُ لِلهِ الَّذِيْ أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُوْرُ',
    latin: 'Alhamdu lillahil ladzii ahyaanaa ba' + 'da maa amaatanaa wa ilaihin nusyur.',
    translation: 'Segala puji bagi Allah yang menghidupkan kami kembali setelah mematikan kami dan kepada-Nya kami akan dibangkitkan.',
    category: 'Tidur'
  },
  {
    id: '3',
    title: 'Dzikir Pagi (Ayat Kursi)',
    arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin: 'Allāhu lā ilāha illā huwal-ḥayyul-qayyūm, lā ta\'khużuhū sinatuw wa lā na\'ūm...',
    translation: 'Allah, tidak ada Tuhan melainkan Dia Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya); tidak mengantuk dan tidak tidur...',
    category: 'Dzikir Pagi'
  }
];

export const PRAYER_NAMES: Record<string, string> = {
  Fajr: 'Subuh',
  Sunrise: 'Terbit',
  Dhuhr: 'Dzuhur',
  Asr: 'Ashar',
  Maghrib: 'Maghrib',
  Isha: 'Isya'
};
