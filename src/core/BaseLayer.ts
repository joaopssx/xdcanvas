/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { SKRSContext2D, Canvas, GlobalCompositeOperation } from '@napi-rs/canvas';
import { ShadowOptions, ShapeEngine } from '../drawing/Shapes';

export abstract class BaseLayer {
  protected _zIndex: number = 0;
  protected _opacity: number = 1;
  protected _blendMode: GlobalCompositeOperation = 'source-over';
  protected _rotation: number = 0; // Radians
  protected _scaleX: number = 1;
  protected _scaleY: number = 1;
  protected _shadow: ShadowOptions | null = null;
  protected _x: number = 0;
  protected _y: number = 0;

  constructor(zIndex: number = 0) {
    this._zIndex = zIndex;
  }

  public setZIndex(index: number): this {
    this._zIndex = index;
    return this;
  }

  public get zIndex(): number {
    return this._zIndex;
  }

  public opacity(value: number): this {
    this._opacity = Math.max(0, Math.min(1, value));
    return this;
  }

  public blendMode(mode: GlobalCompositeOperation): this {
    this._blendMode = mode;
    return this;
  }

  public rotation(angle: number): this {
    this._rotation = angle;
    return this;
  }

  public scale(x: number, y: number): this {
    this._scaleX = x;
    this._scaleY = y;
    return this;
  }

  public shadow(options: ShadowOptions): this {
    this._shadow = options;
    return this;
  }

  public render(ctx: SKRSContext2D, canvas: Canvas): void {
    ctx.save();
    
    // Apply Universal Styles
    ctx.globalAlpha = this._opacity;
    ctx.globalCompositeOperation = this._blendMode;
    
    if (this._shadow) {
      ShapeEngine.setShadow(ctx, this._shadow);
    }

    // Transformations
    // We need a pivot point. For now, we translate to _x, _y, rotate/scale, then translate back?
    // Or we assume the draw implementation handles position. 
    // Let's assume standard transform relative to 0,0 or specific implementation needs.
    // A generic rotation usually requires a center. 
    // For simplicity in v1, we apply rotation/scale at the current context origin (0,0)
    // BUT usually users want to rotate an object around its center.
    // Let's leave advanced transform logic to the specific draw method if needed, 
    // OR apply it here if we know the center. 
    // Since we don't know the center here, we'll just apply the raw transforms.
    ctx.translate(this._x, this._y);
    ctx.rotate(this._rotation);
    ctx.scale(this._scaleX, this._scaleY);
    ctx.translate(-this._x, -this._y);

    this.draw(ctx, canvas);

    ctx.restore();
  }

  protected abstract draw(ctx: SKRSContext2D, canvas: Canvas): void;
}
