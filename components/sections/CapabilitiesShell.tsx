import { ChapterHeader } from '@/components/ui/ChapterHeader';
import { ContentStatus } from '@/components/ui/ContentStatus';
import { portfolioContent } from '@/data/portfolio';

export function CapabilitiesShell() {
  const { capabilities } = portfolioContent;

  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="chapter on-accent">
      <ChapterHeader
        number="07"
        kanji="第七章"
        chapterName="Capabilities"
        titlePrefix="Core"
        titleAccent="Capabilities"
        intro="Technical capabilities framed around engineering practice and workshop leadership."
        titleId="capabilities-title"
      />

      <ol className="m-0 list-none border-t-[3px] border-ink p-0">
        {capabilities.map((cap) => (
          <li
            key={cap.index}
            className="grid gap-3 border-b-[3px] border-ink py-6 md:grid-cols-[4rem_1.25fr_1fr] md:items-center md:gap-8"
          >
            <span className="label">{cap.index}</span>
            <h3 className="display m-0 text-[clamp(2.2rem,6vw,5rem)] leading-[0.95]">
              {cap.title}
            </h3>
            <div>
              <p className="m-0 text-[1.05rem] leading-[1.5]">{cap.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="tag">Proof</span>
                <span className="label">{cap.proofLabels.join(' · ')}</span>
                <ContentStatus status={cap.status} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
