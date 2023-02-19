import { Observable } from 'rxjs';
import { LeinwaldCanvas } from './core/canvas';

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

  //
  // Let's try panning the canvas
  //

  const viewportTransform = {
    x: 0,
    y: 0,
    scale: 1,
  }

  const scrollSpeed = 0.1;

  const elements = [
    {
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      type: 'rect'
    }
  ]

  const draw = () => {
    if (!context) return

    context.clearRect(0, 0, width, height);

    context.save();
    context.translate(viewportTransform.x, viewportTransform.y);

    elements.forEach((element) => {
      const { x, y, width, height } = element;

      const viewportX = x * viewportTransform.scale - width / 2;
      const viewportY = y * viewportTransform.scale;

      if (element.type === 'rect') {
        context.fillRect(viewportX, viewportY, element.width, element.height);
      }
    })

    context.restore();
  }

  draw()

  const mouseDown = mouseDownEvents.subscribe((event) => {
    const mouseMove = mouseMoveEvents.subscribe((event) => {
      const { offsetX: newOffsetX, offsetY: newOffsetY } = event;

      const viewportX = (newOffsetX - viewportTransform.x) / viewportTransform.scale;
      const viewportY = (newOffsetY - viewportTransform.y) / viewportTransform.scale;

      viewportTransform.x += viewportX
      viewportTransform.y += viewportY

      draw()
    })

    const mouseUp = mouseUpEvents.subscribe((event) => {
      mouseMove.unsubscribe();
      mouseUp.unsubscribe();
    })
  })

  return {
    destroy: () => {
      htmlElement.removeChild(canvas);
    }
  }
}

