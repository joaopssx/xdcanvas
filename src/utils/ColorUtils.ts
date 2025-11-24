/**************************************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************************************/

export class ColorUtils {
  /**
   * Returns black or white based on the contrast of the input hex color.
   */
  public static getContrastColor(hex: string): string {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
  }

  /**
   * Placeholder for dominant color extraction.
   * Real implementation would require pixel analysis.
   */
  public static getDominantColor(imageBuffer: Buffer): string {
    // In a real implementation, we would scan pixels here.
    // For v1.0.0 base, we return a safe default or implement a simple center-pixel check if needed.
    return '#000000'; 
  }
}
