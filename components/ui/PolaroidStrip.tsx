import type { PortfolioContent } from '@/data/types';

type OffThePage = PortfolioContent['offThePage'];

interface PolaroidStripProps {
  items: OffThePage;
}

/**
 * PolaroidStrip — RSC
 *
 * Renders the "OFF THE PAGE" Polaroid photo-card strip below the story panels.
 * Reference layout (VERIFIED, E-017, A-11):
 *   - 4 Polaroid frames in a strip
 *   - 2-col mobile (<700px), 4-col desktop (≥700px)
 *   - Alternating tilt: -1.2deg / +1.4deg
 *   - Hover: un-tilt to 0deg (0.25s ease-slam)
 *   - Each frame: photo area (4:5 aspect) + caption below
 *   - Photos: white frame + 3px ink border
 *   - mix-blend-mode: multiply on photo when image available
 *
 * Photos are placeholder slots — owner must supply approved photographs.
 */
const TILTS = ['-1.2deg', '1.4deg', '-1.2deg', '1.4deg'];

export function PolaroidStrip({ items }: PolaroidStripProps) {
  return (
    <section className="snaps" aria-labelledby="snaps-title">
      <p id="snaps-title" className="snaps__label label">
        OFF THE PAGE
      </p>
      <ul className="snaps__row" role="list">
        {items.map((slot, idx) => (
          <li key={slot.id} className="snap" style={{ '--tilt': TILTS[idx] } as React.CSSProperties}>
            <figure className="snap__fig">
              {/* Photo placeholder — replace with <Image> when photos are approved */}
              <div
                className="snap__photo"
                role="img"
                aria-label={slot.alt}
              >
                <span className="snap__placeholder label" aria-hidden="true">
                  Photo
                  <br />
                  TBD
                </span>
              </div>
              {slot.caption.value ? (
                <figcaption className="snap__cap label">
                  {slot.caption.value}
                </figcaption>
              ) : (
                <figcaption className="snap__cap label" aria-label={slot.caption.note ?? 'Caption TBD'}>
                  <span className="text-mute">Caption TBD</span>
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
