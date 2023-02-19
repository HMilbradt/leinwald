export interface LeinwaldCanvasOptions {
  id: string;
  width: number;
  height: number;
}

export const LeinwaldCanvas = (options: LeinwaldCanvasOptions) => {
  const { width, height } = options;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  return canvas;
}
