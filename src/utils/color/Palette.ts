import { Conversions } from './Conversions';

export class Palette {
  public static getDominantColor(ctx: any, x: number, y: number, w: number, h: number): string {
    const imageData = ctx.getImageData(x, y, w, h);
    const data = imageData.data;
    let r = 0, g = 0, b = 0;
    const count = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    return Conversions.rgbToHex(Math.floor(r / count), Math.floor(g / count), Math.floor(b / count));
  }

  public static getPalette(ctx: any, x: number, y: number, w: number, h: number, colorCount: number = 5): string[] {
    const colors: string[] = [];
    const stepX = Math.floor(w / colorCount);
    const stepY = Math.floor(h / colorCount);
    
    for (let i = 0; i < colorCount; i++) {
        const sampleX = x + (stepX * i) + (stepX / 2);
        const sampleY = y + (stepY * i) + (stepY / 2);
        const sx = Math.min(Math.max(sampleX, x), x + w - 1);
        const sy = Math.min(Math.max(sampleY, y), y + h - 1);
        const p = ctx.getImageData(sx, sy, 1, 1).data;
        colors.push(Conversions.rgbToHex(p[0], p[1], p[2]));
    }
    return colors;
  }
}
