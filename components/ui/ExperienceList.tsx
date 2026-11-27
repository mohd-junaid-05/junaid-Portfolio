import { ContentStatus } from '@/components/ui/ContentStatus';
import type { PortfolioContent } from '@/data/types';

type Experience = PortfolioContent['experiences'][number];

interface ExperienceListProps {
  items: Experience[];
}

/**
 * ExperienceList — RSC
 *
 * Renders the chronological experience timeline for the #experience section.
 * Reference layout (VERIFIED, E-018):
 *   - `.xp` list with 3px top border
 *   - Each `.xp__item` row: 3fr / 9fr grid at ≥900px
 *   - Left col: period label (small mono) + giant outline number (≥900px only)
 *   - Right col: role/title (display, clamp), org·kind (mono), highlights list,
 *     optional tags
 *   - `border-bottom: 2px solid var(--ink)` per row
 *
 * Giant outline numbers (`.xp__no`) use:
 *   color: transparent; -webkit-text-stroke: max(1.5px, .012em) var(--ink)
 *   font-size: clamp(2.1rem, 5vw, 4.75rem); (matches --fs-h3)
 *   line-height: 0.97
 *   Hidden on mobile (< 900px)
 */
export function ExperienceList({ items }: ExperienceListProps) {
  return (
    <ol className="xp" aria-label="Experience timeline">
      {items.map((item) => (
        <li key={item.index} className="xp__item" data-reveal="up">
          {/* Left column: period + outline number */}
          <div className="xp__meta">
            <p className="xp__period label">
              <span>{item.period.value ?? 'Dates TBD'}</span>
              <ContentStatus status={item.period.status} />
            </p>
            {/* Giant outline number — desktop only (hidden mobile via CSS) */}
            <p className="xp__no display" aria-hidden="true">
              {item.index}
            </p>
          </div>

          {/* Right column: content */}
          <div className="xp__body">
            <h3 className="xp__role display">
              {item.title}
              <ContentStatus status={item.status} />
            </h3>
            <p className="xp__org label">
              {item.organization}&thinsp;&middot;&thinsp;{item.kind}
            </p>

            {item.highlights.length > 0 && (
              <ul className="xp__detail">
                {item.highlights.map((point) => (
                  <li key={point} className="xp__point">
                    <span className="xp__bullet" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            )}

            {item.tags.length > 0 && (
              <ul className="xp__tags" aria-label="Tags">
                {item.tags.map((tag) => (
                  <li key={tag} className="tag tag--line">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
