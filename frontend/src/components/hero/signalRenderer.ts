export type SceneFrame = { time: number; x: number; y: number; energy: number }
export type SceneRenderer = { draw: (frame: SceneFrame) => void; resize?: () => void }
export function createSignalRenderer(root: HTMLDivElement): SceneRenderer {
 const style = getComputedStyle(root)
 const brand = style.getPropertyValue('--brand').trim()
 const accent = style.getPropertyValue('--accent').trim()
 const border = style.getPropertyValue('--border').trim()
    const canvas = root.querySelector('canvas')!
    const context = canvas.getContext('2d')
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(rect.width * dpr); canvas.height = Math.round(rect.height * dpr)
      context?.setTransform(canvas.width / 560, 0, 0, canvas.height / 500, 0, 0)
    }
    resize()
    if (!context) return { draw: () => {}, resize }
    root.dataset.canvasReady = 'true'
    return { resize, draw: frame => {
      context.clearRect(0, 0, 560, 500)
      const px = 280 + frame.x * 280; const py = 250 + frame.y * 250
      for (let row = 0; row < 19; row++) {
        for (let col = 0; col < 23; col++) {
          const gx = 25 + col * 23.2; const gy = 30 + row * 24.4
          const distance = Math.hypot(gx - px, gy - py)
          const proximity = Math.max(0, 1 - distance / 130) * frame.energy
          const ribbon = Math.exp(-(((gy - 245 - Math.sin(gx * .013 + frame.time * .17) * 80) / 32) ** 2))
          const envelope = Math.max(.12, 1 - Math.hypot((gx - 290) / 340, (gy - 250) / 290))
          const drift = Math.sin(frame.time * .55 + gx * .01 + row * .25) * 1.8
          const push = proximity * 10
          const x = gx + (gx - px) / (distance || 1) * push
          const y = gy + drift + (gy - py) / (distance || 1) * push
          context.globalAlpha = Math.min(.9, (.23 + ribbon * .65 + proximity * .6) * envelope)
          context.fillStyle = proximity > .4 || ribbon > .55 ? brand : border
          context.beginPath(); context.arc(x, y, 1 + ribbon * 1.4 + proximity * 1.7, 0, Math.PI * 2); context.fill()
        }
      }
      // One coherent signal traverses the field; it is artwork, never a trace.
      context.globalAlpha = .5; context.strokeStyle = accent; context.lineWidth = 1
      context.beginPath()
      for (let x = 45; x <= 520; x += 4) {
        const y = 245 + Math.sin(x * .013 + frame.time * .17) * 80 + frame.y * 5
        if (x === 45) context.moveTo(x, y); else context.lineTo(x, y)
      }
      context.stroke(); context.globalAlpha = 1
    } }
}
