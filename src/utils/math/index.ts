/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/
import { Basic } from './Basic';
import { Interpolation } from './Interpolation';
import { Random } from './Random';
import { Geometry } from './Geometry';
import { Statistics } from './Statistics';

export class MathUtils {
  // Basic
  static clamp = Basic.clamp;
  static map = Basic.map;
  static roundTo = Basic.roundTo;
  static roundToMultiple = Basic.roundToMultiple;
  static isBetween = Basic.isBetween;
  static normalize = Basic.normalize;
  static factorial = Basic.factorial;
  static percentOfTotal = Basic.percentOfTotal;

  // Interpolation
  static lerp = Interpolation.lerp;
  static smoothStep = Interpolation.smoothStep;
  static sigmoid = Interpolation.sigmoid;
  static easeInQuad = Interpolation.easeInQuad;
  static easeOutQuad = Interpolation.easeOutQuad;
  static easeInOutQuad = Interpolation.easeInOutQuad;
  static easeInCubic = Interpolation.easeInCubic;
  static easeOutCubic = Interpolation.easeOutCubic;
  static easeInOutCubic = Interpolation.easeInOutCubic;
  static easeInExpo = Interpolation.easeInExpo;
  static easeOutExpo = Interpolation.easeOutExpo;

  // Random
  static float = Random.float;
  static int = Random.int;
  static choice = Random.choice;
  static weighted = Random.weighted;
  static gaussian = Random.gaussian;

  // Geometry
  static distance = Geometry.distance;
  static angle = Geometry.angle;
  static hypotenuse = Geometry.hypotenuse;
  static polarToCartesian = Geometry.polarToCartesian;
  static clampVector = Geometry.clampVector;
  static pointInRect = Geometry.pointInRect;

  // Statistics
  static movingAverage = Statistics.movingAverage;
  static linearRegression = Statistics.linearRegression;

  // Legacy / Helper
  static formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  }
}

export * from './Basic';
export * from './Interpolation';
export * from './Random';
export * from './Geometry';
export * from './Statistics';

