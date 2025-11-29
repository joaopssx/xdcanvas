/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { SKRSContext2D } from '@napi-rs/canvas';

export class Borders {
  public static drawBorder(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, thickness: number, color: string, radius: number = 0): void {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    
    if (radius > 0) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.stroke();
    } else {
      ctx.strokeRect(x, y, width, height);
    }
    
    ctx.restore();
  }
}
