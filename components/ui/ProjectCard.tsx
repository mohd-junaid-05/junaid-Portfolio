import type { ProjectItem } from '@/data/types';
import { ContentStatus } from '@/components/ui/ContentStatus';

interface ProjectCardProps {
  project: ProjectItem;
}

/**
 * Original monochrome geometric/editorial cover pattern per project index.
 * Avoids copying reference project screenshots while preserving the manga
 * grayscale + halftone + multiply composition until real screenshots are supplied.
 */
function ProjectCoverArt({ index, name }: { index: string; name: string }) {
  return (
    <div className="pcard__cover-art" aria-hidden="true">
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        className="pcard__cover-svg"
      >
        <rect width="800" height="500" fill="var(--paper-2)" />
        {index === '01' && (
          <g stroke="var(--ink)" fill="none">
            <rect x="48" y="44" width="704" height="412" strokeWidth="3" />
            <line x1="48" y1="120" x2="752" y2="120" strokeWidth="2" />
            <circle cx="560" cy="285" r="115" strokeWidth="3" />
            <circle cx="560" cy="285" r="68" strokeWidth="2" strokeDasharray="8 8" />
            <path d="M96 380 L280 190 L390 300 L560 155" strokeWidth="4" />
            <rect x="96" y="165" width="140" height="24" fill="var(--ink)" />
          </g>
        )}
        {index === '02' && (
          <g stroke="var(--ink)" fill="none">
            <rect x="70" y="56" width="320" height="388" strokeWidth="3" />
            <rect x="420" y="56" width="310" height="180" strokeWidth="3" />
            <rect x="420" y="264" width="310" height="180" strokeWidth="3" />
            <line x1="70" y1="250" x2="390" y2="250" strokeWidth="2" />
            <line x1="230" y1="56" x2="230" y2="444" strokeWidth="2" />
            <polygon points="575,92 670,204 480,204" fill="var(--ink)" opacity="0.16" />
            <circle cx="575" cy="354" r="46" strokeWidth="3" />
          </g>
        )}
        {index === '03' && (
          <g stroke="var(--ink)" fill="none">
            <circle cx="400" cy="250" r="165" strokeWidth="3" />
            <circle cx="400" cy="250" r="110" strokeWidth="2" strokeDasharray="12 6" />
            <circle cx="400" cy="250" r="46" fill="var(--ink)" />
            <line x1="60" y1="250" x2="740" y2="250" strokeWidth="2" />
            <line x1="400" y1="30" x2="400" y2="470" strokeWidth="2" />
            <path d="M180 110 L620 390 M620 110 L180 390" strokeWidth="1.5" opacity="0.5" />
          </g>
        )}
        {index !== '01' && index !== '02' && index !== '03' && (
          <g stroke="var(--ink)" fill="none">
            <rect x="56" y="56" width="688" height="388" strokeWidth="3" />
            <path d="M360 120 H440 V210 H530 V290 H440 V380 H360 V290 H270 V210 H360 Z" strokeWidth="3" />
            <line x1="56" y1="150" x2="220" y2="150" strokeWidth="2" />
            <line x1="580" y1="350" x2="744" y2="350" strokeWidth="2" />
          </g>
        )}
      </svg>
      <span className="pcard__cover-word display">{name}</span>
    </div>
  );
}

/**
 * Manga-style project panel card (`.pcard`) matching the verified reference
 * structure (`E-012`, `E-013`, `E-034`, `work-css-rules.json`).
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const primaryUrl = project.demoUrl.value || project.repoUrl.value;
  const hasAnyLink = Boolean(project.repoUrl.value || project.demoUrl.value);

  return (
    <article id={`panel-${project.slug}`} className="pcard" data-reveal="up">
      <div className="pcard__media">
        <div className="pcard__img" data-parallax="7">
          <ProjectCoverArt index={project.index} name={project.name} />
        </div>
        <div className="pcard__tone tone" aria-hidden="true" />
        <span className="pcard__index display" aria-hidden="true">
          {project.index}
        </span>
      </div>

      <div className="pcard__body">
        <div className="pcard__meta">
          <span className="label">
            {project.role.value ?? 'Role TBD'}
          </span>
          {project.badge.value ? (
            <span className="tag tag--accent">{project.badge.value}</span>
          ) : (
            <ContentStatus status={project.summary.status} />
          )}
        </div>

        <h3 className="pcard__title display">{project.name}</h3>

        <p className="pcard__line">
          {project.summary.value ?? project.summary.note ?? 'Description pending owner verification.'}
        </p>

        <div className="pcard__foot label">
          <span>
            {project.stack.length > 0
              ? project.stack.join(' · ')
              : `Stack: ${project.stackStatus.toUpperCase()}`}
          </span>

          <div className="pcard__actions">
            {project.repoUrl.value ? (
              <a
                href={project.repoUrl.value}
                className="pcard__open textlink"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
              >
                Source <span aria-hidden="true">&rarr;</span>
              </a>
            ) : null}
            {project.demoUrl.value ? (
              <a
                href={project.demoUrl.value}
                className="pcard__open textlink"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
              >
                Demo <span aria-hidden="true">&rarr;</span>
              </a>
            ) : null}
            {!hasAnyLink && !primaryUrl ? (
              <span className="pcard__open">
                Links: {project.repoUrl.status.toUpperCase()}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
