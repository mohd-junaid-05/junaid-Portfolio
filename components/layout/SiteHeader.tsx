import { MotionToggle } from '@/components/ui/MotionToggle';
import { portfolioContent } from '@/data/portfolio';
import { CHAPTERS, PRIMARY_NAV_CHAPTERS } from '@/lib/navigation';

/**
 * Server-rendered persistent navigation header.
 * Anchor links work natively without JavaScript; `<details>` provides a zero-JS mobile menu
 * until Phase 05 layers interactive dialog, theme, and motion controls.
 */
export function SiteHeader() {
  const { monogram, handle, fullName } = portfolioContent.identity;

  return (
    <header className="topbar">
      <a href="#opening" className="brand">
        <span className="brand__mark" aria-hidden="true">
          {monogram}
        </span>
        <span className="brand__handle">{handle.value ?? fullName}</span>
        <span className="sr-only">{fullName} — back to top</span>
      </a>

      <nav className="topbar__nav" aria-label="Primary">
        {PRIMARY_NAV_CHAPTERS.map((chapter) => (
          <a key={chapter.id} href={`#${chapter.id}`} className="navlink">
            <span className="navlink__no">{chapter.number}</span>
            <span>{chapter.navLabel}</span>
          </a>
        ))}
      </nav>

      <div className="topbar__tools">
        <MotionToggle />
      </div>

      <details className="mobile-nav">
        <summary className="mobile-nav__summary">
          <span className="inline-block h-[0.55rem] w-[1.4rem] border-y-2 border-current" aria-hidden="true" />
          <span>Menu</span>
        </summary>
        <nav className="mobile-nav__panel" aria-label="Volume contents">
          <p className="label mb-4 opacity-75">Volume 01 — Contents</p>
          <ul className="m-0 list-none p-0">
            {CHAPTERS.map((chapter) => (
              <li key={chapter.id} className="border-b border-paper/40">
                <a
                  href={`#${chapter.id}`}
                  className="grid grid-cols-[2.6rem_1fr_auto] items-baseline gap-2 py-2 no-underline hover:text-accent-hi"
                >
                  <span className="label text-accent-hi">{chapter.number}</span>
                  <span className="display text-3xl">{chapter.title}</span>
                  <span className="jp text-sm opacity-60">{chapter.kanji}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-4">
            <MotionToggle />
          </div>
        </nav>
      </details>
    </header>
  );
}
