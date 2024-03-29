import {AShape} from "~/models/shapes/letters/AShape";
import {BShape} from "~/models/shapes/letters/BShape";
import {CShape} from "~/models/shapes/letters/CShape";
import {DShape} from "~/models/shapes/letters/DShape";
import {EShape} from "~/models/shapes/letters/EShape";
import {FShape} from "~/models/shapes/letters/FShape";
import {GShape} from "~/models/shapes/letters/GShape";
import {HShape} from "~/models/shapes/letters/HShape";
import {IShape} from "~/models/shapes/letters/IShape";
import {JShape} from "~/models/shapes/letters/JShape";
import {KShape} from "~/models/shapes/letters/KShape";
import {LShape} from "~/models/shapes/letters/LShape";
import {MShape} from "~/models/shapes/letters/MShape";
import {NShape} from "~/models/shapes/letters/NShape";
import {OShape} from "~/models/shapes/letters/OShape";
import {PShape} from "~/models/shapes/letters/PShape";
import {QShape} from "~/models/shapes/letters/QShape";
import {RShape} from "~/models/shapes/letters/RShape";
import {SShape} from "~/models/shapes/letters/SShape";
import {TShape} from "~/models/shapes/letters/TShape";
import {UShape} from "~/models/shapes/letters/UShape";
import {VShape} from "~/models/shapes/letters/VShape";
import {WShape} from "~/models/shapes/letters/WShape";
import {XShape} from "~/models/shapes/letters/XShape";
import {YShape} from "~/models/shapes/letters/YShape";
import {ZShape} from "~/models/shapes/letters/ZShape";
import {FlagShape} from "~/models/shapes/FlagShape";
import {TriangleShape} from "~/models/shapes/TriangleShape";
import {RectangleShape} from "~/models/shapes/RectangleShape";
import {TrapezoidShape} from "~/models/shapes/TrapezoidShape";
import {SquareShape} from "~/models/shapes/SquareShape";
import {HexagonShape} from "~/models/shapes/HexagonShape";
import {HeartShape} from "~/models/shapes/HeartShape";
import {HexagonRepeatShape} from "~/models/shapes/HexagonRepeatShape";
import {SquareRepeatShape} from "~/models/shapes/SquareRepeatShape";
import {TriangleRepeatShape} from "~/models/shapes/TriangleRepeatShape";
import {ExclamationDoubleShape} from "~/models/shapes/letters/ExclamationDoubleShape";
import {ExclamationSingleShape} from "~/models/shapes/letters/ExclamationSingleShape";

enum SHAPE_CATEGORY {
  LETTERS = 'Letters',
  SHAPES = 'Shapes',
}


export const SHAPES = [

  // SHAPES
  {
    label: "Triangle",
    shape: new TriangleShape(),
    category: SHAPE_CATEGORY.SHAPES,
  },
  {
    label: "Triangle - with repeats",
    shape: new TriangleRepeatShape(),
    category: SHAPE_CATEGORY.SHAPES,
  },
  {
    label: "Square",
    shape: new SquareShape(),
    category: SHAPE_CATEGORY.SHAPES,
  },
  {
    label: "Square - with repeats",
    shape: new SquareRepeatShape(),
    category: SHAPE_CATEGORY.SHAPES,
  },
  {
    label: "Hexagon",
    shape: new HexagonShape(),
    category: SHAPE_CATEGORY.SHAPES
  },
  {
    label: "Hexagon - with repeats",
    shape: new HexagonRepeatShape(),
    category: SHAPE_CATEGORY.SHAPES
  },
  {
    label: "Rectangle",
    shape: new RectangleShape(),
    category: SHAPE_CATEGORY.SHAPES,
  },
  {
    label: "Trapezoid",
    shape: new TrapezoidShape(),
    category: SHAPE_CATEGORY.SHAPES,
  },
  {
    label: "Heart",
    shape: new HeartShape(),
    category: SHAPE_CATEGORY.SHAPES,
  },
  {
    label: "Flag",
    shape: new FlagShape(),
    category: SHAPE_CATEGORY.SHAPES,
  },


  // LETTERS

  {
    label: "A",
    shape: new AShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "B",
    shape: new BShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "C",
    shape: new CShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "D",
    shape: new DShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "E",
    shape: new EShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "F",
    shape: new FShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "G",
    shape: new GShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "H",
    shape: new HShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "I",
    shape: new IShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "J",
    shape: new JShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "K",
    shape: new KShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "L",
    shape: new LShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "M",
    shape: new MShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "N",
    shape: new NShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "O",
    shape: new OShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "P",
    shape: new PShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "Q",
    shape: new QShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "R",
    shape: new RShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "S",
    shape: new SShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "T",
    shape: new TShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "U",
    shape: new UShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "V",
    shape: new VShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "W",
    shape: new WShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "X",
    shape: new XShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "Y",
    shape: new YShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "Z",
    shape: new ZShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "!",
    shape: new ExclamationSingleShape(),
    category: SHAPE_CATEGORY.LETTERS
  },
  {
    label: "!!",
    shape: new ExclamationDoubleShape(),
    category: SHAPE_CATEGORY.LETTERS
  }

]
