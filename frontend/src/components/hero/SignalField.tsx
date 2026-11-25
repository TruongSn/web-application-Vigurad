import { useState } from 'react'
import { Link } from 'react-router'
import { m, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react'
import { Container } from '../ui/Primitives'
import { SignalArtwork } from './SignalArtwork'
import { motionTokens } from '../../lib/motion'
import './SignalField.css'

export function SignalField() {
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  return <section className="hero-stage production-hero" data-theme="dark" aria-labelledby="home-title">
    <Container className="production-hero-inner">
      <div className="hero-edition"><span>ViGuard Intelligence</span><span>Vietnamese SMS · AI Security</span></div>
      <div className="production-art"><SignalArtwork paused={paused} /><span className="production-art-caption">Signal Field / minh họa tương tác</span></div>
      <div className="production-hero-copy"><m.h1 id="home-title" initial={reduced ? false : { opacity: .6, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : motionTokens.duration.cinematic, ease: motionTokens.easing.out }}>Đọc kỹ hơn.<br /><span>Hiểu rõ hơn.</span></m.h1>
        <p className="production-hero-description">Một tin nhắn. Nhiều điều cần hiểu.<br />Khám phá nội dung và ngữ cảnh qua hai hướng phân tích AI độc lập.</p>
        <div className="production-hero-actions"><Link className="button prototype-cta" to="/scanner">Khám phá Scanner<ArrowUpRight size={19} aria-hidden="true" /></Link><Link className="hero-research-link" to="/research">Nghiên cứu phía sau<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
        <p className="hero-readiness">Bản trải nghiệm giao diện · Engine chưa kết nối</p>
      </div>
      <div className="production-hero-bottom"><a href="#read-between">Nhìn sâu hơn vào một tin nhắn<ArrowDown size={16} aria-hidden="true" /></a><button className="hero-pause" type="button" aria-label={paused ? 'Tiếp tục chuyển động' : 'Tạm dừng chuyển động'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}<span>{paused ? 'Tiếp tục' : 'Tạm dừng'}</span></button></div>
    </Container>
  </section>
}
