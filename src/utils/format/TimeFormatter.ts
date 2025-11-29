/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

export class TimeFormatter {
  public static duration(ms: number, short: boolean = false): string {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    if (short) {
      return `${days > 0 ? days + ':' : ''}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);
    
    return parts.join(' ') || '0s';
  }

  public static relative(date: Date | number): string {
    const now = Date.now();
    const diff = now - (date instanceof Date ? date.getTime() : date);
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  }

  public static discordTimestamp(date: Date | number, style: 't' | 'T' | 'd' | 'D' | 'f' | 'F' | 'R' = 'R'): string {
    const timestamp = Math.floor((date instanceof Date ? date.getTime() : date) / 1000);
    return `<t:${timestamp}:${style}>`;
  }
}
