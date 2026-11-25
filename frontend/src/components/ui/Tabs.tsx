import { useId, useRef, useState } from 'react'
import type { ReactNode, KeyboardEvent } from 'react'
import { LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { motionTokens } from '../../lib/motion'

export function Tabs({ label, items }: { label: string; items: { label: string; content: ReactNode }[] }) {
  const [selected, setSelected] = useState(0)
  const reduced = useReducedMotion()
  const id = useId(); const refs = useRef<(HTMLButtonElement | null)[]>([])
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    if (event.key === 'ArrowRight') next = (index + 1) % items.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = items.length - 1
    else return
    event.preventDefault(); setSelected(next); refs.current[next]?.focus()
  }
  return <LayoutGroup id={id}><div><div className="tab-list" role="tablist" aria-label={label}>
    {items.map((item, index) => <button key={item.label} ref={node => { refs.current[index] = node }} type="button" className="tab"
      id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} role="tab" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1}
      onClick={() => setSelected(index)} onKeyDown={event => navigate(event, index)}>{item.label}{selected === index && <motion.span aria-hidden="true" className="tab-indicator" layoutId="active-tab" transition={{ duration: reduced ? 0 : motionTokens.duration.normal, ease: motionTokens.easing.out }} />}</button>)}
  </div>{items.map((item, index) => <div key={item.label} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} tabIndex={0} hidden={selected !== index}><motion.div initial={false} animate={{ opacity: selected === index || reduced ? 1 : .5, y: selected === index || reduced ? 0 : 4 }} transition={{ duration: reduced ? 0 : motionTokens.duration.normal }}>{item.content}</motion.div></div>)}</div></LayoutGroup>
}
