import Image from 'next/image';
import { HeroBackdrop } from '@/components/sections/HeroBackdrop';
import { portfolioContent } from '@/data/portfolio';

function SplitWord({ word }: { word: string }) {
  return (
    <>
      {Array.from(word).map((ch, idx) => (
        <span key={`${ch}-${idx}`} className="hero__ch" aria-hidden="true">
          {ch}
        </span>
      ))}
    </>
  );
}

/**
 * Chapter 01 — Opening Hero (`#opening`).
 * Combines pure CSS static halftone fallback, reactive Canvas 2D halftone backdrop,
 * original monochrome manga silhouette (`mix-blend-mode: multiply`), rough-edge SVG
 * brush slash, two-line display headline with preloader ink-mask, editorial serif lede,
 * magnetic CTAs, and verified/TBD 3-row metadata strip.
 */
export function HeroShell() {
  const { identity } = portfolioContent;

  return (
    <section id="opening" aria-labelledby="hero-title" className="hero on-paper">
      <div className="hero__tone tone" aria-hidden="true" />
      <HeroBackdrop />

      <div className="hero__art" data-intro="art">
        <div className="living" aria-hidden="true">
          <Image
            className="living__img"
            src="/art/hero-silhouette.png"
            width={1264}
            height={848}
            alt=""
            priority
            sizes="(max-width: 767px) 84vw, 60vw"
            style={{ objectPosition: '72% 100%' }}
          />
        </div>
      </div>

      <div className="hero__stage">
        <div className="hero__top" data-intro="fade">
          <p className="hero__mark" aria-hidden="true">
            <span className="jp" lang="ja">
              第一章
            </span>
            <span className="label">Chapter 01</span>
          </p>
          <p className="hero__eyebrow label">
            <span className="hero__eyebrow-rule" aria-hidden="true" />
            <span>{identity.eyebrow.value ?? 'Headline TBD'}</span>
          </p>
        </div>

        <div className="hero__title">
          <svg
            className="hero__slash"
            viewBox="0 0 1300 440"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <filter id="rough-edge" x="-5%" y="-30%" width="110%" height="160%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.018 0.09"
                  numOctaves="3"
                  seed="11"
                />
                <feDisplacementMap in="SourceGraphic" scale="46" />
              </filter>
            </defs>
            <g data-intro="slash">
              <path
                filter="url(#rough-edge)"
                d="M-20 308 L1320 56 L1320 148 L-20 404 Z"
              />
            </g>
          </svg>

          <h1
            id="hero-title"
            className="hero__name display"
            aria-label={identity.fullName}
          >
            <span className="hero__line">
              <span className="hero__word">
                <SplitWord word={identity.firstName} />
              </span>
            </span>
            <span className="hero__line hero__line--b">
              <span className="hero__word outline-text">
                <SplitWord word={identity.lastName} />
              </span>
            </span>
          </h1>

          <div className="hero__inkmask" aria-hidden="true">
            <span className="hero__name display">
              <span className="hero__line">
                <span className="hero__word outline-text">{identity.firstName}</span>
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="hero__foot">
        <div className="hero__pitch">
          <p className="hero__lede serif" data-intro="fade">
            {identity.lede.value ?? 'Building software systems'}{' '}
            <em className="accent">{identity.ledeEmphasis ?? 'and applied AI.'}</em>
          </p>
          <div className="hero__cta" data-intro="fade">
            <a href="#work" className="btn" data-magnetic="true">
              View the work{' '}
              <span className="arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
            <a href="#contact" className="btn btn--ghost" data-magnetic="true">
              Get in touch
            </a>
          </div>
        </div>

        <dl className="hero__meta" data-intro="fade">
          <div>
            <dt>Now</dt>
            <dd>{identity.now.value ?? 'TBD'}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{identity.stackSummary.value ?? 'TBD'}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <span className="hero__live" aria-hidden="true" />
              <span>{identity.availability.value ?? 'Availability TBD'}</span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
