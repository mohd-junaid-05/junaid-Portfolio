import type { CapabilityItem } from '@/data/types';

interface CapabilitiesListProps {
  items: CapabilityItem[];
}

/**
 * Numbered capability rows for Chapter 07 (`#capabilities`), framed around
 * engineering skills and peer workshop practice rather than commercial services.
 */
export function CapabilitiesList({ items }: CapabilitiesListProps) {
  return (
    <ol className="svc">
      {items.map((cap) => (
        <li key={cap.index} className="svc__row" data-reveal="up">
          <span className="svc__no label">{cap.index}</span>
          <h3 className="svc__title display">{cap.title}</h3>
          <div className="svc__body">
            <p>{cap.description}</p>
            {cap.proofLabels.length > 0 ? (
              <p className="svc__proof label">
                <span>Proof</span>
                {cap.proofLabels.join(' · ')}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
