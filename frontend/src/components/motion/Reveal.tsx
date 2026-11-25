import { m, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { motionTokens } from '../../lib/motion'

export function Reveal({ children, section = false }: { children: ReactNode; section?: boolean }) {
  const reduced = useReducedMotion()
  return <m.div data-motion="reveal" data-reduced-motion={Boolean(reduced)}
    initial={reduced ? false : { opacity: 0, y: section ? 12 : 6 }}
    animate={section ? undefined : motionTokens.enter}
    whileInView={section ? motionTokens.enter : undefined}
    viewport={{ once: true, amount: .1 }}
    exit={reduced ? undefined : motionTokens.exit}
    transition={{ duration: reduced ? 0 : motionTokens.duration.normal, ease: motionTokens.easing.out }}>
    {children}
  </m.div>
}

export function SubtleHover({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  return <m.div whileHover={reduced ? undefined : { y: -2 }} transition={{ duration: motionTokens.duration.fast }}>
    {children}
  </m.div>
}
