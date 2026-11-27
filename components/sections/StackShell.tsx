import { ChapterHeader } from '@/components/ui/ChapterHeader';
import { StackLayerCard } from '@/components/ui/StackLayerCard';
import { StatementBanner } from '@/components/ui/StatementBanner';
import { portfolioContent } from '@/data/portfolio';

/**
 * Chapter 03 — The Stack (`#stack`) + `.statement` visual interstitial.
 *
 * Renders the dark `--ink` technology chapter using pure CSS `position: sticky`
 * drawer-tab cards (`StackLayerCard`) followed by the `21/8` focus-cut banner
 * (`StatementBanner`).
 */
export function StackShell() {
  const { skillLayers, statementText } = portfolioContent;

  return (
    <>
      <section
        id="stack"
        aria-labelledby="stack-title"
        className="chapter stack on-ink"
      >
        <ChapterHeader
          number="03"
          kanji="第三章"
          chapterName="The Stack"
          titlePrefix="The"
          titleAccent="Stack"
          intro="Structured technology layers derived from verified workshop topics and candidate project areas."
          titleId="stack-title"
        />

        <ol className="layers">
          {skillLayers.map((layer, idx) => (
            <StackLayerCard key={layer.index} layer={layer} position={idx} />
          ))}
        </ol>
      </section>

      <StatementBanner phrases={statementText} />
    </>
  );
}
