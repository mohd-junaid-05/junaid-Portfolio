import { ChapterHeader } from '@/components/ui/ChapterHeader';
import { StoryPanelGrid } from '@/components/ui/StoryPanelGrid';
import { PolaroidStrip } from '@/components/ui/PolaroidStrip';
import { portfolioContent } from '@/data/portfolio';

/**
 * StoryShell — RSC
 *
 * Section #04 — The Story
 * Surface class: on-paper  (--paper background, --ink foreground)
 * Reference: 5-panel 12-col manga comic grid + 4-col Polaroid photo strip
 * Evidence: E-016 (panel grid), E-017 (Polaroid strip)
 */
export function StoryShell() {
  const { storyPanels, offThePage } = portfolioContent;

  return (
    <section id="story" aria-labelledby="story-title" className="chapter on-paper story">
      <ChapterHeader
        number="04"
        kanji="第四章"
        chapterName="Story"
        titlePrefix="The"
        titleAccent="Author"
        titleId="story-title"
      />

      {/* 12-col manga comic panel grid */}
      <StoryPanelGrid panels={storyPanels} />

      {/* Polaroid photo strip */}
      <PolaroidStrip items={offThePage} />
    </section>
  );
}
