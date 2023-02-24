import { LeinwaldCircle, LeinwaldElement, LeinwaldElementType, LeinwaldPointer, LeinwaldRect, LeinwaldScene, ViewportTransform } from "../types";

const BACKGROUND_CIRCLE_RADIUS = 1.5;
const BACKGROUND_CIRCLE_COLOR = '#ababab';

const renderRect = (context: CanvasRenderingContext2D, element: LeinwaldRect) => {
  const { x, y, width, height } = element;

  context.fillStyle = element.fill || 'transparent';
  context.strokeStyle = element.stroke || 'transparent';

  context.fillRect(x, y, width, height);
  context.strokeRect(x, y, width, height);
}

const renderCircle = (context: CanvasRenderingContext2D, element: LeinwaldCircle) => {
  const { x, y, radius } = element;

  context.fillStyle = element.fill || 'transparent';
  context.strokeStyle = element.stroke || 'transparent';

  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
  context.stroke();
}

function renderPointer(context: CanvasRenderingContext2D, element: LeinwaldPointer) {
  const { x, y } = element;
  const size = 10

  context.lineWidth = 1;
  context.strokeStyle = "black";
  context.beginPath();
  context.lineTo(x - size, y);
  context.lineTo(x + size, y);
  context.moveTo(x, y - size);
  context.lineTo(x, y + size);
  context.save()
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.stroke();
  context.font = "16px arial";
  context.fillText("Pointer X: " + x.toFixed(2) + "  Y: " + y.toFixed(2), 10, 20);
  context.restore();
}

export const LeinwaldRenderer = (context: CanvasRenderingContext2D, scene: LeinwaldScene) => {
  const { canvas } = context;
  const { width, height } = canvas;
  const { elements, viewportTransform, selectedElements } = scene;

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, width, height);

  context.setTransform(viewportTransform.scaleX, 0, 0, viewportTransform.scaleY, viewportTransform.x, viewportTransform.y);

  const gridStep = 60;

  const gridWidth = -viewportTransform.x + width + gridStep;
  const gridHeight = -viewportTransform.y + height + gridStep;

  const offsetX = -viewportTransform.x % gridStep;
  const offsetY = -viewportTransform.y % gridStep;
  const startX = -viewportTransform.x - gridStep - offsetX;
  const startY = -viewportTransform.y - gridStep - offsetY;

  for (let i = startX; i < gridWidth; i += gridStep) {
    for (let j = startY; j < gridHeight; j += gridStep) {
      context.beginPath();
      context.arc(i, j, BACKGROUND_CIRCLE_RADIUS, 0, 2 * Math.PI);
      context.fillStyle = BACKGROUND_CIRCLE_COLOR;
      context.fill();
    }
  }

  elements.forEach((element) => {
    if (element.type === 'rect') {
      renderRect(context, element as LeinwaldRect);
    } else if (element.type === 'pointer') {
      renderPointer(context, element as LeinwaldPointer);
    } else if (element.type === LeinwaldElementType.Circle) {
      renderCircle(context, element as LeinwaldCircle);
    }
  })

  selectedElements.forEach((element) => {
    let { x, y } = element;

    let width: number = 0
    let height: number = 0
    if (element.type === 'rect') {
      width = (element as LeinwaldRect).width;
      height = (element as LeinwaldRect).height;
    } else if (element.type === 'pointer') {
      width = (element as LeinwaldPointer).width;
      height = (element as LeinwaldPointer).height;
    } else if (element.type === LeinwaldElementType.Circle) {
      x = (element as LeinwaldCircle).x - (element as LeinwaldCircle).radius;
      y = (element as LeinwaldCircle).y - (element as LeinwaldCircle).radius;
      width = (element as LeinwaldCircle).radius * 2;
      height = (element as LeinwaldCircle).radius * 2;
    }

    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.strokeRect(x, y, width, height);
  })
}