export type HeroKind = 'signal' | 'constellation' | 'liquid'
import { createSignalRenderer } from '../../components/hero/signalRenderer'
import type { SceneFrame, SceneRenderer } from '../../components/hero/signalRenderer'
export type { SceneFrame, SceneRenderer } from '../../components/hero/signalRenderer'

export const evidenceNodes = [
  { name: 'URL', x: 145, y: 120, depth: .7 },
  { name: 'Domain', x: 438, y: 164, depth: 1 },
  { name: 'Brand', x: 409, y: 378, depth: .6 },
  { name: 'Context', x: 129, y: 354, depth: .9 },
] as const

function contour(index: number, frame: SceneFrame) {
  const points: string[] = []
  const radius = 46 + index * 10
  for (let i = 0; i <= 72; i++) {
    const angle = i / 72 * Math.PI * 2
    const swell = Math.sin(angle * 3 + frame.time * .2) * (11 + index * .4)
      + Math.cos(angle * 2 - frame.time * .13) * 9
    const r = radius + swell
    const x = 290 + Math.cos(angle) * r * 1.05 + Math.sin(angle * 2) * 21
      + frame.x * 15 * Math.sin(angle + index * .12)
    const y = 253 + Math.sin(angle) * r * .83 + Math.cos(angle * 2 + frame.time * .1) * 18
      + frame.y * 18 * Math.cos(angle - index * .15)
    points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
  }
  return points.join(' ') + ' Z'
}

export function createHeroRenderer(root: HTMLDivElement, kind: HeroKind): SceneRenderer {
  if (kind === 'signal') return createSignalRenderer(root)

  if (kind === 'constellation') {
    const nodes = [...root.querySelectorAll<SVGGElement>('[data-node]')]
    const edges = [...root.querySelectorAll<SVGPathElement>('[data-edge]')]
    return { draw: frame => {
      const px = 280 + frame.x * 280; const py = 250 + frame.y * 250
      nodes.forEach((node, index) => {
        const point = evidenceNodes[index]
        const x = point.x + Math.sin(frame.time * .28 + index * 1.6) * 3 + frame.x * point.depth * 12
        const y = point.y + Math.cos(frame.time * .3 + index) * 4 + frame.y * point.depth * 12
        const emphasis = Math.max(0, 1 - Math.hypot(x - px, y - py) / 155) * frame.energy
        node.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`)
        node.style.setProperty('--node-emphasis', emphasis.toFixed(3))
        const bend = index % 2 ? -30 : 30
        edges[index].setAttribute('d', `M280 250 Q${(x + 280) / 2 + bend} ${(y + 250) / 2 - bend} ${x} ${y}`)
        edges[index].style.opacity = String(.35 + emphasis * .65)
      })
    } }
  }

  const contours = [...root.querySelectorAll<SVGPathElement>('[data-contour]')]
  let lastGeometry = -Infinity
  return { draw: frame => {
    // Bound path morphing to ~30 updates/s; pointer layer transforms still smooth each RAF.
    if (frame.time - lastGeometry < 1 / 30 && frame.energy === 0) return
    if (frame.time - lastGeometry < 1 / 60) return
    lastGeometry = frame.time
    contours.forEach((path, index) => path.setAttribute('d', contour(index, frame)))
  } }
}

export function staticContour(index: number) {
  return contour(index, { time: 0, x: 0, y: 0, energy: 0 })
}
