import { Leinwald } from 'leinwald'
import { LeinwaldElementType, LeinwaldRect, LeinwaldScene } from 'leinwald/src/types';
import React, { useEffect } from "react";

export default function Web() {

  const windowRef = React.useRef<HTMLDivElement>(null)

  const scene: LeinwaldScene = {
    elements: [
      {
        type: LeinwaldElementType.Rect,
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        fill: 'red',
      } as LeinwaldRect,
      {
        type: LeinwaldElementType.Rect,
        width: 100,
        height: 100,
        x: 300,
        y: 0,
        fill: 'blue',
      } as LeinwaldRect,
      {
        type: LeinwaldElementType.Rect,
        width: 100,
        height: 100,
        x: 200,
        y: 600,
        fill: 'green',
      } as LeinwaldRect,
      {
        type: LeinwaldElementType.Rect,
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        fill: 'red',
      } as LeinwaldRect,
      {
        type: LeinwaldElementType.Rect,
        width: 45,
        height: 100,
        x: 0,
        y: 400,
        fill: 'red',
      } as LeinwaldRect
    ],
    selectedElements: [],
    hoveredElements: []
  }

  useEffect(() => {
    if (!windowRef.current) return

    const leinwald = Leinwald({
      canvas_id: 'leinwald',
      element: windowRef.current!,
    })

    // const image = new Image()

    // image.src = "/image.jpg"

    // image.onload = () => {
    //   leinwald.addImage(image)
    // }

    leinwald.loadScene(scene)

    return () => {
      leinwald?.destroy()
    }
  }, [windowRef.current])

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }} ref={windowRef}></div>
  );
}
