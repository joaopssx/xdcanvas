/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { CanvasBuilder } from '../../core/CanvasBuilder';
import { TextEngine } from '../../drawing/TextEngine';
import { ImageProcessor } from '../../images/ImageProcessor';
import { AvatarLoader } from '../../images/AvatarLoader';
import { ShapeEngine } from '../../drawing/Shapes';

export interface ProfileCardOptions {
  username: string;
  avatarUrl: string;
  level: number;
  xp: number;
  maxXp: number;
  rank: number;
  backgroundUrl?: string;
  themeColor?: string;
}

export class ProfileCard {
  public static async build(options: ProfileCardOptions): Promise<Buffer> {
    const width = 800;
    const height = 300;
    const {
      username,
      avatarUrl,
      level,
      xp,
      maxXp,
      rank,
      backgroundUrl,
      themeColor = '#00aaff'
    } = options;

    const builder = new CanvasBuilder(width, height);

    // Background
    if (backgroundUrl) {
      const bg = await AvatarLoader.load(backgroundUrl);
      builder.addLayer({
        zIndex: 0,
        render: (ctx) => {
          ImageProcessor.fitImage(ctx, bg, 0, 0, width, height, 'cover');
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(0, 0, width, height);
        }
      });
    } else {
      builder.setBackground('#1a1a1a');
    }

    // Avatar
    const avatar = await AvatarLoader.load(avatarUrl);
    builder.addLayer({
      zIndex: 10,
      render: (ctx) => {
        const size = 180;
        const x = 50;
        const y = (height - size) / 2;
        
        ShapeEngine.setShadow(ctx, { color: themeColor, blur: 25 });
        ImageProcessor.drawCircular(ctx, avatar, x, y, size / 2);
        ShapeEngine.clearShadow(ctx);
        
        ImageProcessor.addBorder(ctx, x, y, size, size, 5, themeColor, size/2);
      }
    });

    // Info
    builder.addLayer({
      zIndex: 20,
      render: (ctx) => {
        const startX = 260;
        
        // Username
        TextEngine.drawText(ctx, username, startX, 80, {
          size: 45,
          color: '#ffffff',
          font: 'Arial',
          maxWidth: 400,
          autoAdjust: true
        });

        // Rank & Level
        TextEngine.drawText(ctx, `RANK #${rank}   LEVEL ${level}`, startX, 140, {
          size: 25,
          color: '#cccccc',
          font: 'Arial'
        });

        // XP Bar
        const barY = 200;
        const barW = 450;
        const barH = 30;
        
        // XP Text
        TextEngine.drawText(ctx, `${xp} / ${maxXp} XP`, startX + barW, barY - 10, {
          size: 20,
          color: '#ffffff',
          align: 'right'
        });

        ShapeEngine.drawProgressBar(ctx, startX, barY, barW, barH, xp / maxXp, themeColor, '#333333', 15);
      }
    });

    return builder.build();
  }
}
