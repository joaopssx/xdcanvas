/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { Sanitize } from './Sanitize';

export class Manipulate {
  public static slugify(str: string): string {
    return Sanitize.removeAccents(str)
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  public static limitWords(str: string, limit: number, suffix: string = '...'): string {
    const words = str.split(/\s+/);
    if (words.length <= limit) return str;
    return words.slice(0, limit).join(' ') + suffix;
  }

  public static reverse(str: string): string {
    return str.split('').reverse().join('');
  }

  public static abbreviate(str: string): string {
    // Simple abbreviation: First letter of each word
    return str.match(/\b\w/g)?.join('').toUpperCase() || '';
  }

  public static shuffle(str: string): string {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }

  public static mask(str: string, start: number = 2, end: number = 2, char: string = '*'): string {
    if (str.length <= start + end) return str;
    return str.substring(0, start) + char.repeat(str.length - start - end) + str.substring(str.length - end);
  }
}
