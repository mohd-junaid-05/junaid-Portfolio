import { ChapterHeader } from '@/components/ui/ChapterHeader';
import { ContentStatus } from '@/components/ui/ContentStatus';
import { portfolioContent } from '@/data/portfolio';

export function ContactShell() {
  const { contact } = portfolioContent;

  return (
    <section id="contact" aria-labelledby="contact-title" className="chapter on-ink pb-16">
      <ChapterHeader
        number="08"
        kanji="第八章"
        chapterName="Contact"
        titlePrefix="Next Chapter:"
        titleAccent="Get In Touch."
        titleId="contact-title"
      />

      <div className="grid gap-8 md:grid-cols-[4fr_8fr] md:items-end md:gap-12">
        <p className="serif m-0 max-w-[22ch] text-[var(--fs-lede)]">{contact.prompt}</p>

        <div>
          <p className="label text-mute m-0 mb-2">Write to</p>
          {contact.email.value ? (
            <a
              href={`mailto:${contact.email.value}`}
              className="display textlink inline-block break-all text-[clamp(2rem,5vw,4.5rem)] leading-[1.08]"
            >
              {contact.email.value}
            </a>
          ) : (
            <p className="display m-0 flex flex-wrap items-center gap-4 text-[clamp(2rem,4.5vw,4rem)] leading-[1.08]">
              <span>Email TBD</span>
              <ContentStatus status={contact.email.status} />
            </p>
          )}
        </div>
      </div>

      <ul className="mt-12 mb-0 grid list-none border-t border-paper/40 p-0 md:grid-cols-3 md:gap-x-6 md:border-t-0">
        {contact.socials.map((social) => (
          <li
            key={social.platform}
            className="border-b border-paper/40 md:border-t md:border-paper/40"
          >
            {social.url.value ? (
              <a
                href={social.url.value}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[1fr_auto] gap-2 px-2 py-4 no-underline transition-colors hover:bg-paper hover:text-ink"
              >
                <span className="label opacity-80">{social.platform}</span>
                <span aria-hidden="true">&nearr;</span>
                <span className="display col-span-2 text-[clamp(1.5rem,2.8vw,2.4rem)] leading-none">
                  {social.handle.value ?? social.platform}
                </span>
              </a>
            ) : (
              <div className="grid grid-cols-[1fr_auto] gap-2 px-2 py-4">
                <span className="label opacity-80">{social.platform}</span>
                <ContentStatus status={social.url.status} />
                <span className="display col-span-2 text-[clamp(1.5rem,2.8vw,2.4rem)] leading-none opacity-75">
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
