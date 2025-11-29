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

## 11. Advanced Color Manipulation (v1.2.0)

XDCanvas v1.2.0 introduces a massive, modular suite of color utilities. Access them via `ColorUtils`.

### 1. Conversions
```typescript
ColorUtils.hexToRgb('#ff0000'); // { r: 255, g: 0, b: 0, a: 1 }
ColorUtils.rgbToHex(255, 0, 0); // "#ff0000"
ColorUtils.rgbToHsl(255, 0, 0); // { h: 0, s: 100, l: 50 }
ColorUtils.toWebsafe('#ff0000'); // "#ff0000" (nearest websafe)
```

### 2. Analysis
```typescript
ColorUtils.getLuminance('#ff0000'); // 0.21...
ColorUtils.getContrastRatio('#000000', '#ffffff'); // 21
ColorUtils.isReadable('#ffffff', '#000000'); // true
ColorUtils.getBestTextColor('#000000'); // "#ffffff"
ColorUtils.getColorTemperature('#ff0000'); // 'warm'
ColorUtils.getColorDistance('#ff0000', '#00ff00'); // Euclidean distance
```

### 3. Manipulation
```typescript
ColorUtils.lighten('#ff0000', 20); // Lighter red
ColorUtils.darken('#ff0000', 20); // Darker red
ColorUtils.saturate('#808080', 50); // More vibrant
ColorUtils.desaturate('#ff0000', 50); // Less vibrant
ColorUtils.invert('#ffffff'); // "#000000"
ColorUtils.setAlpha('#ff0000', 0.5); // "#ff000080"
ColorUtils.mix('#ff0000', '#0000ff', 0.5); // Purple
ColorUtils.mixMultiple(['#ff0000', '#0000ff', '#00ff00']); // Average
ColorUtils.tint('#ff0000', 0.5); // Mix with white
ColorUtils.shade('#ff0000', 0.5); // Mix with black
ColorUtils.warm('#ff0000', 0.2); // Warmer red
ColorUtils.cold('#ff0000', 0.2); // Colder red
ColorUtils.clamp('#300000'); // Ensures valid hex
```

### 4. Blending Modes
Supported modes: `multiply`, `screen`, `overlay`.
```typescript
ColorUtils.blend('#ff0000', '#0000ff', 'multiply');
```

### 5. Generators
```typescript
ColorUtils.random(); // Random hex
ColorUtils.randomPastel(); // Soft color
ColorUtils.randomVibrant(); // Saturated color
ColorUtils.randomNeon(); // Fluorescent color
ColorUtils.generateGradient(5, '#ff0000', '#0000ff'); // 5 steps
ColorUtils.generateColorScale('#ff0000', 10); // 10 steps light->dark
ColorUtils.generateHarmonies('#ff0000', 'triadic'); // [base, color2, color3]
ColorUtils.randomGradientPair(); // [color1, color2]
ColorUtils.getSemanticColor('success'); // "#28a745"
ColorUtils.gradientNoise(10, '#000', '#fff', 0.2); // Noisy gradient
```

### 6. Accessibility
Simulate how color blind users see your colors.
```typescript
ColorUtils.simulateColorBlindness('#ff0000', 'protanopia');
```

### 7. Palette Extraction
```typescript
ColorUtils.getDominantColor(ctx, 0, 0, 100, 100);
ColorUtils.getPalette(ctx, 0, 0, 100, 100, 5);
```

---

## 12. Advanced Math Engine (v1.3.0)

XDCanvas v1.3.0 includes a comprehensive math library for game logic, animations, and data visualization. Access them via `MathUtils`.

### 1. Basic Math
```typescript
MathUtils.clamp(150, 0, 100); // 100
MathUtils.map(0.5, 0, 1, 0, 100); // 50
MathUtils.roundTo(3.14159, 2); // 3.14
MathUtils.roundToMultiple(17, 5); // 15
MathUtils.isBetween(5, 0, 10); // true
MathUtils.normalize(50, 0, 100); // 0.5
MathUtils.factorial(5); // 120
MathUtils.percentOfTotal(25, 100); // 25
```

### 2. Interpolation & Easing
Perfect for animations and smooth transitions.
```typescript
MathUtils.lerp(0, 100, 0.5); // 50
MathUtils.smoothStep(0.5); // Smoothed value
MathUtils.sigmoid(0); // 0.5

// Easing Functions (In, Out, InOut)
MathUtils.easeInQuad(0.5);
MathUtils.easeOutCubic(0.5);
MathUtils.easeInOutExpo(0.5);
```

### 3. Randomness
```typescript
MathUtils.int(1, 10); // Random integer
MathUtils.float(0, 1); // Random float
MathUtils.choice(['A', 'B', 'C']); // Random item
MathUtils.weighted([{ item: 'A', weight: 1 }, { item: 'B', weight: 9 }]); // Weighted choice
MathUtils.gaussian(0, 1); // Normal distribution (Bell curve)
```

