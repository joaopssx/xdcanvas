/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/
import { Conversions } from './Conversions';

export class Accessibility {
  public static simulateColorBlindness(hex: string, type: 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia'): string {
    const rgb = Conversions.hexToRgb(hex);
    if (!rgb) return hex;
    let { r, g, b } = rgb;

    let nr = r, ng = g, nb = b;

    if (type === 'protanopia') {
      nr = 0.567 * r + 0.433 * g + 0.000 * b;
      ng = 0.558 * r + 0.442 * g + 0.000 * b;
      nb = 0.000 * r + 0.242 * g + 0.758 * b;
    } else if (type === 'deuteranopia') {
      nr = 0.625 * r + 0.375 * g + 0.000 * b;
      ng = 0.700 * r + 0.300 * g + 0.000 * b;
      nb = 0.000 * r + 0.300 * g + 0.700 * b;
    } else if (type === 'tritanopia') {
      nr = 0.950 * r + 0.050 * g + 0.000 * b;
      ng = 0.000 * r + 0.433 * g + 0.567 * b;
      nb = 0.000 * r + 0.475 * g + 0.525 * b;
    } else if (type === 'achromatopsia') {
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      nr = ng = nb = gray;
    }

    return Conversions.rgbToHex(Math.min(255, Math.max(0, nr)), Math.min(255, Math.max(0, ng)), Math.min(255, Math.max(0, nb)));
  }
}

