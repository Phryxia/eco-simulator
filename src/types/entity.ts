import p5, { Vector } from 'p5'
import { World } from './world'

export abstract class Entity {
  public readonly id: symbol
  public world: World
  public position: Vector = new Vector(0, 0)
  public velocity: Vector = new Vector(0, 0)
  public prevPosition: Vector = new Vector(0, 0)

  constructor({ id = Symbol(), world }: EntityProps) {
    this.id = id
    this.world = world
  }

  public abstract run(): void

  public abstract draw(p5: p5): void
}

export interface EntityProps {
  id?: symbol
  world: World
}
