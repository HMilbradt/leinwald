import { Observable, throttle, throttleTime } from 'rxjs';
import { LeinwaldCanvas } from './core/canvas';
import { LeinwaldRenderer } from './core/renderer';
import { LeinwaldElement, LeinwaldElementType, LeinwaldScene } from './types';
import { hitTest } from './utils/hit';

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

  const elements: LeinwaldElement[] = [{
    id: 'rect-1',
    type: LeinwaldElementType.Rect,
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
  }]

  const scene: LeinwaldScene = {
    elements,
    viewportTransform,
    selectedElements: [],
    origin: {
      x: 0,
      y: 0,
    }
  }

  mouseDownEvents.subscribe((event) => {
    const dragSpeed = 1;

    const initialDragX = event.clientX;
    const initialDragY = event.clientY;

    const initialViewportTransformX = viewportTransform.x;
    const initialViewportTransformY = viewportTransform.y;

    const mouseMove = mouseMoveEvents.pipe(throttleTime(5)).subscribe((event) => {
      const { clientX, clientY } = event

      const differenceX = initialDragX - clientX;
      const differenceY = initialDragY - clientY;

      viewportTransform.x = initialViewportTransformX - differenceX * dragSpeed;
      viewportTransform.y = initialViewportTransformY - differenceY * dragSpeed;

      LeinwaldRenderer(context!, scene)
    })

    const mouseUp = mouseUpEvents.subscribe((event) => {
      mouseMove.unsubscribe();
      mouseUp.unsubscribe();
    })

    LeinwaldRenderer(context!, scene)
  })

  mouseWheelEvents.subscribe((event) => {
    const { deltaY } = event;

    const delta = deltaY > 0 ? 0.1 : -0.1;

    const originX = event.clientX;
    const originY = event.clientY;

    // Zoom to point
    viewportTransform.scaleX = Math.max(viewportTransform.scaleX - delta, 0.1);
    viewportTransform.scaleY = Math.max(viewportTransform.scaleY - delta, 0.1);

    const distanceX = originX - viewportTransform.x;
    const distanceY = originY - viewportTransform.y;

    const newDistanceX = distanceX * viewportTransform.scaleX;
    const newDistanceY = distanceY * viewportTransform.scaleY;

    const differenceX = newDistanceX - distanceX;
    const differenceY = newDistanceY - distanceY;

    viewportTransform.x = viewportTransform.x - differenceX;
    viewportTransform.y = viewportTransform.y - differenceY;


    LeinwaldRenderer(context!, scene)
  })

  LeinwaldRenderer(context!, scene)

  return {
    destroy: () => {
      htmlElement.removeChild(canvas);
    }
  }
}

