import Image from 'next/image';
import { ChapterHeader } from '@/components/ui/ChapterHeader';
import { ContentStatus } from '@/components/ui/ContentStatus';
import { CopyEmailButton } from '@/components/ui/CopyEmailButton';
import { portfolioContent } from '@/data/portfolio';

/**
 * ContactShell — RSC
 *
 * Section #08 — Contact
 * Surface class: on-ink (--ink background, --paper foreground)
 * Reference: Cityscape art + tone, 4fr/8fr split, underlined mailto + actions, 3-col social cards
 * Evidence: E-021, E-029
 */
export function ContactShell() {
  const { contact } = portfolioContent;
  const emailValue = contact.email.value;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="chapter on-ink contact"
    >
      <div className="tone contact__tone" aria-hidden="true" />
      <div className="contact__art" aria-hidden="true" data-parallax="-10">
        <Image
          src="/art/contact-cityscape.svg"
          alt=""
          width={1200}
          height={800}
          sizes="(max-width: 899px) 100vw, min(78vw, 76rem)"
        />
      </div>

      <ChapterHeader
        number="08"
        kanji="第八章"
        chapterName="Contact"
        titlePrefix="Next Chapter:"
        titleAccent="Get In Touch."
        titleId="contact-title"
      />

      <div className="contact__grid">
        <p className="contact__lede serif" data-reveal="up">
          {contact.prompt}
        </p>

        <div className="contact__mail" data-reveal="up">
          <p className="label">Write to</p>
          {emailValue ? (
            <>
              <a href={`mailto:${emailValue}`} className="contact__email display">
                {emailValue}
              </a>
              <div className="contact__actions">
                <a href={`mailto:${emailValue}`} className="btn">
                  Send email <span aria-hidden="true">→</span>
                </a>
                <CopyEmailButton email={emailValue} />
              </div>
            </>
          ) : (
            <>
              <p className="contact__email contact__email--pending display">
                Email TBD
              </p>
              <div className="contact__actions">
                <ContentStatus status={contact.email.status} />
                <span className="label">
                  {contact.email.note ?? 'Public email address pending owner confirmation.'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <ul className="contact__links">
        {contact.socials.map((social) => (
          <li key={social.platform} data-reveal="up">
            {social.url.value ? (
              <a
                href={social.url.value}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__link"
              >
                <span className="label">{social.platform}</span>
                <span className="contact__arrow" aria-hidden="true">
                  ↗
                </span>
                <span className="contact__handle display">
                  {social.handle.value ?? social.platform}
                </span>
              </a>
            ) : (
              <div className="contact__link contact__link--pending">
                <span className="label">{social.platform}</span>
                <ContentStatus status={social.url.status} />
                <span className="contact__handle display">
                  {social.handle.value ?? 'Destination TBD'}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
