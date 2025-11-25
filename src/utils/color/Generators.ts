import { Conversions } from './Conversions';
import { Manipulation } from './Manipulation';

export class Generators {
  public static random(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }

  public static randomPastel(): string {
    const h = Math.floor(Math.random() * 360);
    return Conversions.rgbToHex(
      ...Object.values(Conversions.hslToRgb(h, 70 + Math.random() * 30, 80 + Math.random() * 10)) as [number, number, number]
    );
  }

  public static randomVibrant(): string {
    const h = Math.floor(Math.random() * 360);
    return Conversions.rgbToHex(
      ...Object.values(Conversions.hslToRgb(h, 80 + Math.random() * 20, 50 + Math.random() * 10)) as [number, number, number]
    );
  }

  public static randomNeon(): string {
    const h = Math.floor(Math.random() * 360);
    return Conversions.rgbToHex(
      ...Object.values(Conversions.hslToRgb(h, 100, 50)) as [number, number, number]
    );
  }

  public static generateGradient(count: number, start?: string, end?: string): string[] {
    const c1 = start ? Conversions.hexToRgb(start) : Conversions.hexToRgb(this.random());
    const c2 = end ? Conversions.hexToRgb(end) : Conversions.hexToRgb(this.random());
    if (!c1 || !c2) return [];

    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const w = i / (count - 1);
      const r = Math.round(c1.r * (1 - w) + c2.r * w);
      const g = Math.round(c1.g * (1 - w) + c2.g * w);
      const b = Math.round(c1.b * (1 - w) + c2.b * w);
      colors.push(Conversions.rgbToHex(r, g, b));
    }
    return colors;
  }

  public static generateColorScale(hex: string, steps: number = 10): string[] {
    const colors: string[] = [];
    for (let i = 0; i < steps; i++) {
        const w = i / (steps - 1);
        // Interpolate from dark to light through the color
        if (w < 0.5) {
            colors.push(Manipulation.mix('#000000', hex, 1 - (w * 2)));
        } else {
            colors.push(Manipulation.mix(hex, '#ffffff', (w - 0.5) * 2));
        }
    }
    return colors;
  }

  public static generateHarmonies(hex: string, type: 'analogous' | 'triadic' | 'tetradic' | 'complementary' | 'split-complementary'): string[] {
    const rgb = Conversions.hexToRgb(hex);
    if (!rgb) return [hex];
    const hsl = Conversions.rgbToHsl(rgb.r, rgb.g, rgb.b);
    const shifts: number[] = [];

    switch (type) {
      case 'complementary': shifts.push(180); break;
      case 'split-complementary': shifts.push(150, 210); break;
      case 'triadic': shifts.push(120, 240); break;
      case 'tetradic': shifts.push(90, 180, 270); break;
      case 'analogous': shifts.push(-30, 30); break;
    }

    const colors = [hex];
    shifts.forEach(shift => {
      let h = (hsl.h + shift) % 360;
      if (h < 0) h += 360;
      const newRgb = Conversions.hslToRgb(h, hsl.s, hsl.l);
      colors.push(Conversions.rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    });
    return colors;
  }

  public static randomGradientPair(): [string, string] {
      const c1 = this.randomVibrant();
      const c2 = this.generateHarmonies(c1, 'complementary')[1];
      return [c1, c2];
  }

  public static getSemanticColor(type: 'success' | 'info' | 'warning' | 'danger'): string {
      switch(type) {
          case 'success': return '#28a745';
          case 'info': return '#17a2b8';
          case 'warning': return '#ffc107';
          case 'danger': return '#dc3545';
      }
  }

  public static gradientNoise(count: number, start: string, end: string, noiseFactor: number = 0.1): string[] {
      const gradient = this.generateGradient(count, start, end);
      return gradient.map(c => {
          const rgb = Conversions.hexToRgb(c);
          if(!rgb) return c;
          const noise = () => (Math.random() - 0.5) * 255 * noiseFactor;
          return Conversions.rgbToHex(
              Math.max(0, Math.min(255, rgb.r + noise())),
              Math.max(0, Math.min(255, rgb.g + noise())),
              Math.max(0, Math.min(255, rgb.b + noise()))
          );
      });
  }
}
