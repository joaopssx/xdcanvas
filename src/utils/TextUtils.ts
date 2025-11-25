/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

export class TextUtils {
  /**
   * Truncates a string to a maximum length, adding an ellipsis if needed.
   */
  public static truncate(str: string, length: number, end: string = '...'): string {
    if (str.length <= length) return str;
    return str.substring(0, length - end.length) + end;
  }
}
