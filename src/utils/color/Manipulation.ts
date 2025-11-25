/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/
import { Conversions } from './Conversions';

export class Manipulation {
  public static lighten(hex: string, percent: number): string {
    const rgb = Conversions.hexToRgb(hex);
    if (!rgb) return hex;
    const hsl = Conversions.rgbToHsl(rgb.r, rgb.g, rgb.b);
    hsl.l = Math.min(100, Math.max(0, hsl.l + percent));
    const newRgb = Conversions.hslToRgb(hsl.h, hsl.s, hsl.l);
    return Conversions.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  }

  public static darken(hex: string, percent: number): string {
    return this.lighten(hex, -percent);
  }

  public static saturate(hex: string, percent: number): string {
    const rgb = Conversions.hexToRgb(hex);
    if (!rgb) return hex;
    const hsl = Conversions.rgbToHsl(rgb.r, rgb.g, rgb.b);
    hsl.s = Math.min(100, Math.max(0, hsl.s + percent));
    const newRgb = Conversions.hslToRgb(hsl.h, hsl.s, hsl.l);
    return Conversions.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
  }

  public static desaturate(hex: string, percent: number): string {
    return this.saturate(hex, -percent);
  }

  public static setAlpha(hex: string, alpha: number): string {
    const rgb = Conversions.hexToRgb(hex);
    if (!rgb) return hex;
    return Conversions.rgbToHex(rgb.r, rgb.g, rgb.b, Math.min(1, Math.max(0, alpha)));
  }

  public static invert(hex: string): string {
    const rgb = Conversions.hexToRgb(hex);
    if (!rgb) return hex;
    return Conversions.rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b);
  }

  public static mix(color1: string, color2: string, weight: number = 0.5): string {
    const c1 = Conversions.hexToRgb(color1);
    const c2 = Conversions.hexToRgb(color2);
    if (!c1 || !c2) return color1;
    
    const w = Math.min(1, Math.max(0, weight));
    const r = Math.round(c1.r * (1 - w) + c2.r * w);
    const g = Math.round(c1.g * (1 - w) + c2.g * w);
    const b = Math.round(c1.b * (1 - w) + c2.b * w);
    return Conversions.rgbToHex(r, g, b);
  }

  public static mixMultiple(colors: string[]): string {
    if (colors.length === 0) return '#000000';
    let r = 0, g = 0, b = 0;
    let count = 0;
    
    colors.forEach(c => {
      const rgb = Conversions.hexToRgb(c);
      if (rgb) {
        r += rgb.r;
        g += rgb.g;
        b += rgb.b;
        count++;
      }
    });

    if (count === 0) return '#000000';
    return Conversions.rgbToHex(Math.round(r / count), Math.round(g / count), Math.round(b / count));
  }

  public static tint(hex: string, weight: number): string {
    return this.mix(hex, '#ffffff', weight);
  }

  public static shade(hex: string, weight: number): string {
    return this.mix(hex, '#000000', weight);
  }

  public static clamp(hex: string): string {
    const rgb = Conversions.hexToRgb(hex);
    if (!rgb) return hex;
    return Conversions.rgbToHex(
      Math.min(255, Math.max(0, rgb.r)),
      Math.min(255, Math.max(0, rgb.g)),
      Math.min(255, Math.max(0, rgb.b))
    );
  }

  public static warm(hex: string, weight: number): string {
    const rgb = Conversions.hexToRgb(hex);
    if (!rgb) return hex;
    // Increase Red, Decrease Blue slightly
    const r = Math.min(255, rgb.r + (255 - rgb.r) * weight);
    const b = Math.max(0, rgb.b - rgb.b * weight);
    return Conversions.rgbToHex(r, rgb.g, b);
  }

  public static cold(hex: string, weight: number): string {
    const rgb = Conversions.hexToRgb(hex);
    if (!rgb) return hex;
    // Increase Blue, Decrease Red slightly
    const b = Math.min(255, rgb.b + (255 - rgb.b) * weight);
    const r = Math.max(0, rgb.r - rgb.r * weight);
    return Conversions.rgbToHex(r, rgb.g, b);
  }
}

