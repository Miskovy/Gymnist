import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

// Use the correct QRCode options type for file generation
interface QRCodeFileOptions {
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  width?: number;
  margin?: number;
  color?: {
    dark: string;
    light: string;
  };
  type?: 'png' | 'svg' | 'utf8';
}

interface QRCodeData {
  data: string;
  options?: QRCodeFileOptions;
}

class QRCodeService {
  private qrCodeDirectory: string;

  constructor() {
    this.qrCodeDirectory = path.join(process.cwd(), 'public', 'qrcodes');
    this.ensureDirectoryExists(this.qrCodeDirectory);
  }

  ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  async generateQRCodeUrl(data: string, options?: QRCodeFileOptions): Promise<string> {
    try {
      const qrFilename = this.generateUniqueQRCodeData('QR');
      const filePath = path.join(this.qrCodeDirectory, `${qrFilename}.png`);

      const defaultOptions: QRCodeFileOptions = {
        errorCorrectionLevel: 'H',
        width: 300,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        ...options
      };

      await QRCode.toFile(filePath, data, {
        errorCorrectionLevel: defaultOptions.errorCorrectionLevel,
        width: defaultOptions.width,
        margin: defaultOptions.margin,
        color: defaultOptions.color
      });

      const baseUrl = process.env.APP_URL || 'http://localhost:3000';
      return `${baseUrl}/qrcodes/${qrFilename}.png`;
    } catch (error: any) {
      throw new Error(`Failed to generate QR code file: ${error.message}`);
    }
  }

  generateUniqueQRCodeData(prefix = 'QR'): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 11);
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

export default QRCodeService;