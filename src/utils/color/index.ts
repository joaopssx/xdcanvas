import { Conversions } from './Conversions';
import { Analysis } from './Analysis';
import { Manipulation } from './Manipulation';
import { Blending } from './Blending';
import { Generators } from './Generators';
import { Accessibility } from './Accessibility';
import { Palette } from './Palette';

export class ColorUtils {
  // Conversions
  static hexToRgb = Conversions.hexToRgb;
  static rgbToHex = Conversions.rgbToHex;
  static rgbToHsl = Conversions.rgbToHsl;
  static hslToRgb = Conversions.hslToRgb;
  static toWebsafe = Conversions.toWebsafe;

  // Analysis
  static getLuminance = Analysis.getLuminance;
  static getContrastRatio = Analysis.getContrastRatio;
  static isReadable = Analysis.isReadable;
  static getBestTextColor = Analysis.getBestTextColor;
  static getColorTemperature = Analysis.getColorTemperature;
  static getColorDistance = Analysis.getColorDistance;

  // Manipulation
  static lighten = Manipulation.lighten;
  static darken = Manipulation.darken;
  static saturate = Manipulation.saturate;
  static desaturate = Manipulation.desaturate;
  static setAlpha = Manipulation.setAlpha;
  static invert = Manipulation.invert;
  static mix = Manipulation.mix;
  static mixMultiple = Manipulation.mixMultiple;
  static tint = Manipulation.tint;
  static shade = Manipulation.shade;
  static clamp = Manipulation.clamp;
  static warm = Manipulation.warm;
  static cold = Manipulation.cold;

  // Blending
  static blend = Blending.blend;

  // Generators
  static random = Generators.random;
  static randomPastel = Generators.randomPastel;
  static randomVibrant = Generators.randomVibrant;
  static randomNeon = Generators.randomNeon;
  static generateGradient = Generators.generateGradient;
  static generateColorScale = Generators.generateColorScale;
  static generateHarmonies = Generators.generateHarmonies;
  static randomGradientPair = Generators.randomGradientPair;
  static getSemanticColor = Generators.getSemanticColor;
  static gradientNoise = Generators.gradientNoise;

  // Accessibility
  static simulateColorBlindness = Accessibility.simulateColorBlindness;

  // Palette
  static getDominantColor = Palette.getDominantColor;
  static getPalette = Palette.getPalette;
}
