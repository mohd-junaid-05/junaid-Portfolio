import Image from 'next/image';
import { CapabilitiesList } from '@/components/ui/CapabilitiesList';
import { ChapterHeader } from '@/components/ui/ChapterHeader';
import { portfolioContent } from '@/data/portfolio';

/**
 * CapabilitiesShell — RSC
 *
 * Section #07 — Core Capabilities
 * Surface class: on-accent (--accent background, --on-accent foreground)
 * Reference: Multiplied right aura art + 4 numbered capability rows + closing CTA
 * Evidence: E-020
 */
export function CapabilitiesShell() {
  const { capabilities } = portfolioContent;

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="chapter on-accent services"
    >
      <div className="services__art" aria-hidden="true" data-parallax="-8">
        <Image
          src="/art/capabilities-aura.svg"
          alt=""
          width={900}
          height={900}
          sizes="(max-width: 899px) 120vw, min(58vw, 54rem)"
        />
      </div>

      <ChapterHeader
        number="07"
        kanji="第七章"
        chapterName="Capabilities"
        titlePrefix="Core Capabilities"
        intro="Engineering skills and peer workshop practice, each backed by coursework, club sessions, or project builds."
        titleId="capabilities-title"
      />

      <CapabilitiesList items={capabilities} />

      <div className="svc__cta" data-reveal="up">
        <a className="btn" href="#contact">
          Get in touch <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
