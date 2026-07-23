import {Step, STEP_TYPES} from "~/models/Step";
import {Renderer} from "../Renderer";
import {Transformation} from "~/models/Transformation";

export enum MOVE_DIRECTION {
  FORWARD = 'forward',
  BACKWARD = 'backward'
}

/**
 * A Step in which the pen moves in a line a specific distance
 */
export abstract class MoveStep extends Step {

  /**
   * The distance the pen moves in this Step
   * @private
   */
  private readonly _distance:number;
  /**
   * The direction the pen moves in this Step
   * @private
   */
  private readonly _direction: MOVE_DIRECTION;

  /**
   * Creates a new MoveStep
   * @param direction The direction the pen moves in this Step
   * @param distance The distance the pen should move in the specified direction. A negative distance causes movement in the opposite direction
   * @protected
   */
  protected constructor(direction: MOVE_DIRECTION, distance: number) {
      super(STEP_TYPES.MOVE);
      this._direction = direction;
      this._distance = distance;
  }

  /**
   * Gets the distance the pen moves in this Step
   * @return The distance the pen moves in this Step
   */
  get distance(): number{
    return this._distance;
  }

  /**
   * Gets the direction the pen moves in this Step
   * @return The direction the pen moves in this step
   */
  get direction(): MOVE_DIRECTION{
    return this._direction;
  }

  transformText(transformation: Transformation): String {
    return `<b>Move ${this.direction}</b> by ${transformation.transform(this.distance)}`;
  }

  /**
   * @param transformation The Transformation to apply to the (already-scaled) distance.
   * @param scale Multiplier applied to this Step's distance before the Transformation runs. Defaults to 1.
   */
  generateText(transformation: Transformation | Transformation[], scale: number = 1): String {
    const thisTransformation = Step.chooseTransformation(transformation);
    return `<b>Move ${this.direction}</b> by ${thisTransformation.transform(this.distance * scale)}`;
  }



}
