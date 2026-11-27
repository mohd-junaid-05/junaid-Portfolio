import { ChapterHeader } from '@/components/ui/ChapterHeader';
import { ContentStatus } from '@/components/ui/ContentStatus';
import { portfolioContent } from '@/data/portfolio';

export function ExperienceShell() {
  const { experiences } = portfolioContent;

  return (
    <section id="experience" aria-labelledby="experience-title" className="chapter on-paper-2">
      <ChapterHeader
        number="05"
        kanji="第五章"
        chapterName="Experience"
        titlePrefix="On The"
        titleAccent="Record"
        titleId="experience-title"
      />

      <ol className="m-0 list-none border-t-[3px] border-ink p-0">
        {experiences.map((item) => (
          <li
            key={item.index}
            className="grid gap-4 border-b-2 border-ink py-8 md:grid-cols-[3fr_9fr] md:gap-8"
          >
            <div>
              <p className="label text-mute m-0 flex flex-wrap items-center gap-2">
                <span>{item.period.value ?? 'Dates TBD'}</span>
                <ContentStatus status={item.period.status} />
              </p>
              <p
                className="display outline-text mt-3 mb-0 hidden text-[clamp(5rem,11vw,10rem)] leading-[0.8] opacity-55 md:block"
                aria-hidden="true"
              >
                {item.index}
              </p>
            </div>

            <div>
              <h3 className="display m-0 text-[var(--fs-h3)] leading-[0.97]">
                {item.title}
              </h3>
              <p className="mt-2 mb-0 font-mono text-[0.9rem] font-semibold uppercase tracking-[0.06em]">
                {item.organization} &middot; {item.kind}
              </p>
              <ul className="mt-4 mb-0 list-none space-y-2 p-0">
                {item.highlights.map((point) => (
                  <li key={point} className="relative pl-6">
                    <span
                      className="absolute top-[0.65em] left-0 h-[3px] w-3.5 bg-accent"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <ul className="mt-4 mb-0 flex list-none flex-wrap gap-2 p-0">
                {item.tags.map((tag) => (
                  <li key={tag} className="tag tag--line">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
