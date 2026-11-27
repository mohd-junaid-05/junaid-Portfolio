import { MobileMenuController } from '@/components/layout/MobileMenuController';
import { MotionToggle } from '@/components/ui/MotionToggle';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { portfolioContent } from '@/data/portfolio';
import { CHAPTERS, PRIMARY_NAV_CHAPTERS } from '@/lib/navigation';

/**
 * Persistent top navigation bar matching reference `.topbar`:
 * chamfered monogram mark + handle, 4 chapter links, 4 theme swatches + motion toggle,
 * interactive `<dialog class="menu">` on JS-enabled viewports, and zero-JS `<details>`
 * fallback when scripts are unavailable.
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
        <span className="sr-only">, {fullName}: back to the top</span>
      </a>

      <nav className="topbar__nav" aria-label="Primary">
        {PRIMARY_NAV_CHAPTERS.map((chapter) => (
          <a key={chapter.id} href={`#${chapter.id}`} className="navlink">
            <span className="navlink__no" aria-hidden="true">
              {chapter.number}
            </span>
            <span>{chapter.navLabel}</span>
          </a>
        ))}
      </nav>

      <div className="topbar__tools">
        <ThemeSwitcher prefix="bar" />
        <MotionToggle />
      </div>

      <MobileMenuController />

      <details className="mobile-nav">
        <summary className="mobile-nav__summary">
          <span className="menu-btn__bars" aria-hidden="true" />
          <span>Menu</span>
        </summary>
        <nav className="mobile-nav__panel" aria-label="Volume contents">
          <p className="label mb-4 opacity-75">Volume 01 &mdash; Contents</p>
          <ul className="m-0 list-none p-0">
            {CHAPTERS.map((chapter) => (
              <li key={chapter.id} className="border-b border-paper/40">
                <a
                  href={`#${chapter.id}`}
                  className="grid grid-cols-[2.6rem_1fr_auto] items-baseline gap-2 py-2 no-underline hover:text-accent-hi"
                >
                  <span className="label text-accent-hi">{chapter.number}</span>
                  <span className="display text-3xl">{chapter.title}</span>
                  <span className="jp text-sm opacity-60" aria-hidden="true" lang="ja">
                    {chapter.kanji}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    </header>
  );
}
