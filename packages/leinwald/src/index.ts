import { Observable } from 'rxjs';
import { LeinwaldCanvas } from './core/canvas';
import { LeinwaldRenderer } from './core/renderer';
import { LeinwaldCircle, LeinwaldElement, LeinwaldElementType, LeinwaldPointer, LeinwaldRect, LeinwaldScene } from './types';
import { hitTest, toWorldCoordinates } from './utils';

export interface LeinwaldOptions {
  element: HTMLElement | string;
  canvas_id: string
}

export const Leinwald = (options: LeinwaldOptions) => {
  const { element, canvas_id } = options;

  const htmlElement = typeof element === 'string' ? document.querySelector(element) : element;

  if (!htmlElement) {
    throw new Error('Error: missing required option "element"');
  }

  const width = htmlElement.clientWidth;
  const height = htmlElement.clientHeight;

  const canvas = LeinwaldCanvas({ id: canvas_id, width, height });

  htmlElement.appendChild(canvas);

  const context = canvas.getContext('2d');

  const mouseMoveEvents = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('mousemove', (event) => {
      observer.next(event);
    });
  })

  const mouseUpEvents = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('mouseup', (event) => {
      observer.next(event);
    });
  })

  const mouseDownEvents = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('mousedown', (event) => {
      observer.next(event);
    });
  })

  const mouseWheelEvents = new Observable<WheelEvent>((observer) => {
    canvas.addEventListener('wheel', (event) => {
      observer.next(event);
    });
  })

  const mouseLeaveEvents = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('mouseleave', (event) => {
      observer.next(event);
    });
  })

  const mouseEnterEvents = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('mouseenter', (event) => {
      observer.next(event);
    });
  })

  const mouseOutEvents = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('mouseout', (event) => {
      observer.next(event);
    });
  })

  const mouseOverEvents = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('mouseover', (event) => {
      observer.next(event);
    });
  })

  const mouseClickEvents = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('click', (event) => {
      observer.next(event);
    });
  })

  const mouseDblClickEvents = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('dblclick', (event) => {
      observer.next(event);
    });
  })

  const viewportTransform = {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
  }

  const pointer: LeinwaldPointer = {
    id: 'pointer',
    type: LeinwaldElementType.Pointer,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    scaleX: 1,
    scaleY: 1,
    fill: 'black',
    stroke: 'transparent',
  }

  const elements: LeinwaldElement[] = [
    {
      id: 'rect-1',
      type: LeinwaldElementType.Rect,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      scaleX: 1,
      scaleY: 1,
      fill: 'red',
    } as LeinwaldRect,
    {

      id: 'rect-2',
      type: LeinwaldElementType.Rect,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
      scaleX: 1,
      scaleY: 1,
      fill: 'blue',
    } as LeinwaldRect,
    {
      id: 'circle-1',
      type: LeinwaldElementType.Circle,
      x: 350,
      y: 350,
      radius: 50,
      scaleX: 1,
      scaleY: 1,
      fill: 'green',
    } as LeinwaldCircle,
    pointer
  ]

  const scene: LeinwaldScene = {
    elements,
    viewportTransform,
    selectedElements: [],
    hoveredElements: [],
  }

  mouseMoveEvents.subscribe((event) => {
    const { clientX, clientY } = event;

    pointer.x = (clientX - viewportTransform.x) / viewportTransform.scaleX;
    pointer.y = (clientY - viewportTransform.y) / viewportTransform.scaleY;

    const hit = hitTest(event, scene);

    if (hit) {
      canvas.style.cursor = 'pointer';
      scene.hoveredElements = [hit];

    } else {
      canvas.style.cursor = 'default';
      scene.hoveredElements = [];
    }

    LeinwaldRenderer(context!, scene)
  })

  mouseDownEvents.subscribe((event) => {
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
    
    const mouseMove = mouseMoveEvents.subscribe((event) => {
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
    })

    const mouseUp = mouseUpEvents.subscribe((event) => {
      mouseMove.unsubscribe();
      mouseUp.unsubscribe();
    })

    LeinwaldRenderer(context!, scene)
  })

  mouseWheelEvents.subscribe((event) => {
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

    LeinwaldRenderer(context!, scene)
  })

  LeinwaldRenderer(context!, scene)

  return {
    destroy: () => {
      htmlElement.removeChild(canvas);
    }
  }
}

