import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { m, useReducedMotion, useScroll } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '../../components/ui/Primitives'
import { Reveal } from '../../components/motion/Reveal'

const observations = [
  { label: 'Thời gian', detail: 'Yêu cầu gấp gáp có thể khiến người đọc bỏ qua bước xác minh. Hãy dành thời gian kiểm tra lại.' },
  { label: 'Hành động', detail: 'Xem kỹ điều tin nhắn yêu cầu bạn thực hiện. Không cung cấp thông tin nhạy cảm khi chưa xác minh nguồn.' },
  { label: 'Đường dẫn', detail: 'Đọc tên miền và đối chiếu với kênh chính thức. Tên miền .example ở đây chỉ dùng cho minh họa.' },
]

export function MessageStudy() {
  const [selected, setSelected] = useState(0)
  return <div className="message-study"><div className="sms-paper"><div className="sms-paper-header"><span>SMS minh họa</span><span aria-hidden="true">↙</span></div><p className="sms-quote">Yêu cầu <mark data-active={selected === 1}>xác nhận tài khoản</mark> trong <mark data-active={selected === 0}>30 phút</mark>. Truy cập <mark data-active={selected === 2}>taikhoan.example</mark> để hoàn tất.</p><p className="sms-fiction">Nội dung hư cấu · Không phải dự đoán của model</p></div><div className="message-observations"><div className="observation-controls" role="group" aria-label="Quan sát tin nhắn minh họa">{observations.map((item, i) => <button type="button" key={item.label} aria-pressed={i === selected} onClick={() => setSelected(i)}>{item.label}</button>)}</div><p aria-live="polite" className="observation-detail">{observations[selected].detail}</p></div></div>
}

export function HomeJourney() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  return <section ref={ref} className="home-journey home-section" aria-labelledby="journey-title"><Container className="journey-layout"><div className="journey-intro"><p className="home-label">Cách sử dụng</p><Reveal section><h2 id="journey-title">Bắt đầu bằng<br />một tin nhắn.</h2></Reveal><p>Giữ hành trình đơn giản.<br />Để phần giải thích đi sâu hơn.</p><Link className="home-text-link" to="/scanner">Đến Scanner<ArrowUpRight size={18} aria-hidden="true" /></Link></div><div className="journey-steps"><div className="journey-rail" aria-hidden="true"><m.span style={{ scaleY: reduced ? 1 : scrollYProgress }} /></div><ol>{[
    ['Nhập nội dung', 'Dán SMS hoặc nhập một ví dụ không chứa thông tin riêng tư.'],
    ['Chọn cách tiếp cận', 'Quick cho ViGuard ML, Deep cho SmishX Agent; Compare đặt hai kết quả độc lập cạnh nhau.'],
    ['Đọc kết quả và giới hạn', 'Khi engine sẵn sàng, xem phân tích và bằng chứng khả dụng. Nếu chưa kết nối, giao diện sẽ báo rõ trạng thái.'],
  ].map(([title, copy], index) => <li key={title}><span className="journey-number">0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol><p className="journey-disclaimer">Đây là hướng dẫn sử dụng, không phải một lượt inference đang chạy.</p></div></Container></section>
}
