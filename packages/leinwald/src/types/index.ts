export interface ViewportTransform {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}

export enum LeinwaldElementType {
  Rect = 'rect',
  Circle = 'circle',
  Text = 'text',
  Pointer = 'pointer',
  Interaction = 'interaction',
  Image = 'image',
}

export interface LeinwaldElement {
  id: string;
  type: LeinwaldElementType;
  x: number;
  y: number;
  fill?: string;
  stroke?: string;
  rotation: number;
}

export interface LeinwaldRect extends LeinwaldElement {
  type: LeinwaldElementType.Rect;
  width: number;
  height: number;
}

export interface LeinwaldCircle extends LeinwaldElement {
  type: LeinwaldElementType.Circle;
  radius: number;
}

export interface LeinwaldImage extends LeinwaldElement {
  type: LeinwaldElementType.Image;
  width: number;
  height: number;
  image: HTMLImageElement;
}

export interface LeinwaldText extends LeinwaldElement {
  type: LeinwaldElementType.Text;
  text: string;
  fontFace?: string;
  fontSize: number;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
}

export interface LeinwaldScene {
  elements: LeinwaldElement[];
  viewportTransform: ViewportTransform;
  selectedElements: LeinwaldElement[];
  hoveredElements: LeinwaldElement[];
}


export interface Point {
  x: number;
  y: number;
}

export interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
}

export interface Circle {
  x: number;
  y: number;
  radius: number;
}