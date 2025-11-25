/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/
export class Random {
  public static float(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  public static int(min: number, max: number): number {
    return Math.floor(this.float(min, max + 1));
  }

  public static choice<T>(array: T[]): T {
    return array[this.int(0, array.length - 1)];
  }

  public static weighted<T>(items: { item: T; weight: number }[]): T | null {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    for (const item of items) {
      if (random < item.weight) return item.item;
      random -= item.weight;
    }
    return null;
  }

  public static gaussian(mean: number = 0, stdDev: number = 1): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return num * stdDev + mean;
  }
}

