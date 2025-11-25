/**************************************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************************************/

import { SKRSContext2D, Image } from '@napi-rs/canvas';

export class ImageProcessor {
  public static drawRounded(
    ctx: SKRSContext2D,
    img: Image,
    x: number,
    y: number,
    w: number,
    h: number,
    radius: number
  ): void {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();
  }

  public static drawCircular(
    ctx: SKRSContext2D,
    img: Image,
    x: number,
    y: number,
    radius: number
  ): void {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, radius * 2, radius * 2);
    ctx.restore();
  }

  public static fitImage(
    ctx: SKRSContext2D,
    img: Image,
    x: number,
    y: number,
    w: number,
    h: number,
    mode: 'cover' | 'contain' = 'cover'
  ): void {
    const imgRatio = img.width / img.height;
    const containerRatio = w / h;
    let drawW, drawH, drawX, drawY;

    if (mode === 'cover') {
      if (containerRatio > imgRatio) {
        drawW = w;
        drawH = w / imgRatio;
        drawX = x;
        drawY = y + (h - drawH) / 2;
      } else {
        drawH = h;
        drawW = h * imgRatio;
        drawY = y;
        drawX = x + (w - drawW) / 2;
      }
    } else { // contain
      if (containerRatio > imgRatio) {
        drawH = h;
        drawW = h * imgRatio;
        drawY = y;
        drawX = x + (w - drawW) / 2;
      } else {
        drawW = w;
        drawH = w / imgRatio;
        drawX = x;
        drawY = y + (h - drawH) / 2;
      }
    }

    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }

  public static addBorder(
    ctx: SKRSContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    thickness: number,
    color: string,
    radius: number = 0
  ): void {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    
    ctx.beginPath();
    if (radius > 0) {
       ctx.roundRect(x, y, w, h, radius);
    } else {
       ctx.rect(x, y, w, h);
    }
    ctx.stroke();
    ctx.restore();
  }
  public static grayscale(ctx: SKRSContext2D, x: number, y: number, w: number, h: number): void {
    const imageData = ctx.getImageData(x, y, w, h);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    ctx.putImageData(imageData, x, y);
  }

  public static invert(ctx: SKRSContext2D, x: number, y: number, w: number, h: number): void {
    const imageData = ctx.getImageData(x, y, w, h);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    ctx.putImageData(imageData, x, y);
  }
}
