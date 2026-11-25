import { motion, useReducedMotion } from 'motion/react'
import type { HTMLMotionProps } from 'motion/react'
import { Check, Diamond, CircleAlert, CircleMinus } from 'lucide-react'
import type { HTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { useId } from 'react'
import { motionTokens } from '../../lib/motion'

export function Button({ variant = 'primary', className = '', ...props }: HTMLMotionProps<'button'> & { variant?: 'primary' | 'secondary' }) {
  const reduced = useReducedMotion()
  return <motion.button type="button" className={`button ${variant === 'secondary' ? 'secondary' : ''} ${className}`}
    whileTap={reduced ? undefined : { scale: .98 }} transition={{ duration: motionTokens.duration.instant }} {...props} />
}
export function Container({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`vg-container ${className}`} {...props} />
}
export function Panel({ className = '', ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={`panel ${className}`} {...props} />
}
export function SectionHeading({ title, description }: { title: string; description?: string }) {
  return <div className="section-heading"><h2>{title}</h2>{description && <p>{description}</p>}</div>
}
export function Input({ label, hint, id, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  const generated = useId(); const fieldId = id ?? generated
  return <div className="field"><label htmlFor={fieldId}>{label}</label><input id={fieldId} aria-describedby={hint ? `${fieldId}-hint` : undefined} {...props} />{hint && <small id={`${fieldId}-hint`}>{hint}</small>}</div>
}
export function Textarea({ label, hint, id, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; hint?: string }) {
  const generated = useId(); const fieldId = id ?? generated
  return <div className="field"><label htmlFor={fieldId}>{label}</label><textarea id={fieldId} aria-describedby={hint ? `${fieldId}-hint` : undefined} {...props} />{hint && <small id={`${fieldId}-hint`}>{hint}</small>}</div>
}
export function StatusIndicator({ tone = 'neutral', children }: { tone?: 'neutral' | 'safe' | 'advertisement' | 'scam'; children: React.ReactNode }) {
  const Icon = { neutral: CircleMinus, safe: Check, advertisement: Diamond, scam: CircleAlert }[tone]
  return <span className={`status ${tone}`}><Icon size={16} aria-hidden="true" />{children}</span>
}
