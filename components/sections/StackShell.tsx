import { ChapterHeader } from '@/components/ui/ChapterHeader';
import { ContentStatus } from '@/components/ui/ContentStatus';
import { portfolioContent } from '@/data/portfolio';

export function StackShell() {
  const { skillLayers, statementText } = portfolioContent;

  return (
    <>
      <section id="stack" aria-labelledby="stack-title" className="chapter on-ink">
        <ChapterHeader
          number="03"
          kanji="第三章"
          chapterName="The Stack"
          titlePrefix="The"
          titleAccent="Stack"
          intro="Structured technology layers derived from verified workshop topics and candidate project areas."
          titleId="stack-title"
        />

        <ol className="m-0 grid list-none gap-4 p-0">
          {skillLayers.map((layer) => (
            <li
              key={layer.index}
              className={`border-2 p-6 ${
                layer.accentCard
                  ? 'on-accent border-on-accent/40'
                  : 'border-paper/30 bg-ink text-paper'
              }`}
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-current/25 pb-2">
                <div className="flex items-center gap-3">
                  <span className="tag">{layer.index}</span>
                  <span className="label">{layer.name}</span>
                </div>
                <ContentStatus status={layer.status} />
              </div>

              <div className="grid gap-4 md:grid-cols-[1.15fr_1fr] md:items-end">
                <div>
                  <h3 className="display m-0 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.92]">
                    {layer.name}
                  </h3>
                  <p className="mt-2 mb-0 opacity-85">{layer.subtitle}</p>
                </div>

                <div>
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {layer.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="px-3 py-1.5 font-mono text-[0.8125rem] font-semibold shadow-[inset_0_0_0_1.5px_currentColor]"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <p className="label mt-3 mb-0 opacity-85">
                    Applied in: {layer.usedIn.join(' · ')}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-label={statementText.join(' ')}
        className="on-ink border-y-2 border-paper/20 px-[var(--gut)] py-12"
      >
        <p className="display m-0 flex flex-wrap items-center gap-4 text-[clamp(2.4rem,8vw,6.5rem)] leading-none">
          <span>{statementText[0]}</span>
          <span className="text-accent-hi" aria-hidden="true">
            &#10022;
          </span>
          <span className="outline-text">{statementText[1]}</span>
        </p>
      </section>
    </>
  );
}
