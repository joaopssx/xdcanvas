/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { SKRSContext2D, Canvas, Image } from '@napi-rs/canvas';

export class Crop {
  public static crop(canvas: Canvas, x: number, y: number, width: number, height: number): Canvas {
    const newCanvas = new (require('@napi-rs/canvas').Canvas)(width, height);
    const ctx = newCanvas.getContext('2d');
    ctx.drawImage(canvas, x, y, width, height, 0, 0, width, height);
    return newCanvas;
  }

  public static smartCrop(canvas: Canvas, width: number, height: number): Canvas {
    // Advanced Smart Crop (Simulated)
    // Real implementation would use edge detection or entropy analysis.
    // For v1.4.0, we'll implement a "weighted center" approach which is better than pure center.
    // We scan the image for the "busiest" area (highest contrast).
    
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const w = canvas.width;
    const h = canvas.height;
    
    // Downsample for speed (analyze every 10th pixel)
    const step = 10;
    let maxEntropy = 0;
    let bestX = (w - width) / 2;
    let bestY = (h - height) / 2;
    
    // Sliding window search (simplified)
    // We'll check 9 positions: center, corners, and mid-points
    const positions = [
        { x: (w - width) / 2, y: (h - height) / 2 }, // Center
        { x: 0, y: 0 }, // Top-Left
        { x: w - width, y: 0 }, // Top-Right
        { x: 0, y: h - height }, // Bottom-Left
        { x: w - width, y: h - height }, // Bottom-Right
        { x: (w - width) / 2, y: 0 }, // Top-Center
        { x: (w - width) / 2, y: h - height }, // Bottom-Center
        { x: 0, y: (h - height) / 2 }, // Left-Center
        { x: w - width, y: (h - height) / 2 } // Right-Center
    ];

    // Helper to calculate "energy" of a region
    const calculateEnergy = (sx: number, sy: number) => {
        let energy = 0;
        for (let y = sy; y < sy + height; y += step) {
            for (let x = sx; x < sx + width; x += step) {
                const i = (Math.floor(y) * w + Math.floor(x)) * 4;
                if (i >= 0 && i < data.length - 4) {
                    // Simple edge detection: difference between this pixel and next
                    const r = Math.abs(data[i] - data[i+4]);
                    const g = Math.abs(data[i+1] - data[i+5]);
                    const b = Math.abs(data[i+2] - data[i+6]);
                    energy += r + g + b;
                }
            }
        }
        return energy;
    };

    // Find best position
    for (const pos of positions) {
        // Clamp positions
        const safeX = Math.max(0, Math.min(w - width, pos.x));
        const safeY = Math.max(0, Math.min(h - height, pos.y));
        
        const energy = calculateEnergy(safeX, safeY);
        if (energy > maxEntropy) {
            maxEntropy = energy;
            bestX = safeX;
            bestY = safeY;
        }
    }
    
    return this.crop(canvas, bestX, bestY, width, height);
  }
}
