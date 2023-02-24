import { Leinwald } from 'leinwald'
import React, { useEffect } from "react";

export default function Web() {

  const windowRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const leinwald = Leinwald({
      canvas_id: 'leinwald',
      element: windowRef.current!,
    })

    return () => {
      leinwald?.destroy()
    }
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }} ref={windowRef}></div>
  );
}
