import {Renderer} from "./Renderer";
import {Transformation} from "~/models/Transformation";

/**
 * List of defined step types
 */
export enum STEP_TYPES {
  ROTATE = 'ROTATE',
  PEN = 'PEN',
  MOVE = 'MOVE',
  REPEAT = 'REPEAT'
};

/**
 * One discrete movement used to render a Shape
 */
export abstract class Step {
  private readonly _type: STEP_TYPES;

  protected constructor(type:STEP_TYPES){
    this._type = type;
  }

/**
 * Returns the type of the Step
 * @return {STEP_TYPES} Type of the Step
 */
  get type(){
    return this._type;
  }

  static chooseTransformation(transformation: Transformation | Transformation[]): Transformation {
    let thisTransformation = transformation;

    if(Array.isArray(thisTransformation)){
      // @ts-ignore
      thisTransformation = transformation[Math.floor(Math.random() * 1000) % thisTransformation.length]
    }

    // @ts-ignore
    return thisTransformation;
  }

  /**
   * Generates a string that describes the Step in words, including a transformation that turns key numbers into math problems.
   * @param transformation The Transformation to apply to the number(s) in Step. If a list is provided, one is chosen randomly each time the text is generated.
   * @param scale Multiplier applied to movement distances only (ignored by Steps that don't represent a distance). Defaults to 1, i.e. no change.
   * @return Description of the Step in words.
   */
  generateText(transformation: Transformation | Transformation[], scale: number = 1): String {
   const thisTransformation = Step.chooseTransformation(transformation);
    return this.transformText(thisTransformation);
  }

  abstract transformText(transformation: Transformation): String;

  abstract render(renderer: Renderer): void;

}

