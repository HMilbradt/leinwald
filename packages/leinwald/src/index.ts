import { createCanvas } from './core/canvas';
import { createEditor } from './editor/editor';
import { LeinwaldElementType, LeinwaldImage, LeinwaldScene } from './types';

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

  const resize = () => {
    canvas.width = htmlElement.clientWidth;
    canvas.height = htmlElement.clientHeight;
  }

  const width = htmlElement.clientWidth;
  const height = htmlElement.clientHeight;

  const canvas = createCanvas({ id: canvas_id, width, height });

  htmlElement.appendChild(canvas);
  htmlElement.addEventListener('resize', resize)

  const editor = createEditor(canvas)

  return {
    loadScene: (scene: LeinwaldScene) => {
      editor.loadScene(scene);
    },

    addImage: (image: HTMLImageElement) => {

      const desiredWidth = 100;
      const desiredHeight = 100;

      const imageAspectRatio = image.width / image.height;
      const desiredAspectRatio = desiredWidth / desiredHeight;

      let width = desiredWidth;
      let height = desiredHeight;

      if (imageAspectRatio > desiredAspectRatio) {
        height = desiredWidth / imageAspectRatio;
      } else {
        width = desiredHeight * imageAspectRatio;
      }


      const element: LeinwaldImage = {
        id: 'image-1',
        type: LeinwaldElementType.Image,
        x: 100,
        y: 100,
        width: width,
        height: height,
        image,
        rotation: 0,
      }

    },
    destroy: () => {
      htmlElement.removeChild(canvas);
    }
  }
}

