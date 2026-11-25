import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { AppShell } from '../components/layout/AppShell'
import { Home } from '../pages/Home'
import { Placeholder } from '../pages/Placeholder'

const MotionPlayground = import.meta.env.DEV ? lazy(() => import('../pages/MotionPlayground')) : null

export function App() {
  return <Routes><Route element={<AppShell />}>
    <Route index element={<Home />} />
    <Route path="scanner" element={<Placeholder title="Scanner" description="Quick, Deep và Compare sẽ được xây dựng ở phase sản phẩm." />} />
    <Route path="investigation" element={<Placeholder title="Investigation" description="Không gian bằng chứng và pipeline sẽ được triển khai sau." />} />
    <Route path="research" element={<Placeholder title="Research" description="Hai khu vực nghiên cứu ViGuard và Lab03 sẽ được giữ độc lập." />} />
    {MotionPlayground && <Route path="__motion" element={<Suspense fallback={<p className="vg-container section-space">Đang mở playground…</p>}><MotionPlayground /></Suspense>} />}
    <Route path="*" element={<Placeholder title="Không tìm thấy trang" description="Đường dẫn này không có trong bản frontend hiện tại." />} />
  </Route></Routes>
}
