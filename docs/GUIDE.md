# 📖 XDCanvas User Guide

Welcome to the official **XDCanvas** guide! This document is a comprehensive tutorial designed to take you from a beginner to an expert in creating dynamic graphics for your Discord bots using XDCanvas.

---

## 📑 Table of Contents

1.  [Introduction](#1-introduction)
2.  [Installation & Setup](#2-installation--setup)
3.  [Core Concepts](#3-core-concepts)
    *   [The CanvasBuilder](#the-canvasbuilder)
    *   [Layers System](#layers-system)
    *   [Universal Styles](#universal-styles)
4.  [Working with Images](#4-working-with-images)
    *   [Loading Images](#loading-images)
    *   [ImageLayer & Fit Modes](#imagelayer--fit-modes)
    *   [Masking & Shapes](#masking--shapes)
5.  [Discord Integration](#5-discord-integration)
    *   [The DiscordHelper](#the-discordhelper)
    *   [Fetching Avatars & Banners](#fetching-avatars--banners)
    *   [Handling Rate Limits](#handling-rate-limits)
6.  [Text Engine](#6-text-engine)
    *   [Drawing Text](#drawing-text)
    *   [Auto-Adjust & Wrapping](#auto-adjust--wrapping)
    *   [Emojis](#emojis)
7.  [Shapes, Gradients & Patterns](#7-shapes-gradients--patterns)
8.  [Using Presets](#8-using-presets)
    *   [WelcomeCard](#welcomecard)
    *   [ProfileCard](#profilecard)
    *   [RankCard](#rankcard)
9.  [Advanced Techniques](#9-advanced-techniques)
    *   [Custom Layers](#custom-layers)
    *   [Performance Tips](#performance-tips)
10. [API Reference](#10-api-reference)

---

## 1. Introduction

**XDCanvas** is built to solve a specific problem: creating high-quality, dynamic images for Discord bots is often too hard. Native canvas libraries are low-level and verbose. XDCanvas provides a **high-level, fluent API** that handles the heavy lifting for you.

**Why use XDCanvas?**
*   **Fluent API**: Chain methods to build your image logically.
*   **Discord First**: Built-in tools to fetch user data safely.
*   **Modular**: Use only what you need.
*   **Type-Safe**: Written in TypeScript with full autocomplete support.

---

## 2. Installation & Setup

### Prerequisites
*   **Node.js**: Version 18 or higher.
*   **Discord.js**: v14+ (recommended for bot integration).

### Install via NPM

```bash
npm install xdcanvas
```

### Basic Setup

In your Node.js project:

**CommonJS (require)**
```javascript
const { CanvasBuilder } = require('xdcanvas');
```

**ES Modules (import)**
```typescript
import { CanvasBuilder } from 'xdcanvas';
```

---

## 3. Core Concepts

### The CanvasBuilder

The `CanvasBuilder` is your main entry point. It manages the canvas lifecycle, background, and final export.

```typescript
const builder = new CanvasBuilder(800, 600); // Width, Height

builder.setBackground('#2b2b2b'); // Hex color
// OR
builder.setBackground('rgba(0, 0, 0, 0.5)'); // Transparent
```

### Layers System

XDCanvas works on a **Layer** system. You add layers to the builder, and they are rendered in order (or by `zIndex`).

```typescript
builder.addLayer({
  zIndex: 1,
  render: (ctx) => {
    // Direct Context2D access
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, 100, 100);
  }
});
```

### Universal Styles

Every layer in XDCanvas (specifically those extending `BaseLayer`, like `ImageLayer`) supports **Universal Styles**. This means you can apply transformations to *anything* easily.

*   `.opacity(0.5)`
*   `.rotation(45)` (degrees)
*   `.scale(1.5)`
*   `.shadow({ color: 'black', blur: 10 })`
*   `.blendMode('overlay')`

---

## 4. Working with Images

### Loading Images

Use `AvatarLoader` or `DiscordHelper` (for Discord assets) to load images.

```typescript
import { AvatarLoader } from 'xdcanvas';

const image = await AvatarLoader.load('https://example.com/image.png');
```

### ImageLayer & Fit Modes

The `ImageLayer` class wraps an image and gives you powerful control.

```typescript
import { ImageLayer } from 'xdcanvas';

// Create a layer
const layer = new ImageLayer(image, 0, 0, 400, 200);

// Fit Modes
layer.fit('cover');      // Fills the area, cropping excess
layer.fit('contain');    // Fits inside, maintaining aspect ratio
layer.fit('fill');       // Stretches to fill (default)
```

### Masking & Shapes

You can easily make images rounded or circular.

```typescript
// Circular (perfect for avatars)
layer.setCircular(true);

// Rounded Corners
layer.setRounded(20); // 20px radius
```

**Example: A Circular Avatar with Shadow**

```typescript
builder.addLayer(
  new ImageLayer(avatarImage, 50, 50, 150, 150)
    .setCircular(true)
    .shadow({ color: '#000000', blur: 15, offsetY: 5 })
    .opacity(0.9)
);
```

---

## 5. Discord Integration

This is where XDCanvas shines. We provide `DiscordHelper` to handle the complexities of Discord's CDN.

### The DiscordHelper

```typescript
import { DiscordHelper } from 'xdcanvas';
```

### Fetching Avatars & Banners

**Get User Avatar**
```typescript
// Automatically handles default avatar fallback
const avatar = await DiscordHelper.getUserAvatar(user.id, user.avatar);
```

**Get User Banner**
```typescript
// Returns null if no banner, unless fallback is enabled
const banner = await DiscordHelper.getUserBanner(user.id, user.banner);

// With Fallback (returns a blurred version of avatar or default)
const bannerOrFallback = await DiscordHelper.getUserBanner(user.id, user.banner, 'png', 1024, true);
```

### Handling Rate Limits

`DiscordHelper` automatically handles **429 Rate Limits**. If your bot makes too many requests, the helper will wait and retry automatically using exponential backoff. You don't need to write any extra code!

---

## 6. Text Engine

Drawing text on canvas is usually painful. `TextEngine` makes it easy.

### Drawing Text

```typescript
import { TextEngine } from 'xdcanvas';

builder.addLayer({
  render: (ctx) => {
    TextEngine.drawText(ctx, "Hello World", 100, 100, {
      color: '#ffffff',
      font: 'Arial',
      size: 40
    });
  }
});
```

### Auto-Adjust & Wrapping

**Auto-Adjust**: Shrinks text to fit a width.
```typescript
TextEngine.drawText(ctx, "Very Long Username That Should Shrink", 100, 100, {
  maxWidth: 200,
  autoAdjust: true, // Will reduce font size until it fits
  size: 40
});
```

**Text Wrapping**: Breaks text into multiple lines.
```typescript
TextEngine.drawText(ctx, "This is a long description that will wrap to the next line.", 100, 100, {
  maxWidth: 300,
  lineHeight: 1.2,
  align: 'left' // or 'center', 'right'
});
```

### Emojis

XDCanvas supports rendering emojis in text! (Note: Currently supports standard unicode emojis via system fonts or Twemoji integration if configured).

---

## 7. Shapes, Gradients & Patterns

### Gradients

```typescript
import { ShapeEngine } from 'xdcanvas';

// Linear Gradient
const gradient = ShapeEngine.createLinearGradient(ctx, 0, 0, 800, 0, [
  { pos: 0, color: 'red' },
  { pos: 1, color: 'blue' }
]);

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 800, 600);
```

### Progress Bars

Perfect for Rank Cards.

```typescript
ShapeEngine.drawProgressBar(
  ctx, 
  50, 200,      // x, y
  500, 30,      // w, h
  0.75,         // progress (0.0 to 1.0)
  '#00ff00',    // foreground color
  '#333333',    // background color
  15            // corner radius
);
```

---

## 8. Using Presets

Don't want to build from scratch? Use our built-in presets.

### WelcomeCard

Generates a beautiful welcome image.

```typescript
import { WelcomeCard } from 'xdcanvas';

const buffer = await WelcomeCard.build({
  username: 'Joao#1234',
  avatarUrl: 'https://...',
  title: 'WELCOME',
  subtitle: 'To the server!',
  themeColor: '#ff0055'
});
```

### ProfileCard

Displays user level, XP, and rank.

```typescript
import { ProfileCard } from 'xdcanvas';

const buffer = await ProfileCard.build({
  username: 'User',
  avatarUrl: 'https://...',
  level: 10,
  xp: 500,
  maxXp: 1000,
  rank: 1,
  backgroundUrl: 'https://...' // Optional
});
```

### RankCard

A slim, leaderboard-style card.

```typescript
import { RankCard } from 'xdcanvas';

const buffer = await RankCard.build({
  username: 'User',
  avatarUrl: 'https://...',
  rank: 5,
  level: 20,
  xp: 1200,
  maxXp: 2000
});
```

---

## 9. Advanced Techniques

### Custom Layers

You can create your own reusable layer classes by extending `BaseLayer`.

```typescript
import { BaseLayer } from 'xdcanvas';

class MyCustomShape extends BaseLayer {
  draw(ctx, canvas) {
    ctx.fillStyle = 'purple';
    ctx.beginPath();
    ctx.arc(this._x, this._y, 50, 0, Math.PI * 2);
    ctx.fill();
  }
}

builder.addLayer(new MyCustomShape().setX(100).setY(100).opacity(0.5));
```

### Performance Tips

1.  **Reuse Images**: If you use the same background often, load it once and reuse the `Image` object.
2.  **Limit Layers**: While fast, hundreds of layers will slow down rendering.
3.  **Use Jpeg**: For final output, if transparency isn't needed, `.toBuffer('image/jpeg')` is smaller and faster.

---

## 10. API Reference

### `CanvasBuilder`
*   `constructor(w, h)`
*   `setBackground(color)`
*   `addLayer(layer)`
*   `build(format?, quality?)`

### `DiscordHelper`
*   `getUserAvatar(id, hash, format?, size?)`
*   `getUserBanner(id, hash, format?, size?, fallback?)`
*   `getGuildIcon(id, hash, ...)`

### `ImageLayer`
*   `fit(mode)`: 'cover' | 'contain' | 'fill'
*   `setRounded(radius)`
*   `setCircular(bool)`
*   `opacity(val)`
*   `shadow(options)`

---

**End of Guide**
*Happy Coding with XDCanvas!*
