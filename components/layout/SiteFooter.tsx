import { MangaVolume3D } from '@/components/ui/MangaVolume3D';
import { portfolioContent } from '@/data/portfolio';

/**
 * SiteFooter — RSC
 *
 * Closing colophon (`END OF VOLUME 01`), 3D manga volume, and back-to-top anchor.
 * Evidence: E-022
 */
export function SiteFooter() {
  const { identity, footer } = portfolioContent;

  return (
    <footer className="credits on-ink">
      <div className="credits__top">
        <div className="credits__end">
          <span className="credits__kan jp" lang="ja" aria-hidden="true">
            完
          </span>
          <p className="display">{footer.volumeLabel}</p>
        </div>

        <MangaVolume3D
          monogram={identity.monogram}
          firstName={identity.firstName}
          lastName={identity.lastName}
          fullName={identity.fullName}
          roleLine={identity.eyebrow.value ?? 'Developer Portfolio'}
        />
      </div>

      <div className="credits__cols">
        <div>
          <span className="label">Author</span>
          <p>{identity.fullName}</p>
          <p>{identity.eyebrow.value ?? 'TBD'}</p>
        </div>
        <div>
          <span className="label">Set in</span>
          <p>{footer.fontsCredit}</p>
        </div>
        <div>
          <span className="label">Made with</span>
          <p>{footer.stackCredit}</p>
        </div>
        <div>
          <span className="label">&copy; {footer.copyrightYear}</span>
          <p>{identity.fullName}</p>
          <a href="#opening" className="textlink">
            Read it again ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
