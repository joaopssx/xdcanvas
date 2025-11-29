/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { SKRSContext2D, Canvas, Image } from '@napi-rs/canvas';

export class PatternGenerator {
  /**
   * Draws a grid pattern over the canvas.
   */
  public static drawGrid(ctx: SKRSContext2D, width: number, height: number, size: number = 20, color: string = 'rgba(255, 255, 255, 0.1)', thickness: number = 1): void {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;

    // Vertical lines
    for (let x = 0; x <= width; x += size) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += size) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Draws a striped pattern.
   */
  /**
   * Draws a striped pattern.
   */
  public static drawStripes(ctx: SKRSContext2D, width: number, height: number, size: number = 20, color1: string = '#ffffff', color2: string = '#000000', angle: number = 45): void {
    ctx.save();
    
    // Fill background
    ctx.fillStyle = color1;
    ctx.fillRect(0, 0, width, height);
    
    // Draw stripes
    ctx.fillStyle = color2;
    
    // Calculate geometry to cover the entire rotated area
    const diag = Math.sqrt(width * width + height * height);
    const rad = (angle * Math.PI) / 180;
    
    ctx.translate(width / 2, height / 2);
    ctx.rotate(rad);
    ctx.translate(-diag, -diag);
    
    // Draw rectangles instead of lines for sharper edges and better control
    for (let i = 0; i < diag * 2; i += size * 2) {
      ctx.fillRect(i, 0, size, diag * 2);
    }
    
    ctx.restore();
  }

  /**
   * Draws a polka dot pattern.
   */
  public static drawPolkaDots(ctx: SKRSContext2D, width: number, height: number, size: number = 10, spacing: number = 20, color: string = '#ffffff', backgroundColor?: string): void {
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.fillStyle = color;
    for (let y = 0; y < height + size; y += spacing) {
      for (let x = 0; x < width + size; x += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  /**
   * Repeats an image as a pattern.
   */
  public static repeatImage(ctx: SKRSContext2D, image: Image, width: number, height: number, scale: number = 1): void {
    ctx.save();
    const pattern = ctx.createPattern(image, 'repeat');
    if (pattern) {
        // Pattern transform is not fully supported in all canvas implementations.
        // For v1.4.0, we will skip pattern scaling to ensure stability.
        /*
        if (scale !== 1) {
            const matrix = new DOMMatrix();
            matrix.scaleSelf(scale, scale);
            pattern.setTransform(matrix);
        }
        */
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
    }
    ctx.restore();
  }
}
