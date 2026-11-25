import { Link } from 'react-router'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { Container } from '../components/ui/Primitives'
import { Reveal } from '../components/motion/Reveal'
import { SignalField } from '../components/hero/SignalField'
import { MessageStudy, HomeJourney } from '../features/home/HomeStory'
import './home.css'

export function Home() {
  return <div className="home-page"><SignalField />
    <section id="read-between" className="home-problem home-section" aria-labelledby="problem-title">
      <Container><div className="problem-layout"><div className="problem-copy"><p className="home-label">Một khoảng dừng cần thiết</p><Reveal section><h2 id="problem-title">Tin nhắn ngắn.<br />Câu hỏi không nhỏ.</h2></Reveal><p>Một lời nhắc quen thuộc. Một yêu cầu gấp gáp. Một đường dẫn cần nhìn lại.</p><p>ViGuard giúp bạn tiếp cận SMS từ nội dung đến ngữ cảnh, để hiểu điều gì cần được kiểm chứng trước khi hành động.</p><a className="home-text-link" href="#two-engines">Khám phá hai cách tiếp cận<ArrowRight size={18} aria-hidden="true" /></a></div><MessageStudy /></div>
        <p className="problem-postscript">Nhận ra dấu hiệu là điểm bắt đầu.<br /><span>Kiểm chứng là bước tiếp theo.</span></p>
      </Container>
    </section>
    <section id="two-engines" aria-labelledby="engines-title" className="home-engines">
      <Container className="home-section engine-intro"><p className="home-label">Hai engine độc lập</p><div className="home-split-heading"><Reveal section><h2 id="engines-title">Hai lối tiếp cận.<br />Một tin nhắn.</h2></Reveal><p>Mỗi phương pháp nhìn vào một lớp thông tin khác nhau. Bộ nhãn, dữ liệu và quy trình đánh giá của hai nghiên cứu được giữ riêng.</p></div></Container>
      <div className="engine-chapter ml-chapter"><Container className="engine-chapter-grid"><div className="engine-description"><p className="engine-name">ViGuard ML <span>Machine learning</span></p><h3>Đọc cấu trúc.<br />Nhận diện mẫu.</h3><p>Phương pháp học máy tiếp cận bài toán phân loại SMS tiếng Việt qua tiền xử lý văn bản và trích xuất đặc trưng.</p><Link className="home-text-link" to="/research">Tìm hiểu ViGuard ML<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        <div className="ml-method" aria-label="Minh họa phương pháp ViGuard ML"><div className="method-caption"><span>Văn bản → đặc trưng → phân loại</span><span>Minh họa phương pháp</span></div><div className="ml-input"><span className="method-tag">SMS tiếng Việt</span><p>Mỗi tin nhắn có<br />một cấu trúc riêng.</p><div className="text-segments" aria-hidden="true">{[42, 70, 26, 58, 38, 80, 24, 52, 68, 32, 48, 72].map((width, i) => <span key={i} style={{ width }} />)}</div></div><div className="feature-bridge" aria-hidden="true"><span /><span /><span /><span /><span /></div><div className="ml-labels"><span>Nhãn ViGuard</span><div><span>Safe</span><span>Advertisement</span><span>Scam</span></div></div></div>
      </Container></div>
      <div className="engine-chapter agent-chapter" data-theme="dark"><Container className="engine-chapter-grid"><div className="agent-method" aria-label="Minh họa hướng tiếp cận SmishX Agent"><div className="method-caption"><span>Context & reasoning</span><span>Sơ đồ khái niệm</span></div><div className="agent-map"><div className="agent-source">Tin nhắn<span>Nội dung cần tìm hiểu</span></div><div className="agent-branches"><div>Ngữ cảnh<span>Điều gì đang được yêu cầu?</span></div><div>Nguồn tham chiếu<span>Thông tin có thể kiểm chứng?</span></div></div><div className="agent-explanation">Giải thích có nguồn<span>Kèm phạm vi và giới hạn</span></div></div><p>Không phải evidence hay execution trace thực tế.</p></div>
        <div className="engine-description"><p className="engine-name">SmishX Agent <span>LLM-based agents</span></p><h3>Theo dấu ngữ cảnh.<br />Hiểu thêm lý do.</h3><p>Hướng nghiên cứu dùng các agent dựa trên mô hình ngôn ngữ để tìm hiểu ngữ cảnh, thu thập thông tin liên quan và giải thích nguy cơ phishing.</p><Link className="home-text-link" to="/research">Khám phá nghiên cứu Lab03<ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </Container><Container><p className="engine-readiness">Hai pipeline đang chờ tích hợp. Các sơ đồ mô tả phương pháp, không phải kết quả phân tích.</p></Container></div>
    </section>
    <HomeJourney />
    <section className="home-research home-section" aria-labelledby="research-title"><Container><div className="research-heading"><p className="home-label">Science behind intelligence</p><Reveal section><h2 id="research-title">Có phương pháp.<br />Có chỗ để kiểm chứng.</h2></Reveal><p>Một nền tảng chung cho hai dự án nghiên cứu độc lập. Đi từ câu hỏi, phương pháp đến những kết quả có thể tái lập.</p></div><div className="research-index">
      <Link to="/research" className="research-entry"><span className="research-project">ViGuard</span><div><h3>Phân loại SMS tiếng Việt</h3><p>Dữ liệu, đặc trưng, đánh giá và phân tích lỗi của pipeline học máy.</p></div><ArrowUpRight aria-hidden="true" size={24} /></Link>
      <Link to="/research" className="research-entry"><span className="research-project">Lab03</span><div><h3>LLM-based agents & phishing</h3><p>Paper gốc, tái lập phương pháp và đánh giá trên dataset mới.</p></div><ArrowUpRight aria-hidden="true" size={24} /></Link>
      <div className="research-note"><span>Kết quả cần có nguồn.</span><p>Kết quả của nhóm đang chờ artifacts và protocol được xác nhận. Số liệu paper gốc không thay thế kết quả tái lập của nhóm.</p></div>
    </div></Container></section>
    <section className="home-conclusion" data-theme="dark" aria-labelledby="conclusion-title"><Container><p className="home-label">Trước một đường dẫn, thêm một góc nhìn.</p><div className="conclusion-content"><h2 id="conclusion-title">Đừng vội bấm.<br />Hãy đọc kỹ hơn.</h2><div><Link className="button" to="/scanner">Mở Scanner<ArrowUpRight size={20} aria-hidden="true" /></Link><p>Giao diện Scanner hiện ở trạng thái chờ tích hợp engine.</p></div></div><div className="conclusion-note"><span>Hiểu nội dung. Xem ngữ cảnh. Giữ quyền quyết định.</span><p>Không nhập OTP hoặc thông tin nhạy cảm vào nội dung thử nghiệm. AI là công cụ hỗ trợ, không thay thế việc xác minh.</p></div></Container></section>
  </div>
}
