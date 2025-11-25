/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { Canvas, createCanvas, SKRSContext2D } from '@napi-rs/canvas';
import { LayerManager, Layer } from './LayerManager';

export class CanvasBuilder {
  private canvas: Canvas;
  private ctx: SKRSContext2D;
  private layerManager: LayerManager;

  constructor(width: number, height: number) {
    this.canvas = createCanvas(width, height);
    this.ctx = this.canvas.getContext('2d');
    this.layerManager = new LayerManager();
  }

  public setBackground(color: string): this {
    this.layerManager.addLayer({
      zIndex: -999, // Always at the bottom
      render: (ctx) => {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      },
    });
    return this;
  }

  public addImage(image: any, x: number, y: number, w: number, h: number, options?: { rounded?: number, circular?: boolean, fit?: 'cover' | 'contain' }): this {
    // Circular dependency avoidance: Import dynamically or assume user passes image
    // For v1 base, we just use a generic layer
    // Ideally we import ImageProcessor here, but let's keep it clean for now.
    return this;
  }

  public addLayer(layer: Layer): this {
    this.layerManager.addLayer(layer);
    return this;
  }

  public async build(): Promise<Buffer> {
    await this.layerManager.renderAll(this.ctx, this.canvas);
    return this.canvas.toBuffer('image/png');
  }

  public getContext(): SKRSContext2D {
    return this.ctx;
  }

  public getCanvas(): Canvas {
    return this.canvas;
  }
}
