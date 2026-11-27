import { ContentStatus } from '@/components/ui/ContentStatus';
import { portfolioContent } from '@/data/portfolio';

export function HeroShell() {
  const { identity } = portfolioContent;

  return (
    <section id="opening" aria-labelledby="opening-title" className="hero-shell on-paper">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
          <p className="m-0 flex items-baseline gap-3 leading-none">
            <span className="jp text-[clamp(1.5rem,2.2vw,2.1rem)] tracking-[0.1em]" aria-hidden="true">
              第一章
            </span>
            <span className="label text-mute tracking-[0.22em]">Chapter 01</span>
          </p>
          <p className="label text-accent m-0 flex items-center gap-3.5">
            <span className="h-[2px] w-8 bg-current" aria-hidden="true" />
            <span>{identity.eyebrow.value ?? 'TBD'}</span>
            <ContentStatus status={identity.eyebrow.status} />
          </p>
        </div>

        <h1
          id="opening-title"
          className="display m-0 text-[clamp(4.2rem,17vw,18rem)] leading-[0.9]"
        >
          <span className="block">{identity.firstName}</span>
          <span className="outline-text block md:ml-[clamp(0rem,7vw,8rem)]">
            {identity.lastName}
          </span>
        </h1>
      </div>

      <div className="grid max-w-4xl gap-6 pt-4 md:grid-cols-2 md:items-end md:gap-10">
        <div className="space-y-4">
          <p className="serif m-0 max-w-[20ch] text-[var(--fs-lede)]">
            {identity.lede.value ?? 'Headline TBD'}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#work" className="btn">
              <span>View the work</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
            <a href="#contact" className="btn btn--ghost">
              <span>Contact</span>
            </a>
          </div>
        </div>

        <dl className="m-0 space-y-2 font-mono text-[0.8125rem] leading-[1.75]">
          <div className="grid grid-cols-[4.5rem_1fr] gap-2">
            <dt className="font-semibold uppercase tracking-[0.1em] text-mute">Now</dt>
            <dd className="m-0">{identity.now.value ?? 'TBD'}</dd>
          </div>
          <div className="grid grid-cols-[4.5rem_1fr] gap-2">
            <dt className="font-semibold uppercase tracking-[0.1em] text-mute">Stack</dt>
            <dd className="m-0">{identity.stackSummary.value ?? 'TBD'}</dd>
          </div>
          <div className="grid grid-cols-[4.5rem_1fr] gap-2">
            <dt className="font-semibold uppercase tracking-[0.1em] text-mute">Status</dt>
            <dd className="m-0 flex flex-wrap items-center gap-2">
              <span>{identity.availability.value ?? identity.availability.note ?? 'TBD'}</span>
              <ContentStatus status={identity.availability.status} />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
