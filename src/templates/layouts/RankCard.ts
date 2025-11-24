/**************************************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************************************/

import { CanvasBuilder } from '../../core/CanvasBuilder';
import { TextEngine } from '../../drawing/TextEngine';
import { ImageProcessor } from '../../images/ImageProcessor';
import { AvatarLoader } from '../../images/AvatarLoader';
import { ShapeEngine } from '../../drawing/Shapes';

export interface RankCardOptions {
  username: string;
  avatarUrl: string;
  rank: number;
  level: number;
  xp: number;
  maxXp: number;
  themeColor?: string;
}

export class RankCard {
  public static async build(options: RankCardOptions): Promise<Buffer> {
    // Similar structure to ProfileCard but optimized for Rank display
    // For v1.0.0, we can reuse similar logic or create a distinct horizontal strip layout
    const width = 934;
    const height = 282;
    const {
      username,
      avatarUrl,
      rank,
      level,
      xp,
      maxXp,
      themeColor = '#ffffff'
    } = options;

    const builder = new CanvasBuilder(width, height);
    builder.setBackground('#23272a');

    const avatar = await AvatarLoader.load(avatarUrl);

    builder.addLayer({
      zIndex: 10,
      render: (ctx) => {
        // Avatar
        ImageProcessor.drawCircular(ctx, avatar, 40, 40, 100);
        
        // Status Circle (Online/Offline simulation)
        ctx.beginPath();
        ctx.arc(200, 200, 25, 0, Math.PI * 2);
        ctx.fillStyle = '#43b581'; // Online green
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#23272a';
        ctx.stroke();

        // Text
        TextEngine.drawText(ctx, username, 260, 150, {
          size: 40,
          color: '#ffffff',
          font: 'Arial'
        });

        // Stats
        TextEngine.drawText(ctx, `RANK #${rank}`, 600, 80, { size: 30, color: '#ffffff' });
        TextEngine.drawText(ctx, `LEVEL ${level}`, 750, 80, { size: 30, color: themeColor });

        // Progress
        ShapeEngine.drawProgressBar(ctx, 260, 180, 600, 35, xp / maxXp, themeColor, '#484b4e', 17.5);
      }
    });

    return builder.build();
  }
}
