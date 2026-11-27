import { portfolioContent } from '@/data/portfolio';

export function SiteFooter() {
  const { identity, footer } = portfolioContent;

  return (
    <footer className="credits on-ink">
      <div className="flex flex-wrap items-center gap-4 border-b border-paper/20 pb-8">
        <span
          className="jp grid aspect-square w-16 place-items-center bg-accent text-4xl text-on-accent"
          aria-hidden="true"
        >
          完
        </span>
        <p className="display m-0 text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.9]">
          {footer.volumeLabel}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(13.5rem,1fr))] gap-6 text-[0.9375rem] leading-[1.6]">
        <div>
          <span className="label mb-1.5 block">Author</span>
          <p className="m-0">{identity.fullName}</p>
          <p className="m-0 opacity-85">{identity.eyebrow.value ?? 'TBD'}</p>
        </div>
        <div>
          <span className="label mb-1.5 block">Set In</span>
          <p className="m-0">{footer.fontsCredit}</p>
        </div>
        <div>
          <span className="label mb-1.5 block">Foundation</span>
          <p className="m-0">{footer.stackCredit}</p>
        </div>
        <div>
          <span className="label mb-1.5 block">&copy; {footer.copyrightYear}</span>
          <p className="m-0">{identity.fullName}</p>
          <a href="#opening" className="textlink mt-1 inline-block">
            Read it again &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
