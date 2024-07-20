import { Test, TestingModule } from '@nestjs/testing';
import { QrApiService } from './qr-api.service';
import * as QRCode from 'qrcode';
import { SaveQRRequest } from '../dtos/qr-save-reqeust.dto';

jest.mock('qrcode', () => ({
  toDataURL: jest.fn(),
  toFile: jest.fn(),
}));

describe('QrApiService', () => {
  let service: QrApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QrApiService],
    }).compile();

    service = module.get<QrApiService>(QrApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateQRCode', () => {
    it('Test to return a data URL for the given data', async () => {
      const dataToEncode = 'test data';
      const expectedDataURL = 'data:image/png;base64,test';
      (QRCode.toDataURL as jest.Mock).mockResolvedValue(expectedDataURL);

      const result = await service.generateQRCode(dataToEncode);
      expect(result).toBe(expectedDataURL);
      expect(QRCode.toDataURL).toHaveBeenCalledWith(dataToEncode);
    });

    it('Test to throw a BadRequestException if QRCode.toDataURL fails', async () => {
      const dataToEncode = 'test data';
      (QRCode.toDataURL as jest.Mock).mockRejectedValue(
        new Error('Generation failed'),
      );

      await expect(service.generateQRCode(dataToEncode)).rejects.toThrow(Error);
      expect(QRCode.toDataURL).toHaveBeenCalledWith(dataToEncode);
    });
  });

  describe('saveQRCode', () => {
    it('Test to save the QR code to the specified file path', async () => {
      const request: SaveQRRequest = {
        fileName: 'test',
        extension: 'jpg',
        dataToEncode: 'data',
      };

      await service.saveQRCode(request);
      expect(QRCode.toFile).toHaveBeenCalledWith('test.jpg', 'data');
    });

    it('Test to save the QR code with default file name and extension if not provided', async () => {
      const request: SaveQRRequest = { dataToEncode: 'data' };

      await service.saveQRCode(request);
      expect(QRCode.toFile).toHaveBeenCalledWith('qrCode.png', 'data');
    });

    it('Test to throw a BadRequestException if QRCode.toFile fails', async () => {
      const request: SaveQRRequest = { dataToEncode: 'data' };
      (QRCode.toFile as jest.Mock).mockRejectedValue(
        new Error('File save failed'),
      );

      await expect(service.saveQRCode(request)).rejects.toThrow(Error);
      expect(QRCode.toFile).toHaveBeenCalledWith('qrCode.png', 'data');
    });
  });
});
