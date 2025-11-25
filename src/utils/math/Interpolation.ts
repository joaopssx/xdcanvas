/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/
export class Interpolation {
  public static lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
  }

  public static smoothStep(t: number): number {
    return t * t * (3 - 2 * t);
  }

  public static sigmoid(t: number): number {
    return 1 / (1 + Math.exp(-t));
  }

  // Easing Functions
  public static easeInQuad(t: number): number { return t * t; }
  public static easeOutQuad(t: number): number { return t * (2 - t); }
  public static easeInOutQuad(t: number): number { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

  public static easeInCubic(t: number): number { return t * t * t; }
  public static easeOutCubic(t: number): number { return (--t) * t * t + 1; }
  public static easeInOutCubic(t: number): number { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; }

  public static easeInExpo(t: number): number { return t === 0 ? 0 : Math.pow(2, 10 * (t - 1)); }
  public static easeOutExpo(t: number): number { return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1; }
}

