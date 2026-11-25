import { Link } from 'react-router'
import { Container, Panel, SectionHeading, StatusIndicator } from '../components/ui/Primitives'

export function Placeholder({ title, description }: { title: string; description: string }) {
  return <Container className="section-space"><SectionHeading title={title} description={description} /><Panel aria-label="Trạng thái trang"><StatusIndicator>Placeholder — chưa triển khai</StatusIndicator><p className="mt-4 text-muted">Route skeleton đã sẵn sàng. Chưa có API, model hoặc dữ liệu nghiên cứu được tích hợp.</p><Link className="button secondary mt-6" to="/">Về Home</Link></Panel></Container>
}
