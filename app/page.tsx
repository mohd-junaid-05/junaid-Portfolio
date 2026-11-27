import { CapabilitiesShell } from '@/components/sections/CapabilitiesShell';
import { ContactShell } from '@/components/sections/ContactShell';
import { ExperienceShell } from '@/components/sections/ExperienceShell';
import { HeroShell } from '@/components/sections/HeroShell';
import { ReceiptsShell } from '@/components/sections/ReceiptsShell';
import { StackShell } from '@/components/sections/StackShell';
import { StoryShell } from '@/components/sections/StoryShell';
import { WorkShell } from '@/components/sections/WorkShell';

export default function HomePage() {
  return (
    <>
      <HeroShell />
      <WorkShell />
      <StackShell />
      <StoryShell />
      <ExperienceShell />
      <ReceiptsShell />
      <CapabilitiesShell />
      <ContactShell />
    </>
  );
}
