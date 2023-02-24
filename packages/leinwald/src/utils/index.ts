import { BoundingBox, Circle, LeinwaldCircle, LeinwaldElement, LeinwaldElementType, LeinwaldRect, LeinwaldScene, Point, ViewportTransform } from "../types";

export const hitTest = (event: MouseEvent, scene: LeinwaldScene) => {
  const { x: screenX, y: screenY } = event;
  const { elements, viewportTransform } = scene;
  const { x, y } = toWorldCoordinates(screenX, screenY, viewportTransform);

  let hit: LeinwaldElement | undefined;
  for (const element of elements) {

    if (element.type === LeinwaldElementType.Rect) {
      const { x: elementX, y: elementY, width, height } = element as LeinwaldRect;

      if (isPointInRect({ x, y }, { x1: elementX, y1: elementY, x2: elementX + width, y2: elementY + height })) {
        hit = element;
        break;
      } 

    } else if (element.type === LeinwaldElementType.Circle) {
      const { x: elementX, y: elementY, radius } = element as LeinwaldCircle;

      if (isPointInCicle({ x, y }, { x: elementX, y: elementY, radius })) {
        hit = element;
        break;
      } 
    }
  }

  return hit;
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