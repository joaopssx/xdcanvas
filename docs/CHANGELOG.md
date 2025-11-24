# Changelog

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
