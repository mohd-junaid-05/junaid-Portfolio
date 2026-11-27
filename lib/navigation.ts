import type { ChapterDefinition } from '@/data/types';

export const CHAPTERS: ChapterDefinition[] = [
  {
    number: '01',
    kanji: '第一章',
    id: 'opening',
    title: 'Opening',
    surface: 'on-paper',
  },
  {
    number: '02',
    kanji: '第二章',
    id: 'work',
    title: 'Selected Work',
    navLabel: 'Work',
    surface: 'on-paper-2',
  },
  {
    number: '03',
    kanji: '第三章',
    id: 'stack',
    title: 'The Stack',
    navLabel: 'Stack',
    surface: 'on-ink',
  },
  {
    number: '04',
    kanji: '第四章',
    id: 'story',
    title: 'The Author',
    navLabel: 'About',
    surface: 'on-paper',
  },
  {
    number: '05',
    kanji: '第五章',
    id: 'experience',
    title: 'Experience',
    surface: 'on-paper-2',
  },
  {
    number: '06',
    kanji: '第六章',
    id: 'receipts',
    title: 'Credentials',
    surface: 'on-paper',
  },
  {
    number: '07',
    kanji: '第七章',
    id: 'capabilities',
    title: 'Capabilities',
    surface: 'on-accent',
  },
  {
    number: '08',
    kanji: '第八章',
    id: 'contact',
    title: 'Contact',
    navLabel: 'Contact',
    surface: 'on-ink',
  },
];

export const PRIMARY_NAV_CHAPTERS = CHAPTERS.filter((chapter) => Boolean(chapter.navLabel));
