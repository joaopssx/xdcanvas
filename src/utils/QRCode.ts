/**************************************
 * by: Joaopssx - xdcanvas
 * https://github.com/joaopssx/xdcanvas
 **************************************/

import QRCode from 'qrcode';
import { loadImage, Image } from '@napi-rs/canvas';

export class QRCodeGenerator {
  public static async generate(
    text: string,
    options: QRCode.QRCodeToDataURLOptions = {}
  ): Promise<Image> {
    try {
      const dataUrl = await QRCode.toDataURL(text, options);
      return await loadImage(dataUrl);
    } catch (error) {
      throw new Error(`Failed to generate QR Code: ${error}`);
    }
  }
}
