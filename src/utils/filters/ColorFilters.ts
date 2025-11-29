/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { SKRSContext2D, ImageData } from '@napi-rs/canvas';

export class ColorFilters {
  /**
   * Converts the canvas or region to grayscale.
   */
  public static grayscale(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, intensity: number = 100): void {
    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;
    const factor = intensity / 100;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      data[i] = r + (gray - r) * factor;
      data[i + 1] = g + (gray - g) * factor;
      data[i + 2] = b + (gray - b) * factor;
    }

    ctx.putImageData(imageData, x, y);
  }

  /**
   * Applies a sepia tone to the canvas or region.
   */
  public static sepia(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, intensity: number = 100): void {
    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;
    const factor = intensity / 100;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const tr = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
      const tg = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
      const tb = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));

      data[i] = r + (tr - r) * factor;
      data[i + 1] = g + (tg - g) * factor;
      data[i + 2] = b + (tb - b) * factor;
    }

    ctx.putImageData(imageData, x, y);
  }

  /**
   * Inverts the colors of the canvas or region.
   */
  public static invert(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, intensity: number = 100): void {
    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;
    const factor = intensity / 100;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = data[i] + (255 - data[i] - data[i]) * factor;
      data[i + 1] = data[i + 1] + (255 - data[i + 1] - data[i + 1]) * factor;
      data[i + 2] = data[i + 2] + (255 - data[i + 2] - data[i + 2]) * factor;
    }

    ctx.putImageData(imageData, x, y);
  }

  /**
   * Applies a duotone effect using two colors.
   */
  /**
   * Applies a duotone effect using two colors.
   * Maps luminance to a gradient between color1 and color2.
   */
  public static duotone(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, color1: string, color2: string): void {
    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;

    // Parse colors (assuming hex or simple named colors, but for robustness we need RGB values)
    // Since we don't have a full color parser here, we'll assume the user passes hex or we use a helper if available.
    // For this implementation, we'll use a helper from ColorUtils if possible, or a simple hex parser.
    // Let's assume ColorUtils is available or we implement a quick hex parser.
    
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Calculate luminance
      const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      
      // Interpolate
      data[i] = Math.round(c1.r + (c2.r - c1.r) * lum);
      data[i + 1] = Math.round(c1.g + (c2.g - c1.g) * lum);
      data[i + 2] = Math.round(c1.b + (c2.b - c1.b) * lum);
    }

    ctx.putImageData(imageData, x, y);
  }

  /**
   * Tints the image with a specific color.
   */
  public static tint(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, color: string, intensity: number = 50): void {
    ctx.save();
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = color;
    ctx.globalAlpha = intensity / 100;
    ctx.fillRect(x, y, width, height);
    ctx.restore();
  }

  /**
   * Rotates the hue of the image.
   * Note: This is a pixel-level operation and can be expensive.
   */
  public static hueRotate(ctx: SKRSContext2D, x: number, y: number, width: number, height: number, degrees: number): void {
    const imageData = ctx.getImageData(x, y, width, height);
    const data = imageData.data;
    const rad = (degrees * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    // Matrix multiplication approximation for hue rotation
    // R' = R*a + G*b + B*c
    // ...
    // Coefficients:
    const a00 = 0.213 + cos * 0.787 - sin * 0.213;
    const a01 = 0.715 - cos * 0.715 - sin * 0.715;
    const a02 = 0.072 - cos * 0.072 + sin * 0.928;
    
    const a10 = 0.213 - cos * 0.213 + sin * 0.143;
    const a11 = 0.715 + cos * 0.285 + sin * 0.140;
    const a12 = 0.072 - cos * 0.072 - sin * 0.283;
    
    const a20 = 0.213 - cos * 0.213 - sin * 0.787;
    const a21 = 0.715 - cos * 0.715 + sin * 0.715;
    const a22 = 0.072 + cos * 0.928 + sin * 0.072;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      data[i] = r * a00 + g * a01 + b * a02;
      data[i + 1] = r * a10 + g * a11 + b * a12;
      data[i + 2] = r * a20 + g * a21 + b * a22;
    }

    ctx.putImageData(imageData, x, y);
  }
}

