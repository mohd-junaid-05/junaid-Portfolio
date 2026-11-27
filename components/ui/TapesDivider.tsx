interface TapesDividerProps {
  variant?: 'ink-paper' | 'ink-accent' | 'paper-ink';
  trackA: string[];
  trackB: string[];
}

function TapeRun({ items }: { items: string[] }) {
  // Repeat sequence twice inside a single run so -50% CSS translation loops seamlessly.
  const sequence = [...items, ...items];
  return (
    <span className="tape__run">
      {sequence.map((item, idx) => (
        <span key={`${item}-${idx}`} className="tape__item">
          {item}
          <span className="tape__star">✦</span>
        </span>
      ))}
    </span>
  );
}

export function TapesDivider({
  variant = 'ink-paper',
  trackA,
  trackB,
}: TapesDividerProps) {
  return (
    <div className={`tapes tapes--${variant}`} aria-hidden="true">
      <div className="tape tape--a display">
        <div className="tape__shift" data-tape-shift="-1">
          <div className="tape__track">
            <TapeRun items={trackA} />
            <TapeRun items={trackA} />
          </div>
        </div>
      </div>
      <div className="tape tape--b display">
        <div className="tape__shift" data-tape-shift="1">
          <div className="tape__track">
            <TapeRun items={trackB} />
            <TapeRun items={trackB} />
          </div>
        </div>
      </div>
    </div>
  );
}
