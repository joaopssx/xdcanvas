/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/
import { Conversions } from './Conversions';

export class Blending {
  public static blend(base: string, blend: string, mode: 'multiply' | 'screen' | 'overlay'): string {
    const b = Conversions.hexToRgb(base);
    const l = Conversions.hexToRgb(blend);
    if (!b || !l) return base;

    const blendFn = (a: number, b: number) => {
      a /= 255; b /= 255;
      let res = 0;
      if (mode === 'multiply') res = a * b;
      else if (mode === 'screen') res = 1 - (1 - a) * (1 - b);
      else if (mode === 'overlay') res = a < 0.5 ? 2 * a * b : 1 - 2 * (1 - a) * (1 - b);
      return Math.round(res * 255);
    };

    return Conversions.rgbToHex(blendFn(b.r, l.r), blendFn(b.g, l.g), blendFn(b.b, l.b));
  }
}

