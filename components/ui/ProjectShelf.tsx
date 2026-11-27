'use client';

import { useState } from 'react';
import type { ProjectItem } from '@/data/types';

interface ProjectShelfProps {
  projects: ProjectItem[];
}

const TOME_VARIANTS = ['', 'tome--2', 'tome--3', 'tome--4'] as const;

/**
 * Interactive 3D book-spine shelf (`ALSO ON THE SHELF`) matching the reference's
 * `.shelf` / `.tome` pattern (`E-013`, `E-034`).
 *
 * Accessibility & non-hover support:
 * - Hovering (on `hover: hover` devices), keyboard-focusing (`:focus-visible`),
 *   or tapping on touch (`is-pulled` state) pulls the 3D volume out at `-58deg`.
 * - Activating a volume scrolls smoothly to its corresponding `#panel-<slug>` card.
 */
export function ProjectShelf({ projects }: ProjectShelfProps) {
  const [pulledSlug, setPulledSlug] = useState<string | null>(null);

  const handleTomeClick = (slug: string) => {
    setPulledSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <div className="archive">
      <div className="archive__head">
        <div>
          <p className="archive__title label" data-reveal="up">
            Also on the shelf
          </p>
          <p className="archive__hint serif" data-reveal="up">
            Every project as a volume. <em>Pull one out.</em>
          </p>
        </div>

        <div className="shelf" role="region" aria-label="Project volumes shelf">
          <div className="shelf__row">
            {projects.map((project, idx) => {
              const variantClass = TOME_VARIANTS[idx % TOME_VARIANTS.length];
              const isPulled = pulledSlug === project.slug;
              // Slight organic variation in spine thickness & height
              const thickness = 3.2 + (idx % 3) * 0.35;
              const heightScale = 0.94 + ((idx + 1) % 3) * 0.05;

              return (
                <div key={project.slug} className="tome__place">
                  <a
                    href={`#panel-${project.slug}`}
                    className={`tome ${variantClass}${isPulled ? ' is-pulled' : ''}`}
                    style={
                      {
                        '--t': thickness,
                        '--k': heightScale,
                      } as React.CSSProperties
                    }
                    aria-label={`Jump to ${project.name} (Project ${project.index})`}
                    data-cursor="OPEN"
                    onClick={() => handleTomeClick(project.slug)}
                  >
                    <span className="tome__box">
                      <span className="tome__face tome__spine">
                        <span className="tome__title">{project.name}</span>
                        <span className="tome__no">{project.index}</span>
                      </span>
                      <span className="tome__face tome__cover">
                        <span className="tome__coverno">{project.index}</span>
                        <span className="tome__covertitle">{project.name}</span>
                        <span className="tome__line">
                          {project.role.value ?? 'Role TBD'}
                        </span>
                        <span className="tome__foot">
                          {project.badge.value ?? 'Volume'}
                        </span>
                      </span>
                      <span className="tome__face tome__side" aria-hidden="true" />
                      <span className="tome__face tome__top" aria-hidden="true" />
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
