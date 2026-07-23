import {Step} from "~/models/Step";
import {Renderer} from "./Renderer";
import {Transformation} from "~/models/Transformation";
import {RepeatStep} from "~/models/steps/RepeatStep";

export abstract class Shape {
  _steps: Step[];

  private readonly _startX: number;
  private readonly _startY: number;
  private readonly _startAngle: number;

  protected constructor(startX: number, startY: number, startAngle: number, steps: Step[]){
    this._startX = startX;
    this._startY = startY;
    this._startAngle = startAngle;
    this._steps = steps;
  }

  get steps(){
    return this._steps;
  }

  get startX(): number{
    return this._startX;
  }

  get startY(): number{
    return this._startY;
  }

  get startAngle(): number {
    return this._startAngle;
  }

  numSteps():number{
    let num = 0;
    for(let step of this.steps){
      if(step instanceof  RepeatStep){
        num+= step.numSteps();
      }
      else{
        num++;
      }
    }
    return num;
  }

  generateStepList(transformation: Transformation | Transformation[], scale: number = 1): String[] {
    const steps = [];
    for(let step of this.steps){

      // @ts-ignore
      steps.push(step.generateText(transformation, scale));
    }
    return steps;
  }

  render(renderer: Renderer): void {
    for(let step of this.steps) {
      step.render(renderer);
    }
  }

}
