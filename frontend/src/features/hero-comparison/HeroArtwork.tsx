import { evidenceNodes, staticContour } from './sceneRenderers'
import type { HeroKind } from './sceneRenderers'
import { useHeroScene } from './useHeroScene'

export function HeroArtwork({ kind, paused }: { kind: HeroKind; paused: boolean }) {
  const ref = useHeroScene(kind, paused)
  return <div ref={ref} className={`hero-art hero-art--${kind}`} data-testid="hero-art" data-kind={kind} aria-hidden="true">
    <svg className="art-registration" viewBox="0 0 560 500"><path d="M30 70V30H70 M490 30H530V70 M30 430V470H70 M490 470H530V430" /><path d="M280 24V36 M280 464V476 M24 250H36 M524 250H536" /></svg>
    {kind === 'signal' && <><svg className="signal-fallback" viewBox="0 0 560 500"><defs><pattern id="signal-grid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r="1.5" fill="currentColor" /></pattern></defs><rect x="24" y="30" width="512" height="440" fill="url(#signal-grid)" /><path d="M40 245 C130 130 200 145 280 245 S440 345 520 230" fill="none" stroke="var(--accent)" /></svg><canvas className="signal-canvas" width="560" height="500" /><div className="signal-stamp"><span>SMS</span><span className="stamp-mark">↗</span><span>Signal</span></div><span className="art-label label-upper">Communication field</span><span className="art-label label-lower">From noise to meaning</span></>}
    {kind === 'constellation' && <svg className="constellation-map" viewBox="0 0 560 500">
      <g className="constellation-orbits"><ellipse cx="280" cy="250" rx="208" ry="185" /><ellipse cx="280" cy="250" rx="153" ry="139" /><path d="M100 158 Q310 40 451 333 M115 384 Q325 450 466 158" /></g>
      {evidenceNodes.map(node => <path key={node.name} data-edge="" d={`M280 250 L${node.x} ${node.y}`} className="constellation-edge" />)}
      <g className="constellation-center"><rect x="240" y="210" width="80" height="80" rx="19" /><path d="M258 237H302 M258 249H290 M258 261H297" /><circle cx="313" cy="218" r="5" /><text x="280" y="317" textAnchor="middle">The message</text></g>
      {evidenceNodes.map((node, i) => <g key={node.name} data-node={node.name} transform={`translate(${node.x} ${node.y})`} className={`constellation-node node-${i}`}><circle r="31" className="node-halo" /><circle r="19" className="node-disc" /><path d={i === 0 ? 'M-8 0H8 M0-8V8' : i === 1 ? 'M-7-7H7V7H-7Z' : i === 2 ? 'M0-9L9 0 0 9-9 0Z' : 'M-8-5H8 M-8 0H5 M-8 5H8'} /><text y="51" textAnchor="middle">{node.name}</text></g>)}
      <text x="38" y="55" className="svg-caption">Relationships, not assumptions</text><text x="345" y="451" className="svg-caption">Context / Evidence</text>
    </svg>}
    {kind === 'liquid' && <><svg className="liquid-map" viewBox="0 0 560 500"><g className="liquid-layers">{Array.from({ length: 17 }, (_, index) => <path key={index} data-contour={index} d={staticContour(index)} className={`liquid-contour contour-${index}`} />)}</g><path className="liquid-axis" d="M280 55V84 M280 416V445 M66 250H92 M468 250H494" /><text x="38" y="55" className="svg-caption">An intelligence in motion</text><text x="355" y="451" className="svg-caption">Continuous understanding</text></svg><div className="liquid-core"><span>Vi</span><span className="liquid-core-rule" /><span>Intelligence</span></div></>}
  </div>
}
