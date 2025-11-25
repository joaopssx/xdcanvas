/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { CanvasBuilder } from '../core/CanvasBuilder';

export type PresetFactory = (data: any) => Promise<Buffer> | Buffer;

import { WelcomeCard } from './layouts/WelcomeCard';
import { ProfileCard } from './layouts/ProfileCard';
import { RankCard } from './layouts/RankCard';

export class PresetManager {
  private static presets: Map<string, PresetFactory> = new Map();

  public static registerDefaults(): void {
    this.register('WelcomeCard', (data) => WelcomeCard.build(data));
    this.register('ProfileCard', (data) => ProfileCard.build(data));
    this.register('RankCard', (data) => RankCard.build(data));
  }

  public static register(name: string, factory: PresetFactory): void {
    this.presets.set(name, factory);
  }

  public static async render(name: string, data: any): Promise<Buffer> {
    if (this.presets.size === 0) {
      this.registerDefaults();
    }
    const factory = this.presets.get(name);
    if (!factory) {
      throw new Error(`Preset ${name} not found.`);
    }
    return await factory(data);
  }
}
