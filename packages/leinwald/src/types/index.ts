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
}

export interface LeinwaldElement {
  id: string;
  type: LeinwaldElementType;

  x: number;
  y: number;
  width: number;
  height: number;
  scaleX?: number;
  scaleY?: number;
}

export interface LeinwaldScene {
  origin: {
    x: number;
    y: number;
  }
  elements: LeinwaldElement[];
  viewportTransform: ViewportTransform;
  selectedElements: LeinwaldElement[];
}