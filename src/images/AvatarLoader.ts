/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import axios from 'axios';
import { loadImage, Image } from '@napi-rs/canvas';

export class AvatarLoader {
  private static cache: Map<string, Image> = new Map();

  public static async load(url: string, useCache: boolean = true): Promise<Image> {
    if (useCache && this.cache.has(url)) {
      return this.cache.get(url)!;
    }

    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');
      const image = await loadImage(buffer);

      if (useCache) {
        this.cache.set(url, image);
      }

      return image;
    } catch (error) {
      throw new Error(`Failed to load avatar from ${url}: ${error}`);
    }
  }

  public static clearCache(): void {
    this.cache.clear();
  }
}
