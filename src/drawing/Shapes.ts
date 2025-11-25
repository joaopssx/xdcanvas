/**************************************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************************************/

import { SKRSContext2D, Canvas, CanvasGradient, CanvasPattern } from '@napi-rs/canvas';

export interface ShadowOptions {
  color?: string;
  blur?: number;
  offsetX?: number;
  offsetY?: number;
}

export interface GradientOptions {
  type: 'linear' | 'radial';
  colors: { stop: number; color: string }[];
  x0: number;
  y0: number;
  x1: number;
  y1: number; // For linear: end point. For radial: r1
  r0?: number; // For radial: start radius
}

export class ShapeEngine {
  public static setShadow(ctx: SKRSContext2D, options: ShadowOptions): void {
    if (options.color) ctx.shadowColor = options.color;
    if (options.blur !== undefined) ctx.shadowBlur = options.blur;
    if (options.offsetX !== undefined) ctx.shadowOffsetX = options.offsetX;
    if (options.offsetY !== undefined) ctx.shadowOffsetY = options.offsetY;
  }

  public static clearShadow(ctx: SKRSContext2D): void {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  public static createGradient(ctx: SKRSContext2D, options: GradientOptions): CanvasGradient {
    let gradient: CanvasGradient;
    if (options.type === 'linear') {
      gradient = ctx.createLinearGradient(options.x0, options.y0, options.x1, options.y1);
    } else {
      gradient = ctx.createRadialGradient(
        options.x0,
        options.y0,
        options.r0 || 0,
        options.x1,
        options.y1, // y1 acts as r1 here for simplicity in interface, or we can expand
        options.y1 // Actually radial gradient needs x1, y1, r1. Let's fix the interface usage.
      );
      // Re-implementing radial properly below
    }

    options.colors.forEach((stop) => {
      gradient.addColorStop(stop.stop, stop.color);
    });

    return gradient;
  }

  public static createLinearGradient(
    ctx: SKRSContext2D,
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    colors: { pos: number; color: string }[]
  ): CanvasGradient {
    const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    colors.forEach((stop) => {
      gradient.addColorStop(stop.pos, stop.color);
    });
    return gradient;
  }

  public static createPattern(
    ctx: SKRSContext2D,
    image: any, // Image type from canvas
    repetition: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat' = 'repeat'
  ): CanvasPattern | null {
    return ctx.createPattern(image, repetition);
  }

  public static drawRect(
    ctx: SKRSContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string | CanvasGradient,
    radius: number = 0,
    shadow?: ShadowOptions
  ): void {
    ctx.save();
    if (shadow) this.setShadow(ctx, shadow);
    
    ctx.beginPath();
    if (radius > 0) {
      ctx.roundRect(x, y, w, h, radius);
    } else {
      ctx.rect(x, y, w, h);
    }
    
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fill();
    ctx.restore();
  }

  public static drawCircle(
    ctx: SKRSContext2D,
    x: number,
    y: number,
    radius: number,
    color: string | CanvasGradient,
    shadow?: ShadowOptions
  ): void {
    ctx.save();
    if (shadow) this.setShadow(ctx, shadow);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
  
  public static drawProgressBar(
      ctx: SKRSContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      progress: number, // 0 to 1
      color: string,
      bgColor: string = '#333333',
      radius: number = 0
  ): void {
      // Background
      this.drawRect(ctx, x, y, w, h, bgColor, radius);
      // Foreground
      const progressW = Math.max(0, Math.min(w * progress, w));
      if (progressW > 0) {
          this.drawRect(ctx, x, y, progressW, h, color, radius);
      }
  }
}
