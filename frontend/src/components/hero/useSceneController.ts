import { useEffect, useRef } from 'react'
import { useIsPresent } from 'motion/react'
import type { SceneFrame, SceneRenderer } from './signalRenderer'

// A single cancellable loop for the mounted artwork. No per-pointer React state.
export function useSceneController(paused: boolean, factory: (root: HTMLDivElement) => SceneRenderer) {
  const ref = useRef<HTMLDivElement>(null)
  const frameRef = useRef<SceneFrame>({ time: 0, x: 0, y: 0, energy: 0 })
  const present = useIsPresent()
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const renderer = factory(root)
    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let bounds = root.getBoundingClientRect()
    let visible = false; let focused = true; let disposed = false
    let raf = 0; let previous = 0; let time = frameRef.current.time
    const target = { x: 0, y: 0, energy: 0 }
    const frame = frameRef.current
    function draw() {
      root!.style.setProperty('--scene-x', `${(frame.x * 10).toFixed(3)}px`)
      root!.style.setProperty('--scene-y', `${(frame.y * 10).toFixed(3)}px`)
      renderer.draw(frame)
    }
    function canRun() { return !disposed && present && !paused && !reduced.matches && fine.matches && visible && focused && !document.hidden }
    function tick(now: number) {
      raf = 0
      if (!canRun()) return
      const delta = previous ? Math.min((now - previous) / 1000, .05) : 0
      previous = now; time += delta; frame.time = time
      const smooth = 1 - Math.exp(-delta * 7)
      frame.x += (target.x - frame.x) * smooth
      frame.y += (target.y - frame.y) * smooth
      frame.energy += (target.energy - frame.energy) * smooth
      draw(); raf = requestAnimationFrame(tick)
    }
    function reconcile() {
      if (canRun()) {
        root!.dataset.sceneState = 'running'
        if (!raf) { previous = 0; raf = requestAnimationFrame(tick) }
      } else {
        cancelAnimationFrame(raf); raf = 0; previous = 0
        root!.dataset.sceneState = reduced.matches || !fine.matches ? 'static' : paused ? 'paused' : document.hidden ? 'hidden' : 'offscreen'
      }
    }
    function resize() { bounds = root!.getBoundingClientRect(); renderer.resize?.(); draw() }
    function updateBounds() { if (visible) bounds = root!.getBoundingClientRect() }
    function move(event: PointerEvent) {
      if (event.pointerType !== 'mouse' || !canRun()) return
      target.x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1))
      target.y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1))
      target.energy = 1
    }
    function leave() { target.x = 0; target.y = 0; target.energy = 0 }
    function blur() { focused = false; leave(); reconcile() }
    function focus() { focused = true; bounds = root!.getBoundingClientRect(); reconcile() }
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; reconcile() }, { threshold: .05 })
    const resizeObserver = new ResizeObserver(resize)
    root.addEventListener('pointerenter', updateBounds)
    root.addEventListener('pointermove', move, { passive: true })
    root.addEventListener('pointerleave', leave)
    window.addEventListener('blur', blur); window.addEventListener('focus', focus)
    window.addEventListener('scroll', updateBounds, { passive: true })
    document.addEventListener('visibilitychange', reconcile)
    fine.addEventListener('change', reconcile); reduced.addEventListener('change', reconcile)
    draw(); observer.observe(root); resizeObserver.observe(root); reconcile()
    return () => {
      disposed = true; cancelAnimationFrame(raf)
      observer.disconnect(); resizeObserver.disconnect()
      root.removeEventListener('pointerenter', updateBounds); root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave)
      window.removeEventListener('blur', blur); window.removeEventListener('focus', focus); window.removeEventListener('scroll', updateBounds)
      document.removeEventListener('visibilitychange', reconcile)
      fine.removeEventListener('change', reconcile); reduced.removeEventListener('change', reconcile)
    }
  }, [factory, paused, present])
  return ref
}
