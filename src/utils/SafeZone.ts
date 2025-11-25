/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { SKRSContext2D } from '@napi-rs/canvas';

export class SafeZone {
  public static drawGuides(ctx: SKRSContext2D, width: number, height: number, color: string = 'rgba(255, 0, 0, 0.5)'): void {
    const safeMargin = 0.1; // 10% margin
    const x = width * safeMargin;
    const y = height * safeMargin;
    const w = width * (1 - safeMargin * 2);
    const h = height * (1 - safeMargin * 2);

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(x, y, w, h);
    ctx.restore();
  }

  public static isSafe(x: number, y: number, width: number, height: number, canvasWidth: number, canvasHeight: number): boolean {
    const safeMargin = 0.1;
    const minX = canvasWidth * safeMargin;
    const minY = canvasHeight * safeMargin;
    const maxX = canvasWidth * (1 - safeMargin);
    const maxY = canvasHeight * (1 - safeMargin);

    return x >= minX && y >= minY && x + width <= maxX && y + height <= maxY;
  }
}
