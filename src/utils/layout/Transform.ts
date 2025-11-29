/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { SKRSContext2D, Canvas, Image } from '@napi-rs/canvas';

export class Transform {
  public static rotateCenter(ctx: SKRSContext2D, angleDeg: number, x: number, y: number, width: number, height: number): void {
    const cx = x + width / 2;
    const cy = y + height / 2;
    const rad = (angleDeg * Math.PI) / 180;
    
    ctx.translate(cx, cy);
    ctx.rotate(rad);
    ctx.translate(-cx, -cy);
  }

  public static autoCenter(ctx: SKRSContext2D, parentWidth: number, parentHeight: number, childWidth: number, childHeight: number): { x: number, y: number } {
    return {
      x: (parentWidth - childWidth) / 2,
      y: (parentHeight - childHeight) / 2
    };
  }

  public static autoScale(parentWidth: number, parentHeight: number, childWidth: number, childHeight: number, mode: 'contain' | 'cover' = 'contain'): number {
    const scaleX = parentWidth / childWidth;
    const scaleY = parentHeight / childHeight;
    
    if (mode === 'contain') {
      return Math.min(scaleX, scaleY);
    } else {
      return Math.max(scaleX, scaleY);
    }
  }

  /**
   * Flips the canvas or region horizontally or vertically.
   */
  public static flip(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, horizontal: boolean = true, vertical: boolean = false): void {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.scale(horizontal ? -1 : 1, vertical ? -1 : 1);
    ctx.translate(-(x + width / 2), -(y + height / 2));
    ctx.drawImage(ctx.canvas, x, y, width, height, x, y, width, height);
    ctx.restore();
  }
}
