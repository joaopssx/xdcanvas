# Changelog

## [1.2.1] - 2025-11-25
### 🐛 Fixes
- **Documentation**: Updated README, GUIDE, and CHANGELOG to reflect v1.2.0 changes.
- **Package**: Synced package-lock.json with correct version.

## [1.2.0] - 2025-11-25
### ✨ New Features
- **Advanced Color Engine**:
  - Added `src/utils/color/` with modular architecture.
  - **Conversions**: Hex, RGB, HSL, Websafe.
  - **Analysis**: Luminance, Contrast, Readability, Temperature, Distance.
  - **Manipulation**: Lighten, Darken, Saturate, Invert, Mix, Tint, Shade, Warm, Cold.
  - **Generators**: Random (Pastel/Vibrant/Neon), Gradients, Harmonies, Noise.
  - **Accessibility**: Color Blindness Simulation.
- **Text Engine**: Added support for `stroke` and `shadow` in text rendering.
- **Math Utilities**: Added `clamp`, `map`, `formatNumber`.
- **Image Filters**: Added `grayscale` and `invert`.

### 🐛 Fixes
- **ShapeEngine**: Fixed crash in `drawCircle` method.
- **Test Bot**: Fixed multiple syntax and rendering errors in `bot_test_v1.2.0.js`.

## [1.0.0] - 2025-11-24

### 🚀 Major Release
The first stable release of **XDCanvas** is here! This release focuses on providing a solid foundation for Discord bot graphics.

### ✨ New Features
- **Core Engine**
  - `CanvasBuilder`: Fluent API for canvas composition.
  - `LayerManager`: Advanced layer handling with z-index.
  - `BaseLayer`: Universal styling (opacity, rotation, blend modes, shadows).
  
- **Discord Integration**
  - `DiscordHelper`: Robust fetching of User Avatars, Banners, and Guild Icons.
  - **Rate Limit Handling**: Automatic backoff for 429 responses.
  - **Fallbacks**: Smart fallback to default avatars or blurred backgrounds.

- **Graphics & Text**
  - `TextEngine`: Auto-adjust font size, text wrapping (horizontal/vertical).
  - `ShapeEngine`: Gradients (linear/radial), progress bars, patterns.
  - `ImageLayer`: `fit()` modes (cover, contain, fill), rounded corners, circular clipping.
  - `QRCode`: Built-in QR code generator.

- **Presets**
  - `WelcomeCard`: Ready-to-use welcome banner.
  - `ProfileCard`: User profile with XP bar and stats.
  - `RankCard`: Leaderboard rank card.

### 🛠 Improvements
- **TypeScript**: Full type definitions included.
- **Build**: Dual build support (CJS & ESM) for maximum compatibility.
- **Performance**: Optimized image loading and caching mechanisms.

### 📖 Documentation
- Comprehensive `GUIDE.md` tutorial.
- Updated `README.md` with examples.
