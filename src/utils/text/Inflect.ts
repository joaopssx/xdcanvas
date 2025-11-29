/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

export class Inflect {
  /**
   * Simple pluralizer for English words.
   * For production use, a library like 'pluralize' is recommended, but this covers basics.
   */
  public static pluralize(word: string, count: number): string {
    if (count === 1) return word;
    
    // Basic rules
    if (word.endsWith('y') && !/[aeiou]y$/.test(word)) {
      return word.slice(0, -1) + 'ies';
    }
    if (word.endsWith('s') || word.endsWith('sh') || word.endsWith('ch') || word.endsWith('x') || word.endsWith('z')) {
      return word + 'es';
    }
    
    return word + 's';
  }

  public static ordinal(n: number): string {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
}
