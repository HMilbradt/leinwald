import { Button } from "ui";
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
    <div>
      <h1>Web</h1>

      <div style={{ 'border': '2px black solid', width: 500, height: 500 }} ref={windowRef}></div>

      <Button />
    </div>
  );
}
