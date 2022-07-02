import { Vector } from 'p5'
import { Entity } from './entity'

export interface Observation {
  target: Entity
  position: Vector
}

export interface Recognition {
  myHp: number
  observations: Observation[]
  myPositionDiff: Vector
  mySpeed: Vector
}

export interface EatingAction {
  actionType: 'eat'
  target: Entity
}

export interface MovingAction {
  actionType: 'move'
  desiredDirection: number
  desiredSpeed: number
}

export interface IdleAction {
  actionType: 'idle'
}

export type Action = EatingAction | MovingAction | IdleAction
