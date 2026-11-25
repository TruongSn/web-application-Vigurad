export const motionTokens = {
  duration: { instant: .08, fast: .15, normal: .24, slow: .36, cinematic: .75 },
  easing: { out: [.22, 1, .36, 1], in: [.4, 0, 1, 1], inOut: [.65, 0, .35, 1] },
  springUI: { type: 'spring', stiffness: 400, damping: 35, mass: 1 },
  springPointer: { type: 'spring', stiffness: 160, damping: 25, mass: 1 },
  stagger: .04,
  enter: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -4 },
} as const
