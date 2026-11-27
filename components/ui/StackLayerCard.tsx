import type { CSSProperties } from 'react';
import type { SkillLayer } from '@/data/types';

interface StackLayerCardProps {
  layer: SkillLayer;
  position: number;
}

/**
 * Sticky drawer-tab card for Chapter 03 (`#stack`).
 *
 * Uses CSS `position: sticky` with `--i` index offset (`calc(var(--bar-h) + var(--i) * var(--strip))`)
 * and progressive `color-mix` ink/paper separation, with `.layer--top.on-accent` for the final layer.
 */
export function StackLayerCard({ layer, position }: StackLayerCardProps) {
  const isTop = Boolean(layer.accentCard);
  const style = { '--i': position } as CSSProperties;

  return (
    <li
      className={isTop ? 'layer layer--top on-accent' : 'layer'}
      style={style}
    >
      <p className="layer__strip">
        <span className="layer__no label">{layer.index}</span>
        <span className="layer__tab label">{layer.name}</span>
        <span className="layer__hint label">{layer.subtitle}</span>
      </p>

      <div className="layer__body">
        <div>
          <h3 className="layer__name display">{layer.name}</h3>
          <p className="layer__blurb serif">
            <em>{layer.subtitle}</em>
          </p>
        </div>

        <div>
          <ul className="layer__tech">
            {layer.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <p className="layer__used">
            <span className="tag tag--line">Used in</span>
            {layer.usedIn.join(' · ')}
          </p>
        </div>
      </div>
    </li>
  );
}
