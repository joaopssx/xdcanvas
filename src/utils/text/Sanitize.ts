/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

export class Sanitize {
  public static removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  public static safeFilename(str: string): string {
    return this.removeAccents(str)
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase()
      .replace(/_+/g, '_');
  }

  public static stripEmojis(str: string): string {
    return str.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
  }

  public static collapseSpaces(str: string): string {
    return str.replace(/\s+/g, ' ').trim();
  }

  public static removeSpecial(str: string, keep: string = ''): string {
    const regex = new RegExp(`[^a-zA-Z0-9${keep}]`, 'g');
    return str.replace(regex, '');
  }

  public static keepAscii(str: string): string {
    return str.replace(/[^\x00-\x7F]/g, "");
  }

  public static normalizeWidth(str: string): string {
    return str.replace(/[\uFF01-\uFF5E]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)).replace(/\u3000/g, ' ');
  }

  public static escapeHTML(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  public static unescapeHTML(str: string): string {
    return str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }
}
