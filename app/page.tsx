import { HydrationMarker } from '@/components/motion/HydrationMarker';
import { CapabilitiesShell } from '@/components/sections/CapabilitiesShell';
import { ContactShell } from '@/components/sections/ContactShell';
import { ExperienceShell } from '@/components/sections/ExperienceShell';
import { HeroShell } from '@/components/sections/HeroShell';
import { ReceiptsShell } from '@/components/sections/ReceiptsShell';
import { StackShell } from '@/components/sections/StackShell';
import { StoryShell } from '@/components/sections/StoryShell';
import { WorkShell } from '@/components/sections/WorkShell';
import { TapesDivider } from '@/components/ui/TapesDivider';
import { portfolioContent } from '@/data/portfolio';

export default function HomePage() {
  const { openingTapes } = portfolioContent;

  return (
    <>
      <HeroShell />
      <TapesDivider
        variant="ink-paper"
        trackA={openingTapes.trackA}
        trackB={openingTapes.trackB}
      />
      <WorkShell />
      <TapesDivider
        variant="ink-accent"
        trackA={openingTapes.trackA}
        trackB={openingTapes.trackB}
      />
      <StackShell />
      <StoryShell />
      <ExperienceShell />
      <ReceiptsShell />
      <TapesDivider
        variant="paper-ink"
        trackA={openingTapes.trackA}
        trackB={openingTapes.trackB}
      />
      <CapabilitiesShell />
      <ContactShell />
      <HydrationMarker />
    </>
  );
}
