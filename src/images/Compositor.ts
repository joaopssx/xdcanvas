/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { SKRSContext2D, Image, Canvas } from '@napi-rs/canvas';

export class Compositor {
  /**
   * Creates a grid layout from an array of images.
   */
  public static grid(images: Image[], columns: number = 2, gap: number = 10): Canvas {
    if (images.length === 0) return new (require('@napi-rs/canvas').Canvas)(1, 1);
    
    const rows = Math.ceil(images.length / columns);
    
    // Assuming all images are same size for simplicity in v1.6.0
    // or taking the max size
    const maxWidth = Math.max(...images.map(img => img.width));
    const maxHeight = Math.max(...images.map(img => img.height));
    
    const totalWidth = (maxWidth * columns) + (gap * (columns - 1));
    const totalHeight = (maxHeight * rows) + (gap * (rows - 1));
    
    const canvas = new (require('@napi-rs/canvas').Canvas)(totalWidth, totalHeight);
    const ctx = canvas.getContext('2d');
    
    images.forEach((img, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      
      const x = col * (maxWidth + gap);
      const y = row * (maxHeight + gap);
      
      ctx.drawImage(img, x, y, maxWidth, maxHeight); // Stretch to fit cell
    });
    
    return canvas;
  }

  /**
   * Adds a mirror reflection effect below the image.
   */
  public static reflection(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, opacity: number = 0.5, length: number = 0.5): void {
    ctx.save();
    
    // 1. Capture the area to reflect
    // Note: In standard canvas, we can't easily "capture" and flip without drawing to a temp canvas if we want to reflect what's already drawn.
    // Assuming we want to reflect the *current state* of that region.
    
    // For v1.6.0, let's assume this is called *after* drawing the object we want to reflect.
    const imageData = ctx.getImageData(x, y, width, height);
    
    const tempCanvas = new (require('@napi-rs/canvas').Canvas)(width, height);
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.putImageData(imageData, 0, 0);
    
    // 2. Draw flipped
    ctx.translate(x, y + height);
    ctx.scale(1, -1);
    
    // 3. Apply gradient mask for fade out
    // We need to draw the image, then mask it.
    // Or use globalCompositeOperation.
    
    // Draw image
    ctx.drawImage(tempCanvas, 0, 0, width, height * length);
    
    // Mask
    ctx.globalCompositeOperation = 'destination-in';
    const gradient = ctx.createLinearGradient(0, 0, 0, height * length);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height * length);
    
    ctx.restore();
  }
}
