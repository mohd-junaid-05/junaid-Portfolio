interface ChapterHeaderProps {
  number: string;
  kanji: string;
  chapterName: string;
  titlePrefix: string;
  titleAccent?: string;
  intro?: string;
  titleId: string;
}

/**
 * Shared editorial chapter header primitive: watermark numeral, Japanese + mono chapter kicker,
 * two-tone display heading, and optional lede paragraph.
 */
export function ChapterHeader({
  number,
  kanji,
  chapterName,
  titlePrefix,
  titleAccent,
  intro,
  titleId,
}: ChapterHeaderProps) {
  return (
    <header className="chead">
      <span className="chead__ghost display outline-text" aria-hidden="true">
        {number}
      </span>
      <p className="chead__label label">
        <span className="jp" aria-hidden="true">
          {kanji}
        </span>
        <span>
          {'//'} Chapter {number} &mdash; {chapterName}
        </span>
      </p>
      <h2 id={titleId} className="chead__title display">
        {titlePrefix}
        {titleAccent ? (
          <>
            {' '}
            <span className="accent">{titleAccent}</span>
          </>
        ) : null}
      </h2>
      {intro ? <p className="chead__intro">{intro}</p> : null}
    </header>
  );
}
