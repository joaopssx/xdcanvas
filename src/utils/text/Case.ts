/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

export class Case {
  /**
   * Capitalizes the first letter of the string.
   * @param mode 'first' | 'words' | 'sentence'
   */
  public static capitalize(str: string, mode: 'first' | 'words' | 'sentence' = 'first'): string {
    if (!str) return str;
    
    if (mode === 'first') {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    if (mode === 'words') {
      return str.replace(/\b\w/g, l => l.toUpperCase());
    }
    
    if (mode === 'sentence') {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    
    return str;
  }

  /**
   * Converts string to Title Case.
   */
  public static titleCase(str: string): string {
    if (!str) return str;
    const minorWords = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'of', 'in'];
    
    return str.toLowerCase().split(' ').map((word, index) => {
      if (index > 0 && minorWords.includes(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  public static toCamel(str: string): string {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '').replace(/[-_]+/g, '');
  }

  public static toPascal(str: string): string {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
      return word.toUpperCase();
    }).replace(/\s+/g, '').replace(/[-_]+/g, '');
  }

  public static toSnake(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).replace(/\s+/g, '_').replace(/^_/, '');
  }

  public static toKebab(str: string): string {
    return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`).replace(/\s+/g, '-').replace(/^-/, '');
  }

  public static toConstant(str: string): string {
    return this.toSnake(str).toUpperCase();
  }

  public static swapCase(str: string): string {
    return str.replace(/([a-z]+)|([A-Z]+)/g, (match, lower, upper) => {
      return lower ? match.toUpperCase() : match.toLowerCase();
    });
  }
}
