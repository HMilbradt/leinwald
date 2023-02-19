import { LeinwaldElement, ViewportTransform } from "../types";

export const hitTest = (elements: LeinwaldElement[], event: MouseEvent, viewportTransform: ViewportTransform) => {

  const { x, y } = event;
  const { scaleX, scaleY, x: viewportX, y: viewportY } = viewportTransform;

  const hit = elements.find((element) => {
    const { x: elementX, y: elementY, width, height } = element;

    const elementX1 = elementX * scaleX + viewportX;
    const elementY1 = elementY * scaleY + viewportY;
    const elementX2 = elementX1 + width * scaleX;
    const elementY2 = elementY1 + height * scaleY;

    return x >= elementX1 && x <= elementX2 && y >= elementY1 && y <= elementY2;

  })

  return hit;

}
