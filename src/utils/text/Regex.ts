/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

export class Regex {
  public static readonly EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  public static readonly URL = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  public static readonly IPV4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  public static readonly HEX_COLOR = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  public static readonly PHONE_BR = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  
  public static isEmail(str: string): boolean {
    return this.EMAIL.test(str);
  }

  public static isUrl(str: string): boolean {
    return this.URL.test(str);
  }
}
