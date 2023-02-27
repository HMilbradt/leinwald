import { LeinwaldCircle, LeinwaldElement, LeinwaldElementType, LeinwaldImage, LeinwaldRect, LeinwaldScene, LeinwaldText, ViewportTransform } from "../types";
import { calculateTextBoundingBox } from "../utils";

const BACKGROUND_CIRCLE_RADIUS = 1.5;
const BACKGROUND_CIRCLE_COLOR = '#ababab';

export const BG_DOT_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="10" fill="${BACKGROUND_CIRCLE_COLOR}33" />
</svg>
`

const renderImage = (context: CanvasRenderingContext2D, element: LeinwaldImage) => {
  const { x, y, width, height, image } = element;

  context.drawImage(image, 0, 0, image.width, image.height, x, y, width, height);
}

const renderText = (context: CanvasRenderingContext2D, element: LeinwaldText) => {
  const { x, y, text, fontFace, fontSize, textAlign, textBaseline } = element;

  const { width, height } = calculateTextBoundingBox(element, context);

  context.font = `${fontSize}px ${fontFace}`;
  context.textAlign = textAlign || 'left';
  context.textBaseline = textBaseline || 'top';

  context.fillStyle = element.fill || 'transparent';
  context.strokeStyle = element.stroke || 'transparent';

  if (element.rotation !== 0) {
    context.translate(x + width / 2, y + height / 2);
    context.rotate(element.rotation * Math.PI / 180);
    context.translate(-(x + width / 2), -(y + height / 2));
  }

  context.fillText(text, x, y);
  context.strokeText(text, x, y);

  if (element.rotation !== 0) {
    context.translate(x + width / 2, y + height / 2);
    context.rotate(-element.rotation * Math.PI / 180);
    context.translate(-(x + width / 2), -(y + height / 2));
  }
}

const renderRect = (context: CanvasRenderingContext2D, element: LeinwaldRect) => {
  const { x, y, width, height } = element;

  context.fillStyle = element.fill || 'transparent';
  context.strokeStyle = element.stroke || 'transparent';

  if (element.rotation !== 0) {
    context.translate(x + width / 2, y + height / 2);
    context.rotate(element.rotation * Math.PI / 180);
    context.translate(-(x + width / 2), -(y + height / 2));
  }

  context.fillRect(x, y, width, height);
  context.strokeRect(x, y, width, height);

  if (element.rotation !== 0) {
    context.translate(x + width / 2, y + height / 2);
    context.rotate(-element.rotation * Math.PI / 180);
    context.translate(-(x + width / 2), -(y + height / 2));
  }
}

const renderCircle = (context: CanvasRenderingContext2D, element: LeinwaldCircle) => {
  const { x, y, radius } = element;

  context.fillStyle = element.fill || 'transparent';
  context.strokeStyle = element.stroke || 'transparent';

  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
  context.stroke();
  context.closePath();
}

export const renderDebugPanel = (context: CanvasRenderingContext2D, scene: LeinwaldScene, viewportTransform: ViewportTransform, renderTime: number) => {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.font = "16px arial";
  context.fillStyle = "black";
  context.fillText("Render time: " + (renderTime).toFixed(2) + "ms", 10, 40);

  const { elements, selectedElements } = scene;

  const { x, y, scaleX, scaleY } = viewportTransform;

  context.fillText("Viewport: " + x.toFixed(2) + ", " + y.toFixed(2) + ", " + scaleX.toFixed(2) + ", " + scaleY.toFixed(2), 10, 60);

  let lastY = 0;
  for (const element of elements) {
    context.fillText(element.type + ": " + element.x.toFixed(2) + ", " + element.y.toFixed(2), 10, 80 + 20 * elements.indexOf(element));

    lastY = 80 + 20 * elements.indexOf(element);
  }

  for (const element of selectedElements) {
    context.fillText("Selected: " + element.type + ": " + element.x.toFixed(2) + ", " + element.y.toFixed(2), 10, 80 + 20 * elements.indexOf(element) + lastY);
  }
}

export const renderGrid = (context: CanvasRenderingContext2D, viewportTransform: ViewportTransform, image: ImageBitmap) => {
  const { canvas } = context;
  const { width, height } = canvas;

  context.setTransform(viewportTransform.scaleX, 0, 0, viewportTransform.scaleY, viewportTransform.x, viewportTransform.y);

  let gridStep = 60;
  if (viewportTransform.scaleX < 0.5) {
    gridStep = 120;
  }

  const offsetX = (-viewportTransform.x % gridStep);
  const offsetY = (-viewportTransform.y % gridStep);

  const startX = (-viewportTransform.x - gridStep - offsetX) / viewportTransform.scaleX;
  const startY = (-viewportTransform.y - gridStep - offsetY) / viewportTransform.scaleY;
  const endX = (-viewportTransform.x + width) / viewportTransform.scaleX;
  const endY = (-viewportTransform.y + height) / viewportTransform.scaleY;

  const pattern = context.createPattern(image, 'repeat');

  if (!pattern) {
    throw new Error('Could not create pattern');
  }

  context.fillStyle = pattern;

  context.fillRect(startX, startY, endX - startX, endY - startY);
}

export const renderScene = (context: CanvasRenderingContext2D, elements: LeinwaldElement[], viewportTransform: ViewportTransform) => {
  const renderStart = performance.now();

  context.setTransform(viewportTransform.scaleX, 0, 0, viewportTransform.scaleY, viewportTransform.x, viewportTransform.y);

  elements.forEach((element) => {
    if (element.type === 'rect') {
      renderRect(context, element as LeinwaldRect);
    } else if (element.type === LeinwaldElementType.Circle) {
      renderCircle(context, element as LeinwaldCircle);
    } else if (element.type === LeinwaldElementType.Image) {
      renderImage(context, element as LeinwaldImage);
    } else if (element.type === LeinwaldElementType.Text) {
      renderText(context, element as LeinwaldText);
    }
  })

  const renderEnd = performance.now();

  return renderEnd - renderStart;
}

export const clear = (context: CanvasRenderingContext2D) => {
  const { canvas } = context;
  const { width, height } = canvas;

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, width, height);
}