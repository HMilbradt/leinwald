export interface CanvasOptions {
  id: string;
  width: number;
  height: number;
}

export const createCanvas = (options: CanvasOptions) => {
  const { width, height } = options;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  return canvas;
}
