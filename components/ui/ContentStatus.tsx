import type { VerificationStatus } from '@/data/types';

interface ContentStatusProps {
  status: VerificationStatus;
}

const LABELS: Record<VerificationStatus, string> = {
  verified: 'Verified',
  candidate: 'Candidate',
  tbd: 'TBD',
};

export function ContentStatus({ status }: ContentStatusProps) {
  if (status === 'verified') return null;

  return (
    <span className={status === 'tbd' ? 'tag tag--accent' : 'tag tag--line'}>
      {LABELS[status]}
    </span>
  );
}
