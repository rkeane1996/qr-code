import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import { SaveQRRequest } from '../dtos/qr-save-reqeust.dto';

@Injectable()
export class QrApiService {
  async generateQRCode(dataToEncode: string) {
    return await QRCode.toDataURL(dataToEncode);
  }

  async saveQRCode(request: SaveQRRequest) {
    const fileName = request.fileName ? request.fileName : 'qrCode';
    const extension = request.extension ? request.extension : 'png';
    const filePath = `${fileName}.${extension}`;
    try {
      await QRCode.toFile(filePath, request.dataToEncode);
      return `QR saved as ${filePath}`;
    } catch (e) {
      throw new Error(e);
    }
  }
}
