import p5 from 'p5'
import { Entity, EntityProps } from './entity'

export class Food extends Entity {
  constructor(props: EntityProps) {
    super(props)
  }

  public run(): void {}

  public draw(p5: p5): void {
    p5.fill(0.4, 1, 1)
    p5.circle(this.position.x, this.position.y, 10)
  }
}
