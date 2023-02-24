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
}

export interface LeinwaldElement {
  id: string;
  type: LeinwaldElementType;
  x: number;
  y: number;
  scaleX?: number;
  scaleY?: number;
  fill?: string;
  stroke?: string;
  interactive?: boolean;
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

export interface LeinwaldText extends LeinwaldElement {
  type: LeinwaldElementType.Text;
  text: string;
}

export interface LeinwaldPointer extends LeinwaldElement {
  type: LeinwaldElementType.Pointer;
  width: number;
  height: number;
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
}

export interface Circle {
  x: number;
  y: number;
  radius: number;
}