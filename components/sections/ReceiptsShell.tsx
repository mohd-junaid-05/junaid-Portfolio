import { ChapterHeader } from '@/components/ui/ChapterHeader';
import { ContentStatus } from '@/components/ui/ContentStatus';
import { portfolioContent } from '@/data/portfolio';

export function ReceiptsShell() {
  const { receipts } = portfolioContent;

  return (
    <section id="receipts" aria-labelledby="receipts-title" className="chapter on-paper">
      <ChapterHeader
        number="06"
        kanji="第六章"
        chapterName="Credentials"
        titlePrefix="Verified"
        titleAccent="Receipts"
        intro="Learning credentials and skill badges tracked in the personal inventory. Public badge names and verification URLs remain TBD until confirmed."
        titleId="receipts-title"
      />

      <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
        {receipts.map((receipt) => (
          <li
            key={receipt.index}
            className="flex flex-col justify-between gap-4 border-[3px] border-ink bg-paper p-6"
          >
            <div>
              <div className="mb-3 flex items-center justify-between gap-2 border-b-2 border-dashed border-ink pb-3">
                <span className="label text-mute">Receipt No. {receipt.index}</span>
                <ContentStatus status={receipt.status} />
              </div>
              <h3 className="display m-0 text-[clamp(2rem,4vw,3.4rem)] leading-[0.95]">
                {receipt.title}
              </h3>
              <p className="mt-2 mb-0 font-bold">{receipt.issuer}</p>
              <p className="label text-mute mt-2 mb-0">
                {receipt.detail.value ?? receipt.detail.note ?? 'Details TBD'}
              </p>
            </div>

            <p className="label text-mute m-0 pt-2">
              {receipt.credentialUrl.value ?? receipt.credentialUrl.note ?? 'Credential link: TBD'}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
