import {Shape} from "~/models/Shape";
import {move, penDown, left, right} from "~/helpers/StepFactories";

export class TShape extends Shape {
  constructor() {
    super(23, 30, 90);
    this._steps = [
      penDown(),
      move(20),
      right(90),
      move(8),
      right(180),
      move(16)
    ]
  }
}