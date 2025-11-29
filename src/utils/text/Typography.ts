/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

export class Typography {
  /**
   * Replaces straight quotes with smart quotes.
   */
  public static smartQuotes(str: string): string {
    return str
      .replace(/(\W|^)"(\S)/g, '$1“$2')                                       // beginning "
      .replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1”$2')          // ending "
      .replace(/([^0-9])"/g, '$1”')                                           // remaining " at end of word
      .replace(/''/g, '”')                                                    // double '' -> ”
      .replace(/(\W|^)'(\S)/g, '$1‘$2')                                       // beginning '
      .replace(/([a-z])'([a-z])/ig, '$1’$2')                                  // conjunctions like don't
      .replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1’$3')                 // ending '
      .replace(/'/g, '’');                                                    // remaining '
  }

  /**
   * Replaces hyphens with en-dashes and em-dashes.
   */
  public static smartDashes(str: string): string {
    return str
      .replace(/--/g, '—') // em-dash
      .replace(/ - /g, ' – '); // en-dash
  }
}