### 4. Geometry
```typescript
MathUtils.distance(0, 0, 3, 4); // 5
MathUtils.angle(0, 0, 1, 1); // 0.785 (radians)
MathUtils.hypotenuse(3, 4); // 5
MathUtils.polarToCartesian(10, Math.PI); // { x: -10, y: 0 }
MathUtils.clampVector({ x: 10, y: 10 }, { x: 0, y: 0 }, { x: 5, y: 5 }); // { x: 5, y: 5 }
MathUtils.pointInRect(10, 10, 0, 0, 20, 20); // true
```

### 5. Statistics
```typescript
MathUtils.movingAverage([1, 2, 3, 4, 5], 3); // [1, 1.5, 2, 3, 4]
MathUtils.linearRegression([{x:1, y:2}, {x:2, y:4}]); // { slope: 2, intercept: 0 }
```

---

## 13. Image & Canvas Utilities (v1.4.0)

XDCanvas v1.4.0 introduces a massive suite of image manipulation tools.

### 1. Filters & Effects
```typescript
// Coming soon in v1.4.0
// ImageUtils.grayscale(ctx, ...);
// ImageUtils.blur(ctx, ...);
// ImageUtils.pixelate(ctx, ...);
```

### 2. Patterns
```typescript
// Coming soon in v1.4.0
// PatternGenerator.drawGrid(ctx, ...);
// PatternGenerator.drawStripes(ctx, ...);
```

### 3. Layout & Transform
```typescript
// Coming soon in v1.4.0
// Transform.autoCenter(ctx, ...);
// Transform.smartCrop(ctx, ...);
```

---

## 14. Advanced Text Utilities (v1.5.0)

XDCanvas v1.5.0 adds a powerful suite of text manipulation tools.

### 1. Case Conversion
```typescript
import { TextUtils } from 'xdcanvas';

// Capitalize
TextUtils.Case.capitalize('hello world'); // "Hello world"
TextUtils.Case.titleCase('the lord of the rings'); // "The Lord of the Rings"

// Converters
TextUtils.Case.toCamel('hello_world'); // "helloWorld"
TextUtils.Case.toKebab('Hello World'); // "hello-world"
```

### 2. Sanitization
```typescript
// Remove Accents
TextUtils.Sanitize.removeAccents('Olá Mundo!'); // "Ola Mundo!"

// Safe Filename
TextUtils.Sanitize.safeFilename('My File Name.png'); // "my_file_name.png"

// Strip Emojis
TextUtils.Sanitize.stripEmojis('Hello 🌍!'); // "Hello !"
```

### 3. Analysis & Generation
```typescript
// Random ID
TextUtils.Generate.randomId(10); // "aB3dE9..."

// Analyze
TextUtils.Analyze.wordCount('Hello world'); // 2
TextUtils.Analyze.extractHashtags('Loving #coding and #coffee'); // ["#coding", "#coffee"]
TextUtils.Analyze.readingTime('Long text...', 200); // 1 (minute)
```

### 4. Advanced Utilities
```typescript
// Regex Patterns
if (TextUtils.Regex.isEmail('test@example.com')) { ... }

// Typography
TextUtils.Typography.smartQuotes('"Hello"'); // “Hello”

// Inflect
TextUtils.Inflect.pluralize('box', 2); // "boxes"

// Manipulate
TextUtils.Manipulate.mask('user@email.com'); // "us***@email.com"
TextUtils.Manipulate.shuffle('abc'); // "cba"
```

---

## 15. Rich Text & Formatting (v1.6.0)

### 1. Canvas Text Effects
```typescript
import { RichText } from 'xdcanvas';

// Gradient Text
RichText.drawGradientText(ctx, 'Cool Gradient', 50, 50, ['red', 'blue']);

// Neon Glow
RichText.drawNeonText(ctx, 'Neon Lights', 50, 100, '#00ff00', 30);

// Glitch Effect
RichText.drawGlitchText(ctx, 'System Failure', 50, 150);
```

### 2. Formatters
```typescript
import { Formatters } from 'xdcanvas';

// Time
Formatters.TimeFormatter.duration(3661000); // "1h 1m 1s"
Formatters.TimeFormatter.relative(Date.now() - 60000); // "1 minutes ago"

// Data
Formatters.DataFormatter.bytes(1048576); // "1 MB"
Formatters.DataFormatter.compactNumber(1500); // "1.5K"
```

### 3. Image Composition
```typescript
import { Compositor } from 'xdcanvas';

// Grid Layout
const gridCanvas = Compositor.grid([img1, img2, img3, img4], 2);

// Mirror Reflection
Compositor.reflection(ctx, 0, 0, 200, 200);
```

---

**End of Guide**
*Happy Coding with XDCanvas!*
