/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { AvatarLoader } from '../images/AvatarLoader';
import { Image } from '@napi-rs/canvas';
import { ImageUtils } from '../utils/ImageUtils';

export type ImageFormat = 'png' | 'jpg' | 'webp' | 'gif';
export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;

export class DiscordHelper {
  private static readonly CDN_URL = 'https://cdn.discordapp.com';
  private static rateLimitReset: number = 0;

  private static async fetchWithRateLimit(url: string): Promise<Image> {
    if (Date.now() < this.rateLimitReset) {
      const waitTime = this.rateLimitReset - Date.now();
      console.warn(`Rate limited. Waiting ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    try {
      return await AvatarLoader.load(url);
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        const retryAfter = (error.response.headers['retry-after'] || 1) * 1000;
        this.rateLimitReset = Date.now() + retryAfter;
        console.warn(`Hit rate limit. Retrying in ${retryAfter}ms`);
        return this.fetchWithRateLimit(url);
      }
      throw error;
    }
  }

  /**
   * Fetches a user's avatar. Falls back to default avatar if hash is missing or load fails.
   */
  public static async getUserAvatar(
    userId: string,
    avatarHash: string | null,
    format: ImageFormat = 'png',
    size: ImageSize = 512
  ): Promise<Image> {
    if (!avatarHash) {
      return this.getDefaultAvatar(userId);
    }

    const url = `${this.CDN_URL}/avatars/${userId}/${avatarHash}.${format}?size=${size}`;
    try {
      return await this.fetchWithRateLimit(url);
    } catch (error) {
      console.warn(`Failed to load avatar for ${userId}, using fallback.`);
      return this.getDefaultAvatar(userId);
    }
  }

  public static async getDefaultAvatar(userId: string): Promise<Image> {
    const index = (BigInt(userId) >> 22n) % 6n;
    const url = `${this.CDN_URL}/embed/avatars/${index}.png`;
    return await this.fetchWithRateLimit(url);
  }

  /**
   * Fetches user banner. If missing/fails, returns null or optional fallback (blurred avatar).
   */
  public static async getUserBanner(
    userId: string,
    bannerHash: string | null,
    format: ImageFormat = 'png',
    size: ImageSize = 1024,
    fallbackToAvatar: boolean = false,
    avatarHash: string | null = null
  ): Promise<Image | null> {
    if (bannerHash) {
      const url = `${this.CDN_URL}/banners/${userId}/${bannerHash}.${format}?size=${size}`;
      try {
        return await this.fetchWithRateLimit(url);
      } catch (error) {
        console.warn(`Failed to load banner for ${userId}`);
      }
    }

    if (fallbackToAvatar) {
      try {
        const avatar = await this.getUserAvatar(userId, avatarHash, format, 512);
        // Create a blurred version of the avatar as banner
        // We need to resize it to banner aspect ratio first? 
        // For now, just return the avatar, the user can blur it using ImageLayer filters/blur.
        // Or we can pre-process it here.
        return avatar; 
      } catch (e) {
        return null;
      }
    }

    return null;
  }

  public static async getGuildIcon(
    guildId: string,
    iconHash: string | null,
    format: ImageFormat = 'png',
    size: ImageSize = 512
  ): Promise<Image | null> {
    if (!iconHash) return null;
    const url = `${this.CDN_URL}/icons/${guildId}/${iconHash}.${format}?size=${size}`;
    try {
      return await this.fetchWithRateLimit(url);
    } catch (error) {
      console.warn(`Failed to load guild icon for ${guildId}`);
      return null;
    }
  }

  public static async getGuildBanner(
    guildId: string,
    bannerHash: string | null,
    format: ImageFormat = 'png',
    size: ImageSize = 1024
  ): Promise<Image | null> {
    if (!bannerHash) return null;
    const url = `${this.CDN_URL}/banners/${guildId}/${bannerHash}.${format}?size=${size}`;
    try {
      return await this.fetchWithRateLimit(url);
    } catch (error) {
      console.warn(`Failed to load guild banner for ${guildId}`);
      return null;
    }
  }

  public static getUserFlags(flags: number): string[] {
    const flagMap: { [key: number]: string } = {
      1: 'Staff',
      2: 'Partner',
      4: 'HypeSquad',
      8: 'BugHunterLevel1',
      64: 'HypeSquadBravery',
      128: 'HypeSquadBrilliance',
      256: 'HypeSquadBalance',
      512: 'EarlySupporter',
      16384: 'BugHunterLevel2',
      131072: 'VerifiedDeveloper',
      4194304: 'ActiveDeveloper'
    };

    const userFlags: string[] = [];
    for (const [bit, name] of Object.entries(flagMap)) {
      if ((flags & Number(bit)) === Number(bit)) {
        userFlags.push(name);
      }
    }
    return userFlags;
  }
}
