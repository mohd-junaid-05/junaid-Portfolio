'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotionRuntime } from '@/components/motion/MotionProvider';
import { MotionToggle } from '@/components/ui/MotionToggle';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { CHAPTERS } from '@/lib/navigation';

export function MobileMenuController() {
  const { scrollToHash } = useMotionRuntime();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef(true);
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    restoreFocusRef.current = true;
    dialog.showModal();
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback((restoreFocus = true) => {
    const dialog = dialogRef.current;
    restoreFocusRef.current = restoreFocus;
    if (dialog?.open) {
      dialog.close();
    }
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setIsOpen(false);
      if (restoreFocusRef.current) {
        triggerRef.current?.focus({ preventScroll: true });
      }
      restoreFocusRef.current = true;
    };

    const handleCancel = () => {
      restoreFocusRef.current = true;
    };

    dialog.addEventListener('close', handleClose);
    dialog.addEventListener('cancel', handleCancel);
    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, []);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    closeMenu(false);
    scrollToHash(`#${id}`);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="menu-btn"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="volume-menu-dialog"
        onClick={openMenu}
      >
        <span className="menu-btn__bars" aria-hidden="true" />
        <span>Menu</span>
      </button>

      <dialog
        ref={dialogRef}
        id="volume-menu-dialog"
        className="menu"
        aria-label="Chapters"
        onClick={(event) => {
          if (event.target === dialogRef.current) closeMenu(true);
        }}
      >
        <div className="menu__inner">
          <div className="menu__top">
            <span className="label">Volume 01 &mdash; Contents</span>
            <button
              type="button"
              className="menu__close"
              onClick={() => closeMenu(true)}
            >
              Close
            </button>
          </div>

          <ol className="menu__list">
            {CHAPTERS.map((chapter) => (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  className="menu__link"
                  onClick={(event) => handleLinkClick(event, chapter.id)}
                >
                  <span className="menu__no">{chapter.number}</span>
                  <span className="menu__label">{chapter.title}</span>
                  <span className="menu__jp" aria-hidden="true" lang="ja">
                    {chapter.kanji}
                  </span>
                </a>
              </li>
            ))}
          </ol>

          <div className="menu__foot">
            <ThemeSwitcher prefix="menu" />
            <MotionToggle />
          </div>
        </div>
      </dialog>
    </>
  );
}
