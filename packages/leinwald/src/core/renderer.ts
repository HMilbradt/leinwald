import { LeinwaldElement, LeinwaldScene, ViewportTransform } from "../types";

const renderRect = (context: CanvasRenderingContext2D, element: LeinwaldElement, viewportTransform: ViewportTransform) => {
  const { x, y, width, height } = element;

  context.fillRect(x, y, width, height);
}


export const LeinwaldRenderer = (context: CanvasRenderingContext2D, scene: LeinwaldScene) => {
  const { canvas } = context;
  const { width, height } = canvas;
  const { elements, viewportTransform } = scene;

  context.setTransform(viewportTransform.scaleX, 0, 0, viewportTransform.scaleY, viewportTransform.x, viewportTransform.y);
  context.clearRect(-viewportTransform.x, -viewportTransform.y, context.canvas.width, context.canvas.height);

  const gridStep = 20;

  const gridWidth = -viewportTransform.x + width + gridStep;
  const gridHeight = -viewportTransform.y + height + gridStep;

  const offsetX = -viewportTransform.x % gridStep;
  const offsetY = -viewportTransform.y % gridStep;
  const startX = -viewportTransform.x - gridStep - offsetX;
  const startY = -viewportTransform.y - gridStep - offsetY;

  for (let i = startX; i < gridWidth; i += gridStep) {
    for (let j = startY; j < gridHeight; j += gridStep) {
      context.beginPath();
      context.arc(i, j, 1, 0, 2 * Math.PI);
      context.fill();
    }
  }

  elements.forEach((element) => {
    if (element.type === 'rect') {
      renderRect(context, element, viewportTransform);
    }
  })

  context.restore();
}