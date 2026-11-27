import Image from 'next/image';

interface MangaVolume3DProps {
  monogram: string;
  firstName: string;
  lastName: string;
  fullName: string;
  roleLine: string;
}

/**
 * Pure-CSS 3D manga tankobon volume displayed in the closing footer colophon.
 */
export function MangaVolume3D({
  monogram,
  firstName,
  lastName,
  fullName,
  roleLine,
}: MangaVolume3DProps) {
  return (
    <div className="volume" aria-hidden="true">
      <div className="volume__lean">
        <div className="volume__book">
          <div className="volume__face volume__front">
            <p className="volume__top">
              <span className="volume__mark">{monogram}</span>
              <span>VOL. 01</span>
            </p>
            <Image
              className="volume__art"
              src="/art/hero-silhouette.png"
              alt=""
              width={400}
              height={320}
              sizes="220px"
              loading="eager"
            />
            <p className="volume__name">
              <span>{firstName}</span>
              <span>{lastName}</span>
            </p>
            <p className="volume__role">{roleLine}</p>
          </div>

          <div className="volume__face volume__back">
            <span className="volume__kan jp" lang="ja">
              完
            </span>
            <span className="volume__backline">{fullName}</span>
          </div>

          <div className="volume__face volume__spine">
            <span>
              {fullName} <i>·</i> VOL. 01
            </span>
          </div>

          <div className="volume__face volume__fore" />
          <div className="volume__face volume__head" />
          <div className="volume__face volume__tail" />
        </div>
      </div>
    </div>
  );
}
