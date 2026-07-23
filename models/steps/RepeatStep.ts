import {Step, STEP_TYPES} from "~/models/Step";
import {Renderer} from "~/models/Renderer";
import {Transformation} from "~/models/Transformation";

export class RepeatStep extends Step {

  private readonly _times:number;
  private readonly _steps: Step[];

  constructor(times: number, steps: Step[]) {
    super(STEP_TYPES.REPEAT);
    this._times = times;
    this._steps = steps;
  }

  get times(): number{
    return this._times;
  }

  get steps(): Step[]{
    return this._steps;
  }

  numSteps(): number{
    return this.steps.length + 1;
  }

  generateText(transformation: Transformation | Transformation[], scale: number = 1): String {

    let text =  `${this.transformText(Step.chooseTransformation(transformation))}<ol>`;
    for(let step of this.steps){
      text += `<li>${step.generateText(transformation, scale)}</li>`;
    }
    text+=`</ol>`;
    return text;
  }

  transformText(transformation: Transformation): String {
    const stepsWord = this.steps.length > 1 ? 'steps' : 'step';
    return `Repeat the following ${stepsWord} ${transformation.transform(this.times)} times:`;
  }

  render(renderer: Renderer): void {
    for(let i=0; i<this.times; i++){
      for(let step of this.steps){
        step.render(renderer);
      }
    }
  }

}
