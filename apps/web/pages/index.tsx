import { Leinwald } from 'leinwald'
import { LeinwaldCircle, LeinwaldElementType, LeinwaldImage, LeinwaldRect, LeinwaldScene, LeinwaldText } from 'leinwald/src/types';
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
        rotation: 45,
      } as LeinwaldRect,
      {
        type: LeinwaldElementType.Circle,
        radius: 150,
        x: 200,
        y: 600,
        fill: 'green',
        rotation: 30,
      } as LeinwaldCircle,
      {
        id: 'text',
        type: LeinwaldElementType.Text,
        text: 'Hello World',
        width: 100,
        height: 100,
        x: 400,
        y: 400,
        fill: 'red',
        rotation: 30,
        fontSize: 20,
      } as LeinwaldText,
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

    const image = new Image()

    image.src = "/image.jpg"

    image.onload = async () => {

      const bitmap = await createImageBitmap(image)
      scene.elements.push({
        id: 'image',
        type: LeinwaldElementType.Image,
        x: 200,
        y: 500,
        width: 100,
        height: 100,
        image: bitmap,
        rotation: 0,
      } as LeinwaldImage)
    }

    leinwald.loadScene(scene)

    return () => {
      leinwald?.destroy()
    }
  }, [windowRef.current])

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }} ref={windowRef}></div>
  );
}
