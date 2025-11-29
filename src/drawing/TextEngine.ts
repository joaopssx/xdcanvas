/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

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
  stroke?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
  shadow?: boolean;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
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
      emoji = true,
      stroke = false,
      strokeColor = '#000000',
      strokeWidth = 1,
      shadow = false,
      shadowColor = '#000000',
      shadowBlur = 0,
      shadowOffsetX = 0,
      shadowOffsetY = 0
    } = options;

    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    
    if (shadow) {
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = shadowBlur;
        ctx.shadowOffsetX = shadowOffsetX;
        ctx.shadowOffsetY = shadowOffsetY;
    } else {
        ctx.shadowColor = 'transparent';
    }

    if (stroke) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
    }

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
      this.drawWrappedText(ctx, finalText, x, y, maxWidth, currentSize * lineHeight, stroke);
    } else {
      if (stroke) ctx.strokeText(finalText, x, y);
      ctx.fillText(finalText, x, y);
    }
  }

  /**
   * Automatically fits text within a bounding box by adjusting font size.
   * Uses binary search for performance.
   */
  public static autoFit(
    ctx: SKRSContext2D,
    text: string,
    maxWidth: number,
    maxHeight: number,
    options: TextOptions = {}
  ): void {
    let { size = 100, font = 'Arial', minSize = 10 } = options as any;
    
    let min = minSize;
    let max = size;
    let bestSize = minSize;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      ctx.font = `${mid}px ${font}`;
      const metrics = ctx.measureText(text);
      
      // Check width and height (approximate height with size)
      if (metrics.width <= maxWidth && mid <= maxHeight) {
        bestSize = mid;
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }
    
    // Apply best size
    ctx.font = `${bestSize}px ${font}`;
    options.size = bestSize;
  }

  private static drawWrappedText(
    ctx: SKRSContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    stroke: boolean = false
  ): void {
    const words = text.split(' ');
    let line = '';
    let dy = 0;
    const align = ctx.textAlign;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        // Draw current line
        let drawX = x;
        if (align === 'center') drawX = x; // Center is handled by textAlign usually, but if manual x is needed:
        // Actually ctx.textAlign handles the alignment relative to x.
        
        if (stroke) ctx.strokeText(line, drawX, y + dy);
        ctx.fillText(line, drawX, y + dy);
        
        line = words[n] + ' ';
        dy += lineHeight;
      } else {
        line = testLine;
      }
    }
    if (stroke) ctx.strokeText(line, x, y + dy);
    ctx.fillText(line, x, y + dy);
  }
}

