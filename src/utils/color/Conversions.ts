import { RGB, HSL } from './types';

export class Conversions {
  public static hexToRgb(hex: string): RGB | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
          a: result[4] ? parseInt(result[4], 16) / 255 : 1
        }
      : null;
  }

  public static rgbToHex(r: number, g: number, b: number, a: number = 1): string {
    const toHex = (c: number) => {
      const hex = Math.round(Math.max(0, Math.min(255, c))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    const alpha = a < 1 ? toHex(a * 255) : '';
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${alpha}`;
  }

  public static rgbToHsl(r: number, g: number, b: number): HSL {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  public static hslToRgb(h: number, s: number, l: number): RGB {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  public static toWebsafe(hex: string): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;
    const safe = (c: number) => Math.round(c / 51) * 51;
    return this.rgbToHex(safe(rgb.r), safe(rgb.g), safe(rgb.b));
  }
}
