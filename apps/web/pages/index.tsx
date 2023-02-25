import { Leinwald } from 'leinwald'
import React, { useEffect } from "react";

export default function Web() {

  const windowRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!windowRef.current) return

    const leinwald = Leinwald({
      canvas_id: 'leinwald',
      element: windowRef.current!,
    })

    const image = new Image()

    image.src = "/image.jpg"

    image.onload = () => {
      leinwald.addImage(image)
    }


    return () => {
      leinwald?.destroy()
    }
  }, [windowRef.current])

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }} ref={windowRef}></div>
  );
}
