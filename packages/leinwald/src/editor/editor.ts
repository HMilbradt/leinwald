import { LeinwaldScene, ViewportTransform } from "../types"
import { createCanvasEventSubscriptions } from "../editor/events"
import { renderScene, createScene, clear, renderDebugPanel, renderGrid } from "../core";
import { hitTest } from "../utils";

export const createEditor = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Error: missing canvas context');
  }

  const scene = createScene()
  const viewportTransform: ViewportTransform = {
    x: 0, y: 0, scaleX: 1, scaleY: 1,
  }

  const events = createCanvasEventSubscriptions(canvas)

  events.onMouseMove.subscribe((event) => {
    const hit = hitTest(event, scene, viewportTransform, context);

    if (hit) {
      canvas.style.cursor = 'pointer';
      scene.hoveredElements = [hit];
    } else {
      canvas.style.cursor = 'default';
      scene.hoveredElements = [];
    }

    render()
  })

  events.onMouseDown.subscribe((event) => {
    const dragSpeed = 1;

    const initialDragX = event.clientX;
    const initialDragY = event.clientY;

    const initialViewportTransformX = viewportTransform.x;
    const initialViewportTransformY = viewportTransform.y;

    let initialElementTransformX = 0;
    let initialElementTransformY = 0;

    if (scene.hoveredElements.length > 0) {

      const selectedElement = scene.hoveredElements[0];
      initialElementTransformX = selectedElement.x
      initialElementTransformY = selectedElement.y;
      scene.selectedElements = [selectedElement];
    } else {
      scene.selectedElements = [];
    }

    const mouseMove = events.onMouseMove.subscribe((event) => {
      const { clientX, clientY } = event

      const differenceX = initialDragX - clientX;
      const differenceY = initialDragY - clientY;

      if (scene.selectedElements.length > 0) {
        const selectedElement = scene.selectedElements[0];

        selectedElement.x = initialElementTransformX - (differenceX / viewportTransform.scaleX);
        selectedElement.y = initialElementTransformY - (differenceY / viewportTransform.scaleY);
      } else {
        viewportTransform.x = initialViewportTransformX - differenceX * dragSpeed;
        viewportTransform.y = initialViewportTransformY - differenceY * dragSpeed;
      }

      render()
    })

    const mouseUp = events.onMouseUp.subscribe(() => {
      mouseMove.unsubscribe();
      mouseUp.unsubscribe();
      render()
    })
  })

  events.onMouseWheel.subscribe((event) => {
    const { deltaY, clientX, clientY } = event;

    const delta = deltaY > 0 ? 0.01 : -0.01;

    const oldScaleX = viewportTransform.scaleX;
    const oldScaleY = viewportTransform.scaleY;

    viewportTransform.scaleX = Math.max(viewportTransform.scaleX - delta, 0.1);
    viewportTransform.scaleY = Math.max(viewportTransform.scaleY - delta, 0.1);

    const newScaleX = viewportTransform.scaleX;
    const newScaleY = viewportTransform.scaleY;

    const oldViewportX = viewportTransform.x;
    const oldViewportY = viewportTransform.y;

    const newViewportX = clientX - (clientX - oldViewportX) * (newScaleX / oldScaleX);
    const newViewportY = clientY - (clientY - oldViewportY) * (newScaleY / oldScaleY);

    viewportTransform.x = newViewportX;
    viewportTransform.y = newViewportY;
  })

  const render = () => {
    const renderStart = performance.now();
    clear(context)
    renderGrid(context, viewportTransform)
    renderScene(context, scene.elements, viewportTransform)
    renderScene(context, scene.selectedElements, viewportTransform)
    renderScene(context, scene.hoveredElements, viewportTransform)
    const renderEnd = performance.now();
    renderDebugPanel(context, scene, viewportTransform, renderEnd - renderStart)
  }

  const loadScene = (newScene: LeinwaldScene) => {
    scene.elements = newScene.elements;
  }

  window.requestAnimationFrame(render)

  return {
    viewportTransform,
    events,
    loadScene,
    scene,
  }
}