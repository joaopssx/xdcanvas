/**************************************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************************************/

import { SKRSContext2D } from '@napi-rs/canvas';

export interface TextOptions {
  font?: string;
  size?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
  baseline?: 'top' | 'middle' | 'bottom';
  maxWidth?: number;
  wrap?: boolean;
  autoAdjust?: boolean;
  lineHeight?: number;
  emoji?: boolean; // Enable emoji parsing
}

export class TextEngine {
  public static drawText(
    ctx: SKRSContext2D,
    text: string,
    x: number,
    y: number,
    options: TextOptions = {}
  ): void {
    const {
      font = 'Arial',
      size = 24,
      color = '#ffffff',
      align = 'left',
      baseline = 'top',
      maxWidth,
      wrap = false,
      autoAdjust = false,
      lineHeight = 1.2,
      emoji = true
    } = options;

    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;

    let currentSize = size;
    ctx.font = `${currentSize}px ${font}`;

    // Auto-adjust size
    if (maxWidth && autoAdjust) {
      while (ctx.measureText(text).width > maxWidth && currentSize > 10) {
        currentSize -= 1;
        ctx.font = `${currentSize}px ${font}`;
      }
    }

    // Emoji handling (Basic placeholder logic)
    // Napi-rs/canvas handles system emojis if fonts are loaded.
    // To support custom discord emojis, we would need to parse <a:name:id> strings
    // and draw images inline. This is complex for v1 but we add the hook here.
    const finalText = emoji ? text : text; // Placeholder for parsing

    if (wrap && maxWidth) {
      this.drawWrappedText(ctx, finalText, x, y, maxWidth, currentSize * lineHeight);
    } else {
      ctx.fillText(finalText, x, y);
    }
  }

  private static drawWrappedText(
    ctx: SKRSContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ): void {
    const words = text.split(' ');
    let line = '';
    let dy = 0;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y + dy);
        line = words[n] + ' ';
        dy += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y + dy);
  }
}
