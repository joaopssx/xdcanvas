/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { SKRSContext2D } from '@napi-rs/canvas';

export class EffectFilters {
  /**
   * Applies a pixelate effect.
   * @param size Size of the pixel blocks.
   */
  public static pixelate(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, size: number): void {
    if (size <= 1) return;
    
    // Simple downscale and upscale
    // Note: This is a visual approximation using canvas scaling
    const w = Math.ceil(width / size);
    const h = Math.ceil(height / size);
    
    const tempCanvas = new (require('@napi-rs/canvas').Canvas)(w, h);
    const tempCtx = tempCanvas.getContext('2d');
    
    // Draw scaled down
    tempCtx.drawImage(ctx.canvas, x, y, width, height, 0, 0, w, h);
    
    // Draw scaled up with nearest neighbor (implied by disabling smoothing usually, but canvas defaults might vary)
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, w, h, x, y, width, height);
    ctx.imageSmoothingEnabled = true;
  }

  /**
   * Adds noise to the image.
   * @param amount 0 to 100
   */
  public static noise(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, amount: number): void {
    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;
    const factor = amount * 2.55;

    for (let i = 0; i < data.length; i += 4) {
      const random = (0.5 - Math.random()) * factor;
      data[i] += random;
      data[i + 1] += random;
      data[i + 2] += random;
    }

    ctx.putImageData(imageData, x, y);
  }

  /**
   * Adds a vignette effect (dark corners).
   */
  public static vignette(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, strength: number = 0.5, color: string = '#000000'): void {
    ctx.save();
    const radius = Math.max(width, height) / 1.5;
    const cx = x + width / 2;
    const cy = y + height / 2;
    
    const gradient = ctx.createRadialGradient(cx, cy, radius * (1 - strength), cx, cy, radius);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, color); // Usually black, but can be colored
    
    ctx.fillStyle = gradient;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillRect(x, y, width, height);
    ctx.restore();
  }
  /**
   * Applies a motion blur effect.
   * @param angle Angle in degrees.
   * @param distance Distance of the blur in pixels.
   */
  public static motionBlur(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, angle: number, distance: number): void {
    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;
    const w = width;
    const h = height;
    
    const rad = (angle * Math.PI) / 180;
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);
    
    // Create a copy of the original data to sample from
    const srcData = new Uint8ClampedArray(data);
    
    for (let py = 0; py < h; py++) {
      for (let px = 0; px < w; px++) {
        let r = 0, g = 0, b = 0, a = 0;
        let count = 0;
        
        // Sample along the line
        for (let i = 0; i < distance; i++) {
          const sx = Math.round(px + i * dx);
          const sy = Math.round(py + i * dy);
          
          if (sx >= 0 && sx < w && sy >= 0 && sy < h) {
            const off = (sy * w + sx) * 4;
            r += srcData[off];
            g += srcData[off + 1];
            b += srcData[off + 2];
            a += srcData[off + 3];
            count++;
          }
        }
        
        if (count > 0) {
          const off = (py * w + px) * 4;
          data[off] = r / count;
          data[off + 1] = g / count;
          data[off + 2] = b / count;
          data[off + 3] = a / count;
        }
      }
    }
    
    ctx.putImageData(imageData, x, y);
  }
}

