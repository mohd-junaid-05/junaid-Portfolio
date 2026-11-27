import type { ReceiptCredential } from '@/data/types';

interface ReceiptTicketProps {
  receipt: ReceiptCredential;
}

/**
 * Single serrated paper receipt card for Chapter 06 (`#receipts`).
 * Renders verified public links when approved, or explicit pending notes without fabricating URLs.
 */
export function ReceiptTicket({ receipt }: ReceiptTicketProps) {
  const isVerified = receipt.status === 'verified';
  const stampText = isVerified ? 'RECEIVED' : 'PENDING';
  const detailText = receipt.detail.value ?? receipt.detail.note ?? 'Details pending confirmation.';
  const hasUrl = Boolean(receipt.credentialUrl.value);

  return (
    <li className="ticket" data-reveal="up">
      <p className="ticket__no label">Receipt No. {receipt.index}</p>
      <h3 className="ticket__rank display">{receipt.title}</h3>
      <p className="ticket__event">{receipt.issuer}</p>
      <p className="ticket__detail label">{detailText}</p>

      <div className="ticket__built">
        <span className="label">Evidence</span>
        {hasUrl && receipt.credentialUrl.value ? (
          <a
            className="textlink"
            href={receipt.credentialUrl.value}
            target="_blank"
            rel="noopener noreferrer"
          >
            View credential
          </a>
        ) : (
          <span className="ticket__note">
            {receipt.credentialUrl.note ?? 'Public verification link TBD.'}
          </span>
        )}
      </div>

      <span className="ticket__stamp display" aria-label={`Status: ${stampText}`}>
        {stampText}
      </span>
    </li>
  );
}
