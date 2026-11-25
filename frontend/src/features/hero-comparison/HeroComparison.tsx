import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router'
import { ArrowUpRight, Pause, Play, RotateCcw } from 'lucide-react'
import { Button, Container } from '../../components/ui/Primitives'
import { motionTokens } from '../../lib/motion'
import { HeroArtwork } from './HeroArtwork'
import type { HeroKind } from './sceneRenderers'
import './heroes.css'

const concepts: { id: HeroKind; letter: string; title: string; description: string }[] = [
  { id: 'signal', letter: 'A', title: 'Signal Field', description: 'Một trường tín hiệu có trật tự. Di chuột để nhận ra những đường nét trong nhiễu.' },
  { id: 'constellation', letter: 'B', title: 'Evidence Constellation', description: 'Một tin nhắn trong mạng lưới ngữ cảnh. Di chuột gần các node để làm rõ mối liên hệ.' },
  { id: 'liquid', letter: 'C', title: 'Liquid Intelligence', description: 'Các lớp đường đồng mức uyển chuyển. Di chuột để tác động nhẹ lên hình khối và chiều sâu.' },
]

export function HeroComparison() {
  const [selected, setSelected] = useState<HeroKind>('signal')
  const [paused, setPaused] = useState(false)
  const [replay, setReplay] = useState(0)
  const reduced = Boolean(useReducedMotion())
  const concept = concepts.find(item => item.id === selected)!
  const immediate = reduced || paused
  return <section className="hero-comparison" aria-labelledby="comparison-title" data-testid="hero-comparison">
    <Container className="comparison-toolbar">
      <div className="comparison-heading"><div><p className="eyebrow">ViGuard / Creative studies</p><h2 id="comparison-title">Three ways to see deeper.</h2></div><p>Ba hướng thị giác. Cùng thông điệp, cùng Palette A.<br />A — Signal Field đã được chọn. B/C giữ để tham khảo.</p></div>
      <div className="comparison-controls"><fieldset className="hero-selector"><legend className="sr-only">Chọn hero prototype</legend>{concepts.map(item => <label key={item.id}><input type="radio" name="hero-concept" value={item.id} checked={selected === item.id} onChange={() => setSelected(item.id)} /><span><span className="concept-letter">{item.letter}</span>{item.title}</span></label>)}</fieldset>
        <div className="comparison-actions"><Button variant="secondary" onClick={() => setReplay(value => value + 1)} aria-label="Phát lại entrance"><RotateCcw size={16} aria-hidden="true" /><span>Phát lại</span></Button><Button variant="secondary" onClick={() => setPaused(value => !value)}>{paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}{paused ? 'Tiếp tục chuyển động' : 'Tạm dừng chuyển động'}</Button></div>
      </div>
      <p id="concept-description" className="concept-description" aria-live="polite"><strong>{concept.letter} / {concept.title}.</strong> {concept.description}</p>
    </Container>
    <div className="hero-stage" data-theme="dark" data-testid="hero-stage" data-paused={paused} data-reduced={reduced}>
      <Container className="prototype-grid">
        <div className="prototype-copy"><p className="prototype-kicker"><span className="kicker-line" />Research-backed AI Security</p>
          <motion.h2 key={`headline-${replay}`} className="prototype-headline" initial={immediate ? false : { opacity: .5, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: immediate ? 0 : motionTokens.duration.cinematic, ease: motionTokens.easing.out }}>Đọc kỹ hơn.<br />Hiểu rõ hơn.</motion.h2>
          <p className="prototype-description">Một tin nhắn, hai hướng phân tích độc lập. Hiểu nội dung và bằng chứng trước khi đưa ra quyết định.</p>
          <div className="prototype-actions"><motion.div className="prototype-cta-wrap" whileHover={immediate ? undefined : { y: -2 }} whileTap={immediate ? undefined : { scale: .98 }} transition={{ duration: motionTokens.duration.fast }}><Link className="button prototype-cta" to="/scanner">Khám phá Scanner<ArrowUpRight size={19} aria-hidden="true" /></Link></motion.div><Link className="prototype-secondary" to="/research">Đọc nghiên cứu</Link></div>
          <p className="prototype-trust">Hai engine độc lập. Bằng chứng có nguồn.<br />Chưa kết nối model trong bản preview.</p>
        </div>
        <div className="prototype-visual"><AnimatePresence mode="wait" initial={false}><motion.div key={`${selected}-${replay}`} className="art-presence" initial={immediate ? false : { opacity: 0, scale: .97, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: immediate ? 0 : motionTokens.duration.slow, ease: motionTokens.easing.out }}><HeroArtwork kind={selected} paused={paused} /></motion.div></AnimatePresence>
          <div className="art-caption"><span className="concept-index">Study {concept.letter}</span><span>Artwork trừu tượng · không phải dữ liệu phân tích</span></div>
        </div>
      </Container>
      <Container className="prototype-bottom"><span>ViGuard Intelligence</span><span>Message → Context → Understanding</span><span className="motion-alternative">Touch / reduced motion: bố cục tĩnh đầy đủ.</span></Container>
    </div>
    <Container><p className="comparison-footnote">Rê chuột trong vùng artwork để trải nghiệm. Trên touch hoặc khi giảm chuyển động, hình khối tĩnh giữ nguyên ý nghĩa; mọi thao tác và CTA vẫn dùng được.</p></Container>
  </section>
}
