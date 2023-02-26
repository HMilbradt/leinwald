import { Observable } from "rxjs";

export const createCanvasEventSubscriptions = (canvas: HTMLCanvasElement) => {
  const onMouseMove = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('mousemove', (event) => {
      observer.next(event);
    });
  })

  const onMouseUp = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('mouseup', (event) => {
      observer.next(event);
    });
  })

  const onMouseDown = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('mousedown', (event) => {
      observer.next(event);
    });
  })

  const onMouseWheel = new Observable<WheelEvent>((observer) => {
    canvas.addEventListener('wheel', (event) => {
      observer.next(event);
    });
  })

  const onMouseLeave = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('mouseleave', (event) => {
      observer.next(event);
    });
  })

  const onMouseEnter = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('mouseenter', (event) => {
      observer.next(event);
    });
  })

  const onMouseOut = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('mouseout', (event) => {
      observer.next(event);
    });
  })

  const onMouseOver = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('mouseover', (event) => {
      observer.next(event);
    });
  })

  const onMouseClick = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('click', (event) => {
      observer.next(event);
    });
  })

  const onMouseDoubleClick = new Observable<MouseEvent>((observer) => {
    canvas.addEventListener('dblclick', (event) => {
      observer.next(event);
    });
  })

  return {
    onMouseMove,
    onMouseUp,
    onMouseDown,
    onMouseWheel,
    onMouseLeave,
    onMouseEnter,
    onMouseOut,
    onMouseOver,
    onMouseClick,
    onMouseDoubleClick,
  }
}