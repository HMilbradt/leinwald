import { BoundingBox, Circle, LeinwaldCircle, LeinwaldElement, LeinwaldElementType, LeinwaldImage, LeinwaldRect, LeinwaldScene, LeinwaldText, Point, ViewportTransform } from "../types";

export const hitTest = (event: MouseEvent, scene: LeinwaldScene, context: CanvasRenderingContext2D) => {
  const { x: screenX, y: screenY } = event;
  const { elements, viewportTransform } = scene;
  const { x, y } = toWorldCoordinates(screenX, screenY, viewportTransform);

  let hit: LeinwaldElement | undefined;
  for (const element of elements) {

    if (element.type === LeinwaldElementType.Rect) {
      const { x: elementX, y: elementY, width, height } = element as LeinwaldRect;

      if (isPointInRect({ x, y }, { x1: elementX, y1: elementY, x2: elementX + width, y2: elementY + height, width, height })) {
        hit = element;
        break;
      } 

    } else if (element.type === LeinwaldElementType.Circle) {
      const { x: elementX, y: elementY, radius } = element as LeinwaldCircle;

      if (isPointInCicle({ x, y }, { x: elementX, y: elementY, radius })) {
        hit = element;
        break;
      } 
    } else if (element.type === LeinwaldElementType.Image) {
      const { x: elementX, y: elementY, width, height } = element as LeinwaldImage;

      if (isPointInRect({ x, y }, { x1: elementX, y1: elementY, x2: elementX + width, y2: elementY + height, width, height })) {
        hit = element;
        break;
      }
    } else if (element.type === LeinwaldElementType.Text) {
      const { x: elementX, y: elementY, fontSize, } = element as LeinwaldText;

      const { width } = calculateTextBoundingBox(element as LeinwaldText, context);

      if (isPointInRect({ x, y }, { x1: elementX, y1: elementY, x2: elementX + width, y2: elementY + fontSize, width, height: fontSize })) {
        hit = element;
        break;
      }
    }
  }

  return hit;
}

export const calculateTextBoundingBox = (element: LeinwaldText, context: CanvasRenderingContext2D): BoundingBox => {
  const { x, y, text, fontFace, fontSize, textAlign, textBaseline } = element;

  context.font = `${fontSize}px ${fontFace}`;
  if (textAlign) context.textAlign = textAlign;
  if (textBaseline) context.textBaseline = textBaseline;

  const { width } = context.measureText(text);

  return {
    x1: x,
    y1: y,
    x2: x + width,
    y2: y + fontSize,
    width: width,
    height: fontSize,
  }
}

export const isPointInRect = (point: Point, rect: BoundingBox): boolean => {
  const { x: pointX, y: pointY } = point;

  return pointX >= rect.x1 && pointX <= rect.x2 && pointY >= rect.y1 && pointY <= rect.y2;
}

export const isPointInCicle = (point: Point, circle: Circle): boolean => {
  const { x: pointX, y: pointY } = point;
  const { x: circleX, y: circleY, radius } = circle;

  const distance = Math.sqrt(Math.pow(pointX - circleX, 2) + Math.pow(pointY - circleY, 2));

  return distance <= radius;
}

export const toWorldCoordinates = (x: number, y: number, viewportTransform: ViewportTransform): Point => {

  const { scaleX, scaleY, x: viewportX, y: viewportY } = viewportTransform;

  return {
    x: (x - viewportX) / scaleX,
    y: (y - viewportY) / scaleY,
  }
}