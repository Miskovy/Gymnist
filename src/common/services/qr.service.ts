import { Injectable, BadRequestException } from '@nestjs/common';
import * as QRCode from 'qrcode';
import * as fs from 'fs';
import * as path from 'path';

export interface QRCodeOptions {
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  type?: 'png' | 'svg' | 'utf8';
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

@Injectable()
export class QRCodeService {
  private readonly qrCodeDirectory = path.join(process.cwd(), 'public', 'qrcodes');

  constructor() {
    this.ensureDirectoryExists(this.qrCodeDirectory);
  }

  private ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  async generateQRCodeDataURL(
    data: string,
    options?: QRCode.QRCodeToDataURLOptions
  ): Promise<string> {
    try {
      const defaultOptions: QRCode.QRCodeToDataURLOptions = {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 300,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      };

      const mergedOptions = { ...defaultOptions, ...options };
      const qrCodeDataUrl = await QRCode.toDataURL(data, mergedOptions);
      return qrCodeDataUrl;
    } catch (error) {
      throw new BadRequestException(`Failed to generate QR code: ${error.message}`);
    }
  }

  async generateQRCodeBuffer(
    data: string,
    options?: QRCode.QRCodeToBufferOptions
  ): Promise<Buffer> {
    try {
      const defaultOptions: QRCode.QRCodeToBufferOptions = {
        errorCorrectionLevel: 'H',
        type: 'png',
        width: 300,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      };

      const mergedOptions = { ...defaultOptions, ...options };
      const qrCodeBuffer = await QRCode.toBuffer(data, mergedOptions);
      return qrCodeBuffer;
    } catch (error) {
      throw new BadRequestException(`Failed to generate QR code buffer: ${error.message}`);
    }
  }

  /**
   * Generate QR code file and return public URL
   */
  async generateQRCodeUrl(
    data: string,
    options?: QRCode.QRCodeToBufferOptions
  ): Promise<string> {
    try {
      const qrFilename = this.generateUniqueQRCodeData('QR');
      const filePath = path.join(this.qrCodeDirectory, `${qrFilename}.png`);
      
      const defaultOptions: QRCode.QRCodeToBufferOptions = {
        errorCorrectionLevel: 'H',
        type: 'png',
        width: 300,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      };

      const mergedOptions = { ...defaultOptions, ...options };
      const qrCodeBuffer = await QRCode.toBuffer(data, mergedOptions);
      
      // Save buffer to file
      fs.writeFileSync(filePath, qrCodeBuffer);
      
      // Return URL (you can customize the host/port as needed)
      const baseUrl = process.env.APP_URL || 'http://localhost:3000';
      const url = `${baseUrl}/qrcodes/${qrFilename}.png`;
      return url;
    } catch (error) {
      throw new BadRequestException(`Failed to generate QR code file: ${error.message}`);
    }
  }

  generateUniqueQRCodeData(prefix: string = 'QR'): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substr(2, 9);
    return `${prefix}-${timestamp}-${randomString}`;
  }

  validateQRCodeData(data: string, expectedPrefix?: string): boolean {
    if (!data || typeof data !== 'string') {
      return false;
    }

    if (expectedPrefix) {
      return data.startsWith(expectedPrefix);
    }

    return true;
  }
}