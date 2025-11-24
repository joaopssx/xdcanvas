/**************************************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************************************/

import { Canvas, SKRSContext2D } from '@napi-rs/canvas';
import { BaseLayer } from './BaseLayer';

export interface Layer {
  render(ctx: SKRSContext2D, canvas: Canvas): Promise<void> | void;
  zIndex: number;
}

export class LayerManager {
  private layers: (Layer | BaseLayer)[] = [];

  public addLayer(layer: Layer | BaseLayer): void {
    this.layers.push(layer);
    this.layers.sort((a, b) => a.zIndex - b.zIndex);
  }

  public async renderAll(ctx: SKRSContext2D, canvas: Canvas): Promise<void> {
    for (const layer of this.layers) {
      // BaseLayer handles save/restore internally in render(), but simple Layer might not.
      // To be safe, we wrap external render calls or rely on them.
      // BaseLayer.render is synchronous in our impl, but Layer.render can be async.
      
      if (layer instanceof BaseLayer) {
        layer.render(ctx, canvas);
      } else {
        ctx.save();
        await layer.render(ctx, canvas);
        ctx.restore();
      }
    }
  }

  public clear(): void {
    this.layers = [];
  }
}
