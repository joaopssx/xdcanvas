/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { SKRSContext2D } from '@napi-rs/canvas';

export class AdjustmentFilters {
  /**
   * Adjusts the brightness of the image.
   * @param value -100 to 100
   */
  public static brightness(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, value: number): void {
    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;
    const adjustment = Math.floor(255 * (value / 100));

    for (let i = 0; i < data.length; i += 4) {
      data[i] += adjustment;
      data[i + 1] += adjustment;
      data[i + 2] += adjustment;
    }

    ctx.putImageData(imageData, x, y);
  }

  /**
   * Adjusts the contrast of the image.
   * @param value -100 to 100
   */
  public static contrast(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, value: number): void {
    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;
    const factor = (259 * (value + 255)) / (255 * (259 - value));

    for (let i = 0; i < data.length; i += 4) {
      data[i] = factor * (data[i] - 128) + 128;
      data[i + 1] = factor * (data[i + 1] - 128) + 128;
      data[i + 2] = factor * (data[i + 2] - 128) + 128;
    }

    ctx.putImageData(imageData, x, y);
  }

  /**
   * Sharpens the image using a convolution kernel.
   * @param amount 0 to 100 (mapped to kernel intensity)
   */
  public static sharpen(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, amount: number): void {
    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;
    const w = width;
    const h = height;
    
    // Simple sharpen kernel
    //  0 -1  0
    // -1  5 -1
    //  0 -1  0
    // Amount adjusts the center weight
    
    const mix = amount / 100; // 0 to 1
    // A standard sharpen kernel is often:
    // -1 -1 -1
    // -1  9 -1
    // -1 -1 -1
    // We'll use a mixable approach.
    
    const kernel = [
      0, -1 * mix, 0,
      -1 * mix, 1 + 4 * mix, -1 * mix,
      0, -1 * mix, 0
    ];
    
    const side = Math.round(Math.sqrt(kernel.length));
    const halfSide = Math.floor(side / 2);
    const src = data;
    const dst = new Uint8ClampedArray(data.length);
    
    // Convolution
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const dstOff = (y * w + x) * 4;
        let r = 0, g = 0, b = 0;
        
        for (let cy = 0; cy < side; cy++) {
          for (let cx = 0; cx < side; cx++) {
            const scy = y + cy - halfSide;
            const scx = x + cx - halfSide;
            
            if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
              const srcOff = (scy * w + scx) * 4;
              const wt = kernel[cy * side + cx];
              r += src[srcOff] * wt;
              g += src[srcOff + 1] * wt;
              b += src[srcOff + 2] * wt;
            }
          }
        }
        dst[dstOff] = r;
        dst[dstOff + 1] = g;
        dst[dstOff + 2] = b;
        dst[dstOff + 3] = src[dstOff + 3]; // Alpha
      }
    }
    
    // Copy back
    for (let i = 0; i < data.length; i++) {
        data[i] = dst[i];
    }

    ctx.putImageData(imageData, x, y);
  }
}

