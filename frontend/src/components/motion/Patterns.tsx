import { useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { motionTokens as tokens } from '../../lib/motion'
import './patterns.css'

// Enter-only route transition: destination and focus are available immediately.
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  return <m.div data-motion="page" initial={reduced ? false : { opacity: .96, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : tokens.duration.normal, ease: tokens.easing.out }}>{children}</m.div>
}

// Whole phrases remain in the accessibility tree; no per-character spans.
export function TextReveal({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  return <m.div data-motion="text" initial={reduced ? false : { opacity: .4, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : tokens.duration.slow, ease: tokens.easing.out }}>{children}</m.div>
}

export function StaggeredContent({ items }: { items: ReactNode[] }) {
  const reduced = useReducedMotion()
  return <div className="motion-stagger">{items.map((item, index) => <m.div key={index} initial={reduced ? false : { opacity: .4, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : tokens.duration.normal, delay: reduced ? 0 : Math.min(index, 4) * tokens.stagger, ease: tokens.easing.out }}>{item}</m.div>)}</div>
}

export function Disclosure({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion(); const id = useId(); const trigger = useRef<HTMLButtonElement>(null)
  return <div className="motion-disclosure"><button ref={trigger} type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)}>{title}<span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <m.div id={id} role="region" aria-label={title} aria-hidden={!open} initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} inert={!open} style={{ overflow: 'hidden' }} transition={{ duration: reduced ? 0 : tokens.duration.normal, ease: tokens.easing.out }}><div className="disclosure-body">{children}</div></m.div>
  </div>
}
