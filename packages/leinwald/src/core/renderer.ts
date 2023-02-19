import { LeinwaldElement, LeinwaldScene, ViewportTransform } from "../types";

const renderRect = (context: CanvasRenderingContext2D, element: LeinwaldElement, viewportTransform: ViewportTransform) => {
  const { x, y, width, height } = element;
  const { scaleX, scaleY } = viewportTransform;

  console.log(viewportTransform)

  context.fillRect(x * scaleX, y * scaleY, width * scaleX, height * scaleY);
}

const renderSelection = (context: CanvasRenderingContext2D, elements: LeinwaldElement[], viewportTransform: ViewportTransform) => {
  const { scaleX, scaleY } = viewportTransform;

  elements.forEach((element) => {
    const { x, y, width, height } = element;

    context.save();

    context.strokeStyle = 'red';
    context.lineWidth = 2;

    context.strokeRect(x * scaleX - 10, y * scaleY - 10, width * scaleX + 20, height * scaleY + 20);

    context.restore();
  })
}

export const LeinwaldRenderer = (context: CanvasRenderingContext2D, scene: LeinwaldScene) => {
  const { canvas } = context;
  const { width, height } = canvas;

  const { elements, viewportTransform, selectedElements } = scene;

  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  context.save();

  context.translate(viewportTransform.x, viewportTransform.y);

  elements.forEach((element) => {
    if (element.type === 'rect') {
      renderRect(context, element, viewportTransform);
    }
  })

  renderSelection(context, selectedElements, viewportTransform);

  context.restore();
}