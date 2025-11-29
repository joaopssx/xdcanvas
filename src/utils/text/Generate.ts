/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

export class Generate {
  public static randomId(length: number = 8, options: { numbers?: boolean, letters?: boolean, special?: boolean } = { numbers: true, letters: true }): string {
    let chars = '';
    if (options.letters !== false) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (options.numbers !== false) chars += '0123456789';
    if (options.special) chars += '!@#$%^&*()';
    
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  public static padLeft(str: string | number, length: number, char: string = ' '): string {
    return String(str).padStart(length, char);
  }

  public static padRight(str: string | number, length: number, char: string = ' '): string {
    return String(str).padEnd(length, char);
  }

  public static uuid(): string {
    // Simple UUID v4 implementation
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  public static loremIpsum(words: number = 10): string {
    const lorem = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum";
    const list = lorem.split(' ');
    let result = [];
    for (let i = 0; i < words; i++) {
        result.push(list[i % list.length]);
    }
    return Case.capitalize(result.join(' '), 'sentence') + '.';
  }
}
import { Case } from './Case';
