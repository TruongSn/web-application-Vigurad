import './studies.css'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Disclosure, StaggeredContent, TextReveal } from '../../components/motion/Patterns'
import { Reveal } from '../../components/motion/Reveal'

export function MotionStudies() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, 90])
  return <section aria-label="Reusable motion studies" className="mt-16" data-testid="motion-studies">
    <TextReveal><h2>Từ tin nhắn đến cách tiếp cận</h2></TextReveal>
    <p className="my-4 text-muted">Minh họa chuyển động giao diện. Không phải pipeline đang chạy.</p>
    <StaggeredContent items={['Nhận nội dung', 'Giữ ngữ cảnh', 'Tách hai hướng nghiên cứu'].map(text => <p key={text}>{text}</p>)} />
    <div className="mt-8"><Disclosure title="Giới hạn của bản minh họa"><p>Chưa có dữ liệu phân tích hoặc evidence thật. Nội dung chỉ minh họa expand/collapse.</p><a href="#story-study">Đến câu chuyện cuộn</a></Disclosure></div>
    <div ref={ref} className="story-study" id="story-study"><div className="story-mark"><p>SMS → Context</p><svg viewBox="0 0 160 32" width="160" height="32" aria-hidden="true"><path d="M8 16H152" stroke="var(--border)" /><motion.circle cx="20" cy="16" r="4" fill="var(--brand)" style={{ x: reduced ? 45 : x }} /></svg><p className="text-sm text-muted">Minh họa theo vị trí cuộn</p></div><div>{[
      ['Tin nhắn', 'Đọc nội dung trước khi đưa ra quyết định.'],
      ['Ngữ cảnh', 'Bằng chứng cần nguồn và giới hạn rõ ràng.'],
      ['Hai hướng độc lập', 'ViGuard ML và SmishX Agent giữ phương pháp nghiên cứu riêng.'],
    ].map(([title, text]) => <div className="story-step" key={title}><Reveal section><h3>{title}</h3><p>{text}</p></Reveal></div>)}</div></div>
  </section>
}
