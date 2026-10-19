import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';

// Extracted from the lab's shared UI without its other proposals or cart context.
export function Modal({ open, onClose, title, children, className = '' }: {
  open: boolean; onClose: () => void; title: string; children: ReactNode; className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [open]);
  return <dialog ref={ref} className={`hp-modal ${className}`} aria-labelledby={titleId}
    onCancel={onClose} onClose={onClose} onClick={event => {
      const dialog = ref.current;
      if (!dialog || event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
    }}>
    <div className="hp-modal-heading"><h2 id={titleId}>{title}</h2><button type="button" onClick={onClose} aria-label={`Close ${title}`} autoFocus>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
    </button></div>
    {children}
  </dialog>;
}
