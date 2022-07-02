import { MovingAction } from '@src/types/recognition'
import p5, { Vector } from 'p5'

export function chase(current: Vector, target: Vector): MovingAction {
  const temp = p5.Vector.sub(target, current)
  return {
    actionType: 'move',
    desiredDirection: Math.atan2(temp.y, temp.x),
    desiredSpeed: 1,
  }
}

export function avoid(current: Vector, target: Vector): MovingAction {
  const temp = p5.Vector.sub(current, target)
  return {
    actionType: 'move',
    desiredDirection: Math.atan2(temp.y, temp.x),
    desiredSpeed: 1,
  }
}
