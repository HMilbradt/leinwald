import { createCanvas } from './core/canvas';
import { createEditor } from './editor/editor';
import { LeinwaldScene } from './types';

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
    loadScene: (scene: LeinwaldScene) => editor.loadScene(scene),

    destroy: () => {
      htmlElement.removeChild(canvas);
    }
  }
}

