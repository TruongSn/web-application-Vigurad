import { PageTransition } from '../motion/Patterns'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { Menu, ScanLine, X } from 'lucide-react'
import { Container } from '../ui/Primitives'
import './shell.css'

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null); const header = useRef<HTMLElement>(null)
  const location = useLocation(); const main = useRef<HTMLElement>(null); const previousPath = useRef(location.pathname)
  const links = [['/', 'Home'], ['/scanner', 'Scanner'], ['/investigation', 'Investigation'], ['/research', 'Research']]
  useEffect(() => {
    if (!menuOpen) return
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setMenuOpen(false) }
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus() } }
    const desktop = matchMedia('(min-width:781px)'); const resize = () => setMenuOpen(false)
    document.addEventListener('pointerdown', outside); document.addEventListener('keydown', escape); desktop.addEventListener('change', resize)
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); desktop.removeEventListener('change', resize) }
  }, [menuOpen])
  useEffect(() => {
    if (previousPath.current === location.pathname) return
    previousPath.current = location.pathname
    main.current?.focus({ preventScroll: true }); window.scrollTo(0, 0)
  }, [location.pathname])
  return <><a className="skip-link" href="#main">Đến nội dung chính</a>
    <header ref={header} className="site-header" data-theme="dark"><Container className="nav-row">
      <NavLink className="brandmark" to="/" aria-label="ViGuard — Trang chủ" onClick={() => setMenuOpen(false)}><ScanLine size={24} aria-hidden="true" />ViGuard.</NavLink>
      <nav className="nav-links desktop-navigation" aria-label="Điều hướng chính">{links.map(([to, label]) => <NavLink key={to} className="nav-link" to={to} end={to === '/'}>{label}</NavLink>)}</nav>
      <button ref={menuButton} className="mobile-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(value => !value)}>Menu{menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}</button>
    </Container><Container hidden={!menuOpen}><nav id="mobile-navigation" className="mobile-navigation" aria-label="Điều hướng mobile">{links.map(([to, label]) => <NavLink key={to} className="nav-link" to={to} end={to === '/'} onClick={() => setMenuOpen(false)}>{label}</NavLink>)}</nav></Container></header>
    <main id="main" tabIndex={-1} ref={main}><PageTransition key={location.pathname}><Outlet /></PageTransition></main>
    <footer className="site-footer" data-theme="dark"><Container className="footer-main"><div><Link className="footer-signature" to="/" aria-label="ViGuard Intelligence — Trang chủ">ViGuard.</Link><p>Một nền tảng AI Security.<br />Hai hướng nghiên cứu độc lập.</p></div><nav className="footer-navigation" aria-label="Liên kết cuối trang"><Link to="/scanner">Scanner SMS</Link><Link to="/research">Nghiên cứu</Link><Link to="/investigation">Không gian điều tra</Link><a href="/#read-between">Về cách tiếp cận</a></nav></Container><Container className="footer-row"><span>ViGuard Intelligence / Research-backed AI Security</span><span>Bản phát triển · Chưa kết nối engine</span></Container></footer>
  </>
}
