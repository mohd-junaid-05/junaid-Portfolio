import { ChapterHeader } from '@/components/ui/ChapterHeader';
import { ReceiptTicket } from '@/components/ui/ReceiptTicket';
import { portfolioContent } from '@/data/portfolio';

/**
 * ReceiptsShell — RSC
 *
 * Section #06 — Credentials & Achievements ("The Receipts")
 * Surface class: on-paper (--paper background, --ink foreground)
 * Reference: 12-col serrated receipt grid (1-col <700px, 2-col 700-1099px, 3-col >=1100px)
 * Evidence: E-019
 */
export function ReceiptsShell() {
  const { receipts } = portfolioContent;

  return (
    <section id="receipts" aria-labelledby="receipts-title" className="chapter on-paper receipts">
      <ChapterHeader
        number="06"
        kanji="第六章"
        chapterName="Credentials"
        titlePrefix="Verified"
        titleAccent="Receipts"
        intro="Learning credentials and skill badges tracked in the personal inventory. Public badge names and verification URLs remain pending confirmation."
        titleId="receipts-title"
      />

      <ol className="tickets">
        {receipts.map((receipt) => (
          <ReceiptTicket key={receipt.index} receipt={receipt} />
        ))}
      </ol>
    </section>
  );
}
