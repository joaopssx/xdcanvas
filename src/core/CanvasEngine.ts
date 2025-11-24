/**************************************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************************************/

import { GlobalFonts } from '@napi-rs/canvas';

export class CanvasEngine {
  private static instance: CanvasEngine;

  private constructor() {}

  public static getInstance(): CanvasEngine {
    if (!CanvasEngine.instance) {
      CanvasEngine.instance = new CanvasEngine();
    }
    return CanvasEngine.instance;
  }

  public registerFont(path: string, alias: string): void {
    GlobalFonts.registerFromPath(path, alias);
  }

  // Future global config methods can go here
}
