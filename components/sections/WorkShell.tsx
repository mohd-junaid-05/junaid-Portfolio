import { ChapterHeader } from '@/components/ui/ChapterHeader';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ProjectShelf } from '@/components/ui/ProjectShelf';
import { portfolioContent } from '@/data/portfolio';

/**
 * Chapter 02 — Selected Work (`#work`).
 *
 * Renders the manga-panel project showcase on a `--paper-2` surface:
 * - 12-column asymmetric slanted `clip-path` grid (`.panels` / `.panel` / `.pcard`)
 *   collapsing to a clean 1-column stack below `900px`
 * - `ALSO ON THE SHELF` 3D book-spine shelf (`ProjectShelf`)
 *
 * Project content is driven entirely by `portfolioContent.projects`.
 */
export function WorkShell() {
  const { projects } = portfolioContent;
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="work" aria-labelledby="work-title" className="chapter work on-paper-2">
      <ChapterHeader
        number="02"
        kanji="第二章"
        chapterName="Selected Work"
        titlePrefix="Selected"
        titleAccent="Work"
        intro="Core projects from the portfolio. Descriptions, stacks, and links remain explicitly marked TBD until owner verification."
        titleId="work-title"
      />

      <ol className="panels">
        {featured.map((project) => (
          <li key={project.slug} className="panel">
            <ProjectCard project={project} />
          </li>
        ))}
      </ol>

      <ProjectShelf projects={projects} />
    </section>
  );
}
