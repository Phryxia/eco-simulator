import { constrain } from '@src/utilities/math'
import p5, { Vector } from 'p5'
import { Animal, AnimalType } from '../animal'
import { Entity } from '../entity'
import { Food } from '../food'
import { Action, EatingAction, MovingAction } from '../recognition'

const VisionDistance = 300
const HerbivoreEatBonus = 5
const CarnivoreEatBonus = 20

export class World {
  public readonly width: number
  public readonly height: number
  public entities: Entity[] = []

  constructor({ width, height }: { width: number; height: number }) {
    this.width = width
    this.height = height
  }

  public getEntitiesNear(me: Entity, position: Vector): Entity[] {
    return this.entities.filter(
      (entity) =>
        entity.id !== me.id && p5.Vector.dist(entity.position, position) < VisionDistance,
    )
  }

  public commitAction(entity: Entity, action: Action): void {
    if (action.actionType === 'idle') return
    if (action.actionType === 'eat') return this.commitEatAction(entity, action)
    if (action.actionType === 'move') return this.commitMoveAction(entity, action)
    return
  }

  private commitEatAction(entity: Entity, action: EatingAction): void {
    if (entity instanceof Animal) {
      if (entity.animalType === AnimalType.Herbivore && action.target instanceof Food) {
        this.entities = this.entities.filter((entity) => entity.id !== action.target.id)
        entity.hp += HerbivoreEatBonus
        return
      }

      if (
        entity.animalType === AnimalType.Carnivore &&
        action.target instanceof Animal &&
        action.target.animalType === AnimalType.Herbivore
      ) {
        this.entities = this.entities.filter((entity) => entity.id !== action.target.id)
        entity.hp += CarnivoreEatBonus
        return
      }
    }
  }

  private commitMoveAction(entity: Entity, action: MovingAction): void {
    const desiredVelocity = new p5.Vector(action.desiredSpeed, 0).rotate(
      action.desiredDirection,
    )
    const futurePosition = p5.Vector.add(entity.position, desiredVelocity)

    futurePosition.x = constrain(futurePosition.x, 0, this.width)
    futurePosition.y = constrain(futurePosition.y, 0, this.height)

    const effectiveVelocity = p5.Vector.sub(futurePosition, entity.position)

    if (entity instanceof Animal) {
      const requiredEnergy = entity.getMovingPenalty(effectiveVelocity.mag())

      if (entity.hp > requiredEnergy) {
        entity.velocity.set(effectiveVelocity)
        entity.hp -= requiredEnergy
      }
    }
  }

  public draw(p5: p5): void {
    p5.fill(0, 0, 1)
    p5.stroke(0)
    p5.rect(0, 0, this.width, this.height)

    this.entities.forEach((entity) => entity.draw(p5))
  }

  public run(): void {
    this.entities.forEach((entity) => entity.run())
    this.entities.forEach((entity) => {
      entity.position.add(entity.velocity)
      entity.position.x = constrain(entity.position.x, 0, this.width)
      entity.position.y = constrain(entity.position.y, 0, this.height)
    })
  }
}
