import { ChapterHeader } from '@/components/ui/ChapterHeader';
import { ExperienceList } from '@/components/ui/ExperienceList';
import { portfolioContent } from '@/data/portfolio';

/**
 * ExperienceShell — RSC
 *
 * Section #05 — On The Record
 * Surface class: on-paper-2  (--paper-2 background, --ink foreground)
 * Reference: 3fr/9fr chronological grid with outline numbers + highlight rows
 * Evidence: E-018
 */
export function ExperienceShell() {
  const { experiences } = portfolioContent;

  return (
    <section id="experience" aria-labelledby="experience-title" className="chapter on-paper-2 experience">
      <ChapterHeader
        number="05"
        kanji="第五章"
        chapterName="Experience"
        titlePrefix="On The"
        titleAccent="Job"
        titleId="experience-title"
      />

      <ExperienceList items={experiences} />
    </section>
  );
}
