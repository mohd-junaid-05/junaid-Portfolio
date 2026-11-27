import Image from 'next/image';
import { ContentStatus } from '@/components/ui/ContentStatus';
import type { PortfolioContent } from '@/data/types';

type StoryPanel = PortfolioContent['storyPanels'][number];

interface StoryPanelGridProps {
  panels: StoryPanel[];
}

/**
 * StoryPanelGrid — RSC
 *
 * Renders the 12-column manga-panel comic grid for the #story section.
 * Reference layout (VERIFIED, E-016):
 *   Row 1 (top): panel 1 = 5 col, panel 2 = 7 col  (≥ 900px)
 *   Row 2 (bottom): panel 3 = 4 col, panel 4 = 3 col, panel 5 = 5 col  (≥ 900px)
 *   Mobile: 1-col stacked
 *
 * Panel variants:
 *   place  — col-span-5, light surface with city artwork
 *   quote  — col-span-7, on-ink dark variant (panel 2)
 *   deadline — col-span-4, light surface
 *   now    — col-span-3, light surface
 *   motto  — col-span-5, on-ink dark variant (panel 5)
 */
const VARIANT_CLASS: Record<string, string> = {
  place: 'spage__panel--place',
  quote: 'spage__panel--quote on-ink',
  deadline: 'spage__panel--deadline',
  now: 'spage__panel--now',
  motto: 'spage__panel--motto on-ink',
};

const VARIANT_ART: Record<string, string> = {
  place: '/art/story-panel-01.svg',
  quote: '/art/story-panel-02.svg',
  deadline: '/art/story-panel-03.svg',
  now: '/art/story-panel-04.svg',
  motto: '/art/story-panel-05.svg',
};

/** True when the panel uses a dark (on-ink) background */
const IS_INK_VARIANT = (variant: string) =>
  variant === 'quote' || variant === 'motto';

export function StoryPanelGrid({ panels }: StoryPanelGridProps) {
  return (
    <ol className="spage" aria-label="Story panels in reading order">
      {panels.map((panel) => {
        const isInk = IS_INK_VARIANT(panel.variant);
        const artSrc = VARIANT_ART[panel.variant] ?? '/art/story-panel-01.svg';
        const bodyText = panel.body.value ?? 'Details pending confirmation.';

        return (
          <li
            key={panel.index}
            className={`spanel ${VARIANT_CLASS[panel.variant] ?? ''}`}
            data-reveal="fade"
          >
            {/* Panel number badge */}
            <p className="spanel__no" aria-hidden="true">
              {panel.index}
            </p>

            {/* Background illustration (multiply-blended) */}
            <div className="spanel__bg" aria-hidden="true">
              <Image
                src={artSrc}
                alt=""
                fill
                sizes="(min-width: 900px) 42vw, 100vw"
                className="spanel__bg-img"
              />
            </div>

            {/* Decorative tone overlay for light panels */}
            {!isInk && <div className="spanel__tone" aria-hidden="true" />}

            {/* Caption card */}
            <div className="spanel__cap">
              <div className="spanel__heading">
                <h3>{panel.heading}</h3>
                <ContentStatus status={panel.body.status} />
              </div>
              <p>{bodyText}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
