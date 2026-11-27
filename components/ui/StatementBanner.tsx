import { Fragment } from 'react';

interface StatementBannerProps {
  phrases: string[];
}

/**
 * Unnumbered manga focus-cut interstitial between `#stack` and `#story`.
 *
 * Features a `21/8` framed original monochrome focus illustration with animated
 * CSS speedlines (`.statement__lines`), scroll-zoom (`data-zoom="1.16"`), and
 * horizontal ink-wash scrubbed display banner (`.statement__text`).
 */
export function StatementBanner({ phrases }: StatementBannerProps) {
  const lastIndex = phrases.length - 1;

  return (
    <section
      className="statement on-ink"
      aria-label={`${phrases.join('. ')}.`}
    >
      <div className="statement__cut" data-reveal="slit">
        <span className="statement__lines" aria-hidden="true" />
        <picture className="art statement__art">
          <img
            src="/art/statement-eyes.svg"
            width={2100}
            height={800}
            alt=""
            loading="lazy"
            decoding="async"
            data-zoom="1.16"
          />
        </picture>
      </div>

      <p
        className="statement__text display is-fill"
        aria-hidden="true"
        data-scrub-x="-52"
        data-inkfill="true"
      >
        {phrases.map((phrase, idx) => {
          const isOutline = idx % 2 === 1;
          const isLast = idx === lastIndex;
          const spanClass = [
            isOutline ? 'outline-text' : '',
            isLast ? 'statement__last' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <Fragment key={phrase}>
              {idx > 0 ? <i>&#10022;</i> : null}
              <span className={spanClass || undefined}>{phrase}</span>
            </Fragment>
          );
        })}
      </p>
    </section>
  );
}
