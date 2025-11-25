/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/
export class Basic {
  public static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  public static map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  public static roundTo(value: number, decimals: number = 0): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }

  public static roundToMultiple(value: number, multiple: number): number {
    return Math.round(value / multiple) * multiple;
  }

  public static isBetween(value: number, min: number, max: number, inclusive: boolean = true): boolean {
    return inclusive ? value >= min && value <= max : value > min && value < max;
  }

  public static normalize(value: number, min: number, max: number): number {
    return this.clamp((value - min) / (max - min), 0, 1);
  }

  public static factorial(n: number): number {
    if (n < 0) return -1;
    if (n === 0) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  }

  public static percentOfTotal(value: number, total: number): number {
    if (total === 0) return 0;
    return (value / total) * 100;
  }
}

