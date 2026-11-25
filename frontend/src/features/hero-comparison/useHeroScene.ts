import { useSceneController } from '../../components/hero/useSceneController'
import { createHeroRenderer } from './sceneRenderers'
import type { HeroKind } from './sceneRenderers'
const factories = { signal: (root: HTMLDivElement) => createHeroRenderer(root, 'signal'), constellation: (root: HTMLDivElement) => createHeroRenderer(root, 'constellation'), liquid: (root: HTMLDivElement) => createHeroRenderer(root, 'liquid') }
export function useHeroScene(kind: HeroKind, paused: boolean) { return useSceneController(paused, factories[kind]) }
