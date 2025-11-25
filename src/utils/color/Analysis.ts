/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/
import { Conversions } from './Conversions';

export class Analysis {
  public static getLuminance(hex: string): number {
    const rgb = Conversions.hexToRgb(hex);
    if (!rgb) return 0;
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  public static getContrastRatio(hex1: string, hex2: string): number {
    const lum1 = this.getLuminance(hex1);
    const lum2 = this.getLuminance(hex2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  public static isReadable(textColor: string, bgColor: string): boolean {
    return this.getContrastRatio(textColor, bgColor) >= 4.5; // WCAG AA
  }

  public static getBestTextColor(bgColor: string): string {
    return this.getContrastRatio('#000000', bgColor) > this.getContrastRatio('#ffffff', bgColor) 
      ? '#000000' 
      : '#ffffff';
  }

  public static getColorTemperature(hex: string): 'warm' | 'cold' | 'neutral' {
    const rgb = Conversions.hexToRgb(hex);
    if (!rgb) return 'neutral';
    const { r, b } = rgb;
    if (r > b) return 'warm';
    if (b > r) return 'cold';
    return 'neutral';
  }

  public static getColorDistance(hex1: string, hex2: string): number {
    const c1 = Conversions.hexToRgb(hex1);
    const c2 = Conversions.hexToRgb(hex2);
    if (!c1 || !c2) return 0;
    
    // Simple Euclidean distance
    return Math.sqrt(
      Math.pow(c1.r - c2.r, 2) +
      Math.pow(c1.g - c2.g, 2) +
      Math.pow(c1.b - c2.b, 2)
    );
  }
}

