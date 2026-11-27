import { ChapterHeader } from '@/components/ui/ChapterHeader';
import { ContentStatus } from '@/components/ui/ContentStatus';
import { portfolioContent } from '@/data/portfolio';

export function WorkShell() {
  const { projects } = portfolioContent;

  return (
    <section id="work" aria-labelledby="work-title" className="chapter on-paper-2">
      <ChapterHeader
        number="02"
        kanji="第二章"
        chapterName="Selected Work"
        titlePrefix="Selected"
        titleAccent="Work"
        intro="Core portfolio projects from the candidate inventory. Descriptions, technology stacks, and live links remain explicitly marked TBD until owner verification."
        titleId="work-title"
      />

      <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
        {projects.map((project) => (
          <li
            key={project.slug}
            className="flex flex-col justify-between border-[3px] border-ink bg-paper p-5"
          >
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink pb-3">
                <span className="label text-mute">Project {project.index}</span>
                <ContentStatus status={project.summary.status} />
              </div>
              <h3 className="display m-0 text-[clamp(2.2rem,4.8vw,4.2rem)] leading-[0.95]">
                {project.name}
              </h3>
              <p className="mt-3 text-[1rem] leading-[1.45]">
                {project.summary.value ?? project.summary.note ?? 'Description TBD'}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink/40 pt-3">
              <span className="label text-mute">
                {project.stack.length > 0 ? project.stack.join(' · ') : 'Stack: TBD'}
              </span>
              <span className="label">
                {project.repoUrl.value || project.demoUrl.value ? 'Links verified' : 'Links: TBD'}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
