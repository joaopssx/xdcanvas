/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { SKRSContext2D, Image } from '@napi-rs/canvas';

export class RichText {
  /**
   * Draws text with a gradient fill.
   */
  public static drawGradientText(ctx: SKRSContext2D, text: string, x: number, y: number, gradientColors: string[], angle: number = 0): void {
    ctx.save();
    const metrics = ctx.measureText(text);
    const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    
    // Create gradient based on angle (simplified linear gradient for now)
    // For true angle support, we need to calculate start/end points on the bounding box.
    // Defaulting to horizontal for v1.6.0 simplicity or vertical if specified.
    
    const gradient = ctx.createLinearGradient(x, y - height, x + metrics.width, y);
    
    gradientColors.forEach((color, index) => {
      gradient.addColorStop(index / (gradientColors.length - 1), color);
    });
    
    ctx.fillStyle = gradient;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  /**
   * Draws text masked with an image.
   */
  public static drawImageText(ctx: SKRSContext2D, text: string, x: number, y: number, image: Image): void {
    ctx.save();
    
    // 1. Draw text
    ctx.fillText(text, x, y);
    
    // 2. Composite image over text
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(image, x, y - image.height / 2, image.width, image.height); // Center image roughly
    
    ctx.restore();
  }

  /**
   * Draws text with a neon glow effect.
   */
  public static drawNeonText(ctx: SKRSContext2D, text: string, x: number, y: number, color: string, intensity: number = 20): void {
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = intensity;
    ctx.fillStyle = '#ffffff'; // White core for neon look
    ctx.fillText(text, x, y);
    
    // Layering for intensity
    ctx.shadowBlur = intensity * 2;
    ctx.strokeText(text, x, y);
    
    ctx.restore();
  }

  /**
   * Draws text with a glitch effect (RGB split).
   */
  public static drawGlitchText(ctx: SKRSContext2D, text: string, x: number, y: number, offset: number = 3): void {
    ctx.save();
    
    // Red Channel
    ctx.fillStyle = 'red';
    ctx.fillText(text, x - offset, y);
    
    // Cyan Channel (Blue+Green)
    ctx.globalCompositeOperation = 'screen'; // Blend
    ctx.fillStyle = 'cyan';
    ctx.fillText(text, x + offset, y);
    
    // Original (White) on top mostly for clarity, or just the split
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'white';
    ctx.globalAlpha = 0.5;
    ctx.fillText(text, x, y);
    
    ctx.restore();
  }

  /**
   * Draws text with a high-quality outline.
   */
  public static drawOutlinedText(ctx: SKRSContext2D, text: string, x: number, y: number, outlineColor: string, thickness: number = 3): void {
    ctx.save();
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = thickness * 2; // Stroke is centered, so we need double width to see full thickness outside if we draw fill on top
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = ctx.fillStyle; // Keep current fill
    ctx.fillText(text, x, y);
    ctx.restore();
  }
}
