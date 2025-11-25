# 🎨 XDCanvas

> **The ultimate canvas library for Discord bots.**  
> *Fast, Modular, and Easy to use.*

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.2.1-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

**XDCanvas** is a powerful graphics library designed specifically for **Discord.js** bots. It simplifies the creation of welcome cards, profile cards, rank cards, and custom images with a fluent, chainable API.

---

## 🚀 Features

### 🎨 Core Graphics
- **CanvasBuilder**: Fluent API to build images layer by layer.
- **Universal Styles**: Set opacity, blend modes, rotation, and shadows on ANY layer.
- **Text Engine**: Auto-fit text, multi-line wrapping, emoji support, **stroke**, and **shadows**.
- **Shapes & Gradients**: Easy-to-use gradient painter and shape renderer.

### 🌈 Advanced Color Engine (v1.2.0)
- **Modular Architecture**: 30+ new functions in `ColorUtils`.
- **Manipulation**: Lighten, Darken, Saturate, Mix, Tint, Shade, Warm, Cold.
- **Analysis**: Luminance, Contrast Ratio, Readability, Temperature.
- **Generators**: Random, Pastel, Neon, Gradients, Harmonies, Noise.
- **Accessibility**: Color Blindness Simulation (Protanopia, Deuteranopia, etc.).

### 🤖 Discord Integration
- **DiscordHelper**: Fetch User Avatars, Banners, and Guild Icons directly from Discord CDN.
- **Rate Limit Handling**: Built-in backoff and retry logic for 429 errors.
- **Smart Fallbacks**: Automatically generates fallbacks if a banner or icon is missing.

### 🖼️ Image Processing
- **Smart Resize**: `cover`, `contain`, and `scale-down` modes.
- **Filters**: Rounded corners, circular cropping, borders, **grayscale**, **invert**.
- **Optimization**: Efficient buffer management.

### 📦 Ready-to-Use Presets
- **WelcomeCard**: Beautiful welcome banners out of the box.
- **ProfileCard**: Display user stats, level, and XP.
- **RankCard**: Leaderboard style cards.

---

## 📦 Installation

```bash
npm install xdcanvas
```

> **Note**: Requires Node.js 18+ and `@napi-rs/canvas`.

---

## 🛠️ Quick Start

### 1. Simple Usage (JavaScript)

```javascript
const { CanvasBuilder, AttachmentBuilder } = require('xdcanvas');
const fs = require('fs');

async function create() {
  const builder = new CanvasBuilder(800, 300)
    .setBackground('#2b2b2b')
    .addLayer({
      render: (ctx) => {
        ctx.fillStyle = '#ffffff';
        ctx.font = '50px Arial';
        ctx.fillText('Hello XDCanvas!', 50, 150);
      }
    });

  const buffer = await builder.build();
  fs.writeFileSync('hello.png', buffer);
}

create();
```

### 2. Discord Bot Example (TypeScript)

```typescript
import { Client, Events, AttachmentBuilder } from 'discord.js';
import { CanvasBuilder, DiscordHelper, ImageLayer } from 'xdcanvas';

client.on(Events.MessageCreate, async (message) => {
  if (message.content === '!profile') {
    const user = message.author;
    
    // Fetch Avatar & Banner
    const avatar = await DiscordHelper.getUserAvatar(user.id, user.avatar);
    const banner = await DiscordHelper.getUserBanner(user.id, user.banner);

    // Build Canvas
    const buffer = await new CanvasBuilder(800, 400)
      .addLayer(new ImageLayer(banner, 0, 0, 800, 400).fit('cover').opacity(0.5))
      .addLayer(new ImageLayer(avatar, 50, 50, 150, 150).setCircular(true).shadow({ blur: 20, color: 'black' }))
      .build();

    message.reply({ files: [new AttachmentBuilder(buffer, { name: 'profile.png' })] });
  }
});
```

---

## 📚 Documentation

Check out the full documentation for detailed guides:

- [**📖 GUIDE.md**](./docs/GUIDE.md) - Complete tutorial from zero to hero.
- [**📝 CHANGELOG.md**](./docs/CHANGELOG.md) - See what's new.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by Joaopssx</sub>
</div>
