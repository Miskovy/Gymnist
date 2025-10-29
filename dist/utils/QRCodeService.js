"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qrcode_1 = __importDefault(require("qrcode"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class QRCodeService {
    constructor() {
        this.qrCodeDirectory = path_1.default.join(process.cwd(), 'public', 'qrcodes');
        this.ensureDirectoryExists(this.qrCodeDirectory);
    }
    ensureDirectoryExists(dirPath) {
        if (!fs_1.default.existsSync(dirPath)) {
            fs_1.default.mkdirSync(dirPath, { recursive: true });
        }
    }
    generateQRCodeUrl(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qrFilename = this.generateUniqueQRCodeData('QR');
                const filePath = path_1.default.join(this.qrCodeDirectory, `${qrFilename}.png`);
                const defaultOptions = Object.assign({ errorCorrectionLevel: 'H', width: 300, margin: 1, color: {
                        dark: '#000000',
                        light: '#FFFFFF',
                    } }, options);
                yield qrcode_1.default.toFile(filePath, data, {
                    errorCorrectionLevel: defaultOptions.errorCorrectionLevel,
                    width: defaultOptions.width,
                    margin: defaultOptions.margin,
                    color: defaultOptions.color
                });
                const baseUrl = process.env.APP_URL || 'http://localhost:3000';
                return `${baseUrl}/qrcodes/${qrFilename}.png`;
            }
            catch (error) {
                throw new Error(`Failed to generate QR code file: ${error.message}`);
            }
        });
    }
    generateUniqueQRCodeData(prefix = 'QR') {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 11);
        return `${prefix}-${timestamp}-${randomString}`;
    }
    validateQRCodeData(data, expectedPrefix) {
        if (!data || typeof data !== 'string') {
            return false;
        }
        if (expectedPrefix) {
            return data.startsWith(expectedPrefix);
        }
        return true;
    }
}
exports.default = QRCodeService;
