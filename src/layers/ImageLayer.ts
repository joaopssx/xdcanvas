/**************************************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************************************/

import { BaseLayer } from '../core/BaseLayer';
import { SKRSContext2D, Canvas, Image } from '@napi-rs/canvas';
import { ImageProcessor } from '../images/ImageProcessor';

export class ImageLayer extends BaseLayer {
  private image: Image;
  private width: number;
  private height: number;
  private roundedRadius: number = 0;
  private isCircular: boolean = false;
  private fitMode: 'cover' | 'contain' | 'fill' = 'fill';

  constructor(image: Image, x: number, y: number, w: number, h: number) {
    super();
    this.image = image;
    this._x = x;
    this._y = y;
    this.width = w;
    this.height = h;
  }

  public setRounded(radius: number): this {
    this.roundedRadius = radius;
    return this;
  }

  public setCircular(circular: boolean): this {
    this.isCircular = circular;
    return this;
  }

  public fit(mode: 'cover' | 'contain' | 'fill'): this {
    this.fitMode = mode;
    return this;
  }

  protected draw(ctx: SKRSContext2D, canvas: Canvas): void {
    ctx.save();

    // 1. Define Path & Clip
    ctx.beginPath();
    if (this.isCircular) {
      const radius = Math.min(this.width, this.height) / 2;
      ctx.arc(this._x + this.width / 2, this._y + this.height / 2, radius, 0, Math.PI * 2);
    } else if (this.roundedRadius > 0) {
      // Simple rounded rect
      const r = this.roundedRadius;
      const x = this._x, y = this._y, w = this.width, h = this.height;
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
    } else {
      ctx.rect(this._x, this._y, this.width, this.height);
    }
    ctx.closePath();
    ctx.clip();

    // 2. Calculate Draw Dimensions based on Fit Mode
    let drawX = this._x;
    let drawY = this._y;
    let drawW = this.width;
    let drawH = this.height;

    if (this.fitMode !== 'fill') {
      const imgRatio = this.image.width / this.image.height;
      const containerRatio = this.width / this.height;

      if (this.fitMode === 'cover') {
        if (containerRatio > imgRatio) {
          drawW = this.width;
          drawH = this.width / imgRatio;
          drawY = this._y + (this.height - drawH) / 2;
        } else {
          drawH = this.height;
          drawW = this.height * imgRatio;
          drawX = this._x + (this.width - drawW) / 2;
        }
      } else if (this.fitMode === 'contain') {
        if (containerRatio > imgRatio) {
          drawH = this.height;
          drawW = this.height * imgRatio;
          drawX = this._x + (this.width - drawW) / 2;
        } else {
          drawW = this.width;
          drawH = this.width / imgRatio;
          drawY = this._y + (this.height - drawH) / 2;
        }
      }
    }

    // 3. Draw Image
    ctx.drawImage(this.image, drawX, drawY, drawW, drawH);
    ctx.restore();
  }
}
