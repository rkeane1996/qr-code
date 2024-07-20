import { Test, TestingModule } from '@nestjs/testing';
import { QrApiController } from './qr-api.controller';
import { GenerateQRRequest } from '../dtos/qr-generate-reqeust.dto';
import { SaveQRRequest } from '../dtos/qr-save-reqeust.dto';
import { QrApiService } from '../service/qr-api.service';


describe('QrApiController', () => {
  let qrApiController: QrApiController;
  let qrApiService: QrApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QrApiController],
      providers: [
        {
          provide: QrApiService,
          useValue: {
            generateQRCode: jest.fn(),
            saveQRCode: jest.fn(),
          },
        },
      ],
    }).compile();

    qrApiController = module.get<QrApiController>(QrApiController);
    qrApiService = module.get<QrApiService>(QrApiService);
  });

  it('should be defined', () => {
    expect(qrApiController).toBeDefined();
  });

  describe('generateQRCode', () => {
    it('should call qrService.generateQRCode with correct data', async () => {
      const request: GenerateQRRequest = { dataToEncode: 'test data' };
      const result = 'generated QR code';
      jest.spyOn(qrApiService, 'generateQRCode').mockResolvedValue(result);

      expect(await qrApiController.generateQRCode(request)).toBe(result);
      expect(qrApiService.generateQRCode).toHaveBeenCalledWith('test data');
    });

    it('should throw a BadRequestException if qrService.generateQRCode fails', async () => {
      const request: GenerateQRRequest = { dataToEncode: 'test data' };
      jest
        .spyOn(qrApiService, 'generateQRCode')
        .mockRejectedValue(new Error('Generation failed'));

      await expect(qrApiController.generateQRCode(request)).rejects.toThrow(
        Error,
      );
      expect(qrApiService.generateQRCode).toHaveBeenCalledWith(
        request.dataToEncode,
      );
    });
  });

  describe('saveQRCode', () => {
    it('should call qrService.saveQRCode with correct data', async () => {
      const request: SaveQRRequest = {
        dataToEncode: 'www.google.ie',
        extension: 'png',
        fileName: 'testqr',
      };
      const result = 'saved QR code';
      jest.spyOn(qrApiService, 'saveQRCode').mockResolvedValue(result);

      expect(await qrApiController.saveQRCode(request)).toBe(result);
      expect(qrApiService.saveQRCode).toHaveBeenCalledWith(request);
    });

    it('should throw a BadRequestException if qrService.saveQRCode fails', async () => {
      const request: SaveQRRequest = {
        dataToEncode: 'www.google.ie',
        extension: 'png',
        fileName: 'testqr',
      };
      jest
        .spyOn(qrApiService, 'saveQRCode')
        .mockRejectedValue(new Error('Save failed'));

      await expect(qrApiController.saveQRCode(request)).rejects.toThrow(Error);
      expect(qrApiService.saveQRCode).toHaveBeenCalledWith(request);
    });
  });
});
