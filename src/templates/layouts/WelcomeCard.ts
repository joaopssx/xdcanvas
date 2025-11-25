/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import { CanvasBuilder } from '../../core/CanvasBuilder';
import { TextEngine } from '../../drawing/TextEngine';
import { ImageProcessor } from '../../images/ImageProcessor';
import { AvatarLoader } from '../../images/AvatarLoader';
import { ShapeEngine } from '../../drawing/Shapes';

export interface WelcomeCardOptions {
  username: string;
  avatarUrl: string;
  title?: string;
  subtitle?: string;
  backgroundUrl?: string;
  themeColor?: string;
}

export class WelcomeCard {
  public static async build(options: WelcomeCardOptions): Promise<Buffer> {
    const width = 800;
    const height = 300;
    const {
      username,
      avatarUrl,
      title = 'WELCOME',
      subtitle = 'To the server!',
      backgroundUrl,
      themeColor = '#00aaff'
    } = options;

    const builder = new CanvasBuilder(width, height);

    // Background
    if (backgroundUrl) {
      const bg = await AvatarLoader.load(backgroundUrl); // Using loader for generic images too
      builder.addLayer({
        zIndex: 0,
        render: (ctx) => {
          ImageProcessor.fitImage(ctx, bg, 0, 0, width, height, 'cover');
          // Dim overlay
          ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
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
        const avatarSize = 150;
        const avatarX = 50;
        const avatarY = (height - avatarSize) / 2;

        // Glow
        ShapeEngine.setShadow(ctx, { color: themeColor, blur: 20 });
        ImageProcessor.drawCircular(ctx, avatar, avatarX, avatarY, avatarSize / 2);
        ShapeEngine.clearShadow(ctx);

        // Border
        ctx.beginPath();
        ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
        ctx.lineWidth = 5;
        ctx.strokeStyle = themeColor;
        ctx.stroke();
      }
    });

    // Text
    builder.addLayer({
      zIndex: 20,
      render: (ctx) => {
        const textX = 250;
        
        // Title
        TextEngine.drawText(ctx, title, textX, 100, {
          size: 40,
          font: 'Arial',
          color: themeColor,
          align: 'left',
          emoji: true
        });

        // Username
        TextEngine.drawText(ctx, username, textX, 160, {
          size: 60,
          font: 'Arial',
          color: '#ffffff',
          align: 'left',
          maxWidth: 500,
          autoAdjust: true,
          emoji: true
        });

        // Subtitle
        TextEngine.drawText(ctx, subtitle, textX, 220, {
          size: 30,
          font: 'Arial',
          color: '#cccccc',
          align: 'left',
          emoji: true
        });
      }
    });

    return builder.build();
  }
}
