import type { HideSpot } from '@/lib/backrooms/hide-spot'
import type { HideSpotRules } from '@/lib/backrooms/hide-spot-placer'
import type { MaterialSet } from '@/lib/backrooms/materials'
import type { TextureSet } from '@/lib/backrooms/textures'
import type { FloorData } from '@/lib/backrooms/world-generator'

export interface LevelData {
  floors: FloorData[]
  hideSpots: HideSpot[]
}

export interface SpawnPoint {
  floor: number
  x: number
  z: number
  yaw: number
}

export interface LevelConfig {
  id: string
  name: string
  /** Must be pure: identical levelSeed => identical LevelData (required for 1v1 sync). */
  generate: (levelSeed: number) => LevelData
  materials: () => MaterialSet
  textures: () => TextureSet
  /** Frees GPU resources owned by this level. Called when switching to another level. */
  dispose: () => void
  fog: { color: string; near: number; far: number }
  ambient: {
    skyColor: string
    groundColor: string
    hemiIntensity: number
    color: string
    intensity: number
  }
  lightStyle: {
    color: string
    intensity: number
    /** How much of the ambient fill survives a zone blackout (0-1). */
    blackoutAmbient: number
  }
  ambientSound: { humBase: number; humRange: number; buzzGain: number }
  hideSpotRules: HideSpotRules
  spawn: (data: LevelData, levelSeed: number) => SpawnPoint
}
