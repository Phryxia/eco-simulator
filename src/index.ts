import P5 from 'p5'
import { Animal, World, AnimalType } from './types'

const world = new World({ width: 640, height: 360 })

for (let i = 0; i < 10; ++i) {
  const animal = new Animal({
    animalType: Math.random() > 0.5 ? AnimalType.Carnivore : AnimalType.Herbivore,
    world,
  })
  animal.position.set(Math.random() * 640, Math.random() * 320)
  world.entities.push(animal)
}

const sketch = (p5: P5) => {
  // The sketch setup method
  p5.setup = () => {
    // Creating and positioning the canvas
    p5.createCanvas(640, 360)
    p5.colorMode(p5.HSB, 1)
    p5.frameRate(60)

    // Configuring the canvas
    p5.background('black')
  }

  // The sketch draw method
  p5.draw = () => {
    world.draw(p5)
    world.run()
  }
}

const p5App = document.getElementById('p5-app')!

new P5(sketch, p5App)
