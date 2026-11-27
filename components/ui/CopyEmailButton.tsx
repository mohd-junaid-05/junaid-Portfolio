'use client';

import { useEffect, useState } from 'react';

interface CopyEmailButtonProps {
  email: string;
}

/**
 * Clipboard copy action for verified email addresses with screen-reader status announcement.
 */
export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      className="btn btn--ghost"
      onClick={handleCopy}
      aria-live="polite"
    >
      {copied ? 'Copied' : 'Copy email'}
    </button>
  );
}
