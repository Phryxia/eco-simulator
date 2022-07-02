import { avoid, chase } from '@src/utilities/vector'
import p5 from 'p5'
import { Entity, EntityProps } from './entity'
import { Food } from './food'
import { Action, Observation, Recognition } from './recognition'
// import { World } from './world'

export const enum AnimalType {
  Herbivore = '초식동물',
  Carnivore = '육식동물',
}

export class Animal extends Entity {
  public hp: number = 1
  public animalType: AnimalType

  public constructor({
    animalType,
    ...rest
  }: {
    animalType: AnimalType
  } & EntityProps) {
    super(rest)
    this.animalType = animalType
  }

  public run(): void {
    const nearEntities = this.world.getEntitiesNear(this, this.position)
    const observations = [] as Observation[]

    observations.push(
      ...nearEntities.map((entity) => ({
        target: entity,
        position: entity.position,
      })),
    )

    const action = this.think({
      myHp: this.hp,

      observations,
      myPositionDiff: p5.Vector.sub(this.position, this.prevPosition),
      mySpeed: this.velocity,
    })

    this.world.commitAction(this, action)
  }

  // public abstract think(recognition: Recognition): Action
  public think({ observations }: Recognition): Action {
    const seed = Math.random()

    if (this.animalType === AnimalType.Herbivore) {
      // if (seed > 0.5) {
      const enemy = observations.find(
        ({ target }) => target instanceof Animal && target.animalType === AnimalType.Carnivore,
      )

      if (enemy) {
        return avoid(this.position, enemy.position)
      }

      // } else {
      //   const food = observations.find((entity) => entity instanceof Food)

      //   if (food) {
      //     return chase(this.position, food.position)
      //   }
      // }
    } else {
      const food = observations.find(
        ({ target }) => target instanceof Animal && target.animalType === AnimalType.Herbivore,
      )

      if (food) {
        return chase(this.position, food.position)
      }
    }

    return {
      actionType: 'idle',
    }
  }

  public getMovingPenalty(speed: number): number {
    return speed * 0.00001
  }

  public draw(p5: p5): void {
    if (this.animalType === AnimalType.Herbivore) {
      p5.fill(0.34, 0.5, 0.4)
    } else {
      p5.fill(0, 0.88, 0.54)
    }
    p5.circle(this.position.x, this.position.y, 25)
  }
}
