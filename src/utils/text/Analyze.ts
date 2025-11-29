/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

export class Analyze {
  public static wordCount(str: string): number {
    return str.trim().split(/\s+/).length;
  }

  public static isEmoji(str: string): boolean {
    const regex = /^([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])+$/;
    return regex.test(str);
  }

  public static extractNumbers(str: string): number[] {
    const matches = str.match(/-?\d+(\.\d+)?/g);
    return matches ? matches.map(Number) : [];
  }

  public static extractHashtags(str: string): string[] {
    const matches = str.match(/#[a-z0-9_]+/gi);
    return matches || [];
  }

  public static extractMentions(str: string): string[] {
    const matches = str.match(/@[a-z0-9_]+/gi);
    return matches || [];
  }

  /**
   * Estimates reading time in minutes.
   * @param wpm Words per minute (default 200)
   */
  public static readingTime(str: string, wpm: number = 200): number {
    const words = this.wordCount(str);
    return Math.ceil(words / wpm);
  }
}
