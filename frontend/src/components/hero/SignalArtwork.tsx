import { useId } from 'react'
import { useSceneController } from './useSceneController'
import { createSignalRenderer } from './signalRenderer'
export function SignalArtwork({ paused }: { paused: boolean }) {
 const ref = useSceneController(paused, createSignalRenderer)
 const id = useId()
 return <div ref={ref} className="hero-art hero-art--signal" data-testid="hero-art" data-kind="signal" aria-hidden="true">
    <svg className="art-registration" viewBox="0 0 560 500"><path d="M30 70V30H70 M490 30H530V70 M30 430V470H70 M490 470H530V430" /><path d="M280 24V36 M280 464V476 M24 250H36 M524 250H536" /></svg>
<svg className="signal-fallback" viewBox="0 0 560 500"><defs><pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r="1.5" fill="currentColor" /></pattern></defs><rect x="24" y="30" width="512" height="440" fill={`url(#${id})`} /><path d="M40 245 C130 130 200 145 280 245 S440 345 520 230" fill="none" stroke="var(--accent)" /></svg><canvas className="signal-canvas" width="560" height="500" /><div className="signal-stamp"><span>SMS</span><span className="stamp-mark">↗</span><span>Signal</span></div><span className="art-label label-upper">Communication field</span><span className="art-label label-lower">From noise to meaning</span>
</div>
}
