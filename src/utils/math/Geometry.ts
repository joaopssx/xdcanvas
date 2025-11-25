/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/
import { Basic } from './Basic';

export interface Vector2 { x: number; y: number; }

export class Geometry {
  public static distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.hypot(x2 - x1, y2 - y1);
  }

  public static angle(x1: number, y1: number, x2: number, y2: number): number {
    return Math.atan2(y2 - y1, x2 - x1);
  }

  public static hypotenuse(a: number, b: number): number {
    return Math.hypot(a, b);
  }

  public static polarToCartesian(radius: number, angle: number): Vector2 {
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    };
  }

  public static clampVector(v: Vector2, min: Vector2, max: Vector2): Vector2 {
    return {
      x: Basic.clamp(v.x, min.x, max.x),
      y: Basic.clamp(v.y, min.y, max.y)
    };
  }

  public static pointInRect(px: number, py: number, rx: number, ry: number, rw: number, rh: number): boolean {
    return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
  }
}

