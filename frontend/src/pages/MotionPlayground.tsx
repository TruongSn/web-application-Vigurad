import { useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Container, Panel, SectionHeading, Button, Input, Textarea, StatusIndicator } from '../components/ui/Primitives'
import { Tabs } from '../components/ui/Tabs'
import { Reveal, SubtleHover } from '../components/motion/Reveal'
import { motionTokens } from '../lib/motion'
import { HeroComparison } from '../features/hero-comparison/HeroComparison'
import { MotionStudies } from '../features/hero-comparison/MotionStudies'

export default function MotionPlayground() {
  const [replay, setReplay] = useState(0); const reduced = useReducedMotion()
  return <><HeroComparison /><Container className="section-space"><SectionHeading title="Motion foundation" description="Dev-only review · Palette A — Tidal Observatory. UI/motion primitives, không có kết quả model." />
    <p className="mb-8 text-muted" data-testid="motion-preference">Reduced motion: {reduced ? 'on' : 'off'} · Duration normal: {motionTokens.duration.normal * 1000} ms</p>
    <div className="study-grid"><Panel aria-label="Light surface"><h3>Light surface</h3><p className="my-4 text-muted">Nguyễn · quyền riêng tư · bằng chứng · ễ ộ ắ ự</p><div className="flex flex-wrap gap-4"><Button onClick={() => setReplay(value => value + 1)}>Xem lại reveal</Button><Button variant="secondary">Press feedback</Button><Button disabled>Disabled</Button></div><div className="mt-6"><Reveal key={replay}><p data-testid="reveal-content">Nội dung luôn có sẵn khi giảm chuyển động.</p></Reveal></div></Panel>
      <Panel data-theme="dark" aria-label="Dark surface"><h3>Dark surface</h3><p className="my-4 text-muted">Cùng hệ thống tokens, giữ rõ thông tin và focus.</p><div className="flex flex-wrap gap-4"><StatusIndicator tone="safe">Safe — mẫu nhãn</StatusIndicator><StatusIndicator tone="advertisement">Advertisement — mẫu nhãn</StatusIndicator><StatusIndicator tone="scam">Scam — mẫu nhãn</StatusIndicator></div><p className="mt-4 text-sm text-muted">Không phải dự đoán. Màu đi cùng tên và hình dạng.</p><div className="mt-6 flex gap-4 flex-wrap"><Button>Primary dark</Button><Button variant="secondary">Secondary dark</Button></div></Panel>
      <Panel aria-label="Inputs và tabs"><h3 className="mb-6">Input & selection</h3><Input label="Tên mẫu" hint="Chỉ dùng nội dung hư cấu; không lưu dữ liệu." placeholder="Ví dụ review giao diện" /><div className="mt-6"><Tabs label="Chế độ mẫu" items={['Quick', 'Deep', 'Compare'].map(mode => ({ label: mode, content: <><p className="text-muted">{mode}: chỉ mẫu tab panel. Chưa kết nối engine.</p><Input label={`Ghi chú mẫu ${mode}`} hint="Chỉ dùng nội dung hư cấu; giữ khi đổi tab." /></> }))} /></div><div className="mt-6"><Textarea label="SMS mẫu" hint="Không nhập OTP hoặc SMS riêng tư. Không gửi request." placeholder="Giữ dấu tiếng Việt…" /></div></Panel>
      <SubtleHover><Panel aria-label="Hover và section entrance"><h3>Subtle hover</h3><p className="mt-4 text-muted">Dịch 2 px khi hover; tắt khi reduced motion. Không loop, không cursor effect.</p><div className="mt-8"><Reveal section><h3>Section entrance</h3><p className="mt-4 text-muted">Transform + opacity, xuất hiện một lần trong viewport.</p></Reveal></div><p className="mt-6 font-mono text-sm">engine_id / phiên bản / unavailable</p></Panel></SubtleHover>
    </div><div className="mt-16"><SectionHeading title="Palette A / token ledger" description="HEX đã duyệt. Brand và semantic roles được tách riêng." /><div className="token-grid">{['bg', 'surface', 'text', 'muted', 'brand', 'accent', 'border', 'focus'].map(token => <div key={token}><div className="swatch" style={{ background: `var(--${token})` }} /><p className="token-name">--{token}</p></div>)}</div></div>
    <MotionStudies />
  </Container></>
}
