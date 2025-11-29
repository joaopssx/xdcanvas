/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { SKRSContext2D } from '@napi-rs/canvas';

export class Shadows {
  public static dropShadow(ctx: SKRSContext2D, x: number, y: number, color: string, blur: number): void {
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.shadowOffsetX = x;
    ctx.shadowOffsetY = y;
  }

  public static glow(ctx: SKRSContext2D, color: string, blur: number): void {
    this.dropShadow(ctx, 0, 0, color, blur);
  }

  public static neon(ctx: SKRSContext2D, color: string, intensity: number = 20): void {
    this.glow(ctx, color, intensity);
    // For stronger neon, we might want to layer it, but standard canvas shadow is usually sufficient for v1.
  }

  public static clear(ctx: SKRSContext2D): void {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  /**
   * Simulates an inner shadow by using composite operations.
   * Note: This is complex in standard canvas without clipping.
   */
  /**
   * Simulates an inner shadow by using composite operations.
   */
  public static innerShadow(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, color: string, blur: number): void {
    ctx.save();
    
    // 1. Define the shape (assuming rect for now, but ideally we use the current path)
    // If we want to support arbitrary shapes, we'd need to assume the path is already set or passed.
    // For this utility, we'll stick to rect as per signature.
    
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.clip();
    
    // 2. Draw shadow
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // Draw a frame *outside* the clip area so only the shadow falls inside
    ctx.strokeStyle = color;
    ctx.lineWidth = 20; // Thick enough to cast shadow
    ctx.strokeRect(x - 10, y - 10, width + 20, height + 20);
    
    ctx.restore();
  }
}
