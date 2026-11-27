import { ChapterHeader } from '@/components/ui/ChapterHeader';
import { ContentStatus } from '@/components/ui/ContentStatus';
import { portfolioContent } from '@/data/portfolio';

export function StoryShell() {
  const { storyPanels, offThePage } = portfolioContent;

  return (
    <section id="story" aria-labelledby="story-title" className="chapter on-paper">
      <ChapterHeader
        number="04"
        kanji="第四章"
        chapterName="Story"
        titlePrefix="The"
        titleAccent="Author"
        titleId="story-title"
      />

      <div className="grid gap-3 md:grid-cols-12">
        {storyPanels.map((panel, idx) => {
          const spanClass =
            idx === 0
              ? 'md:col-span-5'
              : idx === 1
                ? 'md:col-span-7'
                : idx === 2
                  ? 'md:col-span-4'
                  : idx === 3
                    ? 'md:col-span-3'
                    : 'md:col-span-5 on-ink';

          return (
            <article
              key={panel.index}
              className={`flex min-h-48 flex-col justify-between border-[3px] border-ink p-5 ${spanClass}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="tag">{panel.index}</span>
                <ContentStatus status={panel.body.status} />
              </div>
              <div className="mt-6">
                <h3 className="display m-0 text-[clamp(1.75rem,3vw,2.6rem)] leading-[0.96]">
                  {panel.heading}
                </h3>
                <p className="mt-2 mb-0 text-[0.95rem] leading-[1.5]">
                  {panel.body.value ?? panel.body.note ?? 'TBD'}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10">
        <p className="label text-mute mb-4">Off the page — visual asset slots (TBD)</p>
        <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 md:grid-cols-4">
          {offThePage.map((slot) => (
            <li
              key={slot.id}
              className="border-[3px] border-ink bg-paper-2 p-2.5"
            >
              <div
                className="grid aspect-[4/5] place-items-center bg-ink p-3 text-center text-paper"
                role="img"
                aria-label={slot.alt}
              >
                <span className="label">Photo Placeholder ({slot.id})</span>
              </div>
              <p className="label text-mute mt-2 mb-0">
                {slot.caption.value ?? slot.caption.note ?? 'Caption TBD'}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
