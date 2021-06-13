import {Shape} from "~/models/Shape";
import {move, penDown, left, right, penUp} from "~/helpers/StepFactories";

export class EShape extends Shape {
  constructor() {
    super(23, 30, 180);
    this._steps = [
      penDown(),
      move(8),
      right(90),
      move(20),
      right(90),
      move(8),
      right(90),
      penUp(),
      move(10),
      penDown(),
      right(90),
      move(8)

    ]
  }
}